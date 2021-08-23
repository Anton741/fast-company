import React from 'react';
import api from '../api/index'
import {useState} from 'react'

const Users = () => {
  const [user, delUser] = useState(api.users.fetchAll())

  const qulitieClass = (classEnd) => {
    return `badge bg-${classEnd} me-2`
  }

  const deleteUser = (user_id) => {
    return delUser(user.filter(element => element._id != user_id))
  }

  const countOfUser = () => {
    return user.length > 0 ? user.length : "Никто с тобой не тусанет"
  }

  const nounWithNumerals = () => {
    if (user.length > 20){
      if ([2,3,4].includes(String(user.length)[user.length - 1])){
        return 'человека' 
      } else{ return 'человек'}
    }else{
      if ([2, 3, 4].includes(user.length)) {
        return 'человека';
      } else {
        return 'человек';
      }
    }
  }

  const listOfUser = () => {
    if (user.length > 0) {
      return (
        <>
          <h1 className="badge bg-primary p-2 fs-5 mt-2">{user.length} {nounWithNumerals()} тусанет с тобой сегодня</h1>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Имя</th>
                <th scope="col">Качества</th>
                <th scope="col">Профессия</th>
                <th scope="col">Встретился раз</th>
                <th scope="col">Оценка</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {user.map((element) => (
                <tr>
                  <td>{element.name}</td>
                  <td>
                    {element.qualities.map((colorBlock) => {
                      return (
                        <span className={qulitieClass(colorBlock.color)}>
                          {colorBlock.name}
                        </span>
                      );
                    })}
                  </td>
                  <td>{element.profession.name}</td>
                  <td>{element.completedMeetings}</td>
                  <td>{element.rate}/5</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={deleteUser.bind(this, element._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    }else{
      return (<h1 className="badge bg-danger p-2 fs-5 mt-2">Никто с тобой не тусанет</h1>);
    }
  }


  return (
    <>
    {listOfUser()}
    </>
  );
}

export default Users;