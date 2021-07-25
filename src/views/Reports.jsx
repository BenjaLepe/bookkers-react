import React, { useState, useEffect } from 'react';
import { Link, useParams, Redirect } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import {
  getReviewReportsRoute,
} from '../hooks/calls';
import NotFound from './NotFound';
import '../styles/bookreviews.css';
import BookReview from '../Components/BookReview';
import Pages from '../Components/Pages';

const initialError = {
  code: 200,
  msg: '',
};

const initialReview = {
  id: 1,
  UserId: 1,
  BookId: 1,
  title: '',
  body: '',
  User: {
    id: 1,
    username: 'dummy',
  },
  likes: [1, 2, 3],
}

export default function ReviewReports() {
  const { book_id, review_id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(initialError);
  // const [errorMessage, setErrorMessage] = useState('');
  const [review, setReview] = useState(initialReview);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [reload, setReload] = useState(false);
  const [reports, setReports] = useState([]);
  // const [edit, setEdit] = useState(false);
  // const [aux, setAux] = useState(undefined);
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Redirect to="/" />
  }

  if (!currentUser.user.is_admin) {
    return <NotFound />
  }

  // review
  useEffect(async () => {
    setLoading(true);
    try {
      const response = await getReviewReportsRoute({ bookId: book_id, reviewId: review_id, page });
      setReview(response.data.data.review);
      setReports(response.data.data.reports);
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
  }, [page, reload]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error.code != 200 || !currentUser) {
    return <NotFound />
  }

  if (!review || (reports === [])) {
    return <div></div>;
  }

  return (
    <div>

      <div>
        <h2>Review</h2>
        <BookReview
          key={review.id}
          review={review}
          setter={() => setReload(!reload)}
        />

      </div>
      <h2 >Reports on this review</h2>
      {
        reports.map((row) => (
          <div key={row.id} className="box">
            <div>
              <div>
                Autor del reporte:
                <Link to={`/users/${row.UserId}`}>{row.User.username}</Link>
              </div>
              <h3>Explicación del reporte: {row.comment}</h3>
            </div>
          </div>

        ))
      }

      <Pages page={page} totalPages={totalPages} setPage={setPage}></Pages>
      {/* <p>{errorMessage}</p> */}

    </div>
  );
}