import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Add from './pages/Add';
import Home from './pages/Home';
import AuthorsContextProvider from './context/authors.context';
import BooksContextProvider from './context/books.context';
import AuthorAdd from './pages/AuthorAdd';
import Edit from './pages/Edit';
import AuthorEdit from './pages/AuthorEdit';

function App() {
  return (
    <Router>
    <AuthorsContextProvider>
      <BooksContextProvider>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/edit/:id' element={<Edit/>}/>
            <Route path='/add' element={<Add />} />
            <Route path ='/authorAdd' element={<AuthorAdd/>}/>
            <Route path='/authorEdit/:id' element={<AuthorEdit/>}/>
        </Routes>
      </BooksContextProvider>
    </AuthorsContextProvider>
    </Router>
  );
}

export default App;