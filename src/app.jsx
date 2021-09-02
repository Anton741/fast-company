import React, { useState } from 'react';
import api from './api/index';
import Users from './components/users';

const App = () => {
  const [users, delUser] = useState(api.users.fetchAll());

  const deleteUser = (user_id) => {
    return delUser(users.filter((element) => element._id !== user_id));
  };

  const AddBookmarks = (user_id) => {
    return delUser(
      users.map((user) => {
        if (user._id === user_id) {
          user.bookmark ? (user.bookmark = false) : (user.bookmark = true);
        }
        return user;
      })
    );
  };

  return (
    <>
      <Users
        onDelete={deleteUser}
        onAddBookmark={AddBookmarks}
        users={users}
      ></Users>
    </>
  );
};
export default App;
