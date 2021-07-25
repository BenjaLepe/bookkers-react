import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import EditComponent from './EditComponent';
import {
  postReviewLikeRoute, deleteReviewLikeRoute, deleteReviewRoute
} from '../hooks/calls';
import ReportModal from './Modals/Report';

function BookReview(props) {
  const { review, setter } = props;
  const { currentUser } = useAuth();
  const [edit, setEdit] = useState(false);

  const handleClick = async (BookId, id) => {
    const r = await postReviewLikeRoute({ bookId: BookId, reviewId: id });
    setter();
    return r;
  };

  const handleUnlike = async (BookId, id) => {
    const r = await deleteReviewLikeRoute({ bookId: BookId, reviewId: id });
    setter();
    return r;
  };

  const handleDelete = async (BookId, id) => {
    const r = await deleteReviewRoute({ bookId: BookId, reviewId: id });
    setter();
    return r;
  };

  const handleEdit = () => {
    setEdit(true);
  };


  return (
    <div key={review.id} className="box">
      {!edit
        ? (
          <div>
            <div>
              <Link to={`/users/${review.UserId}`}>{`@${review.User.username}`}  </Link>
              {review.likes.some((like) => like === currentUser.user.id) ?
                <button
                  type="button"
                  onClick={() => handleUnlike(review.BookId, review.id)}>
                  Unlike
                </button>
                :
                <button
                  type="button"
                  onClick={() => handleClick(review.BookId, review.id)}>
                  Like
                </button>
              }
              {
                (currentUser.user.id === review.UserId) ?
                  <button
                    type="button"
                    onClick={() => handleEdit(review)}>
                    Edit
                  </button> :
                  <></>
              }
              {
                (currentUser.user.is_admin || currentUser.user.id === review.UserId) ?
                  <button type="button" onClick={() => handleDelete(review.BookId, review.id)}>Delete</button> :
                  <></>
              }
              {
                (currentUser.user.is_admin) ?
                  <Link to={`/books/${review.BookId}/reviews/${review.id}/reports`}>
                    <button type="button">Ver reportes</button>
                  </Link>
                  :
                  <></>
              }
              {review.Book ? (
                <p>Libro: {review.Book.name}</p>
              ) : null}
              <p>Total likes: {review.likes.length}</p>

            </div>
            <h3>{review.title}</h3>

            <p>{review.body}</p>
            {( currentUser.user.id !== review.UserId ) ? (
              <ReportModal bookId={review.BookId} reviewId={review.id} />
            ): null}
          </div>
        )
        : (
          <EditComponent
            key={review.id}
            review={review}
            setter={() => setter()} />
        )}

    </div>

  );
}
export default BookReview;