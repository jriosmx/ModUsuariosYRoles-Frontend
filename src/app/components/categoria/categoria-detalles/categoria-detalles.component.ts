import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/models/Categoria';
import { CategoriaService } from 'src/app/_services/categoria.service';

@Component({
  selector: 'app-categoria-detalles',
  templateUrl: './categoria-detalles.component.html',
  styleUrls: ['./categoria-detalles.component.css']
})
export class CategoriaDetallesComponent implements OnInit {

  id:number;
  categoria:Categoria;
  title:string = "Detalles del Autor";

  constructor(private route:ActivatedRoute, private categoriaService:CategoriaService, private router:Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.categoria = new Categoria();
    this.categoriaService.obtenerCategoriaPorId(this.id).subscribe(dato => {
      this.categoria = dato;
    });
  }

  regresar(){
    this.router.navigate(['categorias']);
  }

}
