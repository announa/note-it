import './App.module.scss';
import Main from './components/Main';
import { NotesProvider } from './context/NotesContext';

function App() {
  return (
    <NotesProvider>
      <Main />
    </NotesProvider>
  );
}

export default App;
