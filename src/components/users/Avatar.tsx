import { useState } from 'react';
import { AvatarIcon } from './User.styled';
import defaultAvatar from '../../assets/defaultAvatar.png';

interface AvatarProps {
  imageSrc: string;
}

const Avatar = ({ imageSrc }: AvatarProps) => {
  const [url, setUrl] = useState(imageSrc);

  return <AvatarIcon src={url} onError={() => setUrl(defaultAvatar)} />;
};

export default Avatar;
