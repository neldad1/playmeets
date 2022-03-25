import { useState } from 'react';
import defaultAvatar from '../assets/defaultAvatar.png';
import { AvatarIcon } from './Components.styled';

interface AvatarProps {
  imgSrc?: string;
}

const Avatar = ({ imgSrc }: AvatarProps) => {
  const [url, setUrl] = useState(imgSrc || '');

  return <AvatarIcon src={url} onError={() => setUrl(defaultAvatar)} />;
};

export default Avatar;
