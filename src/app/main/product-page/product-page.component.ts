import {Component, OnInit} from '@angular/core'
import {Observable} from 'rxjs'
import {ProductService} from '../../shared/product.service'
import {ActivatedRoute} from '@angular/router'
import {switchMap} from 'rxjs/operators'
import { Product } from 'src/app/reducers/counter'


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  product$: Observable<Product>

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.product$ = this.route.params
      .pipe(
        switchMap( params => {
          return this.productService.getById(params.id)
        })
      )
  }

  addProductToCart(product: Product): void {
    this.productService.addProductToCart(product)
  }

}
