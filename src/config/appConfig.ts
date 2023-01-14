/* eslint-disable object-curly-newline */
const loadedConfig = import.meta.env;

interface Env {
    getEnv(): string;
    isDev(): boolean;
    isStaging(): boolean;
    isProd(): boolean;
    getMirrorNodeApiKey(): string;
}

interface ServerHosts {
    getBackendServiceUrl(): string;
    getMirrorNodeUrl(): string;
}

const env: Env = {
    getEnv: () => loadedConfig.VITE_APP_ENV,
    isDev: () => loadedConfig.VITE_APP_ENV === `dev`,
    isStaging: () => loadedConfig.VITE_APP_ENV === `qa`,
    isProd: () => loadedConfig.VITE_APP_ENV === `prod`,
    getMirrorNodeApiKey: () => loadedConfig.VITE_MIRRORNODE_API_KEY,
};

const serverHosts: ServerHosts = {
    getBackendServiceUrl: () => loadedConfig.VITE_BACKEND_URL,
    getMirrorNodeUrl: () => loadedConfig.VITE_MIRRORNODE_URL
};

const appConfig = {
    services: serverHosts,
    env,
};

export default appConfig;
