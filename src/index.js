import React from "react";
import ReactDOM from "react-dom";
//import "./index.css";
import App from "./components/App";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./store/reducers/rootReducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import { reduxFirestore, getFirestore } from "redux-firestore";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
// trial
import { functions } from "@firebase/functions";

import fbConfig from "./config/fbConfig";

// logger not properly updating firebase auth
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(
      thunk.withExtraArgument({ getFirebase, getFirestore }),
      logger //(temp removed)
    ),
    reduxFirestore(fbConfig),

    reactReduxFirebase(fbConfig, { attachAuthIsReady: true })
    // 2nd parameter above is config option waits for auth before rendering DOM
    // allowes access to method on store firebaseAuthIsReady
  )
);

store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
});
