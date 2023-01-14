import HomeIcon from '@mui/icons-material/Home';
import Stack from "@mui/material/Stack";
import {
    styled,
    useTheme
} from '@mui/material/styles';
import Typography from "@mui/material/Typography";
import useMediaQuery from '@mui/material/useMediaQuery';
import { SnackbarProvider } from "notistack";
import React, {
    useEffect,
    useState
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import VerifiedIcon from '@mui/icons-material/Verified';
import ApprovalIcon from '@mui/icons-material/Approval';

import { desktopBreakpoint } from '@/providers/themeProvider';
import NavigationRailAction from "@/components/NavigationRail/NavigationRailItem";
import NavigationRail from "@/components/NavigationRail/NavigationRail";
import NavBar, { GrowingDiv } from "@/components/NavBar/NavBar";
import Logo from "@/assets/Logo/Logo";
import { sitemap } from '@/routes/sitemap';

const StyledSnackbarProvider = styled(`div`)(({ theme }) => ({
    [theme.breakpoints.up(desktopBreakpoint)]: { "& .SnackbarContainer-top": { top: `76px !important` }, },
    "& .SnackbarContainer-bottom": { bottom: `76px !important` }
}));

const RootDiv = styled(`div`)(({
    display: `flex`,
    overflowX: `hidden`,
    width: `100%`,
}));

const NetworkIconProps = {
    height: 18,
    width: 18,
    ml: {
        xs: 0,
        sm: 0.5
    },
    mt: { xs: 0.5 },
    mb: { xs: 0.5 }
};

export default function AppFrame ({ children }: { children: React.ReactNode }) {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up(desktopBreakpoint));

    const [activePage, setActivePage] = useState(`/home`);

    useEffect(() => {
        if (pathname === `/`) return;

        const parsedPath = `/${pathname.split(`/`)[1]}`;
        setActivePage(parsedPath);
    }, [pathname]);

    const handleClick = (event: React.SyntheticEvent, newValue: string) => {
        navigate(newValue);
    };

    return (
        <StyledSnackbarProvider>
            <SnackbarProvider
                preventDuplicate
                anchorOrigin={{
                    vertical: isDesktop ? `top` : `bottom`,
                    horizontal: isDesktop ? `right` : `center`
                }}
                maxSnack={5}
            >
                <RootDiv>
                    <NavBar
                        position="fixed"
                        sx={{
                            px: 3,
                            borderLeft: 0
                        }}
                    >
                        <>
                            <Typography
                                color={theme.palette.text.primary}
                                component="h1"
                                sx={{
                                    textTransform: `capitalize`,
                                    fontWeight: 600
                                }}
                                variant="h6"
                            >
                                { location.pathname.substring(1).split(`/`)[0] }
                            </Typography>
                            <GrowingDiv />
                            <Stack direction="row" spacing={1} />
                        </>
                    </NavBar>
                    <NavigationRail
                        showLabels
                        onChange={handleClick}
                        value={activePage}
                    >
                        <Logo />
                        { !isDesktop && <GrowingDiv />}
                        <NavigationRailAction
                            icon={<HomeIcon />}
                            label="Home"
                            value={sitemap.HOME}
                        />
                        <NavigationRailAction
                            icon={<ApprovalIcon />}
                            label="Claim Contract"
                            sx={{ borderBottomWidth: `thin` }}
                            value={sitemap.CLAIM}
                        />
                        <NavigationRailAction
                            icon={<VerifiedIcon />}
                            label="Verify Contract"
                            sx={{ borderBottomWidth: `thin` }}
                            value={sitemap.VERIFY}
                        />
                    </NavigationRail>
                    { children }
                </RootDiv>
            </SnackbarProvider>
        </StyledSnackbarProvider>
    );
}
