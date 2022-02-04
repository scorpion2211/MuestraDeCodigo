import { Action } from '@ngrx/store';
import { RESET, RESTAR, SUMAR } from './count.actions';
import { HIDE_LOADING, SHOW_LOADING } from './loading.action';
import { IS_LOGIN, IS_OUT } from './user.actions';

export function countReducer(state: number = 0, action: Action) {
  switch (action.type) {
    case SUMAR:
      return (state += 1);
    case RESTAR:
      return (state -= 1);
    case RESET:
      return (state = 0);
    default:
      return state;
  }
}

export function stateLoggedReducer(state: boolean = false, action: Action) {
  switch (action.type) {
    case IS_LOGIN:
      return true;
    case IS_OUT:
      return false;
    default:
      return state;
  }
}

export function loadingReducer(state: boolean = false, action: Action) {
  switch (action.type) {
    case SHOW_LOADING:
      return true;
    case HIDE_LOADING:
      return false;
    default:
      return state;
  }
}
