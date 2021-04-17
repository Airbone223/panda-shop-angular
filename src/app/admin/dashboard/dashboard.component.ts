import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../shared/product.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  //@ts-ignore
  products: Product[] = []
  //@ts-ignore
  pSub: Subscription
  //@ts-ignore
  remSub: Subscription
  productName: any;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.pSub = this.productService.getAll().subscribe(
      products => {
        //@ts-ignore
        this.products = products
      }
    )
  }

  remove(id: string) {
    this.remSub = this.productService.remove(id).subscribe(() => {
      //@ts-ignore
      this.products = this.products.filter(prod => prod.id !== id)
    })
  }


  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
    if (this.remSub) {
      this.remSub.unsubscribe()
    }
  }

}
