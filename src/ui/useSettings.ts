import { useState, useEffect } from 'preact/hooks';
import { getSettings, saveSettings as saveToStorage } from '../shared/storage';
import { UsomSettings, SETTINGS_DEFAULTS } from '../shared/types';

export function useSettings() {
    const [settings, setSettings] = useState<UsomSettings>(SETTINGS_DEFAULTS);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSettings().then(s => {
            setSettings(s);
            setLoading(false);
        });
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

    return { settings, updateSettings, resetSettings, loading };
}
