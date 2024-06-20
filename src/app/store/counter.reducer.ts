import {createReducer} from "@ngrx/store";

const initialState: number = 0;

export const counterReducer = createReducer(
  initialState
);
