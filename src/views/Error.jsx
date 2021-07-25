import React from 'react';
// import { Link } from 'react-router-dom';

export default function Error(props) {
  const { error } = props;

  if (error === 'Auth error') {
    return (
      <div>
        <h2>403 Error</h2>
        <p>You do not have the authorization to see this page</p>
      </div>
    );


  }

  return (
    <div>
      <h2>404 Error</h2>
      <p>The page you are looking for does not exist</p>
    </div>
  );
}