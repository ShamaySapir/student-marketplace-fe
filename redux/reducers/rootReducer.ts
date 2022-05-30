import cryptoReducer from "./crypto";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  crypto: cryptoReducer,
});

export default rootReducer;
