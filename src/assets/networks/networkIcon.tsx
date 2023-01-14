import Avatar, { AvatarProps } from "@mui/material/Avatar";
import { useTheme } from "@mui/material";

import HederaNetwork from "./HederaNetwork.svg";
import KlaytnNetwork from "./KlaytnNetwork.png";

import { CHAIN_ID } from "@/constants/chainId";

export function getNetworkIcon (chainId: number) {
    switch(chainId) {
        case CHAIN_ID.hedera.mainnet:
        case CHAIN_ID.hedera.testnet:
        case CHAIN_ID.hedera.previewnet:
            return HederaNetwork;
        case CHAIN_ID.klaytn.mainnet:
        case CHAIN_ID.klaytn.testnet:
            return KlaytnNetwork;
        default:
            return HederaNetwork;
    }
}

interface Props extends AvatarProps{
    chainId: number;
    height?: number;
    isAvatar?: boolean;
}

export const NetworkIcon = ({ chainId, height, isAvatar, ...rest }: Props) => {
    const theme = useTheme();

    return (
        <Avatar
            imgProps={{ style: { objectFit: `contain`, }, }}
            src={getNetworkIcon(chainId)}
            sx={{
                ...(isAvatar && {
                    outline: `1px solid ${theme.palette.grey[200]}`,
                    outlineOffset: theme => theme.spacing(0.5),
                }),
                width: height ?? {
                    xs: 26,
                    sm: 32,
                },
                height: height ?? {
                    xs: 26,
                    sm: 32,
                },
            }}
            {...rest}
        />
    );
};
