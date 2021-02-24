import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from "src/environments/environment";
import {User} from './users.model'

@Injectable({
  providedIn: 'root'
})
export class HomeService {
// private users:User[]=[];

  ROOT_URL:string = environment.BASE_URL

  constructor(private http:HttpClient,private router:Router){ }

  getUsers() {
    return this.http.get<User[]>(`${this.ROOT_URL}/api/users`)
}

registerUser(name:string,email:string,password:string,isSuperAdmin:boolean,isSalesTeam:boolean){
 const userData={
    name:name,
  email:email,
  password:password,
  isSuperAdmin:isSuperAdmin,
  isSalesTeam:isSalesTeam
 } 
 return this.http.post(`${this.ROOT_URL}/api/users`,userData)
}

getUserById(id:number) {
  return this.http.get<User>(`${this.ROOT_URL}/api/users/${id}`)
}

updateID(id:number,name:string,email:string,password:string,isSuperAdmin:boolean,isSalesTeam:boolean){
  const userData={
        id:id,
       name:name,
       email:email,
       password:password,
       isSuperAdmin:isSuperAdmin,
       isSalesTeam:isSalesTeam
  }
  return this.http.put<User>(`${this.ROOT_URL}/api/users/${id}`,userData)
}

deleteId(id:number){
 return this.http.delete<User>(`${this.ROOT_URL}/api/users/${id}`)
}

}
