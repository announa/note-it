import INote from '../interfaces/INote';
import styles from '../styles/components/ButtonContainer.module.scss'

interface Props{
 userInput: INote;
 confirm: ()=>void;
 cancel: ()=>void;
}

export default function ButtonContainer(props: Props) {

 const userInput = props.userInput;
 const confirm = props.confirm;
 const cancel = props.cancel;

  return (
    <div className={styles['btn-container']}>
      <button className='btn-secondary' onClick={cancel}>
        Cancel
      </button>
      <button disabled={userInput.text===''} onClick={confirm}>
        Save note
      </button>
      </div>
  );
}
