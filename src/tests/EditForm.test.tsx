import React from "react";
import { createShallow } from "@material-ui/core/test-utils";
import Answers from "../components/Answers";
import { IconButton, Input } from "@material-ui/core";

const answers = [
  { answer: "First answer", checked: true },
  { answer: "second answer", checked: false },
];
const error = { type: "answer", message: null };

let onDelete, shallow, wrapper, checkAnswer, onChangeAnswers;

beforeEach(() => {
  onDelete = jest.fn();
  checkAnswer = jest.fn();
  onChangeAnswers = jest.fn();

  shallow = createShallow();
  wrapper = shallow(
    <Answers
      onDelete={onDelete}
      disabled={false}
      checkAnswer={checkAnswer}
      onChangeAnswers={onChangeAnswers}
      error={error}
      answers={answers}
    />
  );
});

test("should render two answers correctly", () => {
  const answers = wrapper.find(".answers");
  expect(answers.length).toBe(2);
});

test("should handle onDelete", () => {
  const button = wrapper.find(IconButton);
  button.at(0).simulate("click");
  expect(onDelete).toHaveBeenCalledWith(0);
});

test("should handle onDelete", () => {
  const button = wrapper.find(IconButton);
  button.at(0).simulate("click");
  expect(onDelete).toHaveBeenCalledWith(0);
});

test("should handle onChangeAnswers", () => {
  const input = wrapper.find(Input);
  input.at(0).simulate("change");
  expect(onChangeAnswers).toHaveBeenCalled();
});

test("should handle checkAnswer", () => {
  const input = wrapper.find("input");
  input.at(0).simulate("change");
  expect(checkAnswer).toHaveBeenCalled();
});
