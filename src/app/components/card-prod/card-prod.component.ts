import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductModel } from 'src/app/interfaces/product';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-card-prod',
  templateUrl: './card-prod.component.html',
  styleUrls: ['./card-prod.component.scss'],
})
export class CardProdComponent implements OnInit {
  @Input() prod: any;

  constructor(private fb: FirestoreService) {}

  ngOnInit(): void {}

  AddCart(prod: ProductModel) {
    this.fb.AddCart(prod, true);
  }
}
