import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {  Subject } from 'rxjs';
import { Autor } from 'src/app/models/Autor';
import { Categoria } from 'src/app/models/Categoria';
import { Editorial } from 'src/app/models/Editorial';
import { Libro } from 'src/app/models/Libro';
import { LibroService } from 'src/app/_services/libro.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import Swal from 'sweetalert2';

interface Author {	
  id:number,
	name: string;	
}

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})

export class LibroComponent implements OnInit {
  
  @ViewChild('libroForm') libroForm: NgForm;


  currentUser: any;
  isLoggedIn = false;

  // @HostListener('window:unload', ['$event'])
  // unloadHandler(event:any) {
      // window.sessionStorage.clear();
  // }

  public book: {
		authors: Author[];
	};

  showLabel:boolean = false;

  title:string = "Nuevo Libro";

  libro:Libro = new Libro();
  fichaAutores:number[] = [];
  authors: String[] = [];
  authorsIDs: number[] = [];

  // este arreglo se usa para obtener las `categorias`
  categorias:Categoria[] = [];
  editoriales:Editorial[] = [];
  autores:Autor[] = [];

  loadData: boolean = false;
  output:string="";

  validation:boolean = false;
  flag:boolean=false;
  index:number=0;
  contAuthors:number=0;

  // *** ngModels ***
  cat:string = "";
  edit:string = "";

  // imagen
  base64Data: any;
  imageName: any;
  message:string="";

  // declaracion de variables para el tratado de la imagen
  constructor(private libroService:LibroService, 
              private route: ActivatedRoute, 
              private tokenStorageService:TokenStorageService,
              private router:Router) { 
    this.book = {
			authors: []
		};

		// Agrego un author inicial form-entry.
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

  ngOnInit(): void {  

    this.currentUser = this.tokenStorageService.getUser();
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    window.localStorage.setItem('currentUser', JSON.stringify({ token: this.tokenStorageService.getToken() }))
    
    let autoresLen = this.route.snapshot.queryParams['autores'];
    if( autoresLen > 0 ){

      for(let i=1; i<autoresLen; i++) {
        // Agrego un author
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

    }    
  
    let flag = this.route.snapshot.queryParams['flag'];
    if(flag){
      this.sessionStorageGetValues();         // obtiene las variables de session   
    }else{
      window.sessionStorage.clear();          // borro las variables de session
    }
    // si se sale de pagina, limpio las cajas de texto
    // for(var i=0; i<this.book.authors.length; i++){
      // this.book.authors[i].name = ""; 
    // }

    let self = this;
    (function ($) {
      $(document).ready(function(){        
        $('input').attr('autocomplete','off');  // desactiva el `autocomplete` en cada input text        
      });
    })(jQuery);
  }

onKeypressEventAutores(event: any){
  
  let self = this;
  if( event.target.value != "" || event.target.value.length > 0){
    this.libroService.obtenerListaDeAutoresPorNombre(event.target.value).subscribe(dato => {
      this.autores = dato;

        // Javascript
        this.output = '<ul name="author" id="author" class="dropdown-menu" style="width:100%; display:inline-block;">';

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
        this.output = '<ul name="categorias" id="categorias" class="dropdown-menu" style="width:100%; display:inline-block;">';

        // cargo los elementos del array en la lista
        this.categorias.forEach((item) => {
          this.output += '<li><a id='+item.id+' class="dropdown-item">'+item.categoria+'</a></li>';    
        });                    

        // agrego el elemento "Agregar nueva `Categoría`..." a la lista
        if(this.categorias.length > 0){
          this.output += '<div class="dropdown-divider"></div>';
        }  

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
        this.output = '<ul name="editoriales" id="editoriales" class="dropdown-menu" style="width:100%; display:inline-block;">';

        // cargo los elementos del array en la lista
        this.editoriales.forEach((item) => {
          this.output += '<li><a id='+item.id+' class="dropdown-item">'+item.editorial+'</a></li>';    
        });                    

        // agrego el elemento "Agregar nueva `Categoría`..." a la lista
        if(this.editoriales.length > 0){
          this.output += '<div class="dropdown-divider"></div>';
        }

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
          self.libroService.registraFichaAutores(this.authorsIDs).subscribe(
            idFichaAutores => { // Success                 
              // console.log('idFichaAutores: '+idFichaAutores);  
              this.libro.idFichaAutores = idFichaAutores;
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
                          this.libroService.registrarLibro(this.libro).subscribe(dato => {
                            
                            setTimeout(function () {

                                let content = document.createElement('div');
                                content.innerHTML = 'El libro: <strong>'+ self.libro.titulo +'</strong>, ha sido <strong>registrado</strong> con exito!!!';
                                
                                Swal.fire({title: 'Libro registrado',
                                          html: content,
                                          icon:    `success`})
                                  .then(function () {
                                    
                                      self.router.navigate(['/']);
                                    
                                  });
                              
                            }, 1000);
                          });
                        }
                      }
                    );
                  }
                }
              );
            },
          );
        }
      });    
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
        // console.log('res: '+res);
        // console.log('this.book.authors.length: '+this.book.authors.length);
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

  check(){
    this.router.navigate(['/']); 
  }

}