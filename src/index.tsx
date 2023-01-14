import "./index.css";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";

import ThemeProvider from "./providers/themeProvider";
import App from "./pages/App";
import { ContractContextProvider } from "./providers/contractContext";

import RouteProvider from "@/providers/routeProvider";

const queryClient = new QueryClient();

ReactDOM.render(
    <React.StrictMode>
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <RouteProvider>
                        <ContractContextProvider>
                            <>
                                <CssBaseline />
                                <App />
                            </>
                        </ContractContextProvider>
                    </RouteProvider>
                </ThemeProvider>
            </QueryClientProvider>
        </RecoilRoot>
    </React.StrictMode>,
    document.getElementById(`root`)
);
