import { NodesEntity } from "@/types/nodes";
import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

type HederaNetwork = `mainnet` | `testnet` | `previewnet`;

export const hederaNetwork = atom<HederaNetwork>({
    key: `hederaNetwork`,
    default: `mainnet`,
    // effects_UNSTABLE: [ persistAtom ],
});

export const nodeList = atom<NodesEntity[]>({
    key: `nodeList`,
    default: [],
});

export const favoriteList = atom<number[]>({
    key: `favoriteList`,
    default: [],
    effects_UNSTABLE: [ persistAtom ],
});
