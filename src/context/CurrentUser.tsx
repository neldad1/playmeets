import { User } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { createContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth, db } from '../common/Firebase';
import { isObjectEmpty } from '../common/Helpers';
import { AppUser, UserData } from '../common/Interfaces';

export const CurrentUserContext = createContext<AppUser>({} as AppUser);

const CurrentUserProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AppUser>({} as AppUser);
  const [authUser, setAuthUser] = useState<User>({} as User);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const unAuthPath = ['/login', '/signup'];
  const shouldRedirect = !unAuthPath.includes(pathname);

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged((firebaseUser: User | null) => {
      if (firebaseUser) {
        setAuthUser(firebaseUser);
      } else {
        setAuthUser({} as User);
        if (shouldRedirect) {
          setCurrentUser({} as AppUser);
          navigate('/');
        }
      }
    });
    return subscriber;
  }, []);

  useEffect(() => {
    if (isObjectEmpty(authUser)) return;

    const unsub = onSnapshot(doc(db, 'users', authUser.uid), (doc) => {
      if (doc) {
        const userData = doc.data() as UserData;
        setCurrentUser({
          id: authUser.uid,
          data: userData,
        });
        if (!userData.state) navigate('/finish-signup');
      }
    });
    return unsub;
  }, [authUser]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
