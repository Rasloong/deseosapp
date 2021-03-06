import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';
import { ListaItem } from '../../models/lista-item.model';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-adding',
  templateUrl: './adding.page.html',
  styleUrls: ['./adding.page.scss'],
})
export class AddingPage implements OnInit {
  lista: Lista;
  nombreItem: string = '';
  constructor(private ds: DeseosService, private route: ActivatedRoute,private alertCtrl:AlertController) {
    const listId = this.route.snapshot.paramMap.get('listaId');
    this.lista = this.ds.obtenerLista(listId);
  }

  ngOnInit() {}

  agregarItem() {
    if (this.nombreItem.length === 0) {
      return;
    } else {
      const nvit = new ListaItem(this.nombreItem);
      this.lista.items.push(nvit);
      this.nombreItem = '';
      this.ds.guardarStorage();
    }
  }
  cambioCheck(item:ListaItem){
    const pend=this.lista.items.filter(itemData=>!itemData.status).length;
    if(pend===0){
      this.lista.completedDate=new Date();
      this.lista.status=true;
    }else{
      this.lista.completedDate=null;
      this.lista.status=false;
    }
    this.ds.guardarStorage();

  }

  Borrar(i:number){
    this.lista.items.splice(i,1);
    this.ds.guardarStorage();
  }
  async EditItem(i:number){
    const a=this.lista[i]
    const alert=await this.alertCtrl.create({
      header:'Editar Nombre Item',
      inputs: [
        {
          name: 'iptNombre',
          type: 'text',
          placeholder: `${this.lista.items[i].desc}`
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
              this.lista.items[i].desc=data.iptNombre;
            }
          }
        }
      ]
    });
    await alert.present();
  }
}
