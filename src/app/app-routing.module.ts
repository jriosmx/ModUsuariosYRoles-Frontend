import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login/login.component';
import { NuevoUsuarioComponent } from './components/login/nuevo-usuario/nuevo-usuario.component';
import { LibroComponent } from './components/libro/libro/libro.component';
import { ActualizaLibroComponent } from './components/libro/actualiza-libro/actualiza-libro.component';
import { ListaLibrosComponent } from './components/libro/lista-libros/lista-libros.component';
import { LibroDetallesComponent } from './components/libro/libro-detalles/libro-detalles.component';
import { AutorComponentComponent } from './components/autor/autor-component/autor-component.component';
import { AutorDetallesComponent } from './components/autor/autor-detalles/autor-detalles.component';
import { ActualizarAutorComponentComponent } from './components/autor/actualizar-autor-component/actualizar-autor-component.component';
import { ListaAutoresComponent } from './components/autor/lista-autores/lista-autores.component';
import { EditorialComponent } from './components/editorial/editorial/editorial.component';
import { ListaEditorialesComponent } from './components/editorial/lista-editoriales/lista-editoriales.component';
import { ActualizaEditorialComponent } from './components/editorial/actualiza-editorial/actualiza-editorial.component';
import { EditorialDetallesComponent } from './components/editorial/editorial-detalles/editorial-detalles.component';
import { CategoriaComponent } from './components/categoria/categoria/categoria.component';
import { CategoriaDetallesComponent } from './components/categoria/categoria-detalles/categoria-detalles.component';
import { ListaCategoriasComponent } from './components/categoria/lista-categorias/lista-categorias.component';
import { ActualizaCategoriaComponent } from './components/categoria/actualiza-categoria/actualiza-categoria.component';
import { ListaUsuariosComponent } from './components/login/lista-usuarios/lista-usuarios.component';
import { UsuarioDetallesComponent } from './components/login/usuario-detalles/usuario-detalles.component';
import { ActualizaUsuarioComponent } from './components/login/actualiza-usuario/actualiza-usuario.component';
import { ConsultasComponent } from './components/consultas/consultas/consultas.component';
import { ActualizaPasswordComponent } from './components/login/actualiza-password/actualiza-password.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'consultas', component: ConsultasComponent },
  // `usuarios` component's path
  { path: 'register', component: NuevoUsuarioComponent },
  { path: 'usuarios', component: ListaUsuariosComponent },
  { path: 'usuario-detalles/:id',component:UsuarioDetallesComponent},
  { path: 'actualizar-usuario/:id',component:ActualizaUsuarioComponent},
  { path: 'actualizar-password',component:ActualizaPasswordComponent},
  // `categoria` component's path
  {path:'categoria',component:CategoriaComponent},
  {path:'categoria-fromLibro/:id', component:CategoriaComponent },
  {path:'categorias',component:ListaCategoriasComponent},
  {path:'actualizar-categoria/:id',component : ActualizaCategoriaComponent},
  {path:'categoria-detalles/:id',component:CategoriaDetallesComponent},
  // `autor` component's path
  {path:'autor',component:AutorComponentComponent},
  {path:'autores',component:ListaAutoresComponent},
  {path:'actualizar-autor/:id',component : ActualizarAutorComponentComponent},
  {path:'autor-detalles/:id',component : AutorDetallesComponent},
  // `editorial` component's path
  {path:'editorial',component:EditorialComponent},
  {path:'editoriales',component:ListaEditorialesComponent},
  {path:'actualizar-editorial/:id',component : ActualizaEditorialComponent},
  {path:'editorial-detalles/:id',component:EditorialDetallesComponent},
  // `libro` component's path
  {path:'libro',component:LibroComponent},
  {path:'libros',component:ListaLibrosComponent},
  {path:'actualizar-libro/:id',component : ActualizaLibroComponent},
  {path:'libro-detalles/:id',component:LibroDetallesComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
