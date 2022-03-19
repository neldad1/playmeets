import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.min.css';
import './App.css';
import { AppCont } from './App.styled';
import AppRoutes from './AppRoutes';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './Firebase';
import Content from './components/Content/Content';

function App() {
  const [user] = useAuthState(auth);

  return (
    <BrowserRouter>
      <AppCont>{!user ? <AppRoutes /> : <Content />}</AppCont>
    </BrowserRouter>
  );
}

export default App;
