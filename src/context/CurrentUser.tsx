import { UserInfo } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { auth, getDocument } from '../common/Firebase';
import { UserData } from '../common/Interfaces';

export const CurrentUserContext = createContext<UserData>({} as UserData);

const CurrentUserProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserData>({} as UserData);

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(
      (firebaseUser: UserInfo | null) => {
        if (firebaseUser) {
          getDocument('users', firebaseUser.uid).then((result) => {
            if (result) setCurrentUser(result as UserData);
          });
        }
      }
    );
    return subscriber;
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
