import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled } from '@mui/material/styles';
import Toolbar from "@mui/material/Toolbar";

import { desktopBreakpoint, drawerWidth } from "@/providers/themeProvider";

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
    isInner?: boolean;
}

const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== `open` && prop !== `isInner` })<AppBarProps>(({ theme, open, isInner }) => ({
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: isInner ? `none` : undefined,
    backdropFilter: `blur(8px)`,
    borderColor: isInner ? theme.palette.grey[400] : undefined,
    background: `transparent`,
    height: `var(--App-header-height)`,
    justifyContent: `center`,
    padding: theme.spacing(0,2),
    zIndex: isInner ? undefined : theme.zIndex.drawer + 1,
    ...(!open && {
        [theme.breakpoints.up(desktopBreakpoint)]: { width: isInner ? `100%` : `calc(100% - var(--App-navRail-width))` },
        transition: theme.transitions.create([`margin`, `width`], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    }),
    ...(open && {
        [theme.breakpoints.up(desktopBreakpoint)]: {
            width: `calc(100% - ${!isInner && `var(--App-navRail-width) - ` } var(--App-helpDrawer-width))`,
            marginRight: drawerWidth,
        },
        transition: theme.transitions.create([`margin`, `width`], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    })
}));

export const GrowingDiv = styled(`div`)({ flex: `1 1 auto` });

export default function NavBar (props: AppBarProps) {
    const { children, ...other } = props;

    return (
        <AppBar {...other} elevation={0}>
            <Toolbar disableGutters variant="dense">
                { children }
            </Toolbar>
        </AppBar>
    );
}
