import { ITodo } from "./ITodo";

export default interface INote {
  title: string;
  text: string;
  todos: ITodo[];
  added?: string;
  edited?: string;
}
