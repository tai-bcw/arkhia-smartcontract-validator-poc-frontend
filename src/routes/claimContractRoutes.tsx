import { RouteObject } from "react-router";

import { sitemap } from "./sitemap";

import { SearchContract } from "@/pages/SearchContract";
import { ClaimContract } from "@/pages/Claim/ClaimContract";
import { ClaimContractConfirm } from "@/pages/Claim/ClaimContractConfirm";

export const claimContractRoutes: RouteObject[] = [
    {
        path: sitemap.CLAIM,
        element: <SearchContract />,
        children: [{}]
    },
    {
        path: `${sitemap.CLAIM}/`,
        element: <SearchContract />,
        children: [{
            path: `:contractId`,
            element: <ClaimContract />,
        }]
    },
    {
        path: `${sitemap.CLAIM}/:contractId/confirm`,
        element: <ClaimContractConfirm />,
        children: [{}]
    }
];
