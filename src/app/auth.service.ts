import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable, BehaviorSubject } from 'rxjs'
import Jwt_decode from 'jwt-decode'
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if (localStorage.getItem('token') != null) {
      this.saveCurrentUser()
    }
  }

  baseUrl: string = 'https://level.somee.com/api/'

  username: string = ''

  currentUser = new BehaviorSubject(null); //notlogin

  saveCurrentUser() {
    let token = JSON.stringify(localStorage.getItem('token'))
    let decode: any = Jwt_decode(token)
    this.currentUser.next(decode) //login

    this.username = decode.first_name

  }

  login(data: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}loginAdmin`, data)
  }

  logOut() {
    localStorage.removeItem('token')
    this.currentUser.next(null)
    this._Router.navigate(['/login'])
  }
}
