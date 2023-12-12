import React, { useEffect, useState } from 'react';
import './Userlist.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash,faPenToSquare } from '@fortawesome/free-solid-svg-icons'


function Userlist() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editedData, setEditedData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    address1: '',
    address2: '',
    state: '',
    city: '',
    country: '',
    zipCode: '',
  });

  const handleEditClick = (user) => {
    setEditingUser(user);
    setEditedData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      address1: user.address1,
      address2: user.address2,
      state: user.state,
      city: user.city,
      country: user.country,
      zipCode: user.zipCode,
    });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateUser = async () => {
    try {
      const response = await fetch('http://localhost:3001/updateUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userid: editingUser._id, data: editedData }),
      });

      const result = await response.json();
      console.log(result);

      
      setEditingUser(null);
      setEditedData({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        address1: '',
        address2: '',
        state: '',
        city: '',
        country: '',
        zipCode: '',
      });

      fetchUserData();
    } catch (error) {
      console.error(`Error updating user: ${error}`);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(`Error fetching user data: ${error}`);
    }
  };

  const Deleteuser = async (userid) => {
    try {
      const response = await fetch('http://localhost:3001/deleteUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userid }),
      });

      const result = await response.json();
      console.log(result);

      fetchUserData();
    } catch (error) {
      console.error(`Error deleting user: ${error}`);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <div className="list__title">
        <table className='table__list'>
          <thead>
            <tr>
              <th>First-Name</th>
              <th>Last-Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Address1</th>
              <th>Address2</th>
              <th>State</th>
              <th>City</th>
              <th>Country</th>
              <th>Zip-code</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                
                <td className='ftch__list'>{user.firstName} </td>
                <td className='ftch__list'>{user.lastName}</td>
                <td className='ftch__list'>{user.email}</td>
                <td className='ftch__list'>{user.mobile}</td>
                <td className='ftch__list'>{user.address1}</td>
                <td className='ftch__list'>{user.address2}</td>
                <td className='ftch__list'>{user.state}</td>
                <td className='ftch__list'>{user.city}</td>
                <td className='ftch__list'>{user.country}</td>
                <td className='ftch__list'>{user.zipCode}</td>
                <td>
                  <button className='Delete__btn' onClick={() => Deleteuser(user._id)}>
                  <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
                <td>
                {editingUser && editingUser._id === user._id ? (
  <div>
    <input
      type="text"
      name="firstName"
      placeholder='FirstName'
      value={editedData.firstName}
      onChange={handleEditInputChange}
    />
  
    <input
      type="text"
      name="lastName"
      placeholder='LastName'
      value={editedData.lastName}
      onChange={handleEditInputChange}
    />
    <input type="tel"
    name='mobile'
    placeholder='Mobile No..'
    value={editedData.mobile}
      onChange={handleEditInputChange}
       />
  
    <button className='update__btn' onClick={handleUpdateUser}>Update</button>
  </div>
) : (
  <button
    className='Update__btn'
    onClick={() => handleEditClick(user)}
  >
   <FontAwesomeIcon icon={faPenToSquare} />
  </button>
)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Userlist;