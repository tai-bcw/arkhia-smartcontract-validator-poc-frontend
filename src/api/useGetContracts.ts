import { useState } from "react";

import { apiRoutes } from "@/constants/apiRoutes";
import { useFetch } from "@/hooks/useReactQuery";
import { pathToMirrorNode } from "@/utils/apiHandler";

export interface HederaContractsResponse {
    contracts: ContractsEntity[] | null;
    links: Links;
}
export interface ContractsEntity {
    admin_key: AdminKey;
    auto_renew_account?: string | null;
    auto_renew_period: number;
    contract_id: string;
    created_timestamp: string;
    deleted: boolean;
    evm_address: string;
    expiration_timestamp: string;
    file_id?: string | null;
    max_automatic_token_associations: number;
    memo: string;
    obtainer_id?: string | null;
    permanent_removal?: boolean | null;
    proxy_account_id?: null;
    timestamp: Timestamp;
}
export interface AdminKey {
    _type: string;
    key: string;
}
export interface Timestamp {
    from: string;
    to?: null;
}
export interface Links {
    next: string;
}

export const useGetContracts = () => {
    const [order, setOrder] = useState(`desc`);

    const handleChange = (val: string | number) => {
        setOrder(val.toString());
    };

    const context = useFetch<HederaContractsResponse>(
        pathToMirrorNode(apiRoutes.getContracts),
        { order },
        {
            enabled: true,
            retry: false,
        }
    );

    return {
        ...context, data: context.data, handleChange
    };
};
