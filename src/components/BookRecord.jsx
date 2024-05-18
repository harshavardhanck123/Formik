import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const BookRecord = ({ initialValues, onSubmit }) => {
  const handleFormSubmit = (values, actions) => {
    onSubmit(values);
    actions.resetForm();
  };

  return (
    <div className="container">
      <Formik
        initialValues={initialValues} // Pass the initial values to Formik
        onSubmit={handleFormSubmit}
        validate={(values) => {
          const errors = {};
          if (!values.title) {
            errors.title = 'Title is required';
          }
          if (!values.author) {
            errors.author = 'Author is required';
          }
          if (!values.isbn) {
            errors.isbn = 'ISBN is required';
          } else if (!/^\d{10}$/.test(values.isbn)) {
            errors.isbn = 'ISBN must be a 10-digit number';
          }
          if (!values.publicationDate) {
            errors.publicationDate = 'Publication date is required';
          } else if (new Date(values.publicationDate) > new Date()) {
            errors.publicationDate = 'Publication date must be in the past';
          }
          return errors;
        }}
      >
        {({ isValid }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <Field type="text" id="title" name="title" className="form-control" />
              <ErrorMessage name="title" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label htmlFor="author" className="form-label">Author</label>
              <Field type="text" id="author" name="author" className="form-control" />
              <ErrorMessage name="author" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label htmlFor="isbn" className="form-label">ISBN</label>
              <Field type="text" id="isbn" name="isbn" className="form-control" />
              <ErrorMessage name="isbn" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label htmlFor="publicationDate" className="form-label">Publication Date</label>
              <Field type="date" id="publicationDate" name="publicationDate" className="form-control" />
              <ErrorMessage name="publicationDate" component="div" className="text-danger" />
            </div>
            <button type="submit" className="btn btn-primary" disabled={!isValid}>Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BookRecord;
