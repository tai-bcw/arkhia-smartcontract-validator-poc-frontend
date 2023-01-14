import { RouteObject } from "react-router";

import { sitemap } from "./sitemap";

import { SearchContract } from "@/pages/SearchContract";
import { VerifyContract } from "@/pages/Verify/VerifyContract";
import { VerifyContractConfirm } from "@/pages/Verify/VerifyContractConfirm";

export const verifyContractRoutes: RouteObject[] = [
    {
        path: sitemap.VERIFY,
        element: <SearchContract />,
        children: [{}]
    },
    {
        path: `${sitemap.VERIFY}/`,
        element: <SearchContract />,
        children: [{
            path: `:contractId`,
            element: <VerifyContract />,
        }]
    },
    {
        path: `${sitemap.VERIFY}/:contractId/confirm`,
        element: <VerifyContractConfirm />,
        children: [{}]
    }
];
