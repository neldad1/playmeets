import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.min.css';
import './App.css';
import { AppCont, MainCont } from './App.styled';
import AppRoutes from './common/AppRoutes';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import CurrentUserProvider from './context/CurrentUser';
import UsersWithinStateProvider from './context/UsersWithinState';

function App() {
  return (
    <BrowserRouter>
      <AppCont>
        <CurrentUserProvider>
          <Header />
          <MainCont>
            <AppRoutes />
          </MainCont>
          <Footer />
        </CurrentUserProvider>
      </AppCont>
    </BrowserRouter>
  );
}

export default App;
