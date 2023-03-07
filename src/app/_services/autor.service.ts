import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Autor } from 'src/app/models/Autor';

//Esta URL obtiene el listado de todos los `autores` en el `backend`
const AUTHOR_API = 'http://localhost:8080/api/autor/';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  constructor(private httpClient:HttpClient) { }

  // Este metodo nos sirve para `obtener` los autores
  obtenerListaDeAutores():Observable<Autor[]> {
    return this.httpClient.get<Autor[]>(`${AUTHOR_API + 'autores'}`);
  }
  //este metodo nos sirve para `registrar` un autor
  registrarAutor(autor:Autor) : Observable<Object>{
    return this.httpClient.post(`${AUTHOR_API + 'autores'}`,autor);
  }  
  //este metodo sirve para actualizar el autor
  actualizarAutor(id:number,autor:Autor) : Observable<Object>{
    return this.httpClient.put(`${AUTHOR_API + 'autores'}/${id}`,autor);
  }
  //este metodo sirve para obtener o buscar un autor
  obtenerAutorPorId(id:number):Observable<Autor>{
    return this.httpClient.get<Autor>(`${AUTHOR_API + 'autores'}/${id}`);
  }
  eliminarAutor(id:number): Observable<Object>{
    return this.httpClient.delete(`${AUTHOR_API + 'autores'}/${id}`);
  }

}
