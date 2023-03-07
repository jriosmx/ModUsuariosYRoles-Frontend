import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Usuario } from 'src/app/models/Usuario';
import { UserService } from 'src/app/_services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent {

  title:String = "Lista de Usuarios";

  // se usan para manejar las `datables`
  dtOptions: DataTables.Settings = {};
  start: number = 0; length: number = 10;
  loadData: boolean = false;

  // id de la columna de la DATATABLE
  id:number=0;
  username:string="";

  // este arreglo se usa para obtener los `autores`
  usuarios:Usuario[] = [];
  roles:any[];

  // id_ficha_autor
  id_ficha_autor:number;

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    this.obtenerLibros();
  }

  private obtenerLibros(){
    this.userService.getAllUsersWithRoles().subscribe(users => {
      this.usuarios = users;
	    this.loadData = true;

      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: this.length,
        displayStart: this.start,
        autoWidth: false,
        serverSide: false,
        processing: false,
        searching: true,
        /* below is the relevant part, e.g. translated to spanish */ 
        language: {
          processing: "Procesando...",
          search: "Buscar:",
          lengthMenu: "Mostrar _MENU_ elementos",
          info: "Mostrando desde _START_ al _END_ de _TOTAL_ elementos",
          infoEmpty: "Mostrando ningún elemento.",
          infoFiltered: "(filtrado _MAX_ elementos total)",
          infoPostFix: "",
          loadingRecords: "Cargando registros...",
          zeroRecords: "No se encontraron registros",
          emptyTable: "No hay datos disponibles en la tabla",
          paginate: {
            first: "Primero",
            previous: "Anterior",
            next: "Siguiente",
            last: "Último"
          },
          aria: {
            sortAscending: ": Activar para ordenar la tabla en orden ascendente",
            sortDescending: ": Activar para ordenar la tabla en orden descendente"
          }
        },
        order: [],
        lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
        data:this.usuarios,
        columns: [{ data: 'id' }, { data: 'username' }, { data: 'name' }, { data: 'lastname' },{ data: 'role' },
        //create three buttons columns
          {
          defaultContent: "<div style='justify-content: center; display: flex;align-items:center;'>"+
                            "<div class='text-center'>"+  
                              "<button (click)='verDetalles()' title='Ver Detalles' class='btn btn-outline-info verDetalles' style='margin-left: 10px;'>"+
                                "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-eye' viewBox='0 0 16 16'><path d='M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z'/><path d='M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z'/></svg>"+
                              "</button>"+
                            
                            
                              "<button (click)='actualizarLibro(autores[0])' title='Editar' class='btn btn-outline-warning editar' style='margin-left: 10px;'>"+
                                "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-pencil-fill' viewBox='0 0 16 16'><path d='M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z'/></svg>"+
                              "</button>"+
                           
                              "<button (click)='eliminarAutor(autor.id)' title='Eliminar' class='btn btn-outline-danger eliminar' style='margin-left: 10px;'>"+
                                "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-trash3' viewBox='0 0 16 16'><path d='M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z'/></svg>"+
                              "</button>"+

                              "<button (click)='actualizarPasswd(autor.id)' title='Contraseña' class='btn btn-outline-danger passwd' style='margin-left: 10px;'>"+
                                "<i class='fa-solid fa-key'></i>"+
                              "</button>"+
                            "</div>"+
                          "<div>",

          }                          
        ],
        columnDefs: [
          { width    :  "3%", targets: [0], className: 'text-center'},
          { width    : "13%", targets: [1], className: 'text-center'},
          { width    : "13%", targets: [2], className: 'text-center'},
          { width    : "13%", targets: [3], className: 'text-center'},
          { width    : "13%", targets: [4], className: 'text-center'},
          { width    : "45%", targets: [5]},
        ],
        drawCallback: () => {
          let self = this;

          $('#datatables tbody').on('click', '.verDetalles', function () {

            //get row for data
            var tr = $(this).closest('tr');
            var firstTd = $(tr).children("td")[0]; //takes the first td which would have your Id
           
            this.id = $(firstTd).text();
            this.flag = true;
      
            self.verDetalles(this.id);
          });
      
          $('#datatables tbody').on('click', '.editar', function () {
      
            //get row for data
            var tr = $(this).closest('tr');
            var firstTd = $(tr).children("td")[0]; //takes the first td which would have your Id
           
            this.id = $(firstTd).text();
            this.flag = true;
      
            self.actualizarUsuario(this.id);
                       
          });

          $('#datatables tbody').on('click', '.passwd', function () {
      
            //get row for data
            var tr = $(this).closest('tr');
            var firstTd = $(tr).children("td")[0]; //takes the first td which would have your Id

            //get row for data
            var tr = $(this).closest('tr');
            var secondTd = $(tr).children("td")[1]; //takes the first td which would have your Id
           
            this.id = $(firstTd).text();
            this.username = $(secondTd).text();
            this.flag = true;
      
            self.actualizarPasswd(this.id, this.username);
                       
          });
      
          $('#datatables tbody').on('click', '.eliminar', function () {
      
            //get row for data
            var tr = $(this).closest('tr');
            var firstTd = $(tr).children("td")[0]; //takes the first td which would have your Id
           
            this.id = $(firstTd).text();
            this.flag = true;

            // busca el `título` del `libro` por `id` dentro del arreglo `libros`
            const usuario = self.usuarios.filter(element => element.id == this.id);

            let content = document.createElement('div');
            content.innerHTML = 'Deseas realmente eliminar el usuario: <strong>' + usuario[0].name + '</strong> ?';

            Swal.fire({
              title: 'Eliminar Usuario',
              html: content,
              showCancelButton: true,
              confirmButtonText: 'Yes',   
              icon: 'info'           
            }).then( (result) => {
              if ( result.isConfirmed ) {
                self.eliminarUsuario(this.id);    
              } else if (result.isDenied) {
                return;
              }
            })
          });           
      },
    }   
    });    
  }

  actualizarUsuario(id:number){
    // console.log("actualizarLibro");
    this.router.navigate(['actualizar-password',id]);
  }

  verDetalles(id:number){
    // console.log("Ver Detalles");
    this.router.navigate(['usuario-detalles',id]);         
  }

  actualizarPasswd(idUsuario:number,username:string){
    // console.log("Ver Detalles");
    this.router.navigate(['actualizar-password',{'id':idUsuario,'username':username}]);         
    // window.location.href = 'actualizar-password?id='+idUsuario+'&username='+username;
  }

  eliminarUsuario(idUsuario:number){

    let self = this;     
    this.deleteUserRecord(idUsuario).subscribe(
      status => { 
        if(status){ //success

          // busca el `título` del `usuario` por `id` dentro del arreglo `usuarios`
          const usuario = this.usuarios.filter(element => element.id == idUsuario);

            let content = document.createElement('div');
            content.innerHTML = 'El usuario: <strong>' + usuario[0].name + '</strong>, ha sido <strong>eliminado</strong> con exito!!!';

            Swal.fire({
              title: 'Eliminar Usuario',
              html: content,
              icon: 'success'
            })
              .then(function () {

                self.router.navigate(['usuarios']);

              });

          // despues de borrar un `libro` se carga la lista de `libros` nuevamente
          this.refreshData(); 

        }
      }
    );
          
  }

  deleteUserRecord(id:number){
    const result = new Subject<any>();

   this.userService.deleteUser(id).subscribe(
      res => { // Success     
        result.next(true);
      },
      error => { // handle error
        result.next(false);
      } 
    );

    return result.asObservable();
  }

  refreshData(){
    this.loadData = false;
    this.userService.getAllUsers().subscribe(dato => {
      this.usuarios = dato;
      this.dtOptions.data = this.usuarios;
	    this.loadData = true;
    });
  }

}
