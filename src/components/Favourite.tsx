import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import Tooltip from 'antd/lib/tooltip';
import { SyntheticEvent, useContext } from 'react';
import { setDocument } from '../common/Firebase';
import { CurrentUserContext } from '../context/CurrentUser';

interface FavouriteProps {
  eid: string;
}
const Favourite = ({ eid }: FavouriteProps) => {
  const currentUser = useContext(CurrentUserContext);
  const isFavourite = currentUser.data?.favourites?.includes(eid);

  const onFaveClick = (event: SyntheticEvent) => {
    event.preventDefault();
    setDocument('users', currentUser.id, {
      ...currentUser.data,
      favourites: [...(currentUser.data.favourites ?? []), eid],
    });
  };

  const onUnFaveClick = (event: SyntheticEvent) => {
    event.preventDefault();
    const faves = currentUser.data.favourites.filter((fave) => fave !== eid);
    setDocument('users', currentUser.id, {
      ...currentUser.data,
      favourites: faves,
    });
  };

  return (
    <Tooltip title="Add to Fave" color="blue" placement="bottom">
      {isFavourite ? (
        <HeartFilled
          key="fave-filled"
          className="antd-icon-action"
          onClick={onUnFaveClick}
        />
      ) : (
        <HeartOutlined
          key="fave-outlined"
          className="antd-icon-action"
          onClick={onFaveClick}
        />
      )}
    </Tooltip>
  );
};

export default Favourite;
