import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { postReviewLikeRoute, deleteReviewLikeRoute } from '../../hooks/calls';
import errorMsg from '../../hooks/error';

export default function ReviewOptions(props) {
  const { review, owner} = props;
  const { currentUser } = useAuth();
  const [liked, setLiked] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    if (review.likes.some((like) => like === currentUser.user.id)) setLiked(true);
  }, [])

  const handleLike = async () => {
    try {
      if (liked) {
        await deleteReviewLikeRoute({ bookId: review.BookId, reviewId: review.id });
        setLiked(false);
      } else {
        await postReviewLikeRoute({ bookId: review.BookId, reviewId: review.id });
        setLiked(true);
      }
    } catch (err) {
      const message = errorMsg(err);
      setErrorMessage(message);
    }
  };

  return (
    <div className="review-op-container">
      {owner ? (
        <div className="review-op-set">
          <div className="review-op-item">
            <Link to={`reviews/${review.id}/edit`}>
              <button type="button">Edit</button>
            </Link>
          </div>
          <div className="review-op-item">
            <button type="button" onClick={handleLike}>{liked ? 'Unlike' : 'Like'}</button>
          </div>
        </div>
      ) : (
        <div className="review-op-item">
          <button type="button" onClick={handleLike}>{liked ? 'Unlike' : 'Like'}</button>
        </div>
      )}
      <p className="review-op-error">{errorMessage}</p>
    </div>
  );
}