import React from "react";
import Quiz from "./components/Quiz";
import { Provider } from "react-redux";
import "./App.css";
import configureStore from "./store/configureStore";
import { Store, CombinedState, Dispatch } from "redux";
import { QAction } from "./reducers/questions";

const store: Store<
  CombinedState<{
    questions: never;
  }>,
  QAction
> & {
  dispatch: Dispatch<QAction>;
} = configureStore();

const App: React.FC<{}> = (): JSX.Element => {
  return (
    <Provider store={store}>
      <div id="root">
        <Quiz />
      </div>
    </Provider>
  );
};

export default App;
