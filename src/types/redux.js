// @flow

export type GetState = () => State;
type Thunk = (Function, GetState) => Action | Promise<Action>;
export type Dispatch = (Action | Thunk) => Action | Promise<Action>;
