import React from 'react';
import useAuth from '../hooks/useAuth';
import Books from '../Components/BooksCollection';
import logo from '../styles/logo.png';
import '../styles/home.css';

export default function Home() {
  const { currentUser } = useAuth();

  return (
    <div>
      <div className='head-container'>
        <div className="logo-container">
          <img src={logo} alt="LOGO" className="logo" />
        </div >
        <div className="welcome-container">
          {currentUser ? (
            <h2>Welcome {currentUser.user.first_name} to Bookers</h2>
          ) : <h2>Welcome to Bookers</h2>}
          <p>Bookkers es una red social que permite a sus usuarios publicar, calificar, recomendar y
            ver las recomendaciones que otros usuarios han hecho respecto a los libros ingresados a
            la aplicación.</p>
        </div>
      </div>
  
      {currentUser ? (<Books />) : null}
    </div>
  );
}