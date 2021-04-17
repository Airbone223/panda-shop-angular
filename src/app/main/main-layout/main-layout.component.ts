import {Component, OnInit} from '@angular/core'
import {Router} from '@angular/router'
import {Product} from '../../shared/inerfaces'
import {Store} from '@ngrx/store'
import {Observable} from 'rxjs'
import {cartSelector} from '../../reducers/order/order'
import { setType } from 'src/app/reducers/product/product-actions'



@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  cart$: Observable<Product[]> = this.store.select(cartSelector)

  constructor(
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
  }


  setType(type: string): void {
    if (type !== 'cart') {
      this.router.navigate(['/'],
        {
          queryParams: {type}
        })
      this.store.dispatch(setType({checkedType: type}))
    }
  }
  onBurgerClick(event): void {
    event.preventDefault()
    event.target.classList.toggle('header__burger__active')
  }
}
