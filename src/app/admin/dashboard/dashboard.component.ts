import {Component, OnInit} from '@angular/core'
import {Observable} from 'rxjs'
import {Product} from '../../shared/inerfaces'
import {Store} from '@ngrx/store'
import {loadingSelector, productsSelector, typeSelector} from '../../reducers/product/product'
import {getAll, removeProduct, setType} from '../../reducers/product/product-actions'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  products$: Observable<Product[]> = this.store.select(productsSelector)
  loading$: Observable<boolean> = this.store.select(loadingSelector)
  productName
  type$: Observable<string> = this.store.select(typeSelector)
  constructor(private store: Store) { }



  ngOnInit(): void {
    this.store.dispatch(getAll())
    this.store.dispatch(setType({checkedType: 'All'}))
  }

  remove(id: string): void {
    this.store.dispatch(removeProduct({id}))
  }

  setType(checkedType: string): void {
    this.store.dispatch(setType({checkedType}))
  }
}
