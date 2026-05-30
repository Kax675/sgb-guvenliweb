import { SgbApiResponse, SgbModel, CachedModel, SgbSettings, SETTINGS_DEFAULTS } from '../shared/types';
import { getSettings, saveSettings, getCache, saveCache } from '../shared/storage';

const SGB_API_URL = "https://siberguvenlik.gov.tr/api/address/index";

async function fetchMetadata() {
    const urls = {
        sources: "https://siberguvenlik.gov.tr/api/address-source/index?pageSize=1000",
        descriptions: "https://siberguvenlik.gov.tr/api/address-description/index?pageSize=1000",
        connectionTypes: "https://siberguvenlik.gov.tr/api/address-connection-type/index?pageSize=1000"
    };

    const fetchSingle = async (url: string) => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            const map: Record<string, any> = {};
            data.models.forEach((m: any) => { map[m.id] = m; });
            return map;
        } catch (e) {
            console.error("[SGB] Metadata Fetch Error:", e);
            return null;
        }
    };

    const [sources, descriptions, connectionTypes] = await Promise.all([
        fetchSingle(urls.sources),
        fetchSingle(urls.descriptions),
        fetchSingle(urls.connectionTypes)
    ]);

    if (sources && descriptions && connectionTypes) {
        const current = await getSettings();
        await saveSettings({
            ...current,
            metadata: {
                sources,
                descriptions,
                connectionTypes,
                lastUpdated: Date.now()
            }
        });
    }
}

// Initialize
let currentSettings: SgbSettings = { ...SETTINGS_DEFAULTS };
const localCache = new Map<string, CachedModel>();

(async () => {
    currentSettings = await getSettings();
    const diskCache = await getCache();
    Object.entries(diskCache).forEach(([domain, data]) => {
        localCache.set(domain, data);
    });
})();

chrome.runtime.onInstalled.addListener(() => {
    fetchMetadata();
});

chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "local" && changes['usom_settings']) {
        const newValue = changes['usom_settings'].newValue;
        if (newValue && typeof newValue === 'object') {
            currentSettings = { ...SETTINGS_DEFAULTS, ...newValue };
        }
    }
});

async function persistCache() {
    if (localCache.size > currentSettings.cacheSize) {
        const keys = Array.from(localCache.keys());
        keys.slice(0, localCache.size - currentSettings.cacheSize).forEach(k => localCache.delete(k));
    }
    await saveCache(Object.fromEntries(localCache));
}

async function checkDomain(domain: string): Promise<SgbModel | null> {
    const cached = localCache.get(domain);
    if (cached && (Date.now() - cached.timestamp < currentSettings.cacheDuration * 3600000)) {
        return cached.model;
    }

    try {
        const response = await fetch(`${SGB_API_URL}?q=${domain}&type=domain`);
        const data: SgbApiResponse = await response.json();
        const model = data.models?.[0] || null;

        localCache.set(domain, { model, timestamp: Date.now() });
        await persistCache();
        return model;
    } catch (error) {
        console.error("[SGB] API Error:", error);
        return null;
    }
}

chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
    if (details.frameId !== 0 || !currentSettings.protectionEnabled) return;

    try {
        const url = new URL(details.url);
        if (!["http:", "https:"].includes(url.protocol)) return;

        const domain = url.hostname;
        if (domain === "localhost" || domain === "127.0.0.1" || 
            domain.includes(chrome.runtime.id) || domain === "siberguvenlik.gov.tr" ||
            currentSettings.excludedDomains.includes(domain)) return;

        const model = await checkDomain(domain);
        if (!model || model.criticality_level < currentSettings.minCriticality) return;

        const params = new URLSearchParams({
            url: details.url, domain,
            desc: model.desc || "", source: model.source || "",
            date: model.date || "", level: model.criticality_level.toString()
        });

        chrome.tabs.update(details.tabId, {
            url: chrome.runtime.getURL(`src/ui/blocked/index.html?${params.toString()}`)
        });
    } catch (e) {
        console.error("[SGB] Navigation Error:", e);
    }
});
