import { Component, OnInit } from '@angular/core'
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms'
import {Router} from '@angular/router'
import {Product} from '../../reducers/counter'
import {ProductService} from '../../shared/product.service'
import {OrdersService} from '../../shared/orders.service'
import {Order} from '../../shared/inerfaces'

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  form: FormGroup
  cart: Product[] = []
  totalPrice = 0
  submitted = false
  added = ''
  constructor(
    private productService: ProductService,
    private orderService: OrdersService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cart = this.productService.cart
    this.cart.forEach(item => {
      this.totalPrice += +item.price
    })

    this.form = this.fb.group(
      {
        name: ['', [Validators.required]],
        phone: ['', [Validators.required]],
        address: ['', [Validators.required]],
        payment: ['Cash'],
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
      name: this.form.value.name,
      phone: this.form.value.phone,
      address: this.form.value.address,
      payment: this.form.value.payment,
      price: this.totalPrice,
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
    this.totalPrice -= +product.price
    this.cart.splice(this.cart.indexOf(product), 1)
  }
}



