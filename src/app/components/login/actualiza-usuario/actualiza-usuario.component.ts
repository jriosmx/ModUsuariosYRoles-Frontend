import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Usuario } from 'src/app/models/Usuario';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualiza-usuario',
  templateUrl: './actualiza-usuario.component.html',
  styleUrls: ['./actualiza-usuario.component.css']
})
export class ActualizaUsuarioComponent {

  @ViewChild('updateForm') updateForm: NgForm;

  // form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  isLoggedIn = false;

  title:String = "Editar Usuario";
  
  usuario:Usuario = new Usuario();
  newPasswd:String = "";
  
  currentUser: any;
  role:any;
  roleId:any;
  id:number;
  options:any;

  constructor(  private router:Router,
                private route: ActivatedRoute, 
                private userService: UserService, 
                private authService: AuthService,               
                private tokenStorageService: TokenStorageService) {                   

                }

  ngOnInit(): void {  

    this.currentUser = this.tokenStorageService.getUser();   
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    // obtengo el parametro `id` mandado por metodo GET
    this.id = this.route.snapshot.params['id'];    
     // obtengo el `usuario` dado el `id` como `parametro`
    let self = this;
    this.userService.getUserByID(this.id).subscribe(res =>{
      // asigno la informacion regresada del `usuario` por el `Backend` y la asigno a mi variable 'usuario'
      this.usuario = res;

      self.getRol(this.usuario.id).subscribe(
        status => { 
          if(status){ 

            // esta funcion sirve para cargar los estilos, 
            // cuando toda la pagina esta cargada
            // window.addEventListener('load', function () {              
            //   self.applyStyle()
            // })            

          }
        }
      );

    })
    
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

     selectUserChange(event:any){
    
      let selecetedItem=event.target.value;
      // console.log("selecetedItem: "+selecetedItem);
        // self.usuario.roles = self.roleTypes[i].value;
      // this.usuario.roles = ["[{'role':'"+selecetedItem+"'}],"]; 
      // this.usuario.rol = selecetedItem;
        // this.usuario.roles = 0;
       
      (document.querySelector('#role') as HTMLElement).style.backgroundColor = '#E8F0FE';
      (document.querySelector('#role') as HTMLElement).classList.add('is-valid')
    }

    onTextChange(value: any): void {          
      this.confirmedValidator();
    }

    confirmedValidator() {
      if(this.newPasswd !== this.usuario.password){
        // activa el error        
        this.updateForm.form.controls['newPasswd'].setErrors({'confirmedValidator': true});    
        return;
      }
  
      this.updateForm.form.controls['newPasswd'].setErrors(null);    
    }

    onSubmit(){

      // obtengo el parametro `id` mandado por metodo GET
      this.id = this.route.snapshot.params['id'];
      // obtengo el `libro` dado el `id` como `parametro`
      let self = this;

      if( this.options == "ROLE_ADMIN"){
        this.usuario.role = ["admin"];
      }else{
        this.usuario.role = ["user"];
      }

      this.userService.updateUser(this.id, this.usuario).subscribe(
        response => {
          
          console.log(response);
          
          if( response.message === 'User updated successfully!'){
  
              
              this.isSuccessful = true;
              this.isSignUpFailed = false;
  
              let self = this;             

              let content = document.createElement('div');
              content.innerHTML = 'El usuario: <strong>' + this.usuario.name + '</strong>, ha sido <strong>actualizado</strong> con exito!!!';
              setTimeout(function () {
                Swal.fire({
                  title: 'Editar Usuario',
                  html: content,
                  icon: 'success'
                })
                  .then(function () {

                    self.router.navigate(['usuarios']);

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
      this.router.navigate(['usuarios']); 
    }

    getRol(id:number) {
      const result = new Subject<any>();
         
      let self = this;    
      this.userService.getRole(id).subscribe(      
        roleId => { // Success  
          
         
          if( roleId == 1 ){
            this.role = "ROLE_USER"; 
            this.options = "ROLE_USER";
          }else{
            this.role = "ROLE_ADMIN";
            this.options = "ROLE_ADMIN"  
          }

          result.next(true);
        },
        error => { // handle error
          result.next(false);
        } 
      );
  
      return result.asObservable();
    }   
    
    // applyStyle(){
    //   (document.querySelector('#role') as HTMLElement).style.backgroundColor = '#E8F0FE';
    //   (document.querySelector('#role') as HTMLElement).classList.add('is-valid') 
    // }



}
