import { applyMiddleware,createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "../Services/Reducers/rootreducer";
export const store=createStore(reducers,{},applyMiddleware(thunk))