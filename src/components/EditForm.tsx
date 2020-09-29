import React, { FormEvent, useEffect, useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { FormHelperText, Input } from "@material-ui/core";
import { QState } from "../reducers/questions";
import { RootState } from "../store/configureStore";
import Button from "./Button";
import { resetQuestion, updateQuestion } from "../actions/questions";
import Answers from "./Answers";

export const useStyles = makeStyles<Theme, "question" | "errors" | "answer">({
  question: {
    fontSize: "0.875rem",
    border: "1px solid grey",
    margin: "1rem",
    padding: "0.5rem",
  },
  answer: {
    fontSize: "0.875rem",
    border: "1px solid grey",
    padding: "0.5rem",
    width: "50%",
  },
  errors: {
    marginLeft: "2rem",
    color: "red",
    fontSize: "1rem",
  },
});

export type Answer = {
  answer: string;
  checked: boolean;
};

type EditQuestion = {
  id: string | null;
  category: string;
  difficulty: string;
  answers: Answer[];
  question: string;
  type: string;
};

export type Error = {
  type: string;
  message: string | null;
};

const EditForm: React.FC = (): JSX.Element => {
  const classes: Record<"question" | "errors" | "answer", string> = useStyles();
  const dispatch = useDispatch();

  const state: QState = useSelector((state: RootState) => state.questions);
  const { selectedQuestion } = state;

  const initialState: EditQuestion = {
    id: "",
    category: "",
    difficulty: "",
    answers: [
      { answer: "", checked: false },
      { answer: "", checked: false },
    ],
    question: "",
    type: "",
  };
  const typeErrors = [
    { type: "question", message: null },
    { type: "answers", message: null },
    { type: "correct", message: null },
    { type: "incorrect", message: null },
    { type: "answer", message: null },
  ];
  const [selected, setSelected] = useState<EditQuestion>(initialState);
  const [errors, setErrors] = useState<Error[]>(typeErrors);

  // changing the answers of the question
  const onChangeAnswers = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (selected.id !== "") {
      setSelected({
        ...selected,
        answers: selected.answers.map((answer: Answer, index: number) =>
          index === Number(e.target.name)
            ? { ...answer, answer: e.target.value }
            : answer
        ),
      });
      if (selected.answers[Number(e.target.name)].answer === "") {
        setErrors(
          errors.map((error) =>
            error.type === "answer"
              ? {
                  ...error,
                  message: null,
                }
              : error
          )
        );
      }
    }
  };

  // change the text of the question
  const onChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (selected.id !== "") {
      setSelected({ ...selected, question: e.target.value });
      setErrors(
        errors.map((error) =>
          error.type === "question" ? { ...error, message: null } : error
        )
      );
    }
  };

  // selecting which answers to be correct/incorrect
  const checkAnswer = (a: Answer): void => {
    setSelected({
      ...selected,
      answers: selected.answers.map((answer) =>
        a.answer === answer.answer
          ? { ...answer, checked: !answer.checked }
          : answer
      ),
    });
    setErrors(
      errors.map((error) =>
        error.type === "incorrect" || error.type === "correct"
          ? {
              ...error,
              message: null,
            }
          : error
      )
    );
  };

  // function to add more rows of answers
  const addMore = (): void => {
    setSelected({
      ...selected,
      answers: [...selected.answers, { answer: "", checked: false }],
    });
    setErrors(
      errors.map((error) =>
        error.type === "answers" ? { ...error, message: null } : error
      )
    );
  };

  // delete answer function
  const onDelete = (index: number): void => {
    setSelected({
      ...selected,
      answers: selected.answers.filter((a: Answer, i: number) => i !== index),
    });
  };

  // validating the form when submitting
  const isValid = (): boolean => {
    if (selected.question.length !== 0) {
      if (selected.answers.length > 1) {
        if (selected.answers.filter((answer) => answer.checked).length > 0) {
          if (selected.answers.filter((answer) => !answer.checked).length > 0) {
            if (
              selected.answers.filter((answer) => answer.answer.length === 0)
                .length === 0
            ) {
              return true;
            } else {
              setErrors(
                errors.map((error) =>
                  error.type === "answer"
                    ? { ...error, message: "Answer field is required." }
                    : error
                )
              );
              return false;
            }
          } else {
            setErrors(
              errors.map((error) =>
                error.type === "incorrect"
                  ? {
                      ...error,
                      message: "At least one answer should be incorrect.",
                    }
                  : error
              )
            );
            return false;
          }
        } else {
          setErrors(
            errors.map((error) =>
              error.type === "correct"
                ? {
                    ...error,
                    message: "At least one answer should be correct.",
                  }
                : error
            )
          );
          return false;
        }
      } else {
        setErrors(
          errors.map((error) =>
            error.type === "answers"
              ? { ...error, message: "Please add at least two answers." }
              : error
          )
        );
        return false;
      }
    } else {
      setErrors(
        errors.map((error) =>
          error.type === "question"
            ? { ...error, message: "Question is required field." }
            : error
        )
      );
      return false;
    }
  };

  // handles submit, check if valid and dispatch updated question to the redux store
  const handleSubmit = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (isValid()) {
      const newQ = {
        id: selected.id,
        question: selected.question,
        type: selected.type,
        category: selected.category,
        difficulty: selected.difficulty,
        correct_answer: selected.answers.filter((a) => a.checked)[0].answer,
        incorrect_answers: selected.answers
          .filter((a) => !a.checked)
          .map((a) => a.answer),
      };
      dispatch(updateQuestion(newQ));
      setSelected(initialState);
    } else {
      return;
    }
  };

  // reseting the form to intiial values
  const onReset = (): void => {
    dispatch(resetQuestion());
    setSelected(initialState);
    setErrors(errors.map((error) => ({ ...error, message: null })));
  };

  useEffect(() => {
    if (selectedQuestion !== null && selectedQuestion.id !== selected.id) {
      const {
        id,
        question,
        category,
        type,
        difficulty,
        correct_answer,
        incorrect_answers,
      } = selectedQuestion;
      const answers = [{ answer: correct_answer, checked: true }];
      incorrect_answers.forEach((a: string) => {
        answers.push({ answer: a, checked: false });
      });
      const selectedQ = {
        id,
        question,
        answers,
        type,
        category,
        difficulty,
      };
      setSelected(selectedQ);
    }
  }, [selectedQuestion, selected.id]);

  return (
    <div className="editor">
      <h3 className="edit-title">Editor</h3>
      <form className="form">
        <label style={{ marginLeft: "1rem" }}>Question</label>
        <Input
          id="question"
          name="question"
          required
          multiline={true}
          className={classes.question}
          placeholder="Select a question to edit"
          rows={3}
          error={
            errors.filter((e) => e.type === "question")[0].message !== null
          }
          margin="dense"
          type="text"
          value={
            selected.id !== ""
              ? selected.question
                  .replaceAll("&#039;", "`")
                  .replaceAll("&quot;", "")
              : ""
          }
          onChange={onChangeQuestion}
        />
        {errors.filter((e) => e.type === "question")[0].message && (
          <FormHelperText id="question" className={classes.errors}>
            {errors.filter((e) => e.type === "question")[0].message}
          </FormHelperText>
        )}
        <Answers
          answers={selected.answers}
          error={errors.filter((e) => e.type === "answer")[0]}
          disabled={selected.id === ""}
          onChangeAnswers={onChangeAnswers}
          checkAnswer={checkAnswer}
          onDelete={onDelete}
        />
        {errors
          .filter(
            (e) =>
              e.type === "answers" ||
              e.type === "incorrect" ||
              e.type === "correct"
          )
          .map((e: Error) => {
            return (
              <FormHelperText
                id={e.type}
                className={classes.errors}
                key={e.type}
              >
                {e.message}
              </FormHelperText>
            );
          })}
        {selectedQuestion && (
          <div className="labels">
            <Button onClick={addMore}>Add more answers</Button>
          </div>
        )}
        <div className="labels">
          <Button
            variant="contained"
            disableElevation
            size="small"
            color="primary"
            onClick={handleSubmit}
          >
            Save Changes
          </Button>
          <Button variant="contained" size="small" onClick={onReset}>
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
