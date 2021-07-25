import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import UserReviews from '../Components/UserReviews';
import UserLikes from '../Components/UserLikes';
import useAuth from '../hooks/useAuth';

export default function SessionProfile() {
  const { currentUser } = useAuth();
  if (!currentUser) return <Redirect to="/" />
  const user = currentUser.user;
  const [reload, setReload] = useState(false);

  return (
    <div>
      <div className="container">
        <div className="row info-header">
          <div className="profile-pic-container">
            <img src={user.profile_picture} alt="Profile picture" />
          </div>
          <div className="info-container">
            <div>
              <span className="nombre-usuario">{`${user.first_name} ${user.last_name} `}</span>
              <span className="nic-usuario">{`@${user.username}`} {user.is_admin ? '(Admin)' : ''}</span>
            </div>
            <div className="description-container">
              <p>{user.description}</p>
            </div>
            <div>
              <Link to={`/edit-user/${user.id}`}>
                <button type="button">Edit profile</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <h2>Reviews</h2>
          <UserReviews User={user} reload={reload} setReload={setReload} />
        </div>
        <div>
          <h2>Liked Reviews</h2>
          <UserLikes User={user} reload={reload} setReload={setReload} />
        </div>
      </div>
    </div>
  );
}