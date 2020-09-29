import React from "react";
import { FormHelperText, IconButton, Input } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Answer, Error, useStyles } from "./EditForm";

type AnswersProps = {
  answers: Answer[];
  error: Error;
  disabled: boolean;
  onChangeAnswers(e: React.ChangeEvent<HTMLInputElement>): void;
  checkAnswer(a: Answer): void;
  onDelete(index: number): void;
};

const Answers: React.FC<AnswersProps> = ({
  answers,
  error,
  onChangeAnswers,
  checkAnswer,
  onDelete,
  disabled,
}): JSX.Element => {
  const classes: Record<"question" | "errors" | "answer", string> = useStyles();
  return (
    <>
      <div className="labels">
        <label style={{ width: "50%" }}>Answers</label>

        <label style={{ width: "40%", textAlign: "center" }}>isCorrect</label>
        <label style={{ width: "10%", textAlign: "center" }}>Remove</label>
      </div>
      {answers.length > 0 &&
        answers.map((answer: Answer, index: number) => (
          <React.Fragment key={index}>
            <div className="answers">
              <Input
                name={index.toString()}
                required
                multiline={true}
                rows={2}
                className={classes.answer}
                error={answer.answer === "" && error.message !== null}
                margin="dense"
                type="text"
                value={!disabled ? answer.answer : ""}
                onChange={onChangeAnswers}
              />
              <input
                type="checkbox"
                name="incorrect"
                checked={answer.checked}
                disabled={disabled}
                onChange={(): void => checkAnswer(answer)}
                style={{ width: "1.5rem", height: "1.5rem" }}
              />
              <IconButton
                aria-label="delete"
                color="secondary"
                style={{ width: "10%" }}
                onClick={(): void => onDelete(index)}
              >
                <DeleteIcon />
              </IconButton>
            </div>
            {error.message && answer.answer === "" && (
              <FormHelperText id="answer" className={classes.errors}>
                {error.message}
              </FormHelperText>
            )}
          </React.Fragment>
        ))}
    </>
  );
};

export default Answers;
