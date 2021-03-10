import { ListaItem } from './lista-item.model';
export class Lista{

  id:number;
  title:string;
  createDate:Date;
  completedDate:Date;
  status:boolean;
  items:ListaItem[];
  constructor(title:string) {
    this.title=title;
    this.createDate=new Date();
    this.status=false;
    this.items=[];
    this.id=new Date().getTime();
  }
}

