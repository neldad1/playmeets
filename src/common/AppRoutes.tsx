import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import UsersWithinStateProvider from '../context/UsersWithinState';
import EventInfo from '../pages/EventInfo';
import NotificationInfo from '../pages/NotificationInfo';
import CreateEvent from '../pages/CreateEvent';
import Events from '../pages/Events';
import FinishSignUp from '../pages/FinishSignUp';
import Home from '../pages/Home';
import LogIn from '../pages/Login';
import Notifications from '../pages/Notifications';
import Privacy from '../pages/Privacy';
import Profile from '../pages/Profile';
import SignUp from '../pages/SignUp';
import Terms from '../pages/Terms';
import CurrentUserEvents from '../pages/CurrentUserEvents';
import EditEvent from '../event/edit/EditEvent';
import { useContext } from 'react';
import { CurrentUserContext } from '../context/CurrentUser';
import { isObjectEmpty } from './Helpers';

const PrivateRoute = () => {
  const currentUser = useContext(CurrentUserContext);
  return (
    <UsersWithinStateProvider>
      {!isObjectEmpty(currentUser) ? <Outlet /> : <Home />}
    </UsersWithinStateProvider>
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
      <Route path="/notifications" element={<PrivateRoute />}>
        <Route path="/notifications" element={<Notifications />} />
      </Route>
      <Route path="/notifications/:notificationId" element={<PrivateRoute />}>
        <Route
          path="/notifications/:notificationId"
          element={<NotificationInfo />}
        />
      </Route>
      <Route path="/yourevents" element={<PrivateRoute />}>
        <Route path="/yourevents" element={<CurrentUserEvents />} />
      </Route>
      <Route path="/events/:eventId/edit" element={<PrivateRoute />}>
        <Route path="/events/:eventId/edit" element={<EditEvent />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
