import {Injectable} from '@angular/core';
import {ProductType} from "../../../types/product.type";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, map, Observable, of, retry, tap} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: ProductType[] = [];

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<ProductType[]> {
    // let params = new HttpParams();
    // params = params.set('extraField', 1);
    return this.http.get<ProductType[]>(environment.apiURL + 'pizzas');
      // , {
      // headers: new HttpHeaders({
      //   Authorization: 'auth-token'
      // }),
      //params: params,
      //observe: 'response'
    //})
      // .pipe(
      //   // tap(result => {
      //   //   console.log(result);
      //   // }),
      //   map((result) => (result.body ? result.body.data : [])),
      //   retry(3)
      // );
  }

  getProduct(id: number): Observable<ProductType>{
    return this.http.get<ProductType>(environment.apiURL + `pizzas?id=${id}`);
    //ajax
    //return this.products.find(item => (item.id === id));
  }

  createOrder(data: {product: string, address: string, phone: string}) {
    return this.http.post<{ success: boolean, message?: string }>(environment.apiURL + `order-pizza`, data);
  }
}
