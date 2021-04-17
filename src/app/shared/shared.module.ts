import {ModuleWithProviders, NgModule} from '@angular/core'
import {FilterPipe} from './filter.pipe'



@NgModule({
  declarations: [FilterPipe],
  exports: [
    FilterPipe
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: SharedModule,
    }
  }
}
