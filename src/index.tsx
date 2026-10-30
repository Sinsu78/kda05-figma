import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "../tailwind.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastProvider } from "./components/ui/toast";
import { Screen } from "./screens/Screen/Screen";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <ToastProvider>
      <Screen />
    </ToastProvider>
  </StrictMode>,
);
