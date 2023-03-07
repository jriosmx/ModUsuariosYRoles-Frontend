import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Editorial } from 'src/app/models/Editorial';
import { EditorialService } from 'src/app/_services/editorial.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualiza-editorial',
  templateUrl: './actualiza-editorial.component.html',
  styleUrls: ['./actualiza-editorial.component.css']
})
export class ActualizaEditorialComponent implements OnInit {

  id:number;
  editorial:Editorial = new Editorial();

  title:string = "Editar Editorial"

  constructor(private editorialService:EditorialService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.editorialService.obtenerEditorialPorId(this.id).subscribe(dato =>{
      this.editorial = dato;
    },error => console.log(error));
  }

  onSubmit(): void {
    this.editorialService.actualizarEditorial(this.id, this.editorial).subscribe(dato => {
      let self = this
      setTimeout(function () {

        let content = document.createElement('div');
        content.innerHTML = 'La editorial: <strong>'+ self.editorial.editorial +'</strong>, ha sido <strong>actualizada</strong> con exito!!!';


        Swal.fire({title: 'Editorial actualizada',
        html: content,
        icon:    `success`})
          .then(function () {   

            self.router.navigate(['/editoriales']);
          
          });
      }, 1000);
    },error => console.log(error));
  }

  irAlaListaDeCategorias(){
    this.router.navigate(['/editoriales']);
    Swal.fire('Editorial actualizada',`La editorial '${this.editorial.editorial}' ha sido actualizada con exito!!!`,`success`);
  }

  cancelar(){
    this.router.navigate(['editoriales']);
  }

}
