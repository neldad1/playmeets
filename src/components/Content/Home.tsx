import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../commons/Firebase';
import Events from './Events';
import Landing from './Landing';

const Home = () => {
  const [user] = useAuthState(auth);

  return user ? <Events /> : <Landing />;
};

export default Home;
