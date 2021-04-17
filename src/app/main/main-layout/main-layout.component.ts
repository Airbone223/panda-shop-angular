import {Component, OnInit} from '@angular/core'
import {Router} from '@angular/router'
import {Product} from '../../reducers/counter'
import {ProductService} from '../../shared/product.service'


@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  type = 'All'
  cart: Product[] = []

  constructor(
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.cart = this.productService.cart
  }


  setType(type: string): void {
    this.type = type
    if (this.type !== 'cart') {
      this.router.navigate(['/'],
        {
          queryParams: {type: this.type}
        })
      this.productService.setType(this.type)
    }
  }
  onBurgerClick(event): void {
    event.preventDefault()
    event.target.classList.toggle('header__burger__active')
  }
}
