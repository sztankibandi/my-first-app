// import {createAction, props} from "@ngrx/store";

// export const increment = createAction(
//   '[Counter] Increment',
//   props<{value: number}>()
// );

import {Action} from "@ngrx/store";

export const INCREMENT = '[Counter] Increment';

export class IncrementAction implements Action {
  readonly type: string = INCREMENT;

  constructor(public value: number) {}
}

export type CounterActions = IncrementAction;
