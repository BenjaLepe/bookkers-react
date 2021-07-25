import React, { useState } from 'react';
import errorMsg from '../hooks/error'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  editReviewRoute,
} from '../hooks/calls';

function EditComponent(props) {
  const { review, setter } = props;
  const [values, setValues] = useState(review);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    // event.preventDefault();
    try {
      const response = await editReviewRoute({
        bookId: review.BookId,
        reviewId: review.id,
      }, {
        title: values.title,
        body: values.body,
      });
      if (response.data.data) {
        setter();
      }
    } catch (err) {
      const message = errorMsg(err)
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = async (event) => {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div>
      <Formik
        initialValues={review}
        validationSchema={Yup.object({
          title: Yup.string()
            .required('Please enter a title'),
          body: Yup.string()
            .required('Please enter a body'),
        })}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <h2>Edit review for book {review.BookId}</h2>
            <div>
              <label htmlFor="title">Título:</label><br />
              <Field name="title" onInput={handleChange} />
              {errors.title && touched.title ? (
                <div>{errors.title}</div>
              ) : null}
            </div>
            <div>
              <label htmlFor="body">Body:</label><br />
              <Field name="body" onInput={handleChange} />
              {errors.body && touched.body ? (
                <div>{errors.body}</div>
              ) : null}
            </div>
            <div>
              <button type="submit" disabled={!(values.title && values.body)}>Send changes</button>
            </div>
          </Form>
        )}
      </Formik>
      <p>{errorMessage}</p>
      <button type="button" onClick={() => setter()}>Back</button>
    </div>
  );
}

export default EditComponent;