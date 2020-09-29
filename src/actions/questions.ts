import axios, { AxiosResponse } from "axios";
import { v4 as uuid } from "uuid";
import {
  Question,
  SAVE_QUESTIONS,
  GET_NEW_QUESTIONS,
  UPDATE_QUESTION,
  DELETE_QUESTION,
  SET_LOADING,
  GET_ERROR,
  SELECT_QUESTION,
  RESET_QUESTION,
} from "../reducers/questions";
import { Dispatch } from "redux";

type Response = {
  results: Question[];
};

const api =
  "https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple";

const api2 = "https://opentdb.com/api.php?amount=10&category=21&type=multiple";

// saving initial questions to the redux store
const saveQuestions = (questions: Question[]): SAVE_QUESTIONS => ({
  type: "SAVE_QUESTIONS",
  payload: questions,
});

// saving new sets of questions to the redux store
const getNewQuestions = (questions: Question[]): GET_NEW_QUESTIONS => ({
  type: "GET_NEW_QUESTIONS",
  payload: questions,
});

// select question to be edited
export const selectQuestion = (q: Question): SELECT_QUESTION => ({
  type: "SELECT_QUESTION",
  payload: q,
});

// update Question and save changes to the store
export const updateQuestion = (question: Question): UPDATE_QUESTION => ({
  type: "UPDATE_QUESTION",
  payload: question,
});

// delete Question and save changes to the store
export const deleteQuestion = (id: string): DELETE_QUESTION => ({
  type: "DELETE_QUESTION",
  payload: id,
});

// reseting the selected question for editing
export const resetQuestion = (): RESET_QUESTION => ({
  type: "RESET_QUESTION",
});

// clearing the set of questions in the redux store
export const setLoading = (isLoading: boolean): SET_LOADING => ({
  type: "SET_LOADING",
  payload: { isLoading },
});

// saving error to the redux store in case fetching questions fails
export const getError = (error: string): GET_ERROR => ({
  type: "GET_ERROR",
  payload: error,
});

// getting initial questions from api endpoint
export const getQuestions = () => async (dispatch: Dispatch): Promise<void> => {
  // setIsLoading(true);
  dispatch(setLoading(true));
  await axios
    .get<Response>(api)
    .then((res: AxiosResponse<Response>) => {
      const questions = res.data.results.map((q: Question) => ({
        ...q,
        id: uuid(),
      }));
      dispatch(saveQuestions(questions));
    })
    .catch((error) => {
      console.log(error);
      dispatch(
        getError("Error! Unable to fetch the questions. Please try again.")
      );
    });
};

// loading more questions from the api this time with different difficulties
export const loadMoreQuestions = () => async (
  dispatch: Dispatch
): Promise<void> => {
  dispatch(setLoading(true));
  await axios
    .get(api2)
    .then((res: AxiosResponse<Response>) => {
      const questions = res.data.results.map((q: Question) => ({
        ...q,
        id: uuid(),
      }));
      dispatch(getNewQuestions(questions));
    })
    .catch((error) => {
      console.log(error);
      dispatch(
        getError("Error! Unable to fetch the questions. Please try again.")
      );
    });
};
