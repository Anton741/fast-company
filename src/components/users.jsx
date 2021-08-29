import User from './user'
import SearchStatus  from './search_status';


const Users = ({ onDelete, onAddBookmark, users }) => {
  const qulitieClass = (classEnd) => {
    return `badge bg-${classEnd} mx-2 fs-6`;
  };

  const nounWithNumerals = () => {
    if (users.length > 20) {
      if ([2, 3, 4].includes(String(users.length)[users.length - 1])) {
        return 'человека';
      } else {
        return 'человек';
      }
    } else {
      if ([2, 3, 4].includes(users.length)) {
        return 'человека тусанет';
      } else {
        return 'человек тусанут';
      }
    }
  };
  return (
    <>
      <SearchStatus nounWithNumerals={nounWithNumerals} users={users}>
      </SearchStatus>
      {users.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Избранное</th>
              <th scope="col">Встретился раз</th>
              <th scope="col">Оценка</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <User
                  onDelete={onDelete}
                  onQualitiesClass={qulitieClass}
                  statusBookmark = {user.bookmark}
                  onAddBookmark = {onAddBookmark}
                  {...user}
                ></User>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
export default Users;

  