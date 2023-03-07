import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/models/Categoria';
import { CategoriaService } from 'src/app/_services/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  title:string = "Nueva Categoría";
  flag:string  = "";

  categoria : Categoria = new Categoria();
  constructor(private categoriaServicio:CategoriaService,private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    
  }

  guardarCategoria() {
    
    let self = this;
    this.categoriaServicio.registrarCategoria(this.categoria).subscribe(dato => {
      console.log(dato);
      setTimeout(function () {

        let content = document.createElement('div');
        content.innerHTML = 'La categoría: <strong>'+ self.categoria.categoria +'</strong>, ha sido registrada con exito!!!';


        Swal.fire({title: 'Categoría registrada',
        html: content,
        icon:    `success`})
          .then(function () {
            if (self.hayFlag() == true) {
              // this.router.navigate(['libro',{flag: this.hayFlag()}]);
              
              let autoresLen = self.route.snapshot.queryParams['autores'];

              //  obtengo el valor de la caja de texto `categoria`
              const categoriaValue = document.getElementById('categoria') as HTMLInputElement | null;
              // guardo el valor de la variable `categoriaValue` en una variable de sesion llama `categoria`
              sessionStorage.setItem('categoria', ''+categoriaValue?.value);  
              // redirecciono a `libro` con la `bandera levantada`
              window.location.href = 'libro?flag=true&autores='+autoresLen;
            } else {
              self.router.navigate(['/']);
            }
          });
      }, 1000);

    }, error => console.log(error));
  }

  // irALaListaDeAutores(){
  //   this.router.navigate(['/autores']);
  //   Swal.fire('Empleado registrado',`El empleado ${this.autor.autor} ha sido registrado con exito`,`success`);
  // }

  onSubmit(){
    this.guardarCategoria();
  }

  hayFlag():boolean{
    this.flag = this.route.snapshot.queryParams['flag'];
    if(this.flag != undefined)
      return true;
    else
      return false;
  }

  check(){
    if( this.hayFlag() ){
      window.location.href = 'libro?flag=true';
    }else{
      this.router.navigate(['/']);
    }
  }
  
}
