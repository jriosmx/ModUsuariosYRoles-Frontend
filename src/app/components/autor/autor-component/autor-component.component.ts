import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Autor } from '../../../models/Autor';
import Swal from 'sweetalert2';
import { AutorService } from 'src/app/_services/autor.service';

@Component({
  selector: 'app-autor-component',
  templateUrl: './autor-component.component.html',
  styleUrls: ['./autor-component.component.css']
})
export class AutorComponentComponent implements OnInit {

  title:string = "Nuevo Autor";
  flag:string  = "";

  autor : Autor = new Autor();

  constructor(private autorServicio:AutorService,private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    (function ($) {

      $(document).ready(function(){        
        $('input').attr('autocomplete','off');  // desactiva el `autocomplete` en cada input text        
      });

    })(jQuery);
  }

  guardarAutor(){

    let self = this;
    this.autorServicio.registrarAutor(this.autor).subscribe(dato => {
      console.log(dato);

      setTimeout(function () {

        let content = document.createElement('div');
        content.innerHTML = 'El autor: <strong>'+ self.autor.autor +'</strong>, ha sido registrado con exito!!!';

        Swal.fire({ title: 'Autor registrado',
                    html: content,
                    icon: `success`})
          .then(function () {
            if (self.hayFlag() == true) {
              // this.router.navigate(['libro',{flag: this.hayFlag()}]);
              
              let autoresLen = self.route.snapshot.queryParams['autores'];
              let index = self.route.snapshot.queryParams['cursor'];

              // obtengo el valor de la caja de texto `categoria`
              const autorValue = document.getElementById('autor') as HTMLInputElement | null;
              // guardo el valor de la variable `categoriaValue` en una variable de sesion llama `categoria`
              sessionStorage.setItem(''+index, ''+autorValue?.value);  
              // redirecciono a `libro` con la `bandera levantada`
              window.location.href = 'libro?flag=true&autores='+autoresLen;
            } else {
              self.router.navigate(['/']);
            }
          });
      }, 1000);
      
    },error => console.log(error));

  }

  // irALaListaDeAutores(){
  //   this.router.navigate(['/autores']);
  //   Swal.fire('Empleado registrado',`El empleado ${this.autor.autor} ha sido registrado con exito`,`success`);
  // }

  hayFlag():boolean{
    this.flag = this.route.snapshot.queryParams['flag'];
    if(this.flag != undefined)
      return true;
    else
      return false;
  }

  onSubmit(){
    this.guardarAutor();
  }

  check(){
    if( this.hayFlag() ){
      window.location.href = 'libro?flag=true';
    }else{
      this.router.navigate(['/']);
    }
  }

}
