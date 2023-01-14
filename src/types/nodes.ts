export interface Nodes {
    nodes?: (NodesEntity)[] | null;
    links?: Links;
}

export interface NodesEntity {
    description: string;
    file_id: string;
    max_stake: number;
    memo: string;
    min_stake: number;
    node_id: number;
    node_account_id: string;
    node_cert_hash: string;
    public_key: string;
    reward_rate_start: number;
    service_endpoints?: (ServiceEndpointsEntity)[] | null;
    stake: number;
    stake_not_rewarded: number;
    stake_rewarded: number;
    stake_total: number;
    staking_period: StakingPeriod;
    timestamp: Timestamp;
}

export interface ServiceEndpointsEntity {
    ip_address_v4: string;
    port: number;
}

export interface StakingPeriod {
    from: string;
    to: string;
}

export interface Timestamp {
    from: string;
    to?: null;
}

export interface Links {
    next: string | null;
}

export interface NodeMetadata {
    account_id: string;
    label: string;
    loc?: string;
    loc_link?: string;
    id: number;
    logo?: string;
}
