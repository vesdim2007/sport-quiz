import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import questionsReducer from "../reducers/questions";

const rootReducer = combineReducers({
  questions: questionsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default () => {
  const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
  return store;
};
