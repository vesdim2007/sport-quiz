import React from "react";
import { shallow } from "enzyme";

import App from "../App";
import Quiz from "../components/Quiz";

it("renders the quiz component correctly", () => {
  const wrapper = shallow(<App />);
  const quiz = <Quiz />;
  expect(wrapper.contains(quiz)).toEqual(true);
});
