import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.min.css';
import './App.css';
import { AppCont, MainCont } from './App.styled';
import AppRoutes from './common/AppRoutes';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

function App() {
  return (
    <BrowserRouter>
      <AppCont>
        <Header />
        <MainCont>
          <AppRoutes />
        </MainCont>
        <Footer />
      </AppCont>
    </BrowserRouter>
  );
}

export default App;
