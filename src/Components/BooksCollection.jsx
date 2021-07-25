import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Pages from './Pages';
import useAuth from '../hooks/useAuth';
import Book from './Book';
import { getBooksRoute } from '../hooks/calls';
import '../styles/books.css';
import errorMsg from '../hooks/error';

export default function Books() {
  const [books, setBooks] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const { currentUser } = useAuth();

  useEffect(async () => {
    setLoading(true);
    try {
      const response = await getBooksRoute(page);
      const data = response.data.data;
      setBooks(data.books);
      setPage(data.pageNumber);
      setTotalPages(data.totalPages);
    } catch (err) {
      const message = errorMsg(err);
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  }, [page, reload])

  if (!currentUser) {
    return <Redirect to="/login" />
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="container">
      <h2>Books</h2>
      {errorMessage ? <p>{errorMessage}</p> : null}
      <div className="books-collection">
        {books.map((book) =>
          <Book
            key={book.id}
            book={book}
            setter={() => setReload(!reload)}
          />
        )}
      </div>
      <Pages page={page} totalPages={totalPages} setPage={setPage}></Pages>
    </div>
  );
}