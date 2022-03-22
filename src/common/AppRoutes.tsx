import { Routes, Route } from 'react-router-dom';
import LogIn from '../components/contents/Login';
import SignUp from '../components/contents/SignUp';
import Home from '../components/contents/Home';
import Profile from '../components/contents/Profile';
import Privacy from '../components/footers/Privacy';
import Terms from '../components/footers/Terms';
import FinishSignUp from '../components/contents/FinishSignUp';
import Events from '../components/contents/Events';
import CreateEvent from '../components/contents/CreateEvent';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/finish-signup" element={<FinishSignUp />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/events" element={<Events />} />
      <Route path="/create-event" element={<CreateEvent />} />
    </Routes>
  );
};

export default AppRoutes;
