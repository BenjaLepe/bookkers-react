import React, { useState, useEffect } from 'react';
import { Redirect,  useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import useAuth from '../hooks/useAuth';
import { patchBookRoute, getBookRoute } from '../hooks/calls';
import errorMsg from '../hooks/error';
import '../styles/forms.css';

export default function EditBook() {

  const { currentUser, } = useAuth();
  const { id } = useParams();

  if (!currentUser || !currentUser.user.is_admin) {
    return <Redirect to="/" />
  }

  // const history = useHistory();
  const [fields, setFields] = useState({});
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(async () => {
    setLoading(true);
    try {
      const response = await getBookRoute(id);
      const bookData = { ...response.data.data };
      setName(bookData.name)
      setFields(bookData);
    } catch (err) {
      const message = errorMsg(err);
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await patchBookRoute({ bookId: id }, fields);
      setResponseMessage('Se ha editado el libro con éxito!')
    } catch (err) {
      const message = errorMsg(err);
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = async (event) => {
    setFields((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div>
      <Formik
        initialValues={fields}
        validationSchema={Yup.object({
          name: Yup.string()
            .required('Please enter the name of the book'),
          ISBN: Yup.number()
            .required('Please enter the ISBN'),
          editorial: Yup.string(),
          pages_number: Yup.string(),
          author: Yup.string()
            .required('Please enter an author'),
          genre: Yup.string()
            .required('Please enter a genre'),
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
            <h2>Update book: { `${name}` }</h2>
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
              <select
                name="genre"
                value={ fields.genre }
                onChange={handleChange}
              >
                <option value={ fields.genre } label={ fields.genre } />
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
              </select>
                {/* <Field name="genre" onInput={handleChange} /> */}
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
              { (fields.image) ? (
                <img src={fields.image} alt="" />
              ) : null}
              </div>
            </div>
            <div className="submit-container">
              <button type="submit">Edit Book</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}