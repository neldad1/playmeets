import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getDocuments } from '../common/Firebase';
import { isObjectEmpty } from '../common/Helpers';
import { AppUser, UserData } from '../common/Interfaces';
import { CurrentUserContext } from './CurrentUser';

interface UsersWithinStateContextProps {
  allUsers: AppUser[];
  getAppUserById(uid: string): AppUser | undefined;
}

export const UsersWithinStateContext =
  createContext<UsersWithinStateContextProps>(
    {} as UsersWithinStateContextProps
  );

const UsersWithinStateProvider: React.FC = ({ children }) => {
  const [allUsers, setAllUsers] = useState<AppUser[]>([]);

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (isObjectEmpty(currentUser)) return;

    const appUsers: AppUser[] = [];
    getDocuments('users', 'state', currentUser.state).then((userDocs) => {
      userDocs.forEach((userDoc) => {
        const newUser: AppUser = {
          id: userDoc.id,
          data: userDoc.data() as UserData,
        };
        appUsers.push(newUser);
      });
      setAllUsers(appUsers);
    });
  }, [currentUser]);

  const getAppUserById = useCallback(
    (userId: string) => {
      return allUsers.find((user) => user.id === userId);
    },
    [allUsers]
  );

  return (
    <UsersWithinStateContext.Provider value={{ allUsers, getAppUserById }}>
      {children}
    </UsersWithinStateContext.Provider>
  );
};

export default UsersWithinStateProvider;