import { BrowserRouter as Router } from "react-router-dom";

export default function RouteProvider ({ children }: { children: JSX.Element }) {
    const ENV_BASE_URL = import.meta.env.BASE_URL ?? ``;

    return (
        <Router basename={String(ENV_BASE_URL)}>
            {children}
        </Router>
    );
}
