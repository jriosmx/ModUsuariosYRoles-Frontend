import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Autor } from 'src/app/models/Autor';
import { AutorService } from 'src/app/_services/autor.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-actualizar-autor-component',
  templateUrl: './actualizar-autor-component.component.html',
  styleUrls: ['./actualizar-autor-component.component.css']
})
export class ActualizarAutorComponentComponent implements OnInit {

  id:number;
  // autor:Autor = new Autor();

  // form: any = {};
  title:string = 'Editar Autor';
  flag:string  = "";

  autor : Autor = new Autor();

  constructor(private autorService:AutorService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.autorService.obtenerAutorPorId(this.id).subscribe(dato =>{
      this.autor = dato;
      // console.log('dato: '+dato)
    },error => console.log(error));
  }

  onSubmit(): void {
    this.autorService.actualizarAutor(this.id, this.autor).subscribe(dato => {
      this.irAlaListaDeAutores();
    },error => console.log(error));
  }

  irAlaListaDeAutores(){
    
    let self = this;
    setTimeout(function () {

    let content = document.createElement('div');
    content.innerHTML = 'El autor: <strong>'+ self.autor.autor +'</strong>, ha sido  <strong>actualizado</strong> con exito!!!';

    Swal.fire({ title: 'Autor actualizado',
                    html: content,
                    icon: `success`})
          .then(function () {
          
            self.router.navigate(['/autores']);
            } )
          
      }, 1000);

  }

  cancelar(){
    this.router.navigate(['autores']);
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
      this.router.navigate(['autores']);
    }
  }
}


