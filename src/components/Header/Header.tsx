// import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeaderCont, FullLogo } from './Header.styled';

const Header: React.FC = ({ children }) => {
  return (
    <HeaderCont>
      <Link to="/">
        <FullLogo src={require('../../playmeets.png')} alt="Playmeets" />
      </Link>
      {children}
    </HeaderCont>
  );
};
export default Header;
