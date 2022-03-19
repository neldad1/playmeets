import { Routes, Route } from 'react-router-dom';
import Events from './components/Content/Events';
import Profile from './components/Content/Profile';
import Privacy from './components/Footer/Privacy';
import Terms from './components/Footer/Terms';

const ContentRoutes = () => {
  return (
    <Routes>
      <Route path="/events" element={<Events />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
    </Routes>
  );
};

export default ContentRoutes;
