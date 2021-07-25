import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/books.css';
import useAuth from '../hooks/useAuth';
import { deleteBookRoute } from '../hooks/calls';
import DeleteModal from './Modals/Delete';

function Book(props) {
  const { book, setter } = props;
  const { currentUser } = useAuth();
  const image = book.image ? book.image : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png";

  const handleDelete = async () => {
    const r = await deleteBookRoute({ bookId: book.id });
    setter();
    return r;
  };
  return (

    <div className="book-container">
      <div className="book-img-container">
        <Link to={`/books/${book.id}`}>
          <img className="book-img" src={`${image}`} alt="not-found" />
        </Link>
      </div>
      <div className="book-info">
        <Link to={`/books/${book.id}`}>
          <p>{`${book.name} (${book.author}) `}</p>
        </Link>
        {
          (currentUser.user.is_admin) ?
            <>
              <DeleteModal handleDelete={handleDelete}></DeleteModal>
              {/* <button className="delete" type="button" onClick={() => handleDelete()}>Delete</button> */}
              <Link to={`/edit-book/${book.id}`}><button className="edit" type="edit">Edit</button></Link>
            </> :
            <></>
        }
      </div>
    </div>

  );
}

export default Book;