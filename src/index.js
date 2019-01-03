import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./index.css";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers/rootReducer";
import thunk from "redux-thunk";

// applyMiddleware is a store enhancer, and there could be many.
// thunk allows the action creator to return function to get async data
const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
