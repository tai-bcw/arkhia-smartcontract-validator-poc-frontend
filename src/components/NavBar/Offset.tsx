import { styled } from "@mui/material/styles";

export const Offset = styled(`div`)(({ theme }) => ({
    ...theme.mixins.toolbar,
    minHeight: `var(--App-header-height)`,
    height: `var(--App-header-height)`
}));
