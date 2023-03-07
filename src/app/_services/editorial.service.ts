import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Editorial } from 'src/app/models/Editorial';

//Esta URL obtiene el listado de todos las `editoriales` en el `backend`
const EDITORIAL_API = 'http://localhost:8080/api/editorial/';

@Injectable({
  providedIn: 'root'
})
export class EditorialService {

  constructor(private httpClient:HttpClient) { }

  // Este metodo nos sirve para `obtener` las editoriales
  obtenerListaDeEditoriales():Observable<Editorial[]> {
    return this.httpClient.get<Editorial[]>(`${EDITORIAL_API + 'editoriales'}`);
  }
  //este metodo nos sirve para `registrar` una editorial
  registrarEditorial(editorial:Editorial) : Observable<Object>{
    return this.httpClient.post(`${EDITORIAL_API + 'editoriales'}`,editorial);
  }

  //este metodo sirve para actualizar la editorial
  actualizarEditorial(id:number,editorial:Editorial) : Observable<Object>{
    return this.httpClient.put(`${EDITORIAL_API + 'editoriales'}/${id}`,editorial);
  }

  //este metodo sirve para obtener o buscar una editorial
  obtenerEditorialPorId(id:number):Observable<Editorial>{
    return this.httpClient.get<Editorial>(`${EDITORIAL_API + 'editoriales'}/${id}`);
  }

  eliminarEditorial(id:number): Observable<Object>{
    return this.httpClient.delete(`${EDITORIAL_API + 'editoriales'}/${id}`);
  }
}
