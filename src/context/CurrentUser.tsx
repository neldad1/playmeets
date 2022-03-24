import { UserInfo } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { auth, getDocument } from '../common/Firebase';
import { AppUser, UserData } from '../common/Interfaces';

export const CurrentUserContext = createContext<AppUser>({} as AppUser);

const CurrentUserProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AppUser>({} as AppUser);

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(
      (firebaseUser: UserInfo | null) => {
        if (firebaseUser) {
          getDocument('users', firebaseUser.uid).then((docUser) => {
            if (docUser)
              setCurrentUser({
                id: docUser.id,
                data: docUser.data() as UserData,
              });
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
