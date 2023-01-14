/* eslint-disable @typescript-eslint/no-unused-vars */
import MuiContainer, { ContainerProps } from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import {
    alpha,
    styled,
    useTheme
} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';
import {
    RouteObject,
    useRoutes
} from 'react-router-dom';

import { navBarRoute } from '@/pages/App';
import { desktopBreakpoint } from '@/providers/themeProvider';
import { Offset } from '@/components/NavBar/Offset';

const Container = styled(MuiContainer)(({ theme, disableGutters }) => ({
    position: `relative`,
    marginLeft: 0,
    minHeight: `calc(100vh - var(--App-header-height) * 2)`,
    maxWidth: `100vw`,
    [theme.breakpoints.up(desktopBreakpoint)]: ({
        minHeight: `calc(100vh - var(--App-header-height))`,
        // paddingLeft: theme.spacing(2),
        // paddingRight: theme.spacing(2),
    }),
    background: alpha( theme.palette.primary.light, theme.palette.mode === `dark` ? 0 : 0.1)
}));

export interface AppInnerContainerProps extends ContainerProps {
    containerProps?: ContainerProps;
    helpDrawerProps?: RouteObject[];
    children: React.ReactElement
}

export default function AppInnerContainer (props: AppInnerContainerProps) {
    const {
        containerProps,
        helpDrawerProps,
        children,
        ...other
    } = props;
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up(desktopBreakpoint));
    
    const navBarElement = useRoutes(navBarRoute ?? []);
    
    return (
        <>
            <Container
                disableGutters
                id="main-content"
                maxWidth={false}
                tabIndex={-1}
                {...other}
            >
                { navBarElement}
                <Stack
                    direction="column"
                    sx={{
                        backgroundColor: `var(--md-sys-color-inverse-on-surface)`,
                        height: `calc(100% - ${navBarElement ? `var(--App-header-height)` : `0px`})`
                    }}
                >
                    { children }
                </Stack>
            </Container>
            { !isDesktop && <Offset /> }
        </>
    );
}
