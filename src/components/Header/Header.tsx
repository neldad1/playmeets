import { HeaderDiv, HeaderImg } from './Header.styled';

const Header = () => {
  return (
    <HeaderDiv>
      <HeaderImg src={require('../../playmeets.png')} alt="Playmeets" />
    </HeaderDiv>
  );
};
export default Header;
