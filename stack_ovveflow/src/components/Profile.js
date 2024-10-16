import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Slider from '@mui/material/Slider';

const Profile = () => {
  const { username } = useParams();
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

  const convertToUpperCase = (inputString) => {
    return inputString.toUpperCase();
  };

  console.log(user_data);
  return (
    <>
      {user_data ? <div id="profile">
        <div className='profile_details'>
          <div className='profile_info'>
            <div className='profile_picture'></div>
            <div>
              <div>
                <p className='small_text'>Användarnamn</p>
                <h2>{user_data.username}</h2>
                <p className='small_text'>Namn på ovven</p>
                <h2>{user_data.ovve_name}</h2>
              </div>

              <div style={{ display: 'flex', marginBottom: '16px' }}>
                <div className='detail_with_label'>
                  <p className='small_text'>Fick ovven</p>
                  <div className='date_tag'>{formatDate(user_data.purchase_date)}</div>
                </div>
                <div className='detail_with_label'>
                  <p className='small_text'>Invigde ovven</p>
                  <div className='date_tag'>{formatDate(user_data.inauguration_date)}</div>
                </div>
              </div>

              <div className='biography'>
                <p className='small_text'>Om mig</p>
                <p>{user_data.biography}</p>
              </div>
            </div>
          </div>

          <div className='ovve_color' style={{ marginLeft: '6vw' }}>
            <p className='ovve_color_text' style={{ color: `#${user_data.color_hex}` }}>
              {convertToUpperCase(user_data.color_name)}
            </p>

            <div style={{ display: 'flex', marginBottom: '16px' }}>
              <div className='detail_with_label'>
                <p className='small_text'>Lärosäte</p>
                <div>{user_data.university}</div>
              </div>
              <div className='detail_with_label'>
                <p className='small_text'>Program/sektion</p>
                <div className='date_tag'>{user_data.determinator}</div>
              </div>
            </div>
          </div>
        </div>

        <hr />

        <h3>Ovve-tidslinje</h3>
        <div className='ovve_timeline'>
          <Slider
            min={new Date(user_data.purchase_date).getTime()}
            max={new Date().getTime()}
            defaultValue={new Date().getTime()}
            aria-label="Default"
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => new Date(value).toLocaleDateString()}
            track={false}
            marks={[
              { value: new Date(user_data.purchase_date).getTime(), label: new Date(user_data.purchase_date).toLocaleDateString() },
              { value: new Date().getTime(), label: `${new Date().toLocaleDateString()}` }
            ]}
          />
        </div>
      </div> : <></>}
    </>
  );
}

export default Profile;
