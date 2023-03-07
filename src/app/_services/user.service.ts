import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/Usuario';

const USER_API = 'http://localhost:8080/api/users/';
const ROLE_API = 'http://localhost:8080/api/role/';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  updateUser(id:number,user:Usuario):Observable<any>{
    return this.http.put(`${ USER_API + 'update' }/${id}`, user);    
  }

  updatePasswd(id:number,passwd:string):Observable<any>{
    return this.http.put(`${ USER_API + 'updatePasswd' }/${id}`, passwd);
  }

  getAllUsersWithRoles():Observable<any>{
    return this.http.get(USER_API + 'allUsersWithRoles');
  }

  getAllUsers():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(USER_API + 'all');
  }

  deleteUser(id:number):Observable<Object>{
      return this.http.delete(`${ USER_API + 'delete' }/${id}`)
  }

  getUserByID(id:number):Observable<any>{
    return this.http.get(`${ USER_API + 'getUserByID' }/${id}`);
  }

  getRole(id:number):Observable<any>{
    return this.http.get(`${ ROLE_API + 'getRole' }/${id}`);
  }

  getAllRoles():Observable<any>{
    return this.http.get(ROLE_API + 'all');
  }

}
