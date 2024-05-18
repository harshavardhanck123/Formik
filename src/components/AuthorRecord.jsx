import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const AuthorRecord = ({ initialValues, onSubmit }) => {
  const handleFormSubmit = (values, actions) => {
    onSubmit(values);
    actions.resetForm();
  };

  return (
    <div className="container">
      <Formik
        initialValues={{ name: '', birthDate: '', bi: ''}}
        onSubmit={handleFormSubmit}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Name is required';
          }
          if (!values.birthDate) {
            errors.birthDate = 'Birth date is required';
          }
          if (!values.biography) {
            errors.biography = 'Biography is required';
          }
          return errors;
        }}
      >
        {({ isValid }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <Field type="text" id="name" name="name" className="form-control" />
              <ErrorMessage name="name" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label htmlFor="birthDate" className="form-label">Birth Date</label>
              <Field type="date" id="birthDate" name="birthDate" className="form-control" />
              <ErrorMessage name="birthDate" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label htmlFor="biography" className="form-label">Biography</label>
              <Field as="textarea" id="biography" name="biography" className="form-control" />
              <ErrorMessage name="biography" component="div" className="text-danger" />
            </div>
            <button type="submit" className="btn btn-primary" disabled={!isValid}>Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AuthorRecord;
