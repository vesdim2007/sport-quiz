import Grid from "@material-ui/core/Grid";
import React from "react";
import QuestionsList from "./QuestionsList";
import EditForm from "./EditForm";
import Preview from "./Preview";

const Quiz: React.FC<{}> = (): JSX.Element => {
  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="flex-start"
    >
      <Grid container item sm={12} md={7} lg={8} xl={9} justify="center">
        <EditForm />
        <Preview />
      </Grid>
      <Grid item sm={12} md={5} lg={4} xl={3}>
        <QuestionsList />
      </Grid>
    </Grid>
  );
};

export default Quiz;
