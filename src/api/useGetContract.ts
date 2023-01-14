import { useState } from "react";

import { apiRoutes } from "@/constants/apiRoutes";
import { useFetch } from "@/hooks/useReactQuery";
import { pathToMirrorNode } from "@/utils/apiHandler";

export interface HederaContractResponse {
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

export const useGetContract = () => {
    const [contractId, setContractId] = useState(``);

    const handleChange = (val: string) => {
        setContractId(val);
    };

    const context = useFetch<HederaContractResponse>(
        pathToMirrorNode(apiRoutes.getContractInfo) + contractId,
        undefined,
        {
            enabled: contractId !== ``,
            retry: false,
        }
    );

    return {
        ...context, data: context.data, handleChange
    };
};
