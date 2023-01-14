/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_DESTINATION_ENDPOINT: string;
    readonly VITE_LOGO_LIGHT: string;
    readonly VITE_AUTH_URL: string;
    readonly VITE_DASHBOARD_URL: string;
    readonly VITE_LOGO_DARK: string;
    readonly VITE_BP_LIGHT: string;
    readonly VITE_BP_DARK: string;
    readonly VITE_GOOGLE_CLIENT_ID: string;
    readonly VITE_MS_CLIENT_ID: string;
    readonly VITE_APP_ENV: `dev` | `qa` | `prod`;
    readonly VITE_BACKEND_URL: string;
    readonly VITE_MIRRORNODE_URL: string;
    readonly VITE_MIRRORNODE_API_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
