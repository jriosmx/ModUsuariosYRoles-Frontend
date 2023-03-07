import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AutorService } from 'src/app/_services/autor.service';
import { Autor } from '../../../models/Autor';

@Component({
  selector: 'app-autor-detalles',
  templateUrl: './autor-detalles.component.html',
  styleUrls: ['./autor-detalles.component.css']
})
export class AutorDetallesComponent implements OnInit {

  id:number;
  autor:Autor;

  title:string = 'Detalles del Autor';

  constructor(private route:ActivatedRoute, private autorService:AutorService, private router:Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.autor = new Autor();
    this.autorService.obtenerAutorPorId(this.id).subscribe(dato => {
      this.autor = dato;
    });
  }

  regresar(){
    this.router.navigate(['autores']);
  }

}
