import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store.ts";
import { RecoilRoot } from "recoil";
import "./index.css";
import App from "./App.tsx";
import { Flip, ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
    <RecoilRoot>
        <Provider store={store}>
            <App />
            <ToastContainer
                position='top-center'
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light'
                transition={Flip}
            />
        </Provider>
    </RecoilRoot>
);
