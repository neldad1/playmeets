import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import Tooltip from 'antd/lib/tooltip';
import { SyntheticEvent, useContext } from 'react';
import { setDocument } from '../common/Firebase';
import { CurrentUserContext } from '../context/CurrentUser';

interface FavouriteProps {
  eid: string;
  isBigger?: boolean;
}
const Favourite = ({ eid, isBigger = false }: FavouriteProps) => {
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
    let faves: string[] = [];
    if (!currentUser.data.favourites) return;

    faves = currentUser.data.favourites.filter((fave) => fave !== eid);
    setDocument('users', currentUser.id, {
      ...currentUser.data,
      favourites: faves,
    });
  };

  const makeBigger = isBigger ? 'antd-icon-action' : '';
  const tooltipTitle = isFavourite ? 'Remove from Faves' : 'Add to Faves';

  return (
    <Tooltip title={tooltipTitle} color="blue" placement="bottom">
      {isFavourite ? (
        <HeartFilled
          key="fave-filled"
          onClick={onUnFaveClick}
          className={makeBigger}
        />
      ) : (
        <HeartOutlined
          key="fave-outlined"
          onClick={onFaveClick}
          className={makeBigger}
        />
      )}
    </Tooltip>
  );
};

export default Favourite;
