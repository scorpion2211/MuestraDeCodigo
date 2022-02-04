import { Action } from '@ngrx/store';

export const IS_LOGIN = '[state] login';
export const IS_OUT = '[state] logout';

export class LoginAction implements Action {
  readonly type = IS_LOGIN;
}

export class LogoutAction implements Action {
  readonly type = IS_OUT;
}
