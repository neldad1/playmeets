import { useEffect, useState } from 'react';
import defaultAvatar from '../assets/defaultAvatar.png';
import { AvatarIcon } from './Components.styled';

interface AvatarProps {
  size?: number;
  imgSrc?: string;
}

const Avatar = ({ imgSrc, size }: AvatarProps) => {
  const [url, setUrl] = useState(imgSrc || defaultAvatar);

  useEffect(() => {
    setUrl(imgSrc || defaultAvatar);
  }, [imgSrc]);
  return (
    <AvatarIcon size={size} src={url} onError={() => setUrl(defaultAvatar)} />
  );
};

export default Avatar;
