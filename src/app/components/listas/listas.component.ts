import { Component, Input, OnInit } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
  Listas:Lista[]=[];
  @Input() terminada=true;
  constructor(public deseosServices:DeseosService,
    private router:Router) {
      this.Listas=deseosServices.listas;
    }

  ngOnInit() {}
  listaseleccion(lista:Lista){
    console.log(lista);
    if(this.terminada){
      this.router.navigateByUrl(`/tabs/tab3/adding/${lista.id}`);
    }else{
      this.router.navigateByUrl(`/tabs/tab1/adding/${lista.id}`);
    }

  }
}
