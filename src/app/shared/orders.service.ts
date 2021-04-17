import { Injectable } from '@angular/core'
import {environment} from '../../environments/environment'
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'
import {Observable} from 'rxjs'
import {FbResponse, Order} from './inerfaces'

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private  http: HttpClient) { }
  create(order: Order): Observable<any> {
    return this.http.post(`${environment.fbDbUrl}/orders.json`, order)
      .pipe(
        map( (res: FbResponse) => {
          return {
            ...order,
            id: res.name,
            date: new Date(order.date)
          }
        }))
  }

  getAll(): Observable<Order[]> {
    return this.http.get(`${environment.fbDbUrl}/orders.json`)
      .pipe( map ( res => {
        return Object.keys(res)
          .map( key => ({
            ...res[key],
            id: key,
            date: new Date(res[key].date)
          }))
      }))
  }



  remove(id: string): Observable<any> {
    return this.http.delete(`${environment.fbDbUrl}/orders/${id}.json`)
  }

}
