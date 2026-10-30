import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "../tailwind.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { ToastProvider } from "./components/ui/toast";
import { AppStoreProvider } from "./store/AppStore";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <AppStoreProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </AppStoreProvider>
  </StrictMode>,
);
