import { Routes, Route, Outlet } from 'react-router-dom';
import LogIn from '../components/content/Login';
import SignUp from '../components/content/SignUp';
import Home from '../components/content/Home';
import Profile from '../components/content/Profile';
import Privacy from '../components/footer/Privacy';
import Terms from '../components/footer/Terms';
import FinishSignUp from '../components/content/FinishSignUp';
import Events from '../components/content/Events';
import CreateEvent from '../components/content/CreateEvent';
import EventInfo from '../components/content/EventInfo';
import CurrentUserProvider from '../context/CurrentUser';
import UsersWithinStateProvider from '../context/UsersWithinState';

const PrivateRoute = () => {
  return (
    <CurrentUserProvider>
      <UsersWithinStateProvider>
        <Outlet />
      </UsersWithinStateProvider>
    </CurrentUserProvider>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/finish-signup" element={<FinishSignUp />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/profile" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="/events" element={<PrivateRoute />}>
        <Route path="/events" element={<Events />} />
      </Route>
      <Route path="/events/:eventId" element={<PrivateRoute />}>
        <Route path="/events/:eventId" element={<EventInfo />} />
      </Route>
      <Route path="/create-event" element={<PrivateRoute />}>
        <Route path="/create-event" element={<CreateEvent />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
