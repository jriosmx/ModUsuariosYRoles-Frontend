import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iif, Observable, Subject, switchMap } from 'rxjs';
import { Autor } from 'src/app/models/Autor';
import { Categoria } from 'src/app/models/Categoria';
import { Editorial } from 'src/app/models/Editorial';
import { Libro } from 'src/app/models/Libro';

  const AUTH_API         = 'http://localhost:8080/api/auth/';
  const ROLE_API         = 'http://localhost:8080/api/role/';
  const BOOK_API         = 'http://localhost:8080/api/libro/';
  const AUTHOR_API       = 'http://localhost:8080/api/autor/';
  const CATEGORY_API     = 'http://localhost:8080/api/categoria/';
  const EDITORIAL_API    = 'http://localhost:8080/api/editorial/';
  const FICHAAUTORES_API = 'http://localhost:8080/api/fichaautor/';;

  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  constructor(private httpClient:HttpClient) { }

  //Esta URL obtiene el listado de todos los `libros` en el `backend`
  private baseURLForLibro = "http://localhost:8080/api/v1/libros";
  private baseURLForGetLibro = "http://localhost:8080/api/v1/getLibro"; 
  private baseURLForLibros = "http://localhost:8080/api/v1/getLibros";
  private baseURLForCategoriaPorNombre = "http://localhost:8080/api/v1/categoriaPorNombre";
  private baseURLForIDCategoriaPorNombre = "http://localhost:8080/api/v1/getCategoriaIDByName";
  private baseURLForIDEditorialPorNombre = "http://localhost:8080/api/v1/getEditorialIDByName";
  private baseURLForEditorialPorNombre = "http://localhost:8080/api/v1/editorialesPorNombre";
  private baseURLForAutorPorNombre = "http://localhost:8080/api/autor/autoresPorNombre";
  private baseURLForAutorIdPorNombres = "http://localhost:8080/api/autor/autorIdPorNombres";
  private baseURLForRegistraFichaAutores = "http://localhost:8080/api/v1/registraFichaAutores";
  private baseURLForNombreEditorialPorID = "http://localhost:8080/api/v1/editoriales";
  private baseURLForNombreCategoriaPorID = "http://localhost:8080/api/v1/categorias";

  private baseURLForAuthorsIDsByIdFichaAutores = "http://localhost:8080/api/v1/idAutores";
  private baseURLForAuthorsNameById            = "http://localhost:8080/api/v1/autoresNombres";
  private baseURLForActualizaFichaAutores      = "http://localhost:8080/api/v1/fichaAutores";
  private baseURLForAutorIdPorNombre           = "http://localhost:8080/api/v1/autorIdPorNombre";

  // Este metodo nos sirve para `obtener` los libros
  obtenerListaDeLibrosPorTitulo(titulo:string):Observable<Libro[]> {
    return this.httpClient.get<Libro[]>(`${ BOOK_API + 'libros' }/${titulo}`);
  }

  // Este metodo nos sirve para `obtener` los libros por `titulo` y por `autor`
  getBooksListByTitleAndAuthor(cad:string):Observable<Libro[]> {
    return this.httpClient.get<Libro[]>(`${ BOOK_API + 'getBooksListByTitleAndAuthor' }/${cad}`);
  }

  // Este metodo sirve para obtener los `nombres` de los `autores` por `ID[]`
  obtenerNombresAutoresPorId(IDs:number[]):Observable<number[]> {
    return this.httpClient.get<number[]>(`${ AUTHOR_API + 'autoresNombres'}/${IDs}`);
  }

  // Este metodo sirve para obtener los `IDs` de los `Autores` por `idFichaAutores`
  obtenerIDsAutoresPorIdFichaAutores(idFichaAutores:number):Observable<number[]> {
    return this.httpClient.get<number[]>(`${ FICHAAUTORES_API + 'idAutores'}/${idFichaAutores}`);
  }

  // Este metodo nos sirve para `obtener` los libros
  obtenerListaDeLibros():Observable<Libro[]> {
    return this.httpClient.get<Libro[]>(`${BOOK_API + 'getLibros'}`);
  }

  // Este metodo nos sirve para `registrar` un libro
  registrarLibro(libro:Libro) : Observable<Object>{
    return this.httpClient.post(`${BOOK_API + 'register'}`,libro);
  }

  // registrarLibro(libro:any): Observable<any>  {
  //     console.log(libro);
  //     return this.httpClient.post( BOOK_API + 'libros', {
  //     asin_isbn:          libro.asin_isbn,
  //     titulo:             libro.titulo,
  //     fechaDeLanzamiento: libro.fechaDeLanzamiento,
  //     autor:              libro.autor,         
  //     idCategoria:        libro.idCategoria,
  //     idEditorial:        libro.idEditorial,
  //     idFichaAutores:     libro.idFichaAutores,
  //     idioma:             libro.idioma,
  //     paginas:            libro.paginas,
  //     descripcion:        libro.descripcion,
  //     portada:            libro.portada
  //   }, httpOptions);
  // }

   // Este metodo sirve para actualizar los `autores` en la tabla `FichaAutores`
   actualizarFichaAutores(idFichaAutores:number, authorsIDs:number[]) : Observable<Object>{
    return this.httpClient.put(`${FICHAAUTORES_API + 'fichaAutores'}/${idFichaAutores}`, authorsIDs);
  }

  // Este metodo sirve para registrar los `autores` en la tabla `FichaAutores`
  registraFichaAutores(authorsIDs:number[]) : Observable<number>{
    return this.httpClient.get<number>(`${FICHAAUTORES_API + 'registraFichaAutores'}/${authorsIDs}`);
  }

  //este metodo sirve para actualizar un libro
  actualizarLibro(id:number,libro:Libro) : Observable<Object>{
    return this.httpClient.put(`${BOOK_API + 'libros'}/${id}`,libro);
  }

  //este metodo sirve para obtener o buscar un libro
  obtenerLibroPorId(id:number):Observable<Libro>{
    return this.httpClient.get<Libro>(`${ BOOK_API + 'getLibro'}/${id}`);
  }

  // Este metodo sirve para eliminar un libro
  eliminarLibro(id:number): Observable<Object>{
    return this.httpClient.delete(`${ BOOK_API + 'libros' }/${id}`);
  }

   // Este metodo nos sirve para `obtener` los `Ids` de los `autores`
   obtenerAutorIdPorNombre(autor:String):Observable<number> {
    return this.httpClient.get<number>(`${this.baseURLForAutorIdPorNombre}/${autor}`);
  }

  // Este metodo nos sirve para `obtener` los `Ids` de los `autores`
  obtenerAutorIDsPorNombre(autores:String[]):Observable<number[]> {
    return this.httpClient.get<number[]>(`${this.baseURLForAutorIdPorNombres}/${autores}`);
  }

  // Este metodo nos sirve para `obtener` los Autores por `nombre`
  // obtenerListaDeAutoresPorNombre(nombre:String):Observable<Autor[]> {
  //   return this.httpClient.get<Autor[]>(`${this.baseURLForAutorPorNombre}/${nombre}`);
  // }
  obtenerListaDeAutoresPorNombre(nombre:String):Observable<Autor[]> {
    return this.httpClient.get<Autor[]>(`${AUTHOR_API + 'autoresPorNombre'}/${nombre}`);
  }

  // Este metodo nos sirve para `obtener` las Categorias por `nombre`
  obtenerListaDeCategoriasPorNombre(nombre:String):Observable<Categoria[]> {
    return this.httpClient.get<Categoria[]>(`${CATEGORY_API + 'categoriaPorNombre'}/${nombre}`);
  }

  // Este metodo nos sirve para `obtener` las Editoriales por `nombre`
  obtenerListaDeEditorialesPorNombre(nombre:String):Observable<Editorial[]> {
    return this.httpClient.get<Editorial[]>(`${EDITORIAL_API + 'editorialesPorNombre'}/${nombre}`);
  }

  // Este metodo nos sirve para `obtener` el `ID` de la Categoria por `nombre`
  obtenerIDCategoriaPorNombre(nombre:String):Observable<number> {
    return this.httpClient.get<number>(`${CATEGORY_API + 'getCategoriaIDByName'}/${nombre}`);
  }

  // Este metodo nos sirve para `obtener` el `ID` de la Categoria por `nombre`
  obtenerIDEditorialPorNombre(nombre:String):Observable<number> {
    return this.httpClient.get<number>(`${EDITORIAL_API + 'getEditorialIDByName'}/${nombre}`);
  }

  // Este metodo nos sirve para `obtener` el `Nombre` de la Categoria por `ID`
  obtenerNombreCategoriaPorID(id:number):Observable<Categoria> {
    return this.httpClient.get<Categoria>(`${ CATEGORY_API + 'categorias'}/${id}`);
  }

  // Este metodo nos sirve para `obtener` las el `ID` de la Categoria por `nombre`
  obtenerNombreEditorialPorID(id:number):Observable<Editorial> {
    return this.httpClient.get<Editorial>(`${ EDITORIAL_API + 'editoriales'}/${id}`);
  }

}
