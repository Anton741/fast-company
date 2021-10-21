const SearchStatus = ({ users }) => {
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
    <span
      className={
        'fs-4 my-3 ms-3 py-3 px-5 badge bg-' +
                (users.length > 0 ? 'primary' : 'danger')
      }
    >
      {users.length > 0
        ? `${users.length} ${nounWithNumerals()}  с тобой сегодня`
        : 'Никто с тобой не тусанет'}
    </span>
  );
};

export default SearchStatus;
