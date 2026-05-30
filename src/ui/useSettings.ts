import { useState, useEffect } from 'preact/hooks';
import { getSettings, saveSettings as saveToStorage, getCacheCount, clearCache as clearStorageCache } from '../shared/storage';
import { UsomSettings, SETTINGS_DEFAULTS } from '../shared/types';

export function useSettings() {
    const [settings, setSettings] = useState<UsomSettings>(SETTINGS_DEFAULTS);
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
                console.error("[USOM] Load Error:", e);
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

    const updateSettings = async (newSettings: Partial<UsomSettings>) => {
        if (loading) return;

        // Atomic update: get current from storage, merge, and save
        // The listener will automatically update the local 'settings' state
        const current = await getSettings();
        const updated = { ...current, ...newSettings };
        await saveToStorage(updated);
    };

    const resetSettings = async () => {
        if (loading) return;
        await saveToStorage(SETTINGS_DEFAULTS);
    };

    const clearCache = async () => {
        await clearStorageCache();
        setCacheCount(0);
    };

    return { settings, updateSettings, resetSettings, clearCache, cacheCount, loading };
}
