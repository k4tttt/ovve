import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Button from '@mui/material/Button';

const Profile = () => {
  const {username} = useParams();
  const [user_data, set_user_data] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/get_profile?username=${username}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        set_user_data(data.result[0]);
      })
      .catch((error) => {
        console.log("ERROR when fetching profile: " + error);
      });
  }, [username]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  console.log(user_data);
  return (
    <div id="profile">
      {user_data ? <div className='profile_details'>
        <div className='profile_picture'></div>
        <div className=''>
          <div>
            <p className='small_text'>Användarnamn</p>
            <h2>{user_data.username}</h2>
            <p className='small_text'>Namn på ovven</p>
            <h2>{user_data.ovve_name}</h2>
          </div>

          <div style={{display: 'flex', marginBottom: '16px'}}>
            <div className='detail_with_label'>
              <p className='small_text'>Fick ovve</p>
              <div className='date_tag'>{formatDate(user_data.purchase_date)}</div>
            </div>
            <div className='detail_with_label'>
              <p className='small_text'>Invigde ovve</p>
              <div className='date_tag'>{formatDate(user_data.inauguration_date)}</div>
            </div>
          </div>

          <div className='biography'>
            <p className='small_text'>Om mig</p>
            <p>{user_data.biography}</p>
          </div>
        </div>
      </div> : <></>}
      
      <Button variant="contained">Hello</Button>
      {/* {user_data ? (
        <ul>
          {user_data.map((item, index) => (
            <li key={index}>{item.username} - {item.creator}</li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )} */}
    </div>
  );
}

export default Profile;
