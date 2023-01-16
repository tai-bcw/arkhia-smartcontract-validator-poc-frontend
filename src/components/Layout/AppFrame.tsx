import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { SnackbarProvider } from 'notistack';
import React, {
    useEffect,
    useState
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApprovalIcon from '@mui/icons-material/Approval';
import VerifiedIcon from '@mui/icons-material/Verified';

import { desktopBreakpoint } from '@/providers/themeProvider';
import NavigationRailAction, { GrowingDisabledNavButton } from '@/components/NavigationRail/NavigationRailItem';
import NavigationRail from '@/components/NavigationRail/NavigationRail';
import NavBar, { GrowingDiv } from '@/components/NavBar/NavBar';
import { ImgLogo } from '@/assets/Logo/Logo';
import ArkhiaTypefaceLight from '@/assets/branding/arkhia-typeface-light.png';
import ArkhiaGlyphDark from '@/assets/branding/arkhia-glyph-dark.png';
import { sitemap } from '@/routes/sitemap';

const StyledSnackbarProvider = styled(`div`)(({ theme }) => ({
    [theme.breakpoints.up(desktopBreakpoint)]: { '& .SnackbarContainer-top': { top: `76px !important` } },
    '& .SnackbarContainer-bottom': { bottom: `76px !important` },
}));

const RootDiv = styled(`div`)({
    display: `flex`,
    overflowX: `hidden`,
    width: `100%`,
});

export default function AppFrame ({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up(desktopBreakpoint));

    const [activePage, setActivePage] = useState(`/`);

    useEffect(() => {
        let parsedPath;

        if (pathname === sitemap.INDEX) {
            parsedPath = sitemap.INDEX;
        } else {
            parsedPath = `/${pathname.split(`/`)[1]}`;
        }

        setActivePage(parsedPath);
    }, [pathname]);

    const handleClick = (event: React.SyntheticEvent, newValue: string) => {
        setActivePage(newValue);
        navigate(newValue);
    };

    type GrowingDisabledNavButton = `growingDisabledNavButton`;
    const growingDisabledNavButton: GrowingDisabledNavButton = `growingDisabledNavButton`;

    const navigationButtons = [
        {
            route: sitemap.HOME,
            isLogo: true,
            icon: <ImgLogo alt="[A]" height={24} src={ArkhiaGlyphDark} />,
        },
        ...(!isDesktop ? [growingDisabledNavButton] : []),
        {
            route: sitemap.CLAIM,
            isLogo: false,
            icon: <ApprovalIcon />,
            label: `Claim`,
        },
        {
            route: sitemap.VERIFY,
            isLogo: false,
            icon: <VerifiedIcon />,
            label: `Verify`,
            sx: { borderBottomWidth: `thin` },
        },
    ];

    return (
        <StyledSnackbarProvider>
            <SnackbarProvider
                preventDuplicate
                anchorOrigin={{
                    vertical: isDesktop ? `top` : `bottom`,
                    horizontal: isDesktop ? `right` : `center`,
                }}
                maxSnack={5}
            >
                <RootDiv>
                    <NavBar position="fixed">
                        <ImgLogo alt="Arkhia" height={18} src={ArkhiaTypefaceLight} />
                        <GrowingDiv />
                    </NavBar>
                    <NavigationRail showLabels onChange={handleClick} value={activePage}>
                        {navigationButtons.map((button) => {
                            if (button !== growingDisabledNavButton) {
                                return (
                                    <NavigationRailAction
                                        key={button.route}
                                        icon={button.icon}
                                        isLogo={button.isLogo}
                                        label={button.label}
                                        sx={button.sx}
                                        value={button.route}
                                    />
                                );
                            }

                            return <GrowingDisabledNavButton key="growing-disabled-btn" disabled />;
                        })}
                    </NavigationRail>
                    {children}
                </RootDiv>
            </SnackbarProvider>
        </StyledSnackbarProvider>
    );
}
