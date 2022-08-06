import INote from '../interfaces/INote';
import { IUserInput } from '../interfaces/IUserInput';
import styles from '../styles/components/ButtonContainer.module.scss'

interface Props{
 disabled: boolean;
 confirm: ()=>void;
 cancel: ()=>void;
}

export default function ButtonContainer(props: Props) {

 const { disabled, confirm, cancel } = props;

  return (
    <div className={styles['btn-container']}>
      <button className='btn-secondary' onClick={cancel}>
        Cancel
      </button>
      <button disabled={disabled} onClick={confirm}>
        Save note
      </button>
      </div>
  );
}
