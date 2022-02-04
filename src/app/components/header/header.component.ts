import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductModel } from 'src/app/interfaces/product';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { sumarAction } from 'src/app/state/count.actions';
import { LoginAction, LogoutAction } from 'src/app/state/user.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userLogged = '';
  isVisibleCart = false;
  isVisibleOrder = false;
  isLogged = false;
  count = 0;

  constructor(
    private auth: AuthService,
    private router: Router,
    private store: Store<{ cartCount: number; stateLogged: boolean }>,
    public fb: FirestoreService
  ) {
    this.getUserLogged();

    this.store.select('cartCount').subscribe((state) => {
      this.count = state;
    });
    this.store.select('stateLogged').subscribe((state) => {
      this.isLogged = state;
    });
  }

  ngOnInit(): void {
    this.fb.allOrders = [];
    this.fb.getOrders();
    const sumar = new sumarAction();
    if (this.count == 0) {
      setTimeout(() => {
        for (let i = 0; i < this.fb.getCantCart; i++) {
          this.store.dispatch(sumar);
        }
      }, 1500);
    }
  }

  getUserLogged() {
    this.auth.getUserLogged().subscribe((user: any) => {
      if (user?.email) {
        this.userLogged = user.email;
        sessionStorage.setItem('email', user.mail);
        sessionStorage.setItem('token', user.multiFactor.user.accessToken);

        const action = new LoginAction();
        this.store.dispatch(action);
      }
    });
  }

  logout() {
    this.auth.logout();
    const action = new LogoutAction();
    this.store.dispatch(action);
    this.router.navigate(['/login']);
  }

  showModal(): void {
    this.isVisibleCart = true;
  }

  ConfirmarOrden(): void {
    this.isVisibleCart = false;
    this.fb.confirmCart();
  }

  handleCancel(): void {
    this.isVisibleCart = false;
  }

  /* getNameProd(id_prod: string) {
    return this.fb.getNameProd(id_prod)
  } */

  AddCart(prod: any) {
    prod = this.fb.lstProducts.filter(
      (data: any) => data.id === prod.id_prod
    )[0];
    this.fb.AddCart(prod, false);
  }

  DelCart(prod: ProductModel) {
    this.fb.DelCart(prod);
  }
}
