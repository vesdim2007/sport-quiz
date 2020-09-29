import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "./Button";
import Typography from "@material-ui/core/Typography";
import { Question } from "../reducers/questions";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles<Theme, "root" | "title">({
  root: {
    flexGrow: 1,
  },
  title: {
    fontSize: 14,
  },
});

export type QuestionCardProps = {
  question: Question;
  onEdit(q: Question): void;
  onRemove(id: string): void;
};

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onEdit,
  onRemove,
}): JSX.Element => {
  const classes: Record<"root" | "title", string> = useStyles();

  // select a question to be edited
  const selectQuestion = (): void => {
    onEdit(question);
    window.scroll(0, 0);
  };

  return (
    <Card variant="outlined" className={classes.root}>
      <CardContent>
        <div className="card">
          <Grid
            container
            item
            xs={12}
            spacing={3}
            justify="space-between"
            alignItems="flex-start"
            direction="row"
          >
            <Grid
              container
              item
              sm={8}
              md={9}
              spacing={3}
              justify="space-between"
              alignItems="flex-start"
              direction="column"
            >
              <Typography className={classes.title} color="textSecondary">
                Question:
              </Typography>
              <Typography component="p" gutterBottom>
                {question.question
                  .replaceAll("&#039;", "`")
                  .replaceAll("&quot;", "")}
              </Typography>
              <Typography className={classes.title} color="textSecondary">
                Category:
              </Typography>
              <Typography component="p" gutterBottom>
                {question.category}
              </Typography>
              <Typography className={classes.title} color="textSecondary">
                Difficulty:
              </Typography>
              <Typography component="p">{question.difficulty}</Typography>
            </Grid>
            <Grid
              container
              item
              sm={4}
              md={3}
              spacing={3}
              justify="space-around"
              alignItems="center"
              direction="column"
            >
              <Button
                variant="contained"
                disableElevation
                color="primary"
                size="small"
                onClick={selectQuestion}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                size="small"
                color="secondary"
                mt={2}
                onClick={(): void => onRemove(question.id as string)}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
