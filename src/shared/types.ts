export interface UsomModel {
    id: number;
    url: string;
    desc: string;
    source: string;
    date: string;
    criticality_level: number;
    connectiontype: string;
}

export interface UsomApiResponse {
    models: UsomModel[];
}

export interface UsomSettings {
    protectionEnabled: boolean;
    excludedDomains: string[];
    minCriticality: number;
    cacheDuration: number;
    cacheSize: number;
}

export const SETTINGS_DEFAULTS: UsomSettings = {
    protectionEnabled: true,
    excludedDomains: [],
    minCriticality: 4,
    cacheDuration: 24,
    cacheSize: 5000
};

export interface CachedModel {
    model: UsomModel | null;
    timestamp: number;
}
