import { Link, useLocation } from 'react-router-dom';
import styles from '../styles/components/Nav.module.scss';
import Logo from '../assets/logo.png';
import Notepad from '../assets/icons/notepad.png';
import ArchivedIcon from '../assets/icons/archive_dark.svg';

export default function Nav() {
  const { pathname } = useLocation();

  return (
    <header className={styles.header}>
      <img src={Logo} alt='' />
      {pathname === '/' && (
        <Link to='/archived'>
          <img title='archived notes' src={ArchivedIcon} alt='' />
        </Link>
      )}
      {pathname === '/archived' && (
        <Link to='/'>
          <img title='saved notes' src={Notepad} alt='' />
        </Link>
      )}
    </header>
  );
}
