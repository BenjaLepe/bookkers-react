import React, { useState, useEffect } from 'react';
import '../styles/reviews.css';
import BookReview from './BookReview';
import Pages from './Pages';
import { getUserLikesRoute } from '../hooks/calls';
import errorMsg from '../hooks/error';

export default function UserLikes(props) {
  const { User, reload, setReload } = props;
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(async () => {
    setLoading(true);
    try {
      const response = await getUserLikesRoute({ userId: User.id, page });
      if (!response.data.data) throw new Error('No liked reviews');
      setReviews(response.data.data.likedReviews);
      setTotalPages(response.data.data.totalPages);
    } catch (err) {
      const message = errorMsg(err);
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  }, [page, reload]);

  return (
    loading || errorMessage ? (
      <p className="review-message">{errorMessage ? errorMessage : 'Loading...'}</p>
    ) : (
      <div className="review-collection-container">
        <div className="review-collection">
          {reviews.map((review) => {
            return <BookReview
              review={review}
              key={review.id}
              setter={() => setReload(!reload)}
            />;
          })}
        </div>
        <Pages page={page} totalPages={totalPages} setPage={setPage}></Pages>
      </div>
    )
  );
}
