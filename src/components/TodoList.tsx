import { ITodo } from '../interfaces/ITodo';
import Note from '../models/Note.class';
import DeleteIcon from '../assets/icons/delete.svg';
import { useNotes } from '../context/NotesContext';
import styles from '../styles/components/TodoList.module.scss'

type Props={
  index?: number;
  todos: ITodo[];
  deleteTodo: (i: number) => void;
  toggleTodo: (i: number) => void;
}
export default function TodoList({ todos, deleteTodo, toggleTodo }: Props) {

  console.log('rendering')
  console.log(todos)
  /* const { toggleTodo } = useNotes(); */

  const todoList = todos.map((todo, i) => 
    <li key={'todo-' + i}>
      <div>
        <input type='checkbox' checked={todo.done} onChange={() => toggleTodo(i)}/>
        {todo.text}
      </div>
      <button className={styles.delete} onClick={() => deleteTodo(i)}>
      <img src={DeleteIcon} alt='' />
      </button>
    </li>
  );

  return <ul>{todoList}</ul>;
}
