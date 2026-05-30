import { SgbSettings, SETTINGS_DEFAULTS, CachedModel } from './types';

const SETTINGS_KEY = 'usom_settings';
const CACHE_KEY = 'usom_cache';

export async function getSettings(): Promise<SgbSettings> {
    const result = await chrome.storage.local.get(SETTINGS_KEY);
    return { ...SETTINGS_DEFAULTS, ...(result[SETTINGS_KEY] || {}) };
}

export async function saveSettings(settings: SgbSettings): Promise<void> {
    await chrome.storage.local.set({ [SETTINGS_KEY]: settings });
}

export async function getCache(): Promise<Record<string, CachedModel>> {
    const result = await chrome.storage.local.get(CACHE_KEY);
    return (result[CACHE_KEY] as Record<string, CachedModel>) || {};
}

export async function saveCache(cache: Record<string, CachedModel>): Promise<void> {
    await chrome.storage.local.set({ [CACHE_KEY]: cache });
}

export async function clearCache(): Promise<void> {
    await chrome.storage.local.remove(CACHE_KEY);
}

export async function getCacheCount(): Promise<number> {
    const cache = await getCache();
    return Object.keys(cache).length;
}
