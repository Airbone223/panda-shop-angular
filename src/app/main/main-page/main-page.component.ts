import { Component, OnInit } from '@angular/core'
import {Observable} from 'rxjs'
import {Product} from '../../shared/inerfaces'
import {Store} from '@ngrx/store'
import {loadingSelector, productsSelector, typeSelector} from '../../reducers/product/product'
import {getAll, setType} from '../../reducers/product/product-actions'




@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  products$: Observable<Product[]> = this.store.select(productsSelector)
  loading$: Observable<boolean> = this.store.select(loadingSelector)
  type$: Observable<string> = this.store.select(typeSelector)
  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch(setType({checkedType: 'All'}))
    this.store.dispatch(getAll())
  }

}
