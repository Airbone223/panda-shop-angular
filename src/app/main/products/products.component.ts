import {Component, Input, OnInit} from '@angular/core'
import {ProductService} from '../../shared/product.service'
import {Product} from '../../reducers/counter'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @Input() product
  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
  }

  addProductToCart(product: Product): void {
    this.productService.addProductToCart(product)
  }
}
