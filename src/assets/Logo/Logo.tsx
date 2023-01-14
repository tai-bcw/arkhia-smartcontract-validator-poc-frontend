import Stack from "@mui/material/Stack";
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import {
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";

import NavigationRailAction from "@/components/NavigationRail/NavigationRailItem";
import { desktopBreakpoint } from "@/providers/themeProvider";
import ArkhiaGlyph from "@/assets/arkhia_glyph_white.png";

export const ImgLogo = styled(`img`)(() => ({
    fontFamily: `inherit`,
    objectFit: `contain`,
}));

export default function Logo () {
    const navigate = useNavigate();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up(desktopBreakpoint));

    return (
        <NavigationRailAction
            disableRipple
            isLogo
            icon={(
                <Stack alignItems="center" direction="row" spacing={1}>
                    <ImgLogo
                        alt="StakeFi"
                        height={32}
                        src={ArkhiaGlyph}
                        sx={{ imageRendering: `auto` }}
                    />
                    { isDesktop && (
                        <Typography
                            sx={{
                                fontWeight: 600, letterSpacing: 0.5
                            }}
                            variant="caption"
                        >
                            Contract Validator
                        </Typography>
                    )}
                </Stack>
            )}
            onClick={() => navigate(`/`)}
            value="/"
        />
    );
}
