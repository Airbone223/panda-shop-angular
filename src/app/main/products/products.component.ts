import {Component, Input, OnInit} from '@angular/core'
import {Product} from '../../shared/inerfaces'
import {Store} from '@ngrx/store'
import {addToCart} from '../../reducers/order/order-actions'



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @Input() product: Product
  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  addProductToCart(product: Product): void {
    this.store.dispatch(addToCart({product}))
  }
}
