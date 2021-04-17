import {Component, OnDestroy, OnInit} from '@angular/core'
import {Subscription} from 'rxjs'
import {OrdersService} from '../../shared/orders.service'
import {Order} from '../../shared/inerfaces'


@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit, OnDestroy {


  orders: Order[] = []
  pSub: Subscription

  remSub: Subscription

  constructor(private orderService: OrdersService) { }

  ngOnInit(): void {
    this.pSub = this.orderService.getAll().subscribe(
      orders => {
        this.orders = orders
      }
    )
  }

  remove(id: string): void {
    this.remSub = this.orderService.remove(id).subscribe(() => {
      this.orders = this.orders.filter(order => order.id !== id)
    })
  }


  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
    if (this.remSub) {
      this.remSub.unsubscribe()
    }
  }

}
