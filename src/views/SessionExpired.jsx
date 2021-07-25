import React from 'react';
import { Link } from 'react-router-dom';

export default function SessionExpired() {
  return (
    <div>
      <h2>Session Expires</h2>
      <p>Your sessión has expired, please log in again :)</p>
      <Link to="/"><button type="button">Home</button></Link>
    </div>
  );
}
