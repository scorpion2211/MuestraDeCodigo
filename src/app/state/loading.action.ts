import { Action } from '@ngrx/store';

export const SHOW_LOADING = '[state] loading';
export const HIDE_LOADING = '[state] finsished';

export class LoadingAction implements Action {
  readonly type = SHOW_LOADING;
}

export class FinishedLoadingAction implements Action {
  readonly type = HIDE_LOADING;
}
