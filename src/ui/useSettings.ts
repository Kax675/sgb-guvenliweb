import { useState, useEffect } from 'preact/hooks';
import { getSettings, saveSettings as saveToStorage, getCacheCount, clearCache as clearStorageCache } from '../shared/storage';
import { UsomSettings, SETTINGS_DEFAULTS } from '../shared/types';

export function useSettings() {
    const [settings, setSettings] = useState<UsomSettings>(SETTINGS_DEFAULTS);
    const [loading, setLoading] = useState(true);
    const [cacheCount, setCacheCount] = useState(0);

    useEffect(() => {
        const init = async () => {
            const s = await getSettings();
            const count = await getCacheCount();
            setSettings(s);
            setCacheCount(count);
            setLoading(false);
        };
        init();
    }, []);

    const updateSettings = async (newSettings: Partial<UsomSettings>) => {
        const updated = { ...settings, ...newSettings };
        setSettings(updated);
        await saveToStorage(updated);
    };

    const resetSettings = async () => {
        setSettings(SETTINGS_DEFAULTS);
        await saveToStorage(SETTINGS_DEFAULTS);
    };

    const clearCache = async () => {
        await clearStorageCache();
        setCacheCount(0);
    };

    return { settings, updateSettings, resetSettings, clearCache, cacheCount, loading };
}
