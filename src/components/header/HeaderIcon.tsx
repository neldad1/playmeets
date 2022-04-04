import { MenuItemIcon } from './Header.styled';

interface HeaderIconProps {
  imgSrc: string;
}
const HeaderIcon = ({ imgSrc }: HeaderIconProps) => {
  return <MenuItemIcon src={imgSrc} alt="" />;
};

export default HeaderIcon;
