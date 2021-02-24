import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
// import { ActivatedRoute, Router } from '@angular/router';
// import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { tap } from "rxjs/operators";
import { environment } from "src/environments/environment";



@Injectable({
  providedIn:'root'
})
export class AuthService{
  ROOT_URL: string = environment.BASE_URL
  userBody:any

  constructor(private http:HttpClient){ }

  login(email: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/api/users/login`, { email, password }, {
        observe:'response'
    }).pipe(tap((res: HttpResponse<any>) => {
        console.log(res)

        this.setSession(res.body.token, res.body)
        this.userBody = res.body
      }))
  }
  isLoggedIn() {
    return !!localStorage.getItem('token')
  }
  getToken() {
     return localStorage.getItem('token')
  
  }

  setSession( token:string, body:object) {
   
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(body))
  }

  removeSession() {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  logout() {
    this.removeSession()
  }
}