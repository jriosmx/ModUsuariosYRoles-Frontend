import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';
const ROLE_API = 'http://localhost:8080/api/role/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  roles: string[];
  isloggedIn = false;

  constructor(private http: HttpClient) { }

  login(credentials:any): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }
  
  register(user:any): Observable<any> {
    
    console.log(user.role);

    // this.roles = ["admin"];
    
    return this.http.post(AUTH_API + 'signup', {
      name:      user.name,
      lastname:  user.lastname,
      username:  user.username,
      email:     user.email,
      password:  user.password,
      role:      user.role
    }, httpOptions);
  }

  // isLoggedIn() {
  //   const result = new Subject<any>();
  //   this.isloggedIn = !!this.tokenStorageService.getToken();
    
  //   console.log('this.isloggedIn: '+this.isloggedIn);
  //   if (this.isloggedIn){ 
  //     result.next(true); 
  //   }else{
  //     result.next(false); 
  //   }

  //   return result.asObservable();
  // }

  getRole(id:number):Observable<string>{
    return this.http.get<string>(`${ROLE_API + 'getRole'}/${id}`, {withCredentials:true} );
  }

  getId(userName:string):Observable<any>{
    return this.http.get(`${ROLE_API + 'getId' }/${userName}`, {withCredentials:true} );
  }

  getInfo():Observable<any>{
    return this.http.get(AUTH_API + 'details', {withCredentials:true} );
  }
}


