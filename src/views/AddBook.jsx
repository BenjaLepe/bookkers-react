import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import useAuth from '../hooks/useAuth';
import { postBookRoute } from '../hooks/calls';
import errorMsg from '../hooks/error';
import '../styles/forms.css';

const initialValues = {
    "name": "",
    "ISBN": "",
    "editorial": "",
    "pages_number": "",
    "author": "",
    "genre": "",
    "image": "",
};

export default function CreateBook() {
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const { currentUser } = useAuth();

  if (!currentUser) return <Redirect to="/"/>

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await postBookRoute(JSON.stringify(values));
      setResponseMessage('Se ha creado el libro con éxito!')
      setValues(initialValues)
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

  if (loading) return <h2>Loading...</h2>;

  return (
    <div>
      <Formik
        initialValues={values}
        validationSchema={Yup.object({
          name: Yup.string()
            .required('Please enter the name of the book'),
          ISBN: Yup.number()
            .required('Please enter the ISBN'),
          editorial: Yup.string(),
          pages_number: Yup.string(),
          author: Yup.string()
            .required('Please enter an author'),
          genre: Yup.string(),
          image: Yup.string()
            .url('Please enter a valid url'),
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
            <h2>Add new book</h2>
            <div className="form-group">
              <div className="label-container">
                <label htmlFor="name">Name:</label>
              </div>
              <div className="field-container">
                <Field name="name" onInput={handleChange} />
                {errors.name && touched.name ? (
                  <div className="error-container">* {errors.name}</div>
                ) : null}
              </div>
            </div>
            <div className="form-group">
              <div className="label-container">
                <label htmlFor="ISBN">ISBN:</label>
              </div>
              <div className="field-container">
                <Field name="ISBN" onInput={handleChange} />
                {errors.ISBN && touched.ISBN ? (
                  <div className="error-container">* {errors.ISBN}</div>
                ) : null}
              </div>
            </div>
            <div className="form-group">
              <div className="label-container">
                <label htmlFor="editorial">Editorial:</label>
              </div>
              <div className="field-container">
                <Field name="editorial" onInput={handleChange} />
                {errors.editorial && touched.editorial ? (
                  <div className="error-container">* {errors.editorial}</div>
                ) : null}
              </div>
            </div>
            <div className="form-group">
              <div className="label-container">
                <label htmlFor="pages_number">Pages number:</label>
              </div>
              <div className="field-container">
                <Field name="pages_number" onInput={handleChange} />
                {errors.pages_number && touched.pages_number ? (
                  <div className="error-container">* {errors.pages_number}</div>
                ) : null}
              </div>
            </div>
            <div className="form-group">
              <div className="label-container">
                <label htmlFor="author">Author:</label>
              </div>
              <div className="field-container">
                <Field name="author" onInput={handleChange} />
                {errors.author && touched.author ? (
                  <div className="error-container">* {errors.author}</div>
                ) : null}
              </div>
            </div>
            <div className="form-group">
              <div className="label-container">
                <label htmlFor="genre">Genre:</label>
              </div>
              <div className="field-container">
              <Field 
                as="select"
                name="genre"
                value={ values.genre }
                onChange={handleChange}
              >
                <option value="" label="Select a genre" />
                <option value="Fantasy" label="Fantasy" />
                <option value="Adventure" label="Adventure" />
                <option value="Romance" label="Romance" />
                <option value="Contemporary" label="Contemporary" />
                <option value="Dystopian" label="Dystopian" />
                <option value="Mystery" label="Mystery" />
                <option value="Horror" label="Horror" />
                <option value="Thriller" label="Thriller" />
                <option value="Paranormal" label="Paranormal" />
                <option value="Science Fiction" label="Science Fiction" />
                <option value="Memoir" label="Memoir" />
                <option value="Cooking" label="Cooking" />
                </Field>
                {errors.genre && touched.genre ? (
                  <div className="error-container">{errors.genre}</div>
                ) : null}
              </div>
            </div>
            <div className="form-group">
            <div className="label-container">
                <label htmlFor="image">Image (url):</label>
              </div>
              <div className="field-container">
                <Field name="image" onInput={handleChange} />
                {errors.image && touched.image ? (
                  <div className="error-container">* {errors.image}</div>
                ) : null}
              </div>
              <div className="img-preview">
              { (values.image) ? (
                <img src={values.image} alt="" />
              ) : null}
              </div>
            </div>
            <div className="submit-container">
              <button type="submit">Create Book</button>
            </div>
          </Form>
        )}
      </Formik>
      <p>{errorMessage}</p>
    </div>
  );
}