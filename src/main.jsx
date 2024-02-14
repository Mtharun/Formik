import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Add from './pages/Add';
import Home from './pages/Home';
import AuthorsContextProvider from './context/authors.context';
import BooksContextProvider from './context/books.context';
import AuthorAdd from './pages/AuthorAdd';
import Edit from './pages/Edit';
import AuthorEdit from './pages/AuthorEdit';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AuthorsContextProvider>
        <BooksContextProvider>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/edit/:id' element={<Edit />} />
            <Route path='/add' element={<Add />} />
            <Route path='/authorAdd' element={<AuthorAdd />} />
            <Route path='/authorEdit/:id' element={<AuthorEdit />} />
          </Routes>
        </BooksContextProvider>
      </AuthorsContextProvider>
    </Router>
  </React.StrictMode>
);
