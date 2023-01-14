import { styled } from '@mui/material/styles';
import React from 'react';

import Frame from './AppFrame';
import AppInnerContainer, { AppInnerContainerProps } from './AppInnerContainer';

import { Offset } from '@/components/NavBar/Offset';
import { desktopBreakpoint, drawerWidth } from '@/providers/themeProvider';


const Main = styled(`main`)(({ theme }) => ({
    display: `flex`,
    flexDirection: `column`,
    flexGrow: 1,
    maxWidth: `100vw`,
    transition: theme.transitions.create(`margin`, {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up(desktopBreakpoint)]: {
        maxWidth: `calc(100vw - var(--App-navRail-width))`,
        marginRight: -drawerWidth,
    },
}));

export default function AppLayout (props: AppInnerContainerProps) {
    const {
        containerProps,
        helpDrawerProps,
        children
    } = props;

    return (
        <Frame>
            <Main aria-label="app content">
                <Offset />
                {/*
                    Render the TOCs first to avoid layout shift when the HTML is streamed.
                    See https://jakearchibald.com/2014/dont-use-flexbox-for-page-layout/ for more details.
                */}
                <AppInnerContainer
                    containerProps={containerProps}
                    helpDrawerProps={helpDrawerProps}
                >
                    { children }
                </AppInnerContainer>
            </Main>
        </Frame>
    );
}
