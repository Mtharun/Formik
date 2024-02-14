import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBooks } from "../context/books.context";
import { useFormik } from "formik";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Edit = () => {
  const { id } = useParams();
  const { books, setBooks } = useBooks();
  const [modifiedData, setModifiedData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = books.find((item) => item.id === parseInt(id));
    setModifiedData(data);
  }, [books, id]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: modifiedData?.title || "",
      author: modifiedData?.author || "",
      isbn: modifiedData?.isbn || "",
      date: modifiedData?.date || "",
    },
    onSubmit: (values) => {
      const existingBook = books.find(
        (book) => book.isbn === values.isbn && book.id !== parseInt(id)
      );
      if (existingBook) {
        alert("ISBN number must be unique");
        return;
      }

      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === parseInt(id) ? { ...book, ...values } : book
        )
      );
      alert("Book updated successfully!");
      navigate("/");
    },
  });

  return (
    <div className="container">
      <h1 className="text-center m-5">Edit Book</h1>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-4" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-4" controlId="author">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            name="author"
            value={formik.values.author}
            onChange={formik.handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-4" controlId="isbn">
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            type="text"
            name="isbn"
            value={formik.values.isbn}
            onChange={formik.handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-4" controlId="date">
          <Form.Label>Published</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={formik.values.date}
            onChange={formik.handleChange}
          />
        </Form.Group>
        <Button variant="primary mt-3" type="submit">
          Update Book
        </Button>
      </Form>
    </div>
  );
};

export default Edit;
