import './App.module.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Main from './components/Main';
import { NotesProvider } from './context/NotesContext';

function App() {
  return (
    <>
      <NotesProvider>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path='/' element={<Main type='Saved' />} />
            <Route path='/archived' element={<Main type='Archived' />} />
          </Routes>
        </BrowserRouter>
      </NotesProvider>
    </>
  );
}

export default App;
