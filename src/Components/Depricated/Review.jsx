import React, { useState, useEffect } from 'react';
import '../styles/reviews.css';
import useAuth from '../../hooks/useAuth';
import ReviewOptions from './ReviewOptions';

export default function Review(props) {
  const { review } = props;
  const { currentUser } = useAuth();
  const [owner, setOwner] = useState(false);

  useEffect(() => {
    if (currentUser.id === props.UserId) setOwner(true);
  }, []);

  return (
    <div className="review-container">
      <div className="head">
        <h3>{review.title}</h3>
        <ReviewOptions review={review} owner={owner}></ReviewOptions>
        <p>{owner}</p>
      </div>
      <div className="subTitle">
        <p>Book: {review.bookName} - By: {review.username}</p>
      </div>
      <div className="content">
        <p>{review.body}</p>
      </div>
    </div>
  );
}