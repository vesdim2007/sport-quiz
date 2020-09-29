import { Reducer } from "react";

export type Question = {
  id: string | null;
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type SAVE_QUESTIONS = {
  type: "SAVE_QUESTIONS";
  payload: Question[];
};

export type GET_NEW_QUESTIONS = {
  type: "GET_NEW_QUESTIONS";
  payload: Question[];
};

export type SELECT_QUESTION = {
  type: "SELECT_QUESTION";
  payload: Question;
};

export type GET_ERROR = {
  type: "GET_ERROR";
  payload: string;
};

export type SET_LOADING = {
  type: "SET_LOADING";
  payload: { isLoading: boolean };
};

export type UPDATE_QUESTION = { type: "UPDATE_QUESTION"; payload: Question };

export type DELETE_QUESTION = { type: "DELETE_QUESTION"; payload: string };

export type RESET_QUESTION = { type: "RESET_QUESTION" };

export type QAction =
  | GET_NEW_QUESTIONS
  | SAVE_QUESTIONS
  | SELECT_QUESTION
  | UPDATE_QUESTION
  | DELETE_QUESTION
  | GET_ERROR
  | RESET_QUESTION
  | SET_LOADING;

export type QState = {
  questions: Question[];
  selectedQuestion: Question | null;
  newQ: Question | null;
  error: string | null;
  isLoading: boolean;
};

const initialStore: QState = {
  questions: [],
  selectedQuestion: null,
  newQ: null,
  error: null,
  isLoading: false,
};

const questionsReducer: Reducer<QState, QAction> = (
  state = initialStore,
  action
) => {
  switch (action.type) {
    //   getting questions from the server and save them in the redux store
    case "SAVE_QUESTIONS":
      return {
        ...state,
        questions: action.payload,
        isLoading: false,
      };
    // getting new set of questions
    case "GET_NEW_QUESTIONS":
      return {
        ...state,
        questions: [...action.payload, ...state.questions],
        isLoading: false,
      };
    // select question for edit form
    case "SELECT_QUESTION":
      return {
        ...state,
        selectedQuestion: action.payload,
      };
    // updating Question
    case "UPDATE_QUESTION":
      //   const current: Question[] = state.questions;
      return {
        ...state,
        questions: [
          action.payload,
          ...state.questions.filter(
            (q: Question) => q.id !== action.payload.id
          ),
        ],
        newQ: action.payload,
        selectedQuestion: null,
      };
    // delete questions
    case "DELETE_QUESTION":
      return {
        ...state,
        questions: state.questions.filter(
          (q: Question) => q.id !== action.payload
        ),
      };
    // clearing the state and returning the initial values
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    // reseting the selected question for edit
    case "RESET_QUESTION":
      return {
        ...state,
        selectedQuestion: null,
      };
    // error handling case in case if fetch fails
    case "GET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default questionsReducer;
