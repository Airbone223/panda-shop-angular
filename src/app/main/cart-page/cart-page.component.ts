import {Component, OnDestroy, OnInit} from '@angular/core'
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms'
import {Router} from '@angular/router'
import {OrdersService} from '../../shared/orders.service'
import {Order, Product} from '../../shared/inerfaces'
import {Store} from '@ngrx/store'
import {Observable, Subscription} from 'rxjs'
import {cartSelector, totalPriceSelector} from '../../reducers/order/order'
import {removeFromCart} from '../../reducers/order/order-actions'

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit, OnDestroy {
  form: FormGroup
  cart$: Observable<Product[]> = this.store.select(cartSelector)
  cart: Product[]
  cartSub$: Subscription
  priceSub$: Subscription
  totalPrice$: Observable<number> = this.store.select(totalPriceSelector)
  added = ''
  submitted
  price
  constructor(
    private store: Store,
    private orderService: OrdersService,
    private fb: FormBuilder,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.cartSub$ = this.cart$.subscribe(
      cart => {
        this.cart = cart
      }
    )
    this.priceSub$ = this.totalPrice$.subscribe(
      price => {
        this.price = price
      }
    )
    this.form = this.fb.group(
      {
        name: ['', [Validators.required]],
        phone: ['', [Validators.required]],
        address: ['', [Validators.required]],
        payment: ['Картой на сайте'],
      }
    )
  }

  get getControl(): { [p: string]: AbstractControl } {
    return this.form.controls
  }

  submit(): void {
    if (this.form.invalid) {
      return
    }
    const order: Order = {
      cart: this.cart,
      price: this.price,
      name: this.form.value.name,
      phone: this.form.value.phone,
      address: this.form.value.address,
      payment: this.form.value.payment,
      date: new Date()
    }
    this.submitted = true
    this.orderService.create(order).subscribe(
      res => {
        this.form.reset()
        this.submitted = false
        this.added = `Заказ оформлен. Ожидайте, с вами свяжется представитель магазина для подтверждения заказа! Спасибо за покупку ваш Panda Shop!`
        const timeout = setTimeout(() => {
          this.added = ''
          clearInterval(timeout)
        }, 4000)
        this.form.reset()
      }
    )

  }

  delete(product: Product): void {
   this.store.dispatch(removeFromCart({product}))
  }
  ngOnDestroy(): void {
    if (this.cartSub$) {
      this.cartSub$.unsubscribe()
    }
    if (this.priceSub$) {
      this.priceSub$.unsubscribe()
    }
  }
}



