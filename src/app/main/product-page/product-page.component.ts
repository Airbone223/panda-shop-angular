import {Component, OnInit} from '@angular/core'
import {Observable} from 'rxjs'
import {ActivatedRoute} from '@angular/router'
import {Product} from '../../shared/inerfaces'
import {Store} from '@ngrx/store'
import {productSelector} from '../../reducers/product/product'
import {loadingSelector} from '../../reducers/product/product'
import {getById} from '../../reducers/product/product-actions'
import {addToCart} from '../../reducers/order/order-actions'



@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  product$: Observable<Product> = this.store.select(productSelector)
  loading$: Observable<boolean> = this.store.select(loadingSelector)

  constructor(
    private store: Store,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(getById({id: this.route.snapshot.params.id}))
  }

  addProductToCart(product: Product): void {
    this.store.dispatch(addToCart({product}))
  }
}
