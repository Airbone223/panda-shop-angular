import { Pipe, PipeTransform } from '@angular/core'
import {Product} from './inerfaces'


@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(products: Product[], type = ''): any {
    return products.filter( product => {
      if (type === 'All') {
        return product
      }
      return product.type === type
    })
  }
}
