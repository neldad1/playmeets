import { Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import defaultAvatar from '../assets/defaultAvatar.png';
import { AvatarIcon } from './Components.styled';

interface AvatarProps {
  size?: number;
  imgSrc?: string;
  bordered?: boolean;
  displayName?: string;
}

const Avatar = ({ imgSrc, size, bordered, displayName = '' }: AvatarProps) => {
  const [url, setUrl] = useState(imgSrc || defaultAvatar);

  useEffect(() => {
    setUrl(imgSrc || defaultAvatar);
  }, [imgSrc]);
  return (
    <Tooltip title={displayName} color="blue" placement="bottom">
      <AvatarIcon
        size={size}
        src={url}
        bordered={bordered}
        onError={() => setUrl(defaultAvatar)}
      />
    </Tooltip>
  );
};

export default Avatar;
