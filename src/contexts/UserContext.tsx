import { createContext, useEffect, useState } from 'react';
import AuthService from '../services/auth.service';

export const UserContext = createContext({
  currentUser: null,
  setUser: (name) => {},
  removeUser: () => {},
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user.access_token);
    }
  }, []);

  const setUser = async (name) => {
    setCurrentUser('punch');
  };

  const removeUser = () => {
    setCurrentUser(null);
  };
  return (
    <UserContext.Provider value={{ currentUser, setUser, removeUser }}>
      {children}
    </UserContext.Provider>
  );
};
