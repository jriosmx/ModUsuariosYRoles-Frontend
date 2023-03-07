import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/models/Categoria';
import { CategoriaService } from 'src/app/_services/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualiza-categoria',
  templateUrl: './actualiza-categoria.component.html',
  styleUrls: ['./actualiza-categoria.component.css']
})
export class ActualizaCategoriaComponent implements OnInit {

  id:number;
  categoria:Categoria = new Categoria();
  flag:string  = "";

  title:string = "Editar Categoría"

  constructor(private categoriaService:CategoriaService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.categoriaService.obtenerCategoriaPorId(this.id).subscribe(dato =>{
      this.categoria = dato;
    },error => console.log(error));
  }

  actualizaCategoria() {
    
    let self = this;
    this.categoriaService.actualizarCategoria(this.id, this.categoria).subscribe(dato => {
      //console.log(dato);
      setTimeout(function () {

        let content = document.createElement('div');
        content.innerHTML = 'La categoría: <strong>'+ self.categoria.categoria +'</strong>, ha sido <strong>actualizada</strong> con exito!!!';


        Swal.fire({title: 'Categoría actualizada',
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
              // self.router.navigate(['/']);
              self.irAlaListaDeCategorias();
            }
          });
      }, 1000);

    }, error => console.log(error));
  }

  onSubmit(): void {
    // this.categoriaService.actualizarCategoria(this.id, this.categoria).subscribe(dato => {
    //   this.irAlaListaDeCategorias();
    // },error => console.log(error));
    this.actualizaCategoria();
  }

  irAlaListaDeCategorias(){
    this.router.navigate(['/categorias']);
    // Swal.fire('Categoría actualizada',`La categoría ${this.categoria.categoria} ha sido actualizada con exito`,`success`);
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
      this.router.navigate(['categorias']);
    }
  }
  

  

}
