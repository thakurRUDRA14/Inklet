import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store.ts";
import { RecoilRoot } from "recoil";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
    <RecoilRoot>
        <Provider store={store}>
            <App />
        </Provider>
    </RecoilRoot>
);
