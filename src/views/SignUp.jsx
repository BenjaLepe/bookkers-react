import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import useAuth from '../hooks/useAuth';
import API from '../hooks/api';
import errorMsg from '../hooks/error';
import '../styles/forms.css';

const initialValues = {
  username: '',
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  profile_picture: '',
  description: '',
};

export default function SignUp() {
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { currentUser, handleUserLogin } = useAuth();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await API.post('/users', JSON.stringify(values));
      if (response.status === 201) {
        const loginValues = {
          email: values.email,
          password: values.password,
        };
        const login = await API.post('/auth', JSON.stringify(loginValues));
        const user = await login.data.data;
        handleUserLogin(user);
      }
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
  if (currentUser) return <Redirect to="/" />;

  return (
    <div>

      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          username: Yup.string()
            .required('Please enter a username'),
          first_name: Yup.string()
            .required('Please enter your first name'),
          last_name: Yup.string()
            .required('Please enter your last name'),
          email: Yup.string()
            .email('Please enter a valid email')
            .required('Please enter an email'),
          password: Yup.string()
            .min(6, 'Password must be at least 6 characters long')
            .max(150, 'Don\'t exaggerate...')
            .required('Please enter a password'),
          passwordConfirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Please confirm your password'),
          profile_picture: Yup.string()
            .url('Please enter a valid url'),
          description: Yup.string()
            .max(500, 'Your description must be shorter than 500 characters'),
        })}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className='form-box'>
            <h2>Create a new account</h2>
            <div className="form-group">
            <div className="label-container">
              <label htmlFor="username">Username:</label><br />
            </div>
            <div className="field-container">
              <Field name="username" onInput={handleChange} />
              {errors.username && touched.username ? (
                <div>{errors.username}</div>
              ) : null}
              </div>
            </div>
            <div className="form-group">
            <div className="label-container">
              <label htmlFor="first_name">First name:</label><br />
            </div>
            <div className="field-container">
              <Field name="first_name" onInput={handleChange} />
              {errors.first_name && touched.first_name ? (
                <div>{errors.first_name}</div>
              ) : null}
            </div>
            </div>
            <div className="form-group">
            <div className="label-container">
              <label htmlFor="last_name">Last name:</label><br />
            </div>
            <div className="field-container">
              <Field name="last_name" onInput={handleChange} />
              {errors.last_name && touched.last_name ? (
                <div>{errors.last_name}</div>
              ) : null}
            </div>
            </div>
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
              <Field name="password" onInput={handleChange} />
              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}
            </div>
            </div>
            <div className="form-group">
            <div className="label-container">
              <label htmlFor="passwordConfirmation">Confirm password:</label><br />
            </div>
            <div className="field-container">
              <Field name="passwordConfirmation" onInput={handleChange} />
              {errors.passwordConfirmation && touched.passwordConfirmation ? (
                <div>{errors.passwordConfirmation}</div>
              ) : null}
            </div>
            </div>
            <div className="form-group">
            <div className="label-container">
              <label htmlFor="profile_picture">Profile picture:</label><br />
            </div>
            <div className="field-container">
              <Field name="profile_picture" onInput={handleChange} />
              {errors.profile_picture && touched.profile_picture ? (
                <div>{errors.profile_picture}</div>
              ) : null}
            </div>
            </div>
            <div className="form-group">
            <div className="label-container">
              <label htmlFor="description" as="textarea">Description:</label><br />
            </div>
            <div className="field-container">
              <Field name="description" onInput={handleChange} />
            </div>
            </div>
            <div className="submit-container">
              <button type="submit">Sign Up</button>
            </div>
          </Form>
        )}
      </Formik>
      <p>{errorMessage}</p>
    </div>
  );
}