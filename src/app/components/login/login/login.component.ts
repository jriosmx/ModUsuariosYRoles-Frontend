import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LoginUser } from 'src/app/models/LoginUser';
import { Usuario } from 'src/app/models/Usuario';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginForm') loginForm: NgForm;
  
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  role:string;

  title:String = "Acceso";
  usuario:Usuario = new Usuario();
  newPasswd:String = "";

  loginUser:LoginUser = new LoginUser();
  
  userRolesId:string;
  userId:number;

  constructor(private authService: AuthService, 
              private tokenStorage: TokenStorageService,
              private router:Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }  

  onSubmit(){

    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;

        console.log(this.roles);
        if ( this.roles ==  undefined){
          
          console.log("this.form.username: "+this.form.username);
          
          let user = this.form.username;
          window.localStorage.setItem("userName", user);

          this.getId(this.form.username).subscribe(
            status => { 
              if(status){ 
      
                // console.log('status1: '+status +" this.userId: "+this.userId)
                this.getRole(this.userId).subscribe(
                  status => { 
      
                    // console.log('status2: '+status)              
                    if(status){ 
                      window.localStorage.setItem("userRolesId", this.userRolesId); 
                      this.router.navigate(['/'])               
                      // console.log('self.userRolesId: '+this.userRolesId)   
                    }
                  }
                )
      
              }
            })

        }

        let self = this;
        setTimeout(function () {

          let content = document.createElement('div');
          content.innerHTML = 'Bienvenido al sistema!!!';
            
          Swal.fire({title: 'Acceso',
                    html: content,
                    icon: 'success'})
              .then(function () {
                                
                self.router.navigate(['/'])
                .then(() => {
                  window.location.reload();
                });

              });
          
        }, 1000);

        
      },
      err => {
       
        
        // console.log(err.status == 401);

        let self = this;
        setTimeout(function () {

          let content = document.createElement('div');
          content.innerHTML = 'Revise sus credenciales!!!';
          
          Swal.fire({title: 'Acceso',
                    html: content,
                    icon: 'error'    })
            .then(function () {
              
                self.router.navigate(['login']);
                self.errorMessage = err.message;
                self.isLoginFailed = true;
                // console.log(self.errorMessage);
            });
        
          }, 1000);
        }
    );
    
    // this.login(this.loginUser);

    // let self = this;
    // this.auth(this.usuario).subscribe(
    //   status => { 
    //     if(status){ 

    //       this.getUser(self.usuario.email).subscribe(
    //         status => { 
    //           if(status){ 
    //               this.app.setAuthenticated(true);                  
    //               this.router.navigate(['/']);   
    //           }
    //         }
    //       );

    //     }
    //   }
    // );          
  }      

  // auth(user:Usuario){
  //   const result = new Subject<any>();
    
  //   this.usuarioService.authenticate(user).subscribe(
  //     res => { // Success     
  //       // console.log('res: '+res);
  //       result.next(true);
  //     },error => { // handle error
  //       result.next(false);
  //     }
  //   ); 
  //   return result.asObservable();
  // }  

  // getUser(email:string){
  //   const result = new Subject<any>();
    
  //   this.usuarioService.obtenerUsuarioPorEmail(email).subscribe(
  //     res => { // Success            
  //       // this.app.setMessage(res.userName);
  //       result.next(true);
  //     },error => { // handle error
  //       result.next(false);
  //     }
  //   ); 
  //   return result.asObservable();
  // }

  // check(){
    
  // }

  public getId(userName: string){
    const result = new Subject<any>();
   
    this.authService.getId(userName).subscribe(     
      id => { // Success   
        this.userId = id;
        result.next(true);               
      },
      error => { // handle error       
        // console.log(error)      
        result.next(false);
      } 
    );

    return result.asObservable();
  }
  
  public getRole(id:number){
    const result = new Subject<any>();
   
    this.authService.getRole(id).subscribe(     
      res => { // Success   
        // console.log("Entra")
        this.userRolesId = ""+res;                                      
        result.next(true);               
      },
      error => { // handle error   
        // console.log(error)     
        result.next(false);
      } 
    );

    return result.asObservable();
  }


  onTextChange(value: any): void {          
    this.confirmedValidator();
  }

  confirmedValidator() {
    if(this.newPasswd !== this.usuario.password){
      // activa el error        
      this.loginForm.form.controls['newPasswd'].setErrors({'confirmedValidator': true});    
      return;
    }

    this.loginForm.form.controls['newPasswd'].setErrors(null);    
  }

  cancelar(){
    this.router.navigate(['/']);
  }

  // login(login:LoginUser){  
  //   this.authSrv.login(login).subscribe((res)=>{
  //     // console.log(res);
  //     this.localAuthService.setLoggedState('true', login.userName); 
  //     // this.localAuthService.message = login.userName;

  //     let self = this;
  //     setTimeout(function () {

  //       let content = document.createElement('div');
  //       content.innerHTML = 'Bienvenido al sistema!!!';
        
  //       Swal.fire({title: 'Acceso',
  //                 html: content,
  //                 icon: 'success'})
  //         .then(function () {
            
  //             self.router.navigate(['/']);
            
  //         });
      
  //   }, 1000);
  //   }, err => {
  //     // console.log("revise sus credenciales")
  //     // console.log(err)
  //     let self = this;
  //     setTimeout(function () {

  //       let content = document.createElement('div');
  //       content.innerHTML = 'Revise sus credenciales!!!';
        
  //       Swal.fire({title: 'Acceso',
  //                 html: content,
  //                 icon: 'error'    })
  //         .then(function () {
            
  //             self.router.navigate(['login']);
            
  //         });
      
  //   }, 1000);
  //   }
      
  //   )
  // }
  
}