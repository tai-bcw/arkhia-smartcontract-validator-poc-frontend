import GlobalStyles from '@mui/material/GlobalStyles';
import {
    Breakpoint,
    createTheme,
    responsiveFontSizes,
    StyledEngineProvider,
    ThemeProvider as MuiThemeProvider
} from '@mui/material/styles';
import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';

import Overrides from '@/theme/overrides';
import Typography from '@/theme/typography';
import atom from '@/atoms/atoms';

export const drawerWidth = 420;
export const desktopBreakpoint: Breakpoint = `md`;

export default function ThemeProvider ({ children }: { children: JSX.Element }) {
    const darkMode = useRecoilValue(atom.darkMode);

    const theme = useMemo(() => {
        const basicTheme = createTheme({
            components: Overrides(),
            palette: { mode: darkMode ? `dark` : `light`, }, //Palette(darkMode ? `dark` : `light`),
            shape: { borderRadius: 6 },
            typography: Typography(),
        });
        
        return responsiveFontSizes(basicTheme);
    }, [darkMode]);

    return (
        <StyledEngineProvider injectFirst>
            <MuiThemeProvider theme={theme}>
                <GlobalStyles
                    styles={{
                        ':root': {
                            '--App-navRail-width': String(theme.spacing(30)),
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
