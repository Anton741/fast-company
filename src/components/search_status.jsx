const SearchStatus = ({users, nounWithNumerals}) => {
  return (
    <span
      className={'fs-4 my-3 ms-3 py-3 px-5 badge bg-' + (users.length > 0 ? 'primary' : 'danger')}
    >
      {users.length > 0
        ? `${users.length} ${nounWithNumerals()}  с тобой сегодня`
        : 'Никто с тобой не тусанет'}
    </span>
  );
};

export default SearchStatus;