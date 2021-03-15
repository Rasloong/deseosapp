import { Component } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  Listas:Lista[]=[];
  constructor(public deseosServices:DeseosService,
    private router:Router,
    private alertCtrl:AlertController) {
    this.Listas=deseosServices.listas;
  }


  async addingList(){
    const alert=await this.alertCtrl.create({
      header:'Agregar Nueva Lista',
      inputs: [
        {
          name: 'iptNombre',
          type: 'text',
          placeholder: 'Nombre de la lista'
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
              this.deseosServices.crearLista(data.iptNombre);
            }
          }
        }
      ]
    });
    await alert.present();

  }
}
