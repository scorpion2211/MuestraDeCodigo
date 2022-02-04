export interface ProdOrdertModel {
  id_cart: string;
  prods: ProdsOrder[];
}

export interface ProdsOrder {
  id: string;
  id_prod: string;
  cant: string;
}
