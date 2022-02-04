import { Action } from '@ngrx/store';

export const SUMAR = '[Contador] AGREGAR';
export const RESTAR = '[Contador] QUITAR';
export const RESET = '[Contador] RESETEAR';

export class sumarAction implements Action {
  readonly type = SUMAR;
}
export class restarAction implements Action {
  readonly type = RESTAR;
}

export class resetAction implements Action {
  readonly type = RESET;
}
