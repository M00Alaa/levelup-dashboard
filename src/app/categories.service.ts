import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<any> {
    return this.http.get(`https://level.somee.com/api/allCategory`)
  }

  addCategory(data: any): Observable<any> {
    return this.http.post(`https://level.somee.com/api/AddCategory`, data)
  }

  deleteCategory(ID: any): Observable<any> {
    return this.http.delete(`https://level.somee.com/api/deletecategories?ID=${ID}`)
  }

  updateCategory(ID: any, data: any): Observable<any> {
    return this.http.put(`https://level.somee.com/api/updatecategory?ID=${ID}`, data)
  }
}
