import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualiza-password',
  templateUrl: './actualiza-password.component.html',
  styleUrls: ['./actualiza-password.component.css']
})
export class ActualizaPasswordComponent {

  @ViewChild('updateForm') updateForm: NgForm;

  title:String = "Actualizar Contraseña";

  suario:Usuario   = new Usuario();
  password:string  ="";
  newPasswd:String = "";
  
  currentUser: any;
  role:any;
  roleId:any;
  id:number;
  username:string;

  constructor(  private router:Router,
    private route: ActivatedRoute, 
    private userService: UserService, 
    private authService: AuthService,               
    private tokenStorageService: TokenStorageService) { }
    
    
    confirmedValidator() {
      if(this.newPasswd !== this.password){
        // activa el error        
        this.updateForm.form.controls['newPasswd'].setErrors({'confirmedValidator': true});    
        return;
      }
  
      this.updateForm.form.controls['newPasswd'].setErrors(null);    
    }
    
    onTextChange(value: any): void {          
      this.confirmedValidator();
    }

    onSubmit(){
       // obtengo el parametro `id` mandado por metodo GET
      this.username = this.route.snapshot.params['username'];
      // obtengo el parametro `id` mandado por metodo GET
      this.id = this.route.snapshot.params['id'];
      // obtengo el `libro` dado el `id` como `parametro`
      let self = this;

      this.userService.updatePasswd(this.id, this.password).subscribe(
        response => {
                    
          
          if( response.message === 'User updated successfully!'){
  
              let content = document.createElement('div');
              content.innerHTML = 'El usuario: <strong>' + this.username + '</strong>, ha sido <strong>actualizado</strong> con exito!!!';
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
        });
         
    }
      
    check(){
      this.router.navigate(['usuarios']); 
    }
  }
  