import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductModel } from 'src/app/interfaces/product';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Subscription } from 'rxjs';
import {
  FinishedLoadingAction,
  LoadingAction,
} from 'src/app/state/loading.action';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  userLogged = '';
  isLogged = false;
  count = 0;
  lstProducts_show: ProductModel[] = [];

  catProd = 'todas';
  marca = 'todas';

  showAlert = false;
  titleAlert = '';

  lstProdSubscription: Subscription = new Subscription();
  constructor(
    public fb: FirestoreService,
    private store: Store<{ loading: boolean }>
  ) {}

  ngOnInit(): void {
    this.lstProdSubscription = this.fb.lstProducts$.subscribe((lst: any) => {
      this.lstProducts_show = lst;
    });
  }

  ngOnDestroy(): void {
    this.lstProdSubscription.unsubscribe();
  }

  filterList() {
    const loading = new LoadingAction();
    this.store.dispatch(loading);
    setTimeout(() => {
      let lst_aux = this.fb.lstProducts;
      if (this.marca != 'todas')
        lst_aux = lst_aux.filter(
          (prod) => prod.nombre.indexOf(this.marca) > -1
        );
      switch (this.catProd) {
        case '3':
          lst_aux = lst_aux.filter(
            (prod) =>
              prod.sku.indexOf('R3') > -1 || prod.sku.indexOf('IC3') > -1
          );
          break;
        case '5':
          lst_aux = lst_aux.filter(
            (prod) =>
              prod.sku.indexOf('R5') > -1 || prod.sku.indexOf('IC5') > -1
          );
          break;
        case '7':
          lst_aux = lst_aux.filter(
            (prod) =>
              prod.sku.indexOf('R7') > -1 || prod.sku.indexOf('IC7') > -1
          );
          break;
        case '9':
          lst_aux = lst_aux.filter(
            (prod) =>
              prod.sku.indexOf('R9') > -1 || prod.sku.indexOf('IC9') > -1
          );
          break;
      }
      this.lstProducts_show = lst_aux;
      const loadingF = new FinishedLoadingAction();
      this.store.dispatch(loadingF);
    }, 1500);
  }

  resetFilter() {
    this.catProd = 'todas';
    this.marca = 'todas';
    this.filterList();
  }
}
