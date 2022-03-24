import { useState } from 'react';
import { AvatarIcon } from './User.styled';
import defaultAvatar from '../../assets/defaultAvatar.png';

interface AvatarProps {
  imgSrc?: string;
}

const Avatar = ({ imgSrc }: AvatarProps) => {
  const [url, setUrl] = useState(imgSrc || '');

  return <AvatarIcon src={url} onError={() => setUrl(defaultAvatar)} />;
};

export default Avatar;
