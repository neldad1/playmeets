import AppRoutes from '../../AppRoutes';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import UserMenu from '../Header/UserMenu';
import { MainContent } from './Content.styled';

const Content = () => {
  return (
    <>
      <Header>
        <UserMenu />
      </Header>
      <MainContent>
        <AppRoutes />
      </MainContent>
      <Footer />
    </>
  );
};

export default Content;
