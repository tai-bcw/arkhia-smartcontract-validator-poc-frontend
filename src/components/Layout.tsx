import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import {
    Breakpoint,
    SxProps,
    Theme,
    useTheme
} from "@mui/material/styles";
import React, { createContext } from "react";
import { Outlet } from "react-router-dom";

export const CenteredContext = createContext<boolean>(false);

interface IUseSSOContext {
    useMicrosoft: boolean;
    useGoogle: boolean;
}
export const UseSSOContext = createContext<IUseSSOContext>({
    useMicrosoft: false,
    useGoogle: false,
});

interface Props {
    centered?: boolean;
    children?: React.ReactNode;
    maxWidth?: false | Breakpoint;
    logo?: string | JSX.Element;
    sx?: {
        pageWrap?: SxProps<Theme>;
        card?: SxProps<Theme>;
    }
    useSSO?: {
        ms?: boolean;
        google?: boolean;
    }
}

export default function Layout (props: Props) {
    const {
        centered,
        maxWidth,
        logo,
        sx,
        useSSO,
    } = props;

    const theme = useTheme();
    const isCentered = centered ?? false;
    const useMicrosoft = useSSO?.ms ? useSSO.ms : false;
    const useGoogle = useSSO?.google ? useSSO.google : false;

    return (
        <Stack
            justifyContent={`space-around`}
            sx={{
                height: `100vh`,
                ...sx?.pageWrap
            }}
        >
            <CenteredContext.Provider value={isCentered}>
                <UseSSOContext.Provider
                    value={{
                        useMicrosoft,
                        useGoogle
                    }}
                >
                    <Container maxWidth={maxWidth ?? false} sx={sx?.card}>
                        <Card variant="outlined">
                            <CardContent sx={{ p: `${theme.spacing(6, 5)} !important` }}>
                                <Stack spacing={1}>
                                    { logo }
                                    <Outlet />
                                </Stack>
                            </CardContent>
                        </Card>
                        {/* <Stack
                            direction="row"
                            justifyContent={`flex-end`}
                            sx={{ p: theme.spacing(1, 0) }}
                        >
                            <ThemeToggle />
                        </Stack> */}
                    </Container>
                    {/* <Background /> */}
                </UseSSOContext.Provider>
            </CenteredContext.Provider>
        </Stack>
    );
}
