import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useBooks } from '../context/books.context';

const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Required';
  } else if (values.title.length > 40) {
    errors.title = 'Must be 40 characters or less';
  }
  if (!values.author) {
    errors.author = 'Required';
  }
  if (!values.isbn) {
    errors.isbn = 'Required';
  } else if (String(values.isbn).length !== 13) {
    errors.isbn = 'Must be 13 characters';
  }
  if (!values.date) {
    errors.date = 'Required';
  }
  return errors;
};

const Add = () => {
  const navigate = useNavigate();
  const {books,handleAddBook} = useBooks();

  const onSubmit = values =>{
    const isISBNExists = books.some(book => book.isbn === values.isbn);
    if (isISBNExists) {
      alert('ISBN already exists. Please enter a unique ISBN.');
    } else {
      const newBook = {
        id: Math.floor(Math.random() * 1000),
        ...values
      };
      handleAddBook(newBook);
      alert('Book added successfully!');
      navigate('/');
    }
  }
  
  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      isbn: '',
      date: '',
    },
    validate,
    onSubmit,
  });

  return (
    <div className="container">
      <h1 className='text-center m-5'>Add Book</h1>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.title && formik.errors.title}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.title}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="author">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            name="author"
            value={formik.values.author}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.author && formik.errors.author}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.author}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="isbn">
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            type="text"
            name="isbn"
            value={formik.values.isbn}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.isbn && formik.errors.isbn}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.isbn}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="date">
          <Form.Label>Published</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={formik.values.date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.date && formik.errors.date}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.date}</Form.Control.Feedback>
        </Form.Group>
        <Button variant="outline-primary mt-3" type="submit">
          Add Book
        </Button>
      </Form>
    </div>
  );
};

export default Add;
