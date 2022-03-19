import Footer from '../Footer/Footer';
import AuthMenu from '../Header/AuthMenu';
import Header from '../Header/Header';
import { MainContent } from './Content.styled';

const Home = () => {
  return (
    <>
      <Header>
        <AuthMenu />
      </Header>
      <MainContent>HOME</MainContent>
      <Footer />
    </>
  );
};

export default Home;
