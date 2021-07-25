import React, { useEffect, useState } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import useAuth from '../hooks/useAuth';
import errorMsg from '../hooks/error';
import '../styles/forms.css';
import { getUserRoute, patchUserRoute } from '../hooks/calls';

export default function EditUser() {
  const { currentUser, handleUserLogin } = useAuth();
  const { id } = useParams();


  if (!currentUser || (!currentUser.user.is_admin && currentUser.user.id !== parseInt(id))) {
    return <Redirect to="/" />
  }

  const history = useHistory();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(async () => {
    setLoading(true);
    try {
      const response = await getUserRoute(id);
      const newUserData = {
        ...response.data.data,
        password: '',
        confirm_password: '',
      };
      setUserData(newUserData);
    } catch (err) {
      const message = errorMsg(err);
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChange = async (event) => {
    setUserData((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (userData.password === '') {
        delete userData['password'];
        delete userData['confirm_password'];
      }
      const response = await patchUserRoute({ userId: id }, userData);
      if (currentUser.user.id == id) {
        const updatedUser = currentUser;
        updatedUser.user = response.data.data;
        handleUserLogin(updatedUser);
      }
      history.push(`/users/${id}`);
    } catch (err) {
      const message = errorMsg(err);
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <h2>Loading...</h2>

  return (
    <div>
      <p>{errorMessage}</p>

      <Formik
        enableReinitialize
        initialValues={userData}
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
            .test(
              'empty-or-6-characters-check',
              'Password must be at least 6 characters',
              new_password => !new_password || (new_password.length >= 6 && new_password.length <= 30),
            ),
          confirm_password: Yup.string()
            .test('passwords-match', 'Passwords must match', function (value) {
              if (this.parent.password) {
                return this.parent.password === value;
              }
              return !value;
            }),
          profile_picture: Yup.string()
            .url('Please enter a valid url'),
          description: Yup.string()
            .max(500, 'Your description must be shorter than 500 characters'),
        })}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className='form-box'>
            <h2>Edit account</h2>
            <div className="form-group">
              <div className="label-container">
              <label htmlFor="username">Username:</label>
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
              <label htmlFor="first_name">First name:</label>
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
              <label htmlFor="last_name">Last name:</label>
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
              <label htmlFor="email">Email:</label>
            </div>
            <div className="field-container">
              <Field type="email" name="email" onInput={handleChange} />
              {errors.email && touched.email ? (
                <div>{errors.email}</div>
              ) : null}
              </div>
            </div>

            <div className="form-group">
            <div className="label-container">
              <label htmlFor="password">Password:</label>
            </div>
            <div className="field-container">
              <Field type="password" name="password" onInput={handleChange} />
              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}
              </div>
            </div>
            <div className="form-group">
            <div className="label-container">
              <label htmlFor="confirm_password">Confirm password:</label>
            </div>
            <div className="field-container">
              <Field type="password" name="confirm_password" onInput={handleChange} />
              {errors.confirm_password && touched.confirm_password ? (
                <div>{errors.confirm_password}</div>
              ) : null}
              </div>
            </div>
            <div className="form-group">
            <div className="label-container">
              <label htmlFor="profile_picture">Profile picture:</label>
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
              <label htmlFor="description" as="textarea">Description:</label>
            </div>
            <div className="field-container">
              <Field name="description" onInput={handleChange} />
            </div>
            </div>
            <div className="submit-container">
              <button type="submit">Save changes</button>
            </div>
          </Form>
        )}
      </Formik>
      <p>{errorMessage}</p>
    </div >
  );

}
