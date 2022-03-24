import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.min.css';
import './App.css';
import { AppCont, MainCont } from './App.styled';
import AppRoutes from './common/AppRoutes';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { auth, getDocument } from './common/Firebase';
import { createContext, useEffect, useState } from 'react';
import { UserInfo } from 'firebase/auth';
import { UserData } from './common/Interfaces';

export const CurrentUserContext = createContext({});

function App() {
  // const [currentUser, setCurrentUser] = useState<UserData>();

  // useEffect(() => {
  //   const subscriber = auth.onAuthStateChanged(
  //     (firebaseUser: UserInfo | null) => {
  //       if (firebaseUser) {
  //         getDocument('users', firebaseUser.uid).then((result) => {
  //           if (result) setCurrentUser(result as UserData);
  //         });
  //       }
  //     }
  //   );
  //   return subscriber;
  // }, []);

  return (
    <BrowserRouter>
      <AppCont>
        {/*<CurrentUserContext.Provider value={currentUser || {}}>*/}
        <Header />
        <MainCont>
          <AppRoutes />
        </MainCont>
        <Footer />
        {/*</CurrentUserContext.Provider>*/}
      </AppCont>
    </BrowserRouter>
  );
}

export default App;
