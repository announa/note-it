import styles from '../styles/components/Header.module.scss'
import Logo from '../assets/logo.png';
import ArchivedIcon from '../assets/icons/archive_dark.svg';

export default function Header() {
  return (
    <header className={styles.header}>
      <img src={Logo} alt='' />
      <img title='archived notes' src={ArchivedIcon} alt="" />
    </header>
  );
}
