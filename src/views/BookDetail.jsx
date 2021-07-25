import React, { useState, useEffect } from 'react';
import { useParams, Redirect, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { getBookRoute, deleteBookRoute } from '../hooks/calls';
import NotFound from './NotFound';
import BookReviews from './BookReviews';
import DeleteModal from '../Components/Modals/Delete';


const initialValues = {
  id: 0,
  name: '',
  ISBN: '',
  editorial: '',
  pages_number: '',
  author: '',
  genre: '',
};

const initialError = {
  code: 200,
  msg: '',
};

export default function BookDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(initialError);
  const [book, setBook] = useState(initialValues);
  const { currentUser } = useAuth();


  useEffect(async () => {
    setLoading(true);
    try {
      const response = await getBookRoute(id);
      setBook(response.data.data);
    } catch (error) {
      setErrorMessage(error.statusText);
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
  }, []);

  const handleDelete = async () => {
    await deleteBookRoute({ bookId: book.id });
    return <Redirect to="/" />
  };

  if (!currentUser) {
    return <Redirect to="/" />
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error.code != 200) {
    return <NotFound />
  }

  if (book.id === 0) {
    return null;
  }

  return (
    <div>
      {<div className="box">
        <div className="book-image-container">
          <img className="book-image-detail" src={`${book.image}`} alt=""  />
        </div>
        <div className="book-info-container">
          <h2>{`Book: ${book.name}`}</h2>
          <p>{`ISBN: ${book.ISBN}`}</p>
          <p>{`Editorial: ${book.editorial}`}</p>
          <p>{`Number of pages: ${book.pages_number}`}</p>
          <p>{`Author: ${book.author}`}</p>
          <p>{`genre: ${book.genre}`}</p>
          {
          (currentUser.user.is_admin) ?
            <>
              <DeleteModal handleDelete={handleDelete}></DeleteModal>
              {/* <button className="delete" type="button" onClick={() => handleDelete()}>Delete</button> */}
              <Link to={`/edit-book/${book.id}`}><button className="edit" type="edit">Edit</button></Link>
            </> :null
        }
        </div>
      </div>}
      <BookReviews key={book.id} book={book} />
      <p>{errorMessage}</p>
    </div>
  );
}