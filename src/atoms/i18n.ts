import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

interface IsoSettings {
    code: string;
    isOverride: boolean;
}

export const iso = atom<IsoSettings>({
    key: `language`,
    default: {
        code: `en`,
        isOverride: false,
    },
    effects_UNSTABLE: [ persistAtom ],
});
