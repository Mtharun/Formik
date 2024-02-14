// AuthorAdd.js
import React from 'react';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useAuthors } from '../context/authors.context';

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  }
  if (!values.birthDate) {
    errors.birthDate = 'Required';
  }
  if (!values.biography) {
    errors.biography = 'Required';
  }
  return errors;
};

const AuthorAdd = () => {
  const navigate = useNavigate();
  const { handleAddAuthor } = useAuthors();

  const formik = useFormik({
    initialValues: {
      name: '',
      birthDate: '',
      biography: '',
    },
    validate,
    onSubmit: values => {
      // Handle form submission
      const newAuthor = {
        id: Math.floor(Math.random() * 1000), // Use a random number for now, consider using a more robust method for generating IDs
        ...values
      };
      handleAddAuthor(newAuthor);
      alert('Author added successfully!');
      navigate('/');
    },
  });

  return (
    <div className="container">
      <h1 className='text-center m-5'>Add Author</h1>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-4" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.name && formik.errors.name}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-4" controlId="birthDate">
          <Form.Label>Birth Date</Form.Label>
          <Form.Control
            type="date"
            name="birthDate"
            value={formik.values.birthDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.birthDate && formik.errors.birthDate}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.birthDate}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-4" controlId="biography">
          <Form.Label>Biography</Form.Label>
          <Form.Control
            as="textarea"
            name="biography"
            value={formik.values.biography}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.biography && formik.errors.biography}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.biography}</Form.Control.Feedback>
        </Form.Group>
        <Button variant="outline-success mt-3" type="submit">
          Add Author
        </Button>
      </Form>
    </div>
  );
};

export default AuthorAdd;
