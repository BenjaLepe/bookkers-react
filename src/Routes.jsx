import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from './views/NotFound';
import Login from './views/Login';
import BookDetail from './views/BookDetail';
import SignUp from './views/SignUp';
import Home from './views/Home';
import AuthContextProvider from './contexts/AuthContext';
import SessionProfile from './views/SessionProfile';
import SessionExpired from './views/SessionExpired';
import UserProfile from './views/UserProfile';
import CreateBook from './views/AddBook';
import EditUser from './views/EditUser';
import Navbar from './Components/Navbar';
import reviewReports from './views/Reports';
import EditBook from './views/EditBook';

export default function Routes() {
  return (
    <AuthContextProvider>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/session-expired" component={SessionExpired} />
        <Route exact path="/session-profile" component={SessionProfile} />
        <Route exact path="/users/:id" component={UserProfile} />
        <Route exact path="/books/new" component={CreateBook} />
        <Route exact path="/books/:id" component={BookDetail} />
        <Route exact path="/edit-book/:id" component={EditBook} />
        <Route exact path="/edit-user/:id" component={EditUser} />
        <Route exact path="/books/:book_id/reviews/:review_id/reports" component={reviewReports} />
        <Route component={NotFound} />
      </Switch>
    </AuthContextProvider>
  );
}