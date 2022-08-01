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
  return this.format(date.getDay()) + '/' + this.format(date.getMonth()) + '/' + this.format(date.getFullYear()) +  ', ' + this.format(date.getHours()) + ':' + this.format(date.getMinutes());
 }

 private format(number: number){
  return number < 10 ? '0' + number : number
 }
}