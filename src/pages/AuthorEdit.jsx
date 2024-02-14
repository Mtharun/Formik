// AuthorEdit.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthors } from '../context/authors.context';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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

const AuthorEdit = () => {
  const { id } = useParams();
  const { authors, setAuthors } = useAuthors();
  const [authorData, setAuthorData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const author = authors.find(author => author.id === parseInt(id));
    if (author) {
      setAuthorData(author);
      formik.setValues({
        name: author.name,
        birthDate: author.birthDate,
        biography: author.biography,
      });
    }
  }, [authors, id]);

  const formik = useFormik({
    initialValues: {
      name: authorData.name || '',
      birthDate: authorData.birthDate || '',
      biography: authorData.biography || '',
    },
    validate,
    onSubmit: values => {
      const updatedAuthor = { ...authorData, ...values };
      const updatedAuthors = authors.map(author =>
        author.id === updatedAuthor.id ? updatedAuthor : author
      );
      setAuthors(updatedAuthors);
      alert('Author updated successfully!');
      navigate('/');
    },
  });

  return (
    <div className="container">
      <h1 className='text-center m-5'>Edit Author</h1>
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
        <Button variant="success mt-3" type="submit">
          Update Author
        </Button>
      </Form>
    </div>
  );
};

export default AuthorEdit;
