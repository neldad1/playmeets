import { useEffect, useState } from 'react';
import defaultAvatar from '../assets/defaultAvatar.png';
import { AvatarIcon } from './Components.styled';

interface AvatarProps {
  size?: number;
  imgSrc?: string;
  bordered?: boolean;
}

const Avatar = ({ imgSrc, size, bordered }: AvatarProps) => {
  const [url, setUrl] = useState(imgSrc || defaultAvatar);

  useEffect(() => {
    setUrl(imgSrc || defaultAvatar);
  }, [imgSrc]);
  return (
    <AvatarIcon
      size={size}
      src={url}
      bordered={bordered}
      onError={() => setUrl(defaultAvatar)}
    />
  );
};

export default Avatar;
