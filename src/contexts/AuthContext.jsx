import React, { createContext, useEffect, useCallback, } from 'react';
import jwtDecode from 'jwt-decode';
import { useHistory } from 'react-router';
import useLocalStorage from '../hooks/useLocalStorage';

let logoutTimer;

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, storeUser, clearStoredUser] = useLocalStorage('user');
  const [sessionExpDate, storeSessionExpDate, clearSessionExpDate] = useLocalStorage('sessionExp');
  const history = useHistory();

  const handleUserLogin = (user) => {
    const expiration = new Date(jwtDecode(user.access_token).exp * 1000);
    storeUser(user);
    storeSessionExpDate(expiration);
  };

  const handleUserLogout = () => {
    clearStoredUser();
    clearSessionExpDate();
    history.push("/");
  };

  const handleExpirationLogout = useCallback(() => {
    clearStoredUser();
    clearSessionExpDate();
    history.push('/session-expired');
  }, [history]);

  useEffect(() => {
    if (currentUser && sessionExpDate) {
      const remainingTime = new Date(sessionExpDate).getTime() - new Date().getTime();
      logoutTimer = setTimeout(handleExpirationLogout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [currentUser, sessionExpDate, handleExpirationLogout]);

  return (
    <AuthContext.Provider value = {{ currentUser, handleUserLogin, handleUserLogout }}>
      { children }
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;