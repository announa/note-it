import './App.module.scss';
import Header from './components/Header';
import Main from './components/Main';
import { NotesProvider } from './context/NotesContext';

function App() {
  return (
    <>
      <Header />
      <NotesProvider>
        <Main />
      </NotesProvider>
    </>
  );
}

export default App;
