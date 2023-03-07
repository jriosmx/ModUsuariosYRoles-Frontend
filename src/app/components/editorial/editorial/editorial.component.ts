import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Editorial } from 'src/app/models/Editorial';
import { EditorialService } from 'src/app/_services/editorial.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editorial',
  templateUrl: './editorial.component.html',
  styleUrls: ['./editorial.component.css']
})
export class EditorialComponent implements OnInit {

  title:string = "Nueva Editorial";
  flag:string  = "";

  editorial : Editorial = new Editorial();
  constructor(private editorialService:EditorialService,private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  guardarEditorial() {

    let self = this;
    this.editorialService.registrarEditorial(this.editorial).subscribe(dato => {
      // console.log(dato);
      setTimeout(function () {

        let content = document.createElement('div');
        content.innerHTML = 'La editorial: <strong>'+ self.editorial.editorial +'</strong>, ha sido registrada con exito!!!';        

        Swal.fire({ title: 'Editorial registrada',
                    html: content,
                    icon:    `success`})
            .then(function () {
              if (self.hayFlag() == true) {
                // this.router.navigate(['libro',{flag: this.hayFlag()}]);
                
                let autoresLen = self.route.snapshot.queryParams['autores'];

                //  obtengo el valor de la caja de texto `categoria`
                const editorialValue = document.getElementById('editorial') as HTMLInputElement | null;
                // guardo el valor de la variable `categoriaValue` en una variable de sesion llama `categoria`
                sessionStorage.setItem('editorial', ''+editorialValue?.value);  
                // redirecciono a `libro` con la `bandera levantada`
                window.location.href = 'libro?flag=true&autores='+autoresLen;
              } else {
                self.router.navigate(['/']);
              }
            });
      }, 1000);

    }, error => console.log(error));
  }

  onSubmit(){
    this.guardarEditorial();
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
      this.router.navigate(['/']);
    }
  }
}
