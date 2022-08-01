import INote from "../interfaces/INote";

export default class Note{
 title: string;
 text: string;
 added: string;
 edited?: string;

 constructor(obj?: INote){
  this.title = obj? obj.title : '';
  this.text = obj? obj.text : '';
  this.added = obj && obj.added? obj.added : this.getFormattedDate(new Date());
  if(obj && obj.edited) this.edited = obj.edited;
 }

 public getFormattedDate(date: Date){
  return date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear() +  ', ' + date.getHours() + ':' + date.getMinutes()
 }
}