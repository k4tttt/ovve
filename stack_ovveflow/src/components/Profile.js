import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import TimelineSlider from './TimelineSlider';

const Profile = () => {
  const { username } = useParams();
  const [user_data, set_user_data] = useState(null);
  const [slider_value, set_slider_value] = useState(new Date().getTime());
  const [current_time, set_current_time] = useState(new Date().getTime());

  useEffect(() => {
    fetch(`http://localhost:3001/get-profile?username=${username}`)
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

  const convertToLowerCase = (inputString) => {
    return inputString.toLowerCase();
  };

  console.log(user_data);
  return (
    <>
      {user_data ? <div id="profile">
        <div className='profile_details'>
          <div className='profile_picture'></div>
          <div className='profile_info'>
            <div>
              <p className='small_text'>Användarnamn</p>
              <h2>{user_data.username}</h2>
              <p className='small_text'>Namn på {convertToLowerCase(user_data.ovve_type_name)}</p>
              <h2>{user_data.ovve_name}</h2>
            </div>

            <div style={{ display: 'flex', marginBottom: '16px' }}>
              <div className='detail_with_label'>
                <p className='small_text'>Fick {convertToLowerCase(user_data.ovve_type_name)}</p>
                <div className='date_tag'>{formatDate(user_data.purchase_date)}</div>
              </div>
              <div className='detail_with_label'>
                <p className='small_text'>Invigde {convertToLowerCase(user_data.ovve_type_name)}</p>
                <div className='date_tag'>{formatDate(user_data.inauguration_date)}</div>
              </div>
            </div>

            <div className='biography'>
              <p className='small_text'>Om mig</p>
              {user_data.biography}
            </div>
          </div>

          <div className='ovve_color' style={{ marginLeft: '6vw' }}>
            <div style={{position: 'relative'}}>
              <p className='small_text' style={{position: 'absolute', top: '12px'}}>Min {convertToLowerCase(user_data.ovve_type_name)} är</p>
              <p className='ovve_color_text' style={{ color: `#${user_data.color_hex}` }}>
                {convertToUpperCase(user_data.color_name)}
              </p>
            </div>

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

        <h3>Tidslinje över {user_data.username}'s {convertToLowerCase(user_data.ovve_type_name)}</h3>
        <div className='ovve_timeline'>
          <TimelineSlider
            min={new Date(user_data.purchase_date).getTime()}
            max={new Date().getTime()}
            value={slider_value}
            onChange={(e) => set_slider_value(e.target.value)}
            onChangeCommitted={() => { set_current_time(slider_value) }}
            aria-label="Default"
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => formatDate(value)}
            track={false}
            color={user_data.color_hex}
            marks={[
              { value: new Date(user_data.purchase_date).getTime(), label: formatDate(user_data.purchase_date) },
              { value: new Date(user_data.inauguration_date).getTime(), label: `` },
              { value: new Date().getTime(), label: `${formatDate(new Date())}` }
            ]}
          />
        </div>
      </div> : <></>}
    </>
  );
}

export default Profile;
