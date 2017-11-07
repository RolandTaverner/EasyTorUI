import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { TorControllerReducers, initialState } from "./reducers";

const loggerMiddleware = createLogger();

const store = createStore(
  TorControllerReducers,
  initialState,
  applyMiddleware(thunkMiddleware, loggerMiddleware));

export default store;