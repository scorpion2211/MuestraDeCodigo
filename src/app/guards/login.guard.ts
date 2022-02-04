import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  isLogged: boolean = false;
  isToken: boolean = false;
  constructor(
    private router: Router,
    private store: Store<{ cartCount: number; stateLogged: boolean }>
  ) {
    this.store.select('stateLogged').subscribe((state) => {
      this.isLogged = state;
    });
    if (sessionStorage.getItem('token') != '') {
      this.isToken = true;
    }
  }

  canActivate(): boolean {
    if (this.isLogged || this.isToken) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
