import GlobalStyles from '@mui/material/GlobalStyles';
import {
    Breakpoint,
    createTheme,
    responsiveFontSizes,
    StyledEngineProvider,
    ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';
import React, { useMemo } from 'react';

import Overrides from '@/theme/overrides';
import Palette from '@/theme/palette';
import TypographyOverride from '@/theme/typography';

export const drawerWidth = 420;
export const largeDesktopBreakpoint: Breakpoint = `lg`;
export const desktopBreakpoint: Breakpoint = `md`;
export const tabletBreakpoint: Breakpoint = `sm`;

export default function ThemeProvider ({ children }: { children: JSX.Element }) {
    const theme = useMemo(() => {
        // eslint-disable-next-line putout/object-property-newline
        const shape = { borderRadius: 0 };

        const basicTheme = createTheme({
            components: Overrides(),
            palette: Palette(`light`),
            shape,
            typography: TypographyOverride(),
        });

        return responsiveFontSizes(basicTheme);
    }, []);

    return (
        <StyledEngineProvider injectFirst>
            <MuiThemeProvider theme={theme}>
                <GlobalStyles
                    styles={{
                        ':root': {
                            '--App-navRail-width': String(theme.spacing(10)),
                            '--App-helpDrawer-width': `${drawerWidth}px`,
                            '--App-header-height': String(theme.spacing(9)),
                        },
                    }}
                />
                {children}
            </MuiThemeProvider>
        </StyledEngineProvider>
    );
}
