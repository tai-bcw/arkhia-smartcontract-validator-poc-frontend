import BottomNavigationAction, { BottomNavigationActionProps } from "@mui/material/BottomNavigationAction";
import { alpha, styled } from "@mui/material/styles";

const VerticalNavigationRailAction = styled(BottomNavigationAction, { shouldForwardProp: (prop) => prop !== `isLogo` })<Props>(({ theme, isLogo }) => ({
    padding: theme.spacing(1),
    borderColor: alpha(`#FFF`, 0.1),
    borderStyle: `solid`,
    borderWidth: 0,
    borderTopWidth: isLogo ? 0 : `thin`,
    maxWidth: `var(--App-navRail-width)`,
    minWidth: `var(--App-navRail-width)`,
    minHeight: `var(--App-header-height)`,
    maxHeight: `var(--App-header-height)`,
    color: `#FFF`,
    "&.Mui-selected": {
        backgroundColor: isLogo ? undefined : `rgba(255,255,255,0.1)`,
        color: `#FFF`
    },
    "& .MuiBottomNavigationAction-label": {
        paddingTop: theme.spacing(0.5),
        color: `inherit`,
        fontWeight: 500,
    },
    "& .MuiSvgIcon-root": { color: `inherit` },
    "&:hover": { backgroundColor: theme.palette.primary.dark },
}));

export const GrowingDisabledNavButton = styled(BottomNavigationAction)<Props>(() => ({ flex: `1 1 auto`, }));

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
