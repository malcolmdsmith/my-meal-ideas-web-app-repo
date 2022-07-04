import React from "react";

const UsersList = ({ users, onUserChanged }) => {
  return (
    <div>
      <select
        name="userslist"
        id="userslist"
        onChange={onUserChanged}
        className="form-control"
      >
        <option value="" />
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.firstName + " " + user.lastName}
          </option>
        ))}
      </select>
    </div>
  );
};
export default UsersList;
