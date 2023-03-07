import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  message:string | null;
  userRolesId:string;
  userId:number;

  constructor(private router: Router,
             ) { }

  signOut(): void {
    window.sessionStorage.removeItem("userName");
    window.sessionStorage.removeItem("userRolesId");
    window.sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY)  || '';
  }

  public saveUser(user:any): void {
    window.sessionStorage.setItem('role', JSON.stringify(user));
  }

  public saveRole(role:any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(role));
  }

  public getUser(): any {
    return JSON.parse(sessionStorage.getItem(USER_KEY) || '{}' );
  }

  // ******************* Local Auth Service *******************
  // public getState(){
  //   return localStorage.getItem("isLogged")
  // }

  // public isLogged():boolean {
  //   return this.getState()?true:false;    
  // }

  // public getId(userName: string){
  //   const result = new Subject<any>();
   
  //   this.authService.getId(userName).subscribe(     
  //     id => { // Success   
  //       this.userId = id;
  //       result.next(true);               
  //     },
  //     error => { // handle error       
  //       // console.log(error)      
  //       result.next(false);
  //     } 
  //   );

  //   return result.asObservable();
  // }

  // public setLoggedState(token: string, userName: string):void {
  //   window.localStorage.removeItem("isLogged");
  //   window.localStorage.setItem("isLogged", token);
  //   window.localStorage.setItem("userName", userName);

  //   this.getId(userName).subscribe(
  //     status => { 
  //       if(status){ 

  //         console.log('status1: '+status +" this.userId: "+this.userId)
  //         // this.getRole(this.userId).subscribe(
  //         //   status => { 

  //         //     console.log('status2: '+status)              
  //         //     if(status){ 
  //         //       window.localStorage.setItem("userRolesId", this.userRolesId);                
  //         //       console.log('self.userRolesId: '+this.userRolesId)   
  //         //     }
  //         //   }
  //         // )

  //       }
  //     });

  //   this.message = window.localStorage.getItem("userName") ?? "";
  // }


}
