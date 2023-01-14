const {
    VITE_AUTH_URL,
    VITE_DASHBOARD_URL
} = import.meta.env;

export const pathToUrl = (path: string) => `${VITE_AUTH_URL}${path}`;

export const pathToDashboard = (path?: string) => (path === undefined) ? String(VITE_DASHBOARD_URL) : `${VITE_DASHBOARD_URL}${path}`;

export const pathToAuthService = (path?: string) => (path === undefined) ? String(VITE_AUTH_URL) : `${VITE_AUTH_URL}${path}`;
