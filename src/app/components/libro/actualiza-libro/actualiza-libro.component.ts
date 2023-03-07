import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { valHooks } from 'jquery';
import { Subject } from 'rxjs';
import { Autor } from 'src/app/models/Autor';
import { Categoria } from 'src/app/models/Categoria';
import { Editorial } from 'src/app/models/Editorial';
import { Libro } from 'src/app/models/Libro';
import { LibroService } from 'src/app/_services/libro.service';
import Swal from 'sweetalert2';

interface Author {	
  id:number,
	name: string;	
}

@Component({
  selector: 'app-actualiza-libro',
  templateUrl: './actualiza-libro.component.html',
  styleUrls: ['./actualiza-libro.component.css']
})
export class ActualizaLibroComponent implements OnInit {

  @ViewChild('libroForm') libroForm: NgForm;

  title:string = "Editar Libro";

  public book: {
		authors: Author[];
	};
  // este arreglo se usa para obtener las `categorias`
  categorias:Categoria[] = [];
  editoriales:Editorial[] = [];
  autores:Autor[] = [];

  loadData: boolean = false;
  output:string="";  

  flag:boolean=false;
  index:number=0;
  contAuthors:number=0;
  showLabel:boolean = false;
  id:number;

  libro:Libro = new Libro();
  fichaAutores:number[] = [];
  authors: String[] = [];
  authorsIDs: number[] = [];

  // *** ngModels ***
  cat:string = "";
  edit:string = "";

  // imagen
  base64Data: any;
  imageName: any;
  message:string="";
  img:String="";

  constructor(private libroService:LibroService, 
              private route: ActivatedRoute, 
              private httpClient:HttpClient,
              private router:Router) { 

                this.book = {
                  authors: []
                };

              }

  ngOnInit(): void {
    // obtengo el parametro `id` mandado por metodo GET
    this.id = this.route.snapshot.params['id'];
    // obtengo el `libro` dado el `id` como `parametro`
    let self = this;
    this.libroService.obtenerLibroPorId(this.id).subscribe(res =>{
      // asigno la informacion regresada del `libro` por el `Backend`
      this.libro = res;

      // cargo la imagen de portada
      this.img = this.libro.portada;
      this.base64Data = this.libro.portada;

      // cargar los `autores`      
      self.getAutorIDsByIdFichaAutor(this.libro.idFichaAutores).subscribe(
        status => { 
          if(status){ 
            // obtengo los `nombres` de los `autores`
            self.getAuthorsNamesByAuthorsIDs(this.authorsIDs).subscribe( 
              status => { 
                if(status){ 
                 // cargo el `nombre` de la `categoria`
                  self. findCategoriaName(this.libro.idCategoria).subscribe( 
                    status => { 
                      if(status){ 
                        
                        // cargo el `nombre` de la `editorial`
                        self. findEditorialName(this.libro.idEditorial).subscribe( 
                          status => { 
                            if(status){ 
                                                    
                            } 
                          }
                        );
                       
                      } 
                    }
                  );

                } 
              }
            );

          }
        }
      );

      // calculo la fecha
      let d = new Date(this.libro.fechaDeLanzamiento);
      let dd = String(d. getDate()). padStart(2, '0');
      let mm = String(d. getMonth() + 1). padStart(2, '0'); //January is 0!
      let yyyy = d. getFullYear();

      // let date = mm + '/' + dd + '/' + yyyy;
      let date = yyyy + '-' + mm + '-' + dd;
      this.libro.fechaDeLanzamiento = date;

    },error => console.log(error));

  }

  onSelectFile(event:any) {
    let self = this;
    if (event.target.files.length === 0)
      return;

    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Solo imágenes son soportadas";
      return;
    }else{
      this.message = "";
    }
    if( mimeType === 'image/jpeg' || mimeType === 'image/png' ){
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        
        reader.onload = (e: any) => { // called once readAsDataURL is completed
          $('#img').attr('src', e.target.result);
          // this.imageName = e.target.result;            
          self.base64Data =  e.target.result;               // aqui asigno los caracteres de la imagen 'base64Data'            
          // console.log('base64Data: '+ self.base64Data);
        }
  
        reader.readAsDataURL(event.target.files[0]); // read file as data url
    
    }else{
      this.message = "Tipo de archivo invalido, solo JPEG y PNG es permitido!!!";
      $('#img').attr('src', './assets/img/nope-not-here.png');
      return;
    }
  }
}

// subscription: Subscription;
  onSubmit(){

    // valido autores, categoria y editorial
    this.validarAutorCategoriaEditorial();  

    // console.log("this.base64Data: "+this.base64Data)
    if( this.base64Data == "" || this.base64Data == undefined || this.base64Data == 'undefined'){
      this.message = "Tipo de archivo invalido, solo JPEG y PNG es permitido!!!";
      $('#img').attr('src', './assets/img/nope-not-here.png');
      return;
    }

    let self = this;
    this.getAutorIDsByNames().subscribe(
      status => { 
        if(status){ 
          // insertar en la tabla ficha autores this.authorsIDs
          // console.log('this.authorsIDs: '+this.authorsIDs);
          this.fichaAutoresUpdate(this.libro.idFichaAutores, this.authorsIDs).subscribe(
            status => { // success
              if (status) {                           
              // obtengo el `id` de la categoria seleccionada con un `observable`
              this.findCategoriaId().subscribe(
                status => {
                  if (status) {
                    // console.log("this.libro.idCategoria: "+this.libro.idCategoria);
                    // console.log('Completed!!!'); 

                    // obtengo el `id` de la editorial seleccionada
                    this.findEditorialId().subscribe(
                      status => {
                        if (status) {
                          // console.log("this.libro.idEditorial: "+this.libro.idEditorial);
                          // console.log('Completed!!!'); 

                          this.libro.portada = this.base64Data;  //guardo la los `bits` de la imagen en el campo portada
                          // mando la peticion para guardar el libro en el backend
                          this.libroService.actualizarLibro(this.id, this.libro).subscribe(dato => {
                            setTimeout(function () {

                                let content = document.createElement('div');
                                content.innerHTML = 'El libro: <strong>'+ self.libro.titulo +'</strong>, ha sido <strong>editado</strong> con exito!!!';
                                
                                Swal.fire({title: 'Libro editado',
                                          html: content,
                                          icon:    `success`})
                                  .then(function () {
                                    
                                      self.router.navigate(['libros']);
                                    
                                  });
                              
                            }, 1000);
                          });
                        }
                      }
                    );
                  }
                }
              );
            } 
          }
        );
      }
    });    
  }  

  fichaAutoresUpdate(idFichaAutores:number, authorsIDs:number[]){
    const result = new Subject<any>();
    
    this.libroService.actualizarFichaAutores(idFichaAutores, authorsIDs).subscribe(      
      res => { // Success             
        
        result.next(true);
      },
      error => { // handle error
        result.next(false);
      } 
    );

    return result.asObservable();
  }

  // Con este metodo `valido` si el autor, la categoria o la editorial existen en la Base de Datos
  validarAutorCategoriaEditorial(){

    // obtengo los IDs de los `autores` seleccionados
    this.getAutorIDsByNames().subscribe(
      status => { 
        if(status){

          // obtengo el `id` de la categoria seleccionada
          this.findCategoriaId().subscribe(
            status => {
              if (status) {

                // obtengo el `id` de la editorial seleccionada
                this.findEditorialId().subscribe(
                  status => {
                    if (status) {

                    }
                  }
                );              
              }
            }
          );
        }
      }
    );    
  }


  findCategoriaName(idCategoria:number){
    const result = new Subject<any>();
    this.libroService.obtenerNombreCategoriaPorID(idCategoria).subscribe(      
      res => { // Success   
        if( res == null ){  
          // activa el error        
          this.libroForm.form.controls['categoria'].setErrors({'required':true});    
          // oculta el dropdown-menu 
          $('#categoriaList').fadeOut();                                                  
          result.next(false);
        }else{
          this.cat = ''+res.categoria;
          result.next(true);
        }                  
      },
      error => { // handle error
        result.next(false);
      } 
    );

    return result.asObservable();
  }

  findEditorialName(idEditorial:number){
    const result = new Subject<any>();
    
    this.libroService.obtenerNombreEditorialPorID(idEditorial).subscribe(      
      res => { // Success             
        this.edit = ''+res.editorial;
        result.next(true);
      },
      error => { // handle error
        result.next(false);
      } 
    );

    return result.asObservable();
  }

  getAuthorsNamesByAuthorsIDs(IDs:number[]){
    const result = new Subject<any>();
       
    let self = this;    
    this.libroService.obtenerNombresAutoresPorId(IDs).subscribe(      
      res => { // Success     

        let i=0;
        res.forEach(function(val){
          self.book.authors[i].name = ''+val;
          i++;
        });               
       
        result.next(true);
      },
      error => { // handle error
        result.next(false);
      } 
    );

    return result.asObservable();
  }

  getAutorIDsByIdFichaAutor(idFichaAutor:number) {
    const result = new Subject<any>();
       
    let self = this;    
    this.libroService.obtenerIDsAutoresPorIdFichaAutores(idFichaAutor).subscribe(      
      res => { // Success     

        self.authorsIDs = res;      // asigno los `IDs` de los autores a `authorsIDs`
        if(res.length >= 2){
          this.showLabel = true;
        }

        res.forEach(function(val){
          self.book.authors.push({			
            id: val,
            name: ""
          });
        });
       
        result.next(true);
      },
      error => { // handle error
        result.next(false);
      } 
    );

    return result.asObservable();
  }

  getAutorIDsByNames() {
    const result = new Subject<any>();
    
    let i=0;
    let self = this;
    this.book.authors.forEach(function(val){
      self.authors[i] = val.name;      
      // console.log('self.authors[i]: '+self.authors[i]);
      i++;
    });

    this.libroService.obtenerAutorIDsPorNombre(this.authors).subscribe(      
      res => { // Success   
        if( res == null || res.length == 0){  
            
          i=0;
          this.book.authors.forEach(function(val){
            // activa el error        
            self.libroForm.form.controls[''+i].setErrors({'required':true});    
            // oculta el dropdown-menu 
            $('#autorList'+i).fadeOut();  
            i++;
          });
              
          result.next(false); 
        }else{
          if( res.length != this.book.authors.length ){
          
            i=0;
            this.book.authors.forEach(function(autor){              
            
              self.obtenerAutorIdPorNombre(autor.name, i).subscribe(
                status => { if (status) {} }
              );  

              i++;  
            });

          }else{
            self.authorsIDs = res;
            result.next(true);
          }          
        }           
      },
      error => { // handle error
        result.next(false);
      } 
    );

    return result.asObservable();
  }

  obtenerAutorIdPorNombre(autor:String, index:number){
    const result = new Subject<any>();

    this.libroService.obtenerAutorIdPorNombre(autor).subscribe(     
      res => { // Success      
          if(res == null) {           
            // activa el error        
            this.libroForm.form.controls[''+index].setErrors({'required':true});    
            // oculta el dropdown-menu 
            $('#autorList'+index).fadeOut(); 
            result.next(false);
          }else{
            result.next(true); 
          }          
                         
      },
      error => { // handle error  
        console.log('error: '+error)             
        result.next(false);
      } 
    );

    return result.asObservable();
  }

  findCategoriaId(){
    const result = new Subject<any>();

    const categoria = document.getElementById('categoria') as HTMLInputElement | null;  
    this.libroService.obtenerIDCategoriaPorNombre(''+categoria?.value).subscribe(      
      res => { // Success  
        if( res == null ){  
          // activa el error        
          this.libroForm.form.controls['categoria'].setErrors({'required':true});    
          // oculta el dropdown-menu 
          $('#categoriaList').fadeOut();                                                  
          result.next(false);
        }else{
          this.libro.idCategoria = res;
          result.next(true);
        }            
      },
      error => { // handle error
        result.next(false);
      } 
    );

    return result.asObservable();
  }

  findEditorialId() {
    const result = new Subject<any>();

    const editorial = document.getElementById('editorial') as HTMLInputElement | null;    
    this.libroService.obtenerIDEditorialPorNombre(''+editorial?.value).subscribe(            
      res => { // Success  
        if( res == null ){  
          // activa el error        
          this.libroForm.form.controls['editorial'].setErrors({'required':true});    
          // oculta el dropdown-menu 
          $('#editorialList').fadeOut();                                                  
          result.next(false);
        }else{          
          this.libro.idEditorial = res;
          result.next(true);
        }         
      },
      error => { // handle error
        result.next(false);
      } 
    );

    return result.asObservable();
  }

// Quito el autor en el index dado.
public removeAuthor(e: any) {
  e.preventDefault();

  if(this.contAuthors >= 2){
    this.book.authors.splice( this.contAuthors-1, 1 );
    this.contAuthors--;

    if( this.contAuthors == 1 ){
      this.showLabel = false;
    }
  }
  
}

// Agrego un nuevo registro de autor a el form-model.
public addAuthor(e: any) : void {
  e.preventDefault();

  if( this.contAuthors <= 6 ){

    this.book.authors.push({			
      id: this.contAuthors,
      name: "",			
    });

    if( this.contAuthors >= 1 ){
      this.showLabel = true;
    }
   
    this.contAuthors++;
  }		
}

onKeypressEventAutores(event: any){
  
  let self = this;
  if( event.target.value != "" || event.target.value.length > 0){
    this.libroService.obtenerListaDeAutoresPorNombre(event.target.value).subscribe(dato => {
      this.autores = dato;

        // Javascript
        this.output = '<ul name="author" id="author" class="dropdown-menu" style="width:100%; display:block; position:relative;">';

        // cargo los elementos del array en la lista
        this.autores.forEach((item) => {
          this.output += '<li><a id='+item.id+' class="dropdown-item">'+item.autor+'</a></li>';    
        });                    

        // agrego el elemento "Agregar nueva `Autor`..." a la lista
        if(this.autores.length > 0){
          this.output += '<div class="dropdown-divider"></div>';
        }        
        this.output += "<li><a class='dropdown-item'>Agregar un nuevo `Autor`...</a></li>";
        this.output += '</ul>';        

        $('#autorList'+event.target.id).fadeIn();          // muestra el dropdown-menu
        $('#autorList'+event.target.id).html(this.output); // llena la lista con lo que hay en el `output`

        // evento `onclick` de la lista, cuando selecciona un elemento de la lista
        // pone el elemento seleccionado de la lista, en la caja de texo
        $('#autorList'+event.target.id).on('click', 'li', function(){  
          // $('#'+event.target.id).val( $(this).text() );             // pone el elemento seleccionado de la lista, en la caja de texo          

          var item = $(this).text();               

          // si un elemento de la lista es igual 'Agregar una nueva `Autor`...'
          // guardo el valor en una variable de sesion y redirecciono al componente `Autor`
          if( item == "Agregar un nuevo `Autor`..."){   
            var id = event.target.id;
            self.sessionStorageSetValues();              // se guardan las variables
      
            // redirecciono a `autor` con la `bandera levantada` 
            window.location.href = 'autor?flag=true&autores='+self.book.authors.length+'&cursor='+id;        
          }else{
            // console.log('event.target.id: '+event.target.id);
            self.book.authors[event.target.id].name = $(this).text(); // asigno el texto seleccionado al `text input`
            $('#autorList'+event.target.id).fadeOut();                // oculta el dropdown-menu
          }         
        });
      
        return;
    });
  }else{
    
    if(event.target.value == ""){        
      $('#autorList'+event.target.id).hide();  // esconde el dropdown
    }
    
    return;
  }  
}

  onKeypressEventCategorias(event: any){
    
    let self = this;
    if( this.cat != "" || this.cat.length > 0){
      this.libroService.obtenerListaDeCategoriasPorNombre(event.target.value).subscribe(dato => {
        this.categorias = dato;
        this.loadData = true;
  
        // Javascript
        this.output = '<ul name="categorias" id="categorias" class="dropdown-menu" style="width:100%; display:block; position:relative;">';

        // cargo los elementos del array en la lista
        this.categorias.forEach((item) => {
          this.output += '<li><a id='+item.id+' class="dropdown-item">'+item.categoria+'</a></li>';    
        });                    

        // agrego el elemento "Agregar nueva `Categoría`..." a la lista
        this.output += '<div class="dropdown-divider"></div>';
        this.output += "<li><a class='dropdown-item'>Agregar una nueva `Categoría`...</a></li>";
        this.output += '</ul>';        

        $('#categoriaList').fadeIn();          // muestra el dropdown-menu
        $('#categoriaList').html(this.output); // llena la lista con lo que hay en el `output`

        // evento `onclick` de la lista, cuando selecciona un elemento de la lista
        // pone el elemento seleccionado de la lista, en la caja de texo
        $('#categoriaList').on('click', 'li', function(){  
                 
            // obtengo cual elemento de la lista selecciono y lo guardo en la variable `item`
            var item = $(this).text();    
            // si un elemento de la lista es igual 'Agregar una nueva `Categoría`...'
            // guardo el valor en una variable de sesion y redirecciono al componente `categoria`
            if( item == 'Agregar una nueva `Categoría`...'){   
            
              self.sessionStorageSetValues();    

              // redirecciono a `categoria` con la `bandera levantada`
              window.location.href = 'categoria?flag=true&autores='+self.book.authors.length;     
            }else{
              $('#categoria').val($(this).text());             // pone el elemento seleccionado de la lista, en la caja de texo
              $('#categoriaList').fadeOut();                   // oculta el dropdown-menu
            }
                
        });                           
        return;
      });
    }else{
      
      if(this.cat == ""){        
        $('#categoriaList').hide();  // esconde el dropdown
      }
      
      return;
    }
    
  }

  onKeypressEventEditoriales(event: any){
    // console.log("event.target.id: "+event.target.id);
    
    let self = this;
    if( this.edit != "" || this.edit.length > 0){
      this.libroService.obtenerListaDeEditorialesPorNombre(event.target.value).subscribe(dato => {
        this.editoriales = dato;        
        this.loadData = true;
  
        // Javascript
        this.output = '<ul name="editoriales" id="editoriales" class="dropdown-menu" style="width:100%; display:block; position:relative;">';

        // cargo los elementos del array en la lista
        this.editoriales.forEach((item) => {
          this.output += '<li><a id='+item.id+' class="dropdown-item">'+item.editorial+'</a></li>';    
        });                    

        // agrego el elemento "Agregar nueva `Categoría`..." a la lista
        this.output += '<div class="dropdown-divider"></div>';
        this.output += "<li><a class='dropdown-item'>Agregar una nueva `Editorial`...</a></li>";
        this.output += '</ul>';        

        $('#editorialList').fadeIn();          // muestra el dropdown-menu
        $('#editorialList').html(this.output); // llena la lista con lo que hay en el `output`

        // evento `onclick` de la lista, cuando selecciona un elemento de la lista
        // pone el elemento seleccionado de la lista, en la caja de texo
        $('#editorialList').on('click', 'li', function(){  

          var item = $(this).text();    
          // si un elemento de la lista es igual 'Agregar una nueva `Categoría`...'
          // guardo el valor en una variable de sesion y redirecciono al componente `categoria`
          if( item == 'Agregar una nueva `Editorial`...'){   
            
            self.sessionStorageSetValues();   

            // redirecciono a `editorial` con la `bandera levantada`
            window.location.href = 'editorial?flag=true&autores='+self.book.authors.length;
          }else{
            $('#editorial').val($(this).text());             // pone el elemento seleccionado de la lista, en la caja de texo
            $('#editorialList').fadeOut();                   // oculta el dropdown-menu
          }
        });
        
        return;
      });
    }else{
      
      if(this.edit == ""){        
        $('#editorialList').hide();  // esconde el dropdown
      }
      
      return;
    }
    
  }

  sessionStorageSetValues():void{
       
    // si hay valor, guardo el valor de la variable `base64Data` en una variable de sesion llama `img`  
    if( this.base64Data != "" &&  this.base64Data != undefined){
      sessionStorage.setItem('img', this.base64Data);     
    }

    // obtengo el valor de la caja de texto `ISBN`
    const isbnValue = document.getElementById('isbn') as HTMLInputElement | null;
    // si hay valor, guardo el valor de la variable `isbnValue` en una variable de sesion llama `isbn`  
    if(isbnValue?.value != "" && isbnValue?.value != undefined){
      sessionStorage.setItem('isbn', ''+isbnValue?.value);     
    }
    
    // obtengo el valor de la caja de texto `titulo`
    const tituloValue = document.getElementById('titulo') as HTMLInputElement | null;
    // si hay valor, guardo el valor de la variable `tituloValue` en una variable de sesion llama `titulo`      
    if(tituloValue?.value != ""){
      sessionStorage.setItem('titulo', ''+tituloValue?.value);   
    }
    
    // obtengo el valor de la caja de texto `fecha`
    const fechaValue = document.getElementById('fecha') as HTMLInputElement | null;
    // Si hay valor,guardo el valor de la variable `fechaValue` en una variable de sesion llama `fecha`      
    if(fechaValue?.value != ""){
      sessionStorage.setItem('fecha', ''+fechaValue?.value);
    }    

    // sirve para manejar lo de los `autores` (text input)
    let length =this.book.authors.length;
    for (let i = 0; i < length; i++) {    
      // console.log('index: '+i+": "+this.book.authors[i].name);
      sessionStorage.setItem(''+i, ''+this.book.authors[i].name);
    }

    // obtengo el valor de la caja de texto `categoria`
    const categoriaValue = document.getElementById('categoria') as HTMLInputElement | null;
    // Si hay valor, guardo el valor de la variable `categoriaValue` en una variable de sesion llama `categoria`      
    if(categoriaValue?.value != ""){
      sessionStorage.setItem('categoria', ''+categoriaValue?.value);
    }

    // obtengo el valor de la caja de texto `editorial`
    const editorialValue = document.getElementById('editorial') as HTMLInputElement | null;
    // Si hay valor, guardo el valor de la variable `editorialValue` en una variable de sesion llama `editorial`      
    if(editorialValue?.value != ""){
      sessionStorage.setItem('editorial', ''+editorialValue?.value);
    }

    // obtengo el valor de la caja de texto `idioma`
    const idiomaValue = document.getElementById('idioma') as HTMLInputElement | null;
    // Si hay valor, guardo el valor de la variable `idiomaValue` en una variable de sesion llama `idioma`      
    if(idiomaValue?.value != ""){
      sessionStorage.setItem('idioma', ''+idiomaValue?.value);
    }

    // obtengo el valor de la caja de texto `pagina`
    const paginaValue = document.getElementById('pagina') as HTMLInputElement | null;
    // Si hay valor, guardo el valor de la variable `paginaValue` en una variable de sesion llama `pagina`      
    if(paginaValue?.value != ""){
      sessionStorage.setItem('pagina', ''+paginaValue?.value);
    }

    // obtengo el valor de la caja de texto `descripcion`
    const descripcionValue = document.getElementById('descripcion') as HTMLInputElement | null;
    // Si hay valor, guardo el valor de la variable `descripcionValue` en una variable de sesion llama `descripcion`      
    if(descripcionValue?.value != ""){
      sessionStorage.setItem('descripcion', ''+descripcionValue?.value);
    }
  }
  
  sessionStorageGetValues(){
    const imgStorage = sessionStorage.getItem('img');   
    if( imgStorage != undefined && imgStorage != 'undefined'){
      $('#img').attr('src', imgStorage);   
      this.base64Data = imgStorage;   
    }
    const isbnStorage = sessionStorage.getItem('isbn');   
    if( isbnStorage != undefined && isbnStorage != 'undefined'){
      this.libro.asin_isbn = isbnStorage;
    }
    const tituloStorage = sessionStorage.getItem('titulo');   
    if( tituloStorage != undefined){
      this.libro.titulo = tituloStorage;
    }
    const fechaStorage = sessionStorage.getItem('fecha');   
    if( fechaStorage != undefined){
      this.libro.fechaDeLanzamiento = fechaStorage;
    }
    
    for( let i=0 ; i < this.book.authors.length; i++ ){
      if( sessionStorage.getItem(''+i) != null ){
        this.book.authors[i].name = ''+sessionStorage.getItem(''+i);
      }      
    }    

    const categoriaStorage = sessionStorage.getItem('categoria');   
    if( categoriaStorage != undefined){
      this.cat = categoriaStorage;
    }
    const editorialStorage = sessionStorage.getItem('editorial');   
    if( editorialStorage != undefined){
      this.edit = editorialStorage;
    }
    const idiomaStorage = sessionStorage.getItem('idioma');   
    if( idiomaStorage != undefined){
      this.libro.idioma = idiomaStorage;
    }
    const paginaStorage = sessionStorage.getItem('pagina');   
    if( paginaStorage != undefined){
      this.libro.paginas =  Number.parseInt(paginaStorage);
    }
    const descripcionStorage = sessionStorage.getItem('descripcion');   
    if( descripcionStorage != undefined){
      this.libro.descripcion =  descripcionStorage;
    }
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
      this.router.navigate(['libros']);
    }
  }

}
