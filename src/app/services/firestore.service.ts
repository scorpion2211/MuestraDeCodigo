import { EventEmitter, Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { ProductModel } from '../interfaces/product';
import { ProdCartModel } from '../interfaces/prodCart';
import { FinishedLoadingAction, LoadingAction } from '../state/loading.action';
import { Store } from '@ngrx/store';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { resetAction, restarAction, sumarAction } from '../state/count.actions';
import { ProdOrdertModel, ProdsOrder } from '../interfaces/prodOrder';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  public lstProducts: ProductModel[] = [];
  public lstProducts$ = new EventEmitter<ProductModel[]>();
  public allOrders: ProdOrdertModel[] = [];

  private db_prod: AngularFirestoreCollection<unknown>;
  private db_cart: AngularFirestoreCollection<unknown>;
  private db_prod_cart: AngularFirestoreCollection<unknown>;

  private cart_complete = {
    id_cart: '',
    prods: [] as any,
  };

  constructor(
    private firestore: AngularFirestore,
    private store: Store<{ cartCount: number; stateLogged: boolean }>,
    private notification: NzNotificationService
  ) {
    this.db_prod = this.firestore.collection('products');
    this.db_cart = this.firestore.collection('carts');
    this.db_prod_cart = this.firestore.collection('product_carts');
    this.getProducts();
    this.loadCart();
  }

  loadCart() {
    this.firestore
      .collection('carts', (ref) => ref.where('status', '==', 'pending'))
      .snapshotChanges()
      .subscribe((cart) => {
        if (cart.length > 0) {
          this.cart_complete.id_cart = cart[0].payload.doc.id;
          this.firestore
            .collection('product_carts', (ref) =>
              ref.where('cart_id', '==', this.cart_complete.id_cart)
            )
            .snapshotChanges()
            .subscribe((prods) => {
              if (prods.length > 0) {
                this.cart_complete.prods = [];
                prods.forEach((x: any) => {
                  let data = x.payload.doc.data();
                  let id = x.payload.doc.id;
                  let prod = {
                    id: id,
                    id_prod: data.product_id,
                    cant: data.quantity,
                  };
                  this.cart_complete.prods.push(prod);
                });
              }
              //console.log(this.cart_complete.prods);
            });
        }
      });
  }

  getProducts() {
    const loading = new LoadingAction();
    this.store.dispatch(loading);
    this.db_prod.snapshotChanges().subscribe((data) => {
      this.lstProducts = [];
      data.forEach((x: any) => {
        this.lstProducts.push({
          id: x.payload.doc.id,
          ...x.payload.doc.data(),
        });
      });
      this.lstProducts$.emit(this.lstProducts);
      const loading = new FinishedLoadingAction();
      this.store.dispatch(loading);
    });
  }

  get getCart(): any {
    return this.cart_complete;
  }

  get getCantCart(): any {
    let count = 0;
    this.cart_complete.prods.forEach((x: any) => {
      count += x.cant;
    });
    return count;
  }

  getOrders() {
    this.firestore
      .collection('carts', (ref) => ref.where('status', '==', 'complete'))
      .snapshotChanges()
      .subscribe((cart) => {
        let cart_length = cart.length;
        if (cart_length > 0 && this.allOrders.length != cart_length) {
          this.allOrders = [];
          cart.forEach((order) => {
            let obj: ProdOrdertModel = {
              id_cart: order.payload.doc.id,
              prods: [] as any,
            };
            this.firestore
              .collection('product_carts', (ref) =>
                ref.where('cart_id', '==', obj.id_cart)
              )
              .snapshotChanges()
              .subscribe((prods) => {
                if (prods.length > 0 && this.allOrders.length != cart_length) {
                  obj.prods = [];
                  prods.forEach((x: any) => {
                    let data = x.payload.doc.data();
                    let id = x.payload.doc.id;
                    let prod: ProdsOrder = {
                      id: id,
                      id_prod: data.product_id,
                      cant: data.quantity,
                    };
                    obj.prods.push(prod);
                  });
                  this.allOrders.push(obj);
                }
              });
          });
        }
      });
  }

  newCart() {
    this.resetVar();
    this.db_cart.add({ status: 'pending' });
  }

  resetVar() {
    this.cart_complete.id_cart = '';
    this.cart_complete.prods = [];
    const action = new resetAction();
    this.store.dispatch(action);
  }

  confirmCart() {
    this.db_cart.doc(this.cart_complete.id_cart).update({
      status: 'complete',
    });
    this.newCart();
    this.createBasicNotification('Orden Confirmada');
  }

  addProd(obj: ProductModel) {
    this.db_prod.add(obj);
  }

  AddCart(prod: any, showNotification: boolean) {
    //prod: ProductModel
    let obj = {
      cart_id: this.getCart.id_cart,
      product_id: prod.id,
      quantity: 1,
    };
    let in_cart = this.inCart(prod.id);
    if (in_cart.length > 0) {
      this.updateProdInCart(in_cart[0].id, in_cart[0].cant + 1);
    } else {
      this.addProdCart(obj);
    }

    if (showNotification)
      this.createBasicNotification(prod.nombre, 'Añadido al carrito');
    const action = new sumarAction();
    this.store.dispatch(action);
  }

  DelCart(prod: any) {
    //prod: ProductModel
    let cant = prod.cant - 1;
    if (cant == 0) this.deleteProdInCart(prod.id);
    else this.updateProdInCart(prod.id, cant);
    const action = new restarAction();
    this.store.dispatch(action);
  }

  addProdCart(obj: ProdCartModel) {
    this.db_prod_cart.add(obj);
  }

  inCart(id: string): any {
    return this.cart_complete.prods.filter((data: any) => data.id_prod === id);
  }

  updateProdInCart(id: string, cant: number) {
    this.db_prod_cart.doc(id).update({
      quantity: cant,
    });
  }

  deleteProdInCart(id: string) {
    this.db_prod_cart.doc(id).delete();
  }

  createBasicNotification(title: string, text: string = ''): void {
    this.notification.blank(title, text).onClick.subscribe(() => {});
  }

  getNameProd(id_prod: string) {
    return this.lstProducts.filter((data: any) => data.id === id_prod)[0]
      .nombre;
  }
}
