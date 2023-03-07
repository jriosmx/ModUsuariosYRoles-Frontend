import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from 'src/app/models/Categoria';

const CATEGORY_API = 'http://localhost:8080/api/categoria/';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private httpClient:HttpClient) { }

  // Este metodo nos sirve para `obtener` las Categorias
  obtenerListaDeCategorias():Observable<Categoria[]> {
    return this.httpClient.get<Categoria[]>(`${CATEGORY_API + 'categorias'}`);
  }

  // Este metodo nos sirve para `obtener` las Categorias por `nombre`
  obtenerListaDeCategoriasPorNombre(nombre:String):Observable<Categoria[]> {
    return this.httpClient.get<Categoria[]>(`${CATEGORY_API}/${nombre}`);
  }

  //este metodo nos sirve para `registrar` una Categoria
  registrarCategoria(categoria:Categoria) : Observable<Object>{
    return this.httpClient.post(`${CATEGORY_API + 'categorias'}`,categoria);
  }

  //este metodo sirve para actualizar una Categoria
  actualizarCategoria(id:number,categoria:Categoria) : Observable<Object>{
    return this.httpClient.put(`${CATEGORY_API + 'categorias'}/${id}`,categoria);
  }

  //este metodo sirve para obtener o buscar una Categoria
  obtenerCategoriaPorId(id:number):Observable<Categoria>{
    return this.httpClient.get<Categoria>(`${CATEGORY_API + 'categorias'}/${id}`);
  }

  eliminarCategoria(id:number): Observable<Object>{
    return this.httpClient.delete(`${CATEGORY_API + 'categorias'}/${id}`);
  }
}
