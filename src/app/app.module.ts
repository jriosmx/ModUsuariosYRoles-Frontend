import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login/login.component';
import { NuevoUsuarioComponent } from './components/login/nuevo-usuario/nuevo-usuario.component';

import { LibroComponent } from './components/libro/libro/libro.component';
import { ListaLibrosComponent } from './components/libro/lista-libros/lista-libros.component';
import { LibroDetallesComponent } from './components/libro/libro-detalles/libro-detalles.component';
import { ActualizaLibroComponent } from './components/libro/actualiza-libro/actualiza-libro.component';
import { DataTablesModule } from 'angular-datatables';
import { InterceptorService } from './_helpers/interceptor.service';
import { AutorComponentComponent } from './components/autor/autor-component/autor-component.component';
import { ListaAutoresComponent } from './components/autor/lista-autores/lista-autores.component';
import { AutorDetallesComponent } from './components/autor/autor-detalles/autor-detalles.component';
import { ActualizarAutorComponentComponent } from './components/autor/actualizar-autor-component/actualizar-autor-component.component';
import { EditorialDetallesComponent } from './components/editorial/editorial-detalles/editorial-detalles.component';
import { ActualizaEditorialComponent } from './components/editorial/actualiza-editorial/actualiza-editorial.component';
import { ListaEditorialesComponent } from './components/editorial/lista-editoriales/lista-editoriales.component';
import { EditorialComponent } from './components/editorial/editorial/editorial.component';
import { CategoriaComponent } from './components/categoria/categoria/categoria.component';
import { ListaCategoriasComponent } from './components/categoria/lista-categorias/lista-categorias.component';
import { CategoriaDetallesComponent } from './components/categoria/categoria-detalles/categoria-detalles.component';
import { ActualizaCategoriaComponent } from './components/categoria/actualiza-categoria/actualiza-categoria.component';
import { ListaUsuariosComponent } from './components/login/lista-usuarios/lista-usuarios.component';
import { UsuarioDetallesComponent } from './components/login/usuario-detalles/usuario-detalles.component';
import { ActualizaUsuarioComponent } from './components/login/actualiza-usuario/actualiza-usuario.component';
import { ConsultasComponent } from './components/consultas/consultas/consultas.component';
import { ActualizaPasswordComponent } from './components/login/actualiza-password/actualiza-password.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NuevoUsuarioComponent,
    LibroComponent,
    ListaLibrosComponent,
    LibroDetallesComponent,
    ActualizaLibroComponent,
    AutorComponentComponent,
    ListaAutoresComponent,
    AutorDetallesComponent,
    EditorialComponent,
    EditorialDetallesComponent,
    ActualizaEditorialComponent,
    ListaEditorialesComponent, 
    ActualizarAutorComponentComponent,
    CategoriaComponent,
    ListaCategoriasComponent,
    ActualizaCategoriaComponent,
    CategoriaDetallesComponent,
    ListaUsuariosComponent,
    UsuarioDetallesComponent,
    ActualizaUsuarioComponent,
    ConsultasComponent,
    ActualizaPasswordComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,   
    DataTablesModule
  ],
  providers: [
              InterceptorService
             ],
  bootstrap: [AppComponent]
})
export class AppModule { }
