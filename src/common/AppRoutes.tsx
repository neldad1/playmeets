import { Routes, Route } from 'react-router-dom';
import LogIn from '../components/Content/Login';
import SignUp from '../components/Content/SignUp';
import Home from '../components/Content/Home';
import Profile from '../components/Content/Profile';
import Privacy from '../components/Footer/Privacy';
import Terms from '../components/Footer/Terms';
import FinishSignUp from '../components/Content/FinishSignUp';
import Events from '../components/Content/Events';
import CreateEvent from '../components/Content/CreateEvent';

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