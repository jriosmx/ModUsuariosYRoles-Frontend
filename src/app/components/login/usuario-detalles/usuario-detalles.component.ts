import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Libro } from 'src/app/models/Libro';
import { Usuario } from 'src/app/models/Usuario';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-usuario-detalles',
  templateUrl: './usuario-detalles.component.html',
  styleUrls: ['./usuario-detalles.component.css']
})
export class UsuarioDetallesComponent {

  id:number;
  title:string = "Detalles del Usuario";
  usuario:Usuario;
  

  constructor(private route:ActivatedRoute, private userService:UserService, private router:Router) { 
    
  }

  ngOnInit(): void {
    let self = this;
    this.id = this.route.snapshot.params['id'];
    
    this.usuario = new Usuario();
    this.userService.getUserByID(this.id).subscribe(res => {
     
      this.usuario = res;     // load user's data

      // get User's Role
      this.findRol(this.id).subscribe(
        status => {
          if (status) {                
            
          }
        }
      )
    });      
  }  

  findRol(id:number) {
    const result = new Subject<any>();

    this.userService.getRole(id).subscribe(            
      roleId => { // Success 
        
        if(roleId == 2){
          this.usuario.role = ["Administrador"];   
        }else{``
          this.usuario.role = ["Usuario"];   
        }            

        result.next(true);
      },
      error => { // handle error
        result.next(false);
      } 
    );

    return result.asObservable();
  }
  
  regresar(){
    this.router.navigate(['usuarios']);
  }
}
