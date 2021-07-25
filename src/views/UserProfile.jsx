import React, { useState, useEffect } from 'react';
import { Redirect, useParams, useHistory, Link } from 'react-router-dom';
import UserReviews from '../Components/UserReviews';
import useAuth from '../hooks/useAuth';
import errorMsg from '../hooks/error';
import { getUserRoute, deleteUserRoute } from '../hooks/calls';
import '../styles/profile.css';

export default function UserProfile() {
  const { id } = useParams();
  const { currentUser } = useAuth();

  if (!currentUser) return <Redirect to="/" />
  if (currentUser.user.id == id) return <Redirect to="/session-profile" />

  const history = useHistory();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [userInfo, setUserInfo] = useState(false);

  useEffect(async () => {
    setLoading(true);
    try {
      const response = await getUserRoute(id);
      setUser(response.data.data);
      setUserInfo(true);
    } catch (err) {
      const message = errorMsg(err);
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = async () => {
    if (currentUser.user.is_admin) {
      setLoading(true);
      try {
        await deleteUserRoute(id);
        history.push("/");
      } catch (err) {
        const message = errorMsg(err);
        setErrorMessage(message);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) return <h2>Loading...</h2>;
  if (errorMessage) return <h2>{errorMessage}</h2>;

  return (
    userInfo ? (
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
            {currentUser.user.is_admin ? (
              <div>
                <Link to={`/edit-user/${user.id}`}>
                  <button type="button">Edit User</button>
                </Link>
                <button type="button" onClick={() => handleDelete()}>Ban User</button>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div>
        <div>
          <h2>Reviews</h2>
          <UserReviews User={user} reload={reload} setReload={setReload} />
        </div>
      </div>
    </div>
    ) : <h2>Loading...</h2>
  );
}