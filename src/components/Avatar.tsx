import { useState } from 'react';
import defaultAvatar from '../assets/defaultAvatar.png';
import { AvatarIcon } from './Components.styled';

interface AvatarProps {
  imgSrc?: string;
}

const Avatar = ({ imgSrc }: AvatarProps) => {
  const [url, setUrl] = useState(imgSrc || '');

  if (!url || url.length === 0) setUrl(defaultAvatar);

  return <AvatarIcon src={url} onError={() => setUrl(defaultAvatar)} />;
};

export default Avatar;
