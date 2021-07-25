import React, { useState, useEffect } from 'react';
import errorMsg from '../hooks/error';
import useAuth from '../hooks/useAuth';
import { getBookReviewsRoute, postReviewRoute } from '../hooks/calls';
import NotFound from './NotFound';
import '../styles/bookreviews.css';
// import EditComponent from '../Components/EditComponent';
import BookReview from '../Components/BookReview';
import Pages from '../Components/Pages';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const initialError = {
  code: 200,
  msg: '',
};

const initialReviews = {
  pageNumber: 0,
  totalPages: 0,
  reviews: [],
}

const initialValues = {
  "body": "",
  "title": "",
};

export default function BookReviews(props) {
  const { book } = props;
  // const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(initialError);
  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [values, setValues] = useState(initialValues);
  const [reviews, setReviews] = useState(initialReviews);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [reload, setReload] = useState(false);
  const { currentUser } = useAuth();

  useEffect(async () => {
    setLoading(true);
    try {
      const response = await getBookReviewsRoute({ bookId: book.id, page });
      setReviews(response.data.data);
      setTotalPages(response.data.data.totalPages);
    } catch (error) {
      // setErrorMessage(error.statusText);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }

    } finally {
      setLoading(false);
    }
  }, [page, reload, responseMessage]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const params = {bookId: book.id};
      await postReviewRoute(params, JSON.stringify(values));
      setResponseMessage('Se ha creado el review con éxito!');
      setValues(initialValues);
      setReload(!reload);
    } catch (err) {
      const message = errorMsg(err);
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

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error.code != 200 || !currentUser) {
    return <NotFound />
  }

  if (!reviews || !reviews.reviews) {
    return <div></div>;
  }

  return (
    <div>

      <div>
      <Formik
        initialValues={values}
        validationSchema={Yup.object({
          title: Yup.string()
            .required('Please enter the title'),
          body: Yup.string()
            .required('Please enter the body'),
        })}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className='form-box'>
            { (responseMessage && !errorMessage) ? (
              <div className="response-message success">{ `${responseMessage}` }</div>
            ): (errorMessage) ? (
              <div className="response-message error">{ `${errorMessage}` }</div>
            ): null }
            <h2>Add new review</h2>
            <div className="form-group">
              <div className="label-container">
                <label htmlFor="title">Title:</label>
              </div>
              <div className="field-container">
                <Field name="title" onInput={handleChange} />
                {errors.title && touched.title ? (
                  <div className="error-container">* {errors.title}</div>
                ) : null}
              </div>
            </div>
            <div className="form-group">
              <div className="label-container">
                <label htmlFor="body">Body:</label>
              </div>
              <div className="field-container">
                <Field className="textarea" as="textarea" name="body" onInput={handleChange} />
                {errors.body && touched.body ? (
                  <div className="error-container">* {errors.body}</div>
                ) : null}
              </div>
            </div>
            <div className="submit-container">
              <button type="submit">Create Review</button>
            </div>
          </Form>
        )}
      </Formik>
        <h2>Reviews</h2>
        { (reviews.reviews) ? (
          reviews.reviews.map((row) => (
            <BookReview
              key={row.id}
              review={row}
              setter={() => setReload(!reload)}
            />
          ))
          ): null }

      </div>
      <Pages page={page} totalPages={totalPages} setPage={setPage}></Pages>

    </div>
  );
}
