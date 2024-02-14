import { Link } from 'react-router-dom';
import { useAuthors } from '../context/authors.context';
import { useBooks } from '../context/books.context';
import AuthorTableRow from '../components/AuthorTableRow';
import BookTableRow from '../components/BookTableRow';

const Home = () => {
  const { authors, handleAuthorDelete } = useAuthors();
  const { books, handleDelete: handleBookDelete } = useBooks();

  return (
    <div className='container'>
      <h1 className='text-center m-5'>FORMIK LIBRARY MANAGEMENT</h1>

      <div className='row'>
        <div className='col-md-6'>
          <Link className='btn btn-primary mb-3 mx-3' to='/add' style={{ textDecoration: 'none' }}>ADD Book</Link>
          <div className='table-responsive'>
            <table className='table table-hover'>
              <thead className='thead-dark'>
                <tr className='text-center'>
                  <th scope='col'>Title</th>
                  <th scope='col'>Author</th>
                  <th scope='col'>ISBN</th>
                  <th scope='col'>Published</th>
                  <th scope='col'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map(book => (
                  <BookTableRow key={book.id} data={book} handleDelete={handleBookDelete} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <br/>
        <div className='col-md-6'>
          <Link className='btn btn-success mb-3 mx-3' to='/authorAdd' style={{ textDecoration: 'none' }}>ADD Author</Link>
          <div className='table-responsive'>
            <table className='table table-hover'>
              <thead className='thead-dark'>
                <tr className='text-center'>
                  <th scope='col'>Name</th>
                  <th scope='col'>Birth Date</th>
                  <th scope='col'>Biography</th>
                  <th scope='col'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(authors) && authors.map(author => (
                  <AuthorTableRow key={author.id} data={author} handleDelete={handleAuthorDelete} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
