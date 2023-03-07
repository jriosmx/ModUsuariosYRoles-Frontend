import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Categoria } from 'src/app/models/Categoria';
import { Libro } from 'src/app/models/Libro';
import { LibroService } from 'src/app/_services/libro.service';

interface Author {	
  id:number,
	name: string;	
}

interface Category{
  id:number,
	categoria: string;	
}

interface Editor{
  id:number,
	editorial: string;	
}

@Component({
  selector: 'app-libro-detalles',
  templateUrl: './libro-detalles.component.html',
  styleUrls: ['./libro-detalles.component.css']
})
export class LibroDetallesComponent implements OnInit {

  public book: {
		authors: Author[];
	};

  id:number;
  showLabel:boolean = false;
  title:string = "Detalles del Libro";
  libro:Libro;
  categoria:String;
  editorial:String="";
  img:String="";
  IDs:number[] = [];

  category:Category;
  editor:Editor;

  constructor(private route:ActivatedRoute, private libroService:LibroService, private router:Router) { 
    this.book = {
			authors: []
		};
  }

  ngOnInit(): void {
    let self = this;
    this.id = this.route.snapshot.params['id'];
    
    this.libro = new Libro();
    this.libroService.obtenerLibroPorId(this.id).subscribe(res => {
      this.libro = res;

      

      // cargo la imagen de portada
      this.img = this.libro.portada;
      
      // calculo la fecha
      let d = new Date(this.libro.fechaDeLanzamiento);
      let dd = String(d. getDate()). padStart(2, '0');
      let mm = String(d. getMonth() + 1). padStart(2, '0'); //January is 0!
      let yyyy = d. getFullYear();

      let date = mm + '/' + dd + '/' + yyyy;
      this.libro.fechaDeLanzamiento = date;

      // obtengo el `nombre` de la categoria seleccionada con un `observable`
      this.findCategoriaName(this.libro.idCategoria).subscribe(
        status => {
          if (status) {
            // console.log("this.libro.idCategoria: "+this.libro.idCategoria);
            // console.log('Completed!!!'); 

            // obtengo el `nombre` de la editorial 
            this.findEditorialName(this.libro.idEditorial).subscribe(
              status => {
                if (status) {
                  
                  // console.log('this.libro.idFichaAutores: '+this.libro.idFichaAutores)

                  this.findAuthorsIDs(this.libro.idFichaAutores).subscribe(
                    status => {
                      if (status) {    

                        this.findAuthorsNames(this.IDs).subscribe(
                          status => {
                            if (status) {
                              // console.log('Completed!!!');
                            }
                          }
                        )
                        
                      }
                    }
                  )
                }
              }
            );
          }
        }
      );

    },
    );
        
  }  

  findCategoriaName(id:number){
    const result = new Subject<any>();

    this.libroService.obtenerNombreCategoriaPorID(id).subscribe(      
      res => { // Success   
        this.category = res;     
        this.categoria = this.category.categoria;   
                
        result.next(true);
      },
      error => { // handle error
        console.log(error);
        result.next(false);
      } 
    );

    return result.asObservable();
  }

  findEditorialName(id:number) {
    const result = new Subject<any>();

    this.libroService.obtenerNombreEditorialPorID(id).subscribe(            
      res => { // Success 
         
        this.editor = res;     
        this.editorial = this.editor.editorial;   
        result.next(true);
      },
      error => { // handle error
        result.next(false);
      } 
    );

    return result.asObservable();
  }

  findAuthorsIDs(id:number) {
    const result = new Subject<any>();

    this.libroService.obtenerIDsAutoresPorIdFichaAutores(id).subscribe(            
      res => { // Success 
        // console.log("ressss: " + res);               
        this.IDs = res;  
        // console.log("this.IDs: " + this.IDs);       
        result.next(true);
      },
      error => { // handle error
        result.next(false);
      } 
    );

    return result.asObservable();
  }

  findAuthorsNames(IDs:number[]) {
    const result = new Subject<any>();

    this.libroService.obtenerNombresAutoresPorId(IDs).subscribe(            
      names => { // Success 

        for(let i=0; i<names.length; i++){
        this.book.authors.push({			
          id: 0,
          name: ""+names[i],			
        });   
       }                   
        // console.log("this.IDs: " + this.IDs);       
        result.next(true);
      },
      error => { // handle error
        result.next(false);
      } 
    );

    return result.asObservable();
  }

  regresar(){
    this.router.navigate(['libros']);
  }

}
