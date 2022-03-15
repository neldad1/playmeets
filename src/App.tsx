import { BrowserRouter } from 'react-router-dom';
//import { initializeApp } from 'firebase/app';
import 'antd/dist/antd.min.css';
import './App.css';
import Header from './components/Header/Header';
import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';
import { MainDiv } from './App.styled';

function App() {
  return (
    <BrowserRouter>
      <MainDiv className="App">
        <Header />
        <Content />
        <Footer />
      </MainDiv>
    </BrowserRouter>
  );
}

export default App;
