import Qualities  from "./qualities";
import Bookmarks from "./bookmark";
import React, { useState } from 'react';


const User = ({onQualitiesClass, qualities, name, profession, completedMeetings, rate, onDelete, _id, statusBookmark, onAddBookmark}) => {
  return (
    <tr >
      <td>{name}</td>
      <Qualities onClass={onQualitiesClass} qualities={qualities}></Qualities>
      <td>{profession.name}</td>
    <td className = 'text-center'><Bookmarks onAddBookmarks = {onAddBookmark} statusBookmark = {statusBookmark} user_id = {_id}></Bookmarks></td>
      <td>{completedMeetings}</td>
      <td>{rate}/5</td>
      <td>
        <button className="btn btn-danger" onClick={onDelete.bind(this, _id)}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default User;