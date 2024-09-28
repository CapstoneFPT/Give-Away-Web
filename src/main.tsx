import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { DevSupport } from "@react-buddy/ide-toolbox";
import { ComponentPreviews, useInitial } from "./dev";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { setupAxios } from "./components/Auth/AuthHelper.ts";
import axios from "axios";

const queryClient = new QueryClient();
setupAxios(axios);
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <DevSupport
            ComponentPreviews={ComponentPreviews}
            useInitialHook={useInitial}
        >
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </DevSupport>
    </React.StrictMode>
);
