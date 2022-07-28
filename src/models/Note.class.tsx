
export default class Note{
 title: string;
 text: string;

 constructor(text?: string, title?: string){
  this.title = title? title : '';
  this.text = text? text: '';
 }
}