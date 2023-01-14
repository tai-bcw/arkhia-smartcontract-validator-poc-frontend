import { useEffect, useState } from 'react';
import {
    Route,
    RouteObject,
    Routes,
    useLocation,
    useNavigate,
    useRoutes
} from 'react-router-dom';

import { NotFound } from './NotFound';

import AppLayout from '@/components/Layout/AppLayout';
import { mainContentRoutes } from '@/routes/routes';

export const navBarRoute: RouteObject[] = [{}];

export default function App () {
    const location = useLocation();
    const navigate = useNavigate();

    const [backgroundElement, setBackgroundElement] = useState<JSX.Element | null>(null);
    const [dialogElement, setDialogElement] = useState<JSX.Element | null>(null);
    const state = location.state as { backgroundLocation?: Location };
    
    useEffect(() => {
        if (location.pathname === `/`) navigate(`/home`);
    }, [location.pathname, navigate]);

    useEffect(() => {
        if (state?.backgroundLocation && state.backgroundLocation.pathname) {
            const backgroundRoute = mainContentRoutes.find((route) =>
                state?.backgroundLocation?.pathname === route.path
            );

            const dialogRoute = mainContentRoutes.find((route) =>
                location.pathname === route.path
            );
            
            if (backgroundRoute && dialogRoute) {
                setBackgroundElement(backgroundRoute.element as JSX.Element);
                setDialogElement(dialogRoute.element as JSX.Element);
            }
        } else {
            setBackgroundElement(null);
            setDialogElement(null);
        }
    }, [state, location.pathname]);

    const mainContentElement = useRoutes(mainContentRoutes);

    return (
        <AppLayout>
            <>
                { backgroundElement ?? mainContentElement ?? <NotFound /> }
                { backgroundElement && (
                    <Routes>
                        <Route element={dialogElement} path={location.pathname} />
                    </Routes>
                )}
            </>
        </AppLayout>
    );
}
