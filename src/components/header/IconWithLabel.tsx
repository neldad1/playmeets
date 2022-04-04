import { Badge } from 'antd';
import { useNavigate } from 'react-router-dom';
import { MenuItemContainer, MenuItemText } from './Header.styled';

interface IconWithLabelProps {
  title: string;
  link?: string;
  direction?: string;
  icon: JSX.Element;
  badgeCount?: number;
}
const IconWithLabel = ({
  title,
  link = '',
  direction = 'row',
  icon,
  badgeCount = 0,
}: IconWithLabelProps) => {
  const navigate = useNavigate();

  const onItemClick = () => {
    if (Boolean(link.length)) navigate(link);
  };

  let iconElement = icon;
  if (title === 'Notifications')
    iconElement = <Badge count={badgeCount}>{icon}</Badge>;
  return (
    <MenuItemContainer direction={direction} onClick={onItemClick}>
      {iconElement}
      <MenuItemText>{title}</MenuItemText>
    </MenuItemContainer>
  );
};

export default IconWithLabel;
