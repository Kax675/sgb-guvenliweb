import { useState, useEffect } from 'preact/hooks';
import { getSettings, saveSettings as saveToStorage, getCacheCount, clearCache as clearStorageCache } from '../shared/storage';
import { SgbSettings, SETTINGS_DEFAULTS } from '../shared/types';

export function useSettings() {
    const [settings, setSettings] = useState<SgbSettings>(SETTINGS_DEFAULTS);
    const [loading, setLoading] = useState(true);
    const [cacheCount, setCacheCount] = useState(0);

    useEffect(() => {
        let isMounted = true;

        const refresh = async () => {
            try {
                const [s, count] = await Promise.all([getSettings(), getCacheCount()]);
                if (isMounted) {
                    setSettings(s);
                    setCacheCount(count);
                    setLoading(false);
                }
            } catch (e) {
                console.error("[SGB] Load Error:", e);
            }
        };

        refresh();

        const listener = (changes: { [key: string]: chrome.storage.StorageChange }, area: string) => {
            if (area === 'local' && changes.usom_settings && isMounted) {
                const newValue = changes.usom_settings.newValue;
                if (newValue) {
                    setSettings({ ...SETTINGS_DEFAULTS, ...newValue });
                }
            }
        };

        chrome.storage.onChanged.addListener(listener);
        return () => {
            isMounted = false;
            chrome.storage.onChanged.removeListener(listener);
        };
    }, []);

    const updateSettings = async (newSettings: Partial<SgbSettings>) => {
        if (loading && !import.meta.env.DEV) return;

        // Atomic update: get current from storage, merge, and save
        // The listener will automatically update the local 'settings' state
        const current = await getSettings();
        const updated = { ...current, ...newSettings };
        await saveToStorage(updated);
    };

    const resetSettings = async () => {
        if (loading && !import.meta.env.DEV) return;
        await saveToStorage(SETTINGS_DEFAULTS);
        await updateMetadata();
    };

    const clearCache = async () => {
        await clearStorageCache();
        setCacheCount(0);
    };

    const updateMetadata = async () => {
        const urls = {
            sources: "https://siberguvenlik.gov.tr/api/address-source/index?pageSize=1000",
            descriptions: "https://siberguvenlik.gov.tr/api/address-description/index?pageSize=1000",
            connectionTypes: "https://siberguvenlik.gov.tr/api/address-connection-type/index?pageSize=1000"
        };

        const fetchMetadata = async (url: string) => {
            const res = await fetch(url);
            const data = await res.json();
            const map: Record<string, any> = {};
            data.models.forEach((m: any) => {
                map[m.id] = m;
            });
            return map;
        };

        const [sources, descriptions, connectionTypes] = await Promise.all([
            fetchMetadata(urls.sources),
            fetchMetadata(urls.descriptions),
            fetchMetadata(urls.connectionTypes)
        ]);

        await updateSettings({
            metadata: {
                sources,
                descriptions,
                connectionTypes,
                lastUpdated: Date.now()
            }
        });
    };

    return { settings, updateSettings, resetSettings, clearCache, updateMetadata, cacheCount, loading };
}
