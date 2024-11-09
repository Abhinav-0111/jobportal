import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "./redux/store";
import ContextState from "./context/ContextState";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <>
        <Provider store={store}>
            <ContextState>
                <PersistGate
                    loading={null}
                    persistor={persistor}
                >
                    <App />
                </PersistGate>
            </ContextState>
        </Provider>
        <ToastContainer />
    </>
);
