import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import QuestionCard from "./QuestionCard";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Question } from "../reducers/questions";
import { RootState } from "../store/configureStore";
import { QState } from "../reducers/questions";
import {
  getQuestions,
  loadMoreQuestions,
  deleteQuestion,
  selectQuestion,
} from "../actions/questions";

const QuestionsList: React.FC<{}> = (): JSX.Element => {
  // useDispatch hook to send actions to the store and save questions
  const dispatch = useDispatch();

  // useSelector hook will be used to fetch the data to be displayed from the redux store
  const state: QState = useSelector((state: RootState) => state.questions);

  // distructuring the state object obtained with useSelector hook to display to the screen
  const { questions, isLoading } = state;

  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);

  const onLoadMore = (): void => {
    dispatch(loadMoreQuestions());
  };

  const onRemove = (id: string): void => {
    dispatch(deleteQuestion(id));
  };

  const onEdit = (q: Question): void => {
    dispatch(selectQuestion(q));
  };

  return (
    <div className="questions-list">
      <Grid
        container
        direction="column"
        justify="space-between"
        alignItems="flex-start"
        spacing={4}
      >
        <Grid
          container
          item
          xs={12}
          spacing={2}
          justify="space-between"
          alignItems="center"
          direction="row"
        >
          <h3>Questions</h3>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            onClick={() => onLoadMore()}
          >
            Load More Questions
          </Button>
        </Grid>
        {isLoading && (
          <Grid
            container
            item
            xs={12}
            spacing={2}
            justify="center"
            alignItems="center"
            direction="row"
          >
            <div style={{ margin: "10px auto" }}>
              <CircularProgress />
            </div>
          </Grid>
        )}
        {questions.length > 0 &&
          questions.map((q: Question, index: Number) => (
            <Grid
              container
              item
              xs={12}
              spacing={2}
              justify="space-between"
              alignItems="center"
              direction="row"
              key={index.toString()}
            >
              <QuestionCard question={q} onEdit={onEdit} onRemove={onRemove} />
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default QuestionsList;
