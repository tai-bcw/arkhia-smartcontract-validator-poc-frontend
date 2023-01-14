import BottomNavigationAction, { BottomNavigationActionProps } from "@mui/material/BottomNavigationAction";
import { alpha, styled } from "@mui/material/styles";

import { desktopBreakpoint } from "@/providers/themeProvider";

const VerticalNavigationRailAction = styled(BottomNavigationAction, { shouldForwardProp: (prop) => prop !== `isLogo` })<Props>(({ theme, isLogo }) => ({
    padding: theme.spacing(2),
    borderRadius: isLogo ? `unset` : 64,
    borderTopWidth: isLogo ? 0 : `thin`,
    minHeight: isLogo ? `var(--App-header-height)` : theme.spacing(6),
    maxHeight: isLogo ? `var(--App-header-height)` : theme.spacing(6),
    "&.Mui-selected": { backgroundColor: isLogo ? undefined : alpha(theme.palette.primary.light, 0.1), },
    "& .MuiBottomNavigationAction-label": {
        paddingLeft: theme.spacing(0),
        fontWeight: 600,
    },
    "& .MuiSvgIcon-root": { color: `inherit`, },
    [theme.breakpoints.up(desktopBreakpoint)]: {
        maxWidth: `calc(var(--App-navRail-width) - ${theme.spacing(isLogo ? 3 : 4)})`,
        minWidth: `calc(var(--App-navRail-width) - ${theme.spacing(isLogo ? 3 : 4)})`,
        minHeight: isLogo ? `var(--App-header-height)` : theme.spacing(7),
        maxHeight: isLogo ? `var(--App-header-height)` : theme.spacing(7),
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `flex-start`,
        "& .MuiBottomNavigationAction-label": { paddingLeft: theme.spacing(2) },
        // "& .MuiSvgIcon-root": { margin: theme.spacing(1) },
    },
}));

interface Props extends BottomNavigationActionProps {
    isLogo?: boolean;
}

export default function NavigationRailAction (props: Props) {
    const { isLogo = false, ...other } = props;

    return (
        <VerticalNavigationRailAction
            isLogo={isLogo}
            {...other}
        />
    );
}
