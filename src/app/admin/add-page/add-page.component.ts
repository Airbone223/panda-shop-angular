import { Component, OnInit } from '@angular/core'
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms'
import {ProductService} from '../../shared/product.service'



@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss']
})
export class AddPageComponent implements OnInit {
  productForm: FormGroup
  submitted = false
  imageModule = {
    toolbar: [
      ['image']
    ]
  }

  constructor(
    public formBuilder: FormBuilder,
    public productService: ProductService) {
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      type: ['', [Validators.required]],
      title: ['', [Validators.required]],
      photo: ['', [Validators.required]],
      photoBack: ['', [Validators.required]],
      info: ['', [Validators.required]],
      price: ['', [Validators.required]]
    })
  }

  get getControl(): { [p: string]: AbstractControl } {
    return this.productForm.controls
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      return
    }
    const product = {
      type: this.productForm.value.type,
      title: this.productForm.value.title,
      photo: this.productForm.value.photo,
      photoBack: this.productForm.value.photoBack,
      info: this.productForm.value.info,
      price: this.productForm.value.price,
      date: new Date()
    }
    this.productService.create(product).subscribe( () => {
  this.productForm.reset()
  this.submitted = false
         }, () => {
           this.submitted = false
         }
       )
     }
  }
