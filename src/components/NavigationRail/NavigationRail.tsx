import BottomNavigation, { BottomNavigationProps } from "@mui/material/BottomNavigation";
import { styled } from "@mui/material/styles";
import { desktopBreakpoint } from '@/providers/themeProvider';

const VerticalNavigationRail = styled(BottomNavigation)<BottomNavigationProps>(({ theme }) => ({
    flexDirection: `row`,
    justifyContent: `space-between`,
    alignItems: `center`,
    height: `var(--App-appBar-height)`,
    minWidth: `100%`,
    position: `fixed`,
    bottom: 0,
    zIndex: theme.zIndex.drawer + 1,
    borderTop: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.up(desktopBreakpoint)]: {
        flexDirection: `column`,
        justifyContent: `flex-start`,
        height: `unset`,
        minWidth: `var(--App-navRail-width)`,
        position: `fixed`,
        top: 0,
        bottom: 0,
        left: 0,
        borderRight: `1px solid ${theme.palette.divider}`,
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
        <Nav aria-label={`navigation`}>
            <VerticalNavigationRail
                {...props}
            />
        </Nav>
    );
}
