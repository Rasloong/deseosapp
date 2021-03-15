import { Injectable } from '@angular/core';
import {Lista} from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {
  listas:Lista[]=[];
  constructor() {
    this.cargarStorage();
    console.log(this.listas);
   }

   crearLista(titulo:string){
     const nuevalista=new Lista(titulo);
     this.listas.push(nuevalista);
     this.guardarStorage();
     return nuevalista.id;
   }
   BorrarLista(lista:Lista){
     this.listas=this.listas.filter(ldata=>ldata.id!==lista.id);
     this.guardarStorage();
   }

   obtenerLista(id:string|number){
      id=Number(id);
      return this.listas.find(listaData=>listaData.id===id);
   }

   guardarStorage(){
      localStorage.setItem('data',JSON.stringify(this.listas));
   }

   cargarStorage(){
    if(localStorage.getItem('data')){
      this.listas=JSON.parse(localStorage.getItem('data'));
    }else{
      this.listas=[];
    }

   }

}
