import { parseTemplate } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css']
})

export class NuevoUsuarioComponent implements OnInit {

  @ViewChild('loginForm') loginForm: NgForm;
  
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  isLoggedIn = false;

  title:String = "Nuevo Usuario";
  
  usuario:Usuario = new Usuario();
  newPasswd:String = "";
  
  currentUser: any;
  role:any;
  roleId:any;

  constructor(  private router:Router, 
                private authService: AuthService,               
                private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {    

    this.currentUser = this.tokenStorageService.getUser();   
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    this.roleId   = window.localStorage.getItem("userRolesId") ?? "";
          
          if( this.roleId == 1 ){
            this.role = "ROLE_USER";          
          }else{
            this.role = "ROLE_ADMIN";       
          }
  }

  selectUserChange(event:any){
    
    let selecetedItem=event.target.value;
    console.log("selecetedItem: "+selecetedItem);
      // self.usuario.roles = self.roleTypes[i].value;
    // this.usuario.roles = ["[{'role':'"+selecetedItem+"'}],"]; 
    if(selecetedItem == "ROLE_ADMIN"){
      this.usuario.role = ["admin"];
    }else{
      this.usuario.role = ["user"];
    }

    (document.querySelector('#role') as HTMLElement).style.backgroundColor = '#E8F0FE';
    (document.querySelector('#role') as HTMLElement).classList.add('is-valid')
  }

  onSubmit(){

    this.authService.register(this.form).subscribe(
      response => {
        
        console.log(response);
        
        if( response.message === 'User registered successfully!'){

            
            this.isSuccessful = true;
            this.isSignUpFailed = false;

            let self = this;
            setTimeout(function () {
      
              let content = document.createElement('div');
              content.innerHTML = 'Bienvenido al sistema!!!';
              
              Swal.fire({title: 'Acceso',
                        html: content,
                        icon: 'success'})
                .then(function () {
                  
                    self.router.navigate(['/']);
                  
                });
            
          }, 1000);
        }
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
    
    
    // this.authService.register(this.usuario).subscribe(response => {
    
    // });
    
  }

  check(){
    this.router.navigate(['/']); 
  }

  onTextChange(value: any): void {          
    this.confirmedValidator();
  }

  onTextChangeSobreNombre(value: any): void {          
  
  //  if( this.usuario.userName != "" ){
  //   this.usuarioService.obtenerSobreNombre(this.usuario.userName).subscribe(isTaken => {      
  //     console.log('isTaken: '+isTaken);
  //     if(isTaken){
  //       // activa el error 
  //       this.loginForm.form.controls['username'].setErrors({'isTaken': true});             
  //     }

  //   }); 
  //  }
  }

  onTextChangeEmail(value: any): void {          
  
    // if( this.usuario.email != "" ){
    //  this.usuarioService.obtenerEmail(this.usuario.email).subscribe(isTaken => {      
       
    //    if(isTaken){
    //      // activa el error 
    //      this.loginForm.form.controls['email'].setErrors({'isTaken': true});             
    //    }
 
    //  }); 
    // }
   }

  confirmedValidator() {
    if(this.newPasswd !== this.form.password){
      // activa el error        
      this.loginForm.form.controls['newPasswd'].setErrors({'confirmedValidator': true});    
      return;
    }

    this.loginForm.form.controls['newPasswd'].setErrors(null);    
  }

  

}
