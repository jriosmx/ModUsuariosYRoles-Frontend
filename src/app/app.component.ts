import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './_services/auth.service';
import { TokenStorageService } from './_services/token-storage.service';

export let browserRefresh = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Biblioteca';

  private roles: string[];
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;

  subscription: Subscription;

  currentUser: any;
  isLoggedIn = false;
  role:any;
  roleId:any;

  isLogout=false;

  constructor(private tokenStorageService: TokenStorageService,
              private router: Router) {
    
            
    // When the web page gets refresh, gets the status (Loggedin and Roles)
    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
        // console.log('browserRefresh: ' +browserRefresh)

        // console.log('this.isLoggedIn: '+this.isLoggedIn)

       // refresco la pagina y cargo el usuario
       if(browserRefresh && this.isLoggedIn){
        
        // console.log('entra aqui!!! ')

        if(window.localStorage.getItem("userRolesId") != null && window.localStorage.getItem("userRolesId") !== "" &&
           window.localStorage.getItem("userRolesId") !== undefined && window.localStorage.getItem("userName") != undefined &&
           window.localStorage.getItem("userName") != null && window.localStorage.getItem("userName") !== "" ){
          
          this.username = window.localStorage.getItem("userName") ?? "";
          this.roleId   = window.localStorage.getItem("userRolesId") ?? "";
          
          if( this.roleId == 1 ){
            this.role = "ROLE_USER";          
          }else{
            this.role = "ROLE_ADMIN";       
          }

          this.isLoggedIn = true;
          this.isLogout = false;
        }   
      }
        
      }
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    // console.log('this.isLoggedIn: '+this.isLoggedIn);
    
    // this.isLoggedIn= false;
    
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.currentUser = this.tokenStorageService.getUser();
      this.roles = user.roles;

      // console.log('this.currentUser: '+this.currentUser);

      // this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      // this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
      
    }
  }

  logout(): void {

    this.role = "";
    this.isLoggedIn = false;
    this.isLogout = true;

    window.sessionStorage.clear();
  }

}
