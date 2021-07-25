import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import useAuth from '../hooks/useAuth';
import API from '../hooks/api';
import errorMsg from '../hooks/error'
import '../styles/forms.css';

const initialValues = {
  email: '',
  password: '',
};

export default function Login() {
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { currentUser, handleUserLogin } = useAuth();

  const handleSubmit = async () => {
    setLoading(true);
    // event.preventDefault();
    try {
      const response = await API.post('/auth', JSON.stringify(values));
      const user = await response.data.data;
      handleUserLogin(user);
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
  if (currentUser) return <Redirect to="/" />;

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Please enter a valid email')
            .required('Please enter an email'),
          password: Yup.string()
            .required('Please enter a password'),
        })}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className='form-box'>
            <h2>Login with your account</h2>
            <div className="form-group">
              <div className="label-container">
                <label htmlFor="email">Email:</label><br />
              </div>
              <div className="field-container">
              <Field name="email" onInput={handleChange} />
              {errors.email && touched.email ? (
                <div>{errors.email}</div>
              ) : null}
              </div>
            </div>
            <div className="form-group">
            <div className="label-container">
              <label htmlFor="password">Password:</label><br />
              </div>
              <div className="field-container">
              <Field type="password" name="password" onInput={handleChange} />
              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}
              </div>
            </div>
            <div className="submit-container">
              {/* <button type="submit">Log In</button> */}
              <button type="submit" disabled={!(values.email && values.password)}>Login</button>
            </div>
          </Form>
        )}
      </Formik>
      <p>{errorMessage}</p>
    </div>
  );
}