import { NotesProvider } from './context/NotesContext';
import './App.module.scss';
import Main from './components/Main';

function App() {
  return (
    <>
      <NotesProvider>
        <Main />
      </NotesProvider>
    </>
  );
}

export default App;
