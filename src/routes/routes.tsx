import { RouteObject } from "react-router-dom";

import { claimContractRoutes } from "./claimContractRoutes";
import { sitemap } from "./sitemap";
import { verifyContractRoutes } from "./verifyContractRoutes";

import { Home } from "@/pages/Home";

export const mainContentRoutes: RouteObject[] = [
    {
        path: sitemap.INDEX,
        element: <Home />,
    },
    {
        index: true,
        path: sitemap.HOME,
        element: <Home />,
    },
    ...claimContractRoutes,
    ...verifyContractRoutes,
];
