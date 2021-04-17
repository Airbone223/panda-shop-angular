import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms'
import {Product} from '../../shared/inerfaces'
import {switchMap} from 'rxjs/operators'
import {ProductService} from '../../shared/product.service'


@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  productForm: FormGroup
  product: Product
  submitted = false

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }


  imageModule = {
    toolbar: [
      ['image']
    ]
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap( params => {
        return this.productService.getById(params.id)
      })
    ).subscribe(product => {
      this.product = product
      this.productForm = this.formBuilder.group({
        type: [this.product.type, [Validators.required]],
        title: [this.product.title, [Validators.required]],
        photo: [this.product.photo, [Validators.required]],
        photoBack: [this.product.photoBack, [Validators.required]],
        info: [this.product.info, [Validators.required]],
        price: [this.product.price, [Validators.required]]
      })

    })
  }

  get getControl(): { [p: string]: AbstractControl } {
    return this.productForm.controls
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      return
    }

    this.submitted = true

    this.productService.update({
      ...this.product,
      type: this.productForm.value.type,
      title: this.productForm.value.title,
      photo: this.productForm.value.photo,
      photoBack: this.productForm.value.photoBack,
      info: this.productForm.value.info,
      price: this.productForm.value.price,
      date: new Date()
    }).subscribe( res => {
      this.submitted = false
      this.router.navigate(['/admin', 'dashboard'])
    })
  }
}
