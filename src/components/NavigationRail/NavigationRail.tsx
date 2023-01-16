import BottomNavigation, { BottomNavigationProps } from "@mui/material/BottomNavigation";
import { styled } from "@mui/material/styles";

import { desktopBreakpoint } from '@/providers/themeProvider';

const VerticalNavigationRail = styled(BottomNavigation)<BottomNavigationProps>(({ theme }) => ({
    border: `none`,
    flexDirection: `row`,
    justifyContent: `space-between`,
    height: `var(--App-appBar-height)`,
    minWidth: `100%`,
    position: `fixed`,
    bottom: 0,
    background: theme.palette.primary.main,
    zIndex: theme.zIndex.drawer + 1,
    [theme.breakpoints.up(desktopBreakpoint)]: {
        flexDirection: `column`,
        justifyContent: `flex-start`,
        height: `unset`,
        minWidth: `var(--App-navRail-width)`,
        position: `fixed`,
        top: 0,
        bottom: 0,
        left: 0,
        background: theme.palette.primary.main,
    }
}));

const Nav = styled(`nav`)(({ theme }) => ({
    [theme.breakpoints.up(desktopBreakpoint)]: {
        flexShrink: 0,
        width: `var(--App-navRail-width)`,
    }
}));

export default function NavigationRail (props: BottomNavigationProps) {

    return (
        <Nav aria-label="navigation">
            <VerticalNavigationRail
                {...props}
            />
        </Nav>
    );
}
