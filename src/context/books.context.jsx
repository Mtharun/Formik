import { createContext, useContext, useState, useEffect } from 'react';

const BooksContext = createContext({
  books: [],
  setBooks: () => {},
  handleDelete: () => {}
});

export const useBooks = () => useContext(BooksContext);

const BooksContextProvider = ({ children }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('/mocks/books.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        return response.json();
      })
      .then(data => setBooks(data.books))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  const handleAddBook = (newBook) =>{
    setBooks(prevBooks =>[...prevBooks, newBook])
  }

  const handleDelete = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  const handleEditBook = (id, updatedBook) => {
    const isISBNExists = books.some(book => book.id !== id && book.isbn === updatedBook.isbn);
    if (isISBNExists) {
      alert('ISBN already exists. Please enter a unique ISBN.');
      return;
    }

    setBooks(prevBooks =>
      prevBooks.map(book => (book.id === id ? { ...book, ...updatedBook } : book))
    );
  };

  const value = {
    books,
    setBooks,
    handleAddBook,
    handleDelete,
    handleEditBook
  };

  return (
    <BooksContext.Provider value={value}>
      {children}
    </BooksContext.Provider>
  );
};

export default BooksContextProvider;
