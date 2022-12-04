import React, { useState, useEffect } from "react";
import { data } from "autoprefixer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserList() {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);
  function fetchUsers() {
    axios
      .get("http://localhost:4444/employe")
      .then((Response) => {
        console.log("data from url ", Response.data);
        setUsers(Response.data);
      })
      .catch((Error) => {
        console.log("data not found", Error);
      });
  }

  function deletUser(DID) {
    axios
      .delete(`http://localhost:4444/employe/${DID}`)
      .then((Response) => {
        console.log("delet user ", Response.data);
        fetchUsers();
      })
      .catch((Error) => {
        console.log("something went wrong on deleting user id", Error);
      });
  }
  const viewDetail = (id) => {
    navigate(`/viewuser/${id}`);
    // console.log("view clicked here")
  };
  return (
    <React.Fragment>
      <div className="flex-1">
        <button
          onClick={() => navigate("/userEntryForm/add/0")}
          className="bg-green-400 text-white px-2 py-2 my-2 mx-2 shadow-lg rounded-sm float-right"
        >
          Add New Users
        </button>
      </div>
      <table className="min-w-full border-collapse block md:table">
        <thead className="block md:table-header-group">
          <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Serial No.
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Name
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Email Address
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Mobile
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {users.map((items, index) => (
            <tr className="bg-gray-300 border border-grey-500 md:border-none block md:table-row">
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">
                  Index
                </span>
                {items.id - 1}
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">
                  Name
                </span>
                {items.name}
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">
                  Email Address
                </span>
                {items.email}
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">
                  Mobile
                </span>
                {items.phone}
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">
                  Actions
                </span>
                <button
                  onClick={() => viewDetail(items.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 mx-2 border border-red-500 rounded"
                >
                  View
                </button>
                <button
                  onClick={() => navigate(`/userEntryForm/edit/${items.id}`)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 mx-2 border border-blue-500 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deletUser(items.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 mx-2 border border-red-500 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
}

export default UserList;
