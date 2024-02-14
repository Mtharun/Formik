// AuthorsContextProvider.js
import { createContext, useContext, useState, useEffect } from 'react';

const AuthorsContext = createContext({
  authors: [],
  setAuthors: () => {},
  handleAddAuthor: () => {},
  handleDeleteAuthor: () => {}
});

export const useAuthors = () => useContext(AuthorsContext);

const AuthorsContextProvider = ({ children }) => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    fetch('/mocks/authors.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch authors');
        }
        return response.json();
      })
      .then(data => setAuthors(data))
      .catch(error => console.error('Error fetching authors:', error));
  }, []);

  const handleAddAuthor = (newAuthor) => {
    setAuthors((prevAuthors) => [...prevAuthors, newAuthor]);
  };

  const handleAuthorDelete = (id) => {
    setAuthors((prevAuthors) => prevAuthors.filter(author => author.id !== id));
  };

  const value = {
    authors,
    setAuthors,
    handleAddAuthor,
    handleAuthorDelete
  };

  return (
    <AuthorsContext.Provider value={value}>
      {children}
    </AuthorsContext.Provider>
  );
};

export default AuthorsContextProvider;
