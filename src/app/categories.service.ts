import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  // categories
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

  // books
  getAllBooks(category: any, level: any): Observable<any> {
    return this.http.get(`https://level.somee.com/api/book?category=${category}&level=${level}`)
  }

  addBook(data: any): Observable<any> {
    return this.http.post(`https://level.somee.com/api/Addbook`, data)
  }

  deleteBook(R_ID: any): Observable<any> {
    return this.http.delete(`https://level.somee.com/api/delete?R_ID=${R_ID}`)
  }

  updateBook(R_ID: any, data: any): Observable<any> {
    return this.http.put(`https://level.somee.com/api/updatebook?R_ID=${R_ID}`, data)
  }

  // Questions
  getAllQuestions(category: any, level: any): Observable<any> {
    return this.http.get(`https://level.somee.com/api/allquction?categoryname=${category}&levelname=${level}`)
  }

  addQuestion(data: any): Observable<any> {
    return this.http.post(`https://level.somee.com/api//AddQuction`, data)
  }

  deleteQuestion(Q_ID: number): Observable<any> {
    return this.http.delete(`https://level.somee.com/api/deleteallquction?Q_ID=${Q_ID}`)
  }

  updateQuestion(Q_ID: any, data: any): Observable<any> {
    return this.http.put(`https://level.somee.com/api/updatequction?Q_ID=${Q_ID}`, data)
  }

  // Exam Questions
  getAllExamQuestions(category: any): Observable<any> {
    return this.http.get(`https://level.somee.com/api/allExamQuction?categoryname=${category}`)
  }

  addExamQuestion(data: any): Observable<any> {
    return this.http.post(`https://level.somee.com/api/AddExamquction`, data)
  }

  deleteExamQuestion(E_ID: number): Observable<any> {
    return this.http.delete(`https://level.somee.com/api/deletequction?E_ID=${E_ID}`)
  }

  updateExamQuestion(E_ID: any, data: any): Observable<any> {
    return this.http.put(`https://level.somee.com/api/updateExam?E_ID=${E_ID}`, data)
  }
}
