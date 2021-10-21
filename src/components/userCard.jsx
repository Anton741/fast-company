import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Qualities from './qualities';
import { useParams } from 'react-router';
import api from '../api/index';

const UserCard = () => {
  const [user, setUser] = useState();
  api.users.getById(useParams().userId).then((data) => {
    setUser(data);
  });
  const history = useHistory();
  if (user) {
    return (
      <>
        <h1>{user.name}</h1>
        <h3>Проффесия: {user.profession.name}</h3>
        <Qualities qualities={user.qualities} />
        <p>Всего встреч: {user.completedMeetings}</p>
        <h3>Rate: {user.rate}</h3>
        <button onClick={() => history.push('/users')}>
                    Все пользователи
        </button>
      </>
    );
  };
  return (
    <h1>Loading...</h1>
  );
};

export default UserCard;
