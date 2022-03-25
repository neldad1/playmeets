import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../common/Firebase';
import Landing from './Landing';

const Home = () => {
  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/events');
  }, [user]);

  return <Landing />;
};

export default Home;
