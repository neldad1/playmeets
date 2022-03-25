import { Routes, Route, Outlet } from 'react-router-dom';
import CurrentUserProvider from '../context/CurrentUser';
import UsersWithinStateProvider from '../context/UsersWithinState';
import EventInfo from '../event/info/EventInfo';
import CreateEvent from '../pages/CreateEvent';
import Events from '../pages/Events';
import FinishSignUp from '../pages/FinishSignUp';
import Home from '../pages/Home';
import LogIn from '../pages/Login';
import Privacy from '../pages/Privacy';
import Profile from '../pages/Profile';
import SignUp from '../pages/SignUp';
import Terms from '../pages/Terms';

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
