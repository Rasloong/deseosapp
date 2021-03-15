import { Component, Input, OnInit } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
  Listas:Lista[]=[];
  @Input() terminada=true;
  constructor(public deseosServices:DeseosService,
    private router:Router,
    private alertCtrl:AlertController) {
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

  BorrarLista(l:Lista){
    this.deseosServices.BorrarLista(l);
  }

  async EditList(lista:Lista){
    const alert=await this.alertCtrl.create({
      header:'Editar Nombre Lista',
      inputs: [
        {
          name: 'iptNombre',
          type: 'text',
          placeholder: `${lista.title}`
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            if(data.iptNombre.length===0){
              return;
            }else{
              lista.title=data.iptNombre;
              this.deseosServices.guardarStorage();
            }
          }
        }
      ]
    });
    await alert.present();
  }
}
