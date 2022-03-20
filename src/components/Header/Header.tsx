import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../../Firebase';
import AuthMenu from './AuthMenu';
import { HeaderCont, FullLogo } from './Header.styled';
import PublicMenu from './PublicMenu';

interface AppHeaderProps {
  path?: string;
  children?: React.ReactNode;
}

const AppHeader = ({ children, path = '/' }: AppHeaderProps) => {
  return (
    <HeaderCont>
      <Link to={path}>
        <FullLogo src={require('../../assets/playmeets.png')} alt="Playmeets" />
      </Link>
      {children}
    </HeaderCont>
  );
};

const Header = () => {
  const [user] = useAuthState(auth);
  const { pathname } = useLocation();
  const paths = ['/login', '/signup', '/finishsignup'];
  const showMenu = !paths.includes(pathname);

  if (user)
    return (
      <AppHeader path="/events">
        <AuthMenu />
      </AppHeader>
    );

  return <AppHeader>{showMenu && <PublicMenu />}</AppHeader>;
};

export default Header;
