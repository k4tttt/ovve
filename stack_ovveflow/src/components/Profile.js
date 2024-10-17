import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import TimelineSlider from './TimelineSlider';

const Profile = () => {
  const { username } = useParams();
  const [user_data, set_user_data] = useState(null);
  const [user_sewn_patches, set_user_sewn_patches] = useState(null);
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
        console.log(data.result[0]);
      })
      .catch((error) => {
        console.log("ERROR when fetching profile: " + error);
      });
  }, [username]);

  useEffect(() => {
    if (user_data) {
      fetch(`http://localhost:3001/get-sewn-patches-for-profile-by-date?user_id=${user_data.id}&date=${new Date(current_time).toLocaleDateString()}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          set_user_sewn_patches(data.result);
          console.log(data.result);
        })
        .catch((error) => {
          console.log("ERROR when fetching sewn patches: " + error);
        });
    }
  }, [user_data, current_time]);


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
            <div style={{ position: 'relative' }}>
              <p className='small_text' style={{ position: 'absolute', top: '12px' }}>Min {convertToLowerCase(user_data.ovve_type_name)} är</p>
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

        {user_sewn_patches ? <div>
          <h3>Tidslinje över {user_data.username}'s {convertToLowerCase(user_data.ovve_type_name)}</h3>
          <div className='tag'>{formatDate(current_time)}</div>
          <div className='timeline_overview' style={{display: 'flex', marginBottom: '30px'}}>
            <table>
              {/* <thead>
                <tr>
                  <th>Stat</th>
                  <th>Antal</th>
                </tr>
              </thead> */}
              <tbody>
                <tr>
                  <td>Sydda märken</td>
                  <td>{user_sewn_patches.length}</td>
                </tr>
                <tr>
                  <td>Osydda märken</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td>Totala märken</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td>Mods</td>
                  <td>0</td>
                </tr>
              </tbody>
            </table>
            <div className='ovve_timeline'>
              <TimelineSlider
                min={new Date(user_data.purchase_date).getTime()}
                max={new Date().getTime()}
                value={slider_value}
                onChange={(e) => set_slider_value(e.target.value)}
                onChangeCommitted={() => { set_current_time(slider_value) }}
                aria-label="Default"
                valueLabelDisplay="on"
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
          </div>

          <div className='patch_table'>
            <h3>tabellliss</h3>
            <table>
              <thead>
                <tr>
                  <th>Märke</th>
                  <th>Skapare</th>
                  <th>Införskaffad</th>
                  <th>Införskaffad från</th>
                </tr>
              </thead>
              <tbody>
                {user_sewn_patches.map((patch, index) => (
                  <tr key={index}>
                    <td>{patch.name}</td>
                    <td>{patch.creator}</td>
                    <td>{formatDate(patch.obtained_date)}</td>
                    <td>{patch.obtained_from}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div> : <></>}

      </div> : <></>}
    </>
  );
}

export default Profile;
