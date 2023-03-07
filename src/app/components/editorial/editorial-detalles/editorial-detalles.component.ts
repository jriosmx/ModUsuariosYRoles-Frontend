import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Editorial } from 'src/app/models/Editorial';
import { EditorialService } from 'src/app/_services/editorial.service';

@Component({
  selector: 'app-editorial-detalles',
  templateUrl: './editorial-detalles.component.html',
  styleUrls: ['./editorial-detalles.component.css']
})
export class EditorialDetallesComponent implements OnInit {

  id:number;
  editorial:Editorial;

  title:string = "Detalles de la Editorial"

  constructor(private route:ActivatedRoute, private editorialService:EditorialService, private router:Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.editorial = new Editorial();
    this.editorialService.obtenerEditorialPorId(this.id).subscribe(dato => {
      this.editorial = dato;
    });
  }

  regresar(){
    this.router.navigate(['editoriales']);
  }

}
