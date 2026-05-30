export interface SgbModel {
    id: number;
    url: string;
    desc: string;
    source: string;
    date: string;
    criticality_level: number;
    connectiontype: string;
}

export interface SgbApiResponse {
    models: SgbModel[];
}

export interface SgbMetadata {
    id: string;
    tr_title: string;
    en_title: string;
    tr_desc?: string;
    en_desc?: string;
}

export interface SgbSettings {
    protectionEnabled: boolean;
    excludedDomains: string[];
    minCriticality: number;
    cacheDuration: number;
    cacheSize: number;
    metadata: {
        sources: Record<string, SgbMetadata>;
        descriptions: Record<string, SgbMetadata>;
        connectionTypes: Record<string, SgbMetadata>;
        lastUpdated: number;
    };
}

export const SETTINGS_DEFAULTS: SgbSettings = {
    protectionEnabled: true,
    excludedDomains: [],
    minCriticality: 4,
    cacheDuration: 24,
    cacheSize: 5000,
    metadata: {
        sources: {},
        descriptions: {},
        connectionTypes: {},
        lastUpdated: 0
    }
};

export interface CachedModel {
    model: SgbModel | null;
    timestamp: number;
}
