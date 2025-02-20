import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Router.jsx";
import AuthProvider from "./AuthProvider/AuthProvider.jsx";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { WebSocketProvider } from "./AuthProvider/WebSocketProvider.jsx";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <WebSocketProvider>
          <RouterProvider router={router} />
        </WebSocketProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
