import {Component, OnInit} from '@angular/core'
import {Observable} from 'rxjs'
import {Order} from '../../shared/inerfaces'
import {Store} from '@ngrx/store'
import {allOrdersSelector, loadingSelector} from '../../reducers/order/order'
import {getOrders, removeOrderFromServer} from '../../reducers/order/order-actions'



@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit {
  orders$: Observable<Order[]> = this.store.select(allOrdersSelector)
  loading$: Observable<boolean> = this.store.select(loadingSelector)
  constructor(private store: Store) { }

  ngOnInit(): void {
   this.store.dispatch(getOrders())
  }

  remove(id: string): void {
 this.store.dispatch(removeOrderFromServer({id}))
  }
}
