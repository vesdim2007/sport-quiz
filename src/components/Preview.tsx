import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { QState } from "../reducers/questions";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { RootState } from "../store/configureStore";

const useStyles = makeStyles<Theme, "root" | "answer">({
  root: {
    width: "90%",
    borderRadius: 4,
    boxShadow: "8px 8px 4px #808080",
    margin: "auto",
    textAlign: "center",
    marginBottom: 5,
  },
  answer: {
    fontSize: 14,
  },
});

const Preview: React.FC<{}> = (): JSX.Element => {
  const classes: Record<"root" | "answer", string> = useStyles();
  const state: QState = useSelector((state: RootState) => state.questions);
  const { newQ } = state;

  if (!newQ) {
    return <></>;
  }
  return (
    <Card variant="outlined" className={classes.root}>
      <CardContent>
        <h2 style={{ marginBottom: 3 }}>
          {newQ.question.replaceAll("&#039;", "`").replaceAll("&quot;", "")}
        </h2>
        <Typography
          className={classes.answer}
          color="textSecondary"
          gutterBottom
        >
          Correct Answer:
        </Typography>
        <Typography component="p" gutterBottom>
          {newQ.correct_answer}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Preview;
