import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Button } from '@mui/material';

import TimelineSlider from './TimelineSlider';
import AddPatch from './AddPatch';
import OvveTimeline from './OvveTimeline';
import PatchTable from './PatchTable';

const Profile = ({ user }) => {
  const { username } = useParams();
  const [user_data, set_user_data] = useState(null);
  const [user_sewn_patches, set_user_sewn_patches] = useState(null);
  const [user_not_sewn_patches, set_user_not_sewn_patches] = useState(null);
  const [slider_value, set_slider_value] = useState(new Date().getTime());
  const [current_time, set_current_time] = useState(new Date().getTime());
  const [add_patch_view_active, set_add_patch_view_active] = useState(false);

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
        })
        .catch((error) => {
          console.log("ERROR when fetching sewn patches: " + error);
        });
    }
  }, [user_data, current_time]);

  useEffect(() => {
    if (user_data) {
      fetch(`http://localhost:3001/get-not-sewn-patches-for-profile-by-date?user_id=${user_data.id}&date=${new Date(current_time).toLocaleDateString()}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          set_user_not_sewn_patches(data.result);
        })
        .catch((error) => {
          console.log("ERROR when fetching non-sewn patches: " + error);
        });
    }
  }, [user_data, current_time]);

  const format_date = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const convert_to_upper_case = (inputString) => {
    return inputString.toUpperCase();
  };

  const convert_to_lower_case = (inputString) => {
    return inputString.toLowerCase();
  };

  return (
    <>
      {user_data ? <div id="profile">
        {add_patch_view_active ? <AddPatch user={user} set_add_patch_view_active={set_add_patch_view_active} /> : <></>}
        <div className='profile_details'>
          <div className='profile_picture'></div>
          <div className='profile_info'>
            <div>
              <p className='small_text'>Användarnamn</p>
              <h2>{user_data.username}</h2>
              <p className='small_text'>Namn på {convert_to_lower_case(user_data.ovve_type_name)}</p>
              <h2>{user_data.ovve_name}</h2>
            </div>

            <div style={{ display: 'flex', marginBottom: '16px' }}>
              <div className='detail_with_label'>
                <p className='small_text'>Fick {convert_to_lower_case(user_data.ovve_type_name)}</p>
                <div className='date_tag'>{format_date(user_data.purchase_date)}</div>
              </div>
              <div className='detail_with_label'>
                <p className='small_text'>Invigde {convert_to_lower_case(user_data.ovve_type_name)}</p>
                <div className='date_tag'>{format_date(user_data.inauguration_date)}</div>
              </div>
            </div>

            <div className='biography'>
              <p className='small_text'>Om mig</p>
              {user_data.biography}
            </div>
          </div>

          <div className='ovve_color' style={{ marginLeft: '6vw' }}>
            <div style={{ position: 'relative' }}>
              <p className='small_text' style={{ position: 'absolute', top: '12px' }}>Min {convert_to_lower_case(user_data.ovve_type_name)} är</p>
              <p className='ovve_color_text' style={{ color: `#${user_data.color_hex}` }}>
                {convert_to_upper_case(user_data.color_name)}
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

        {user_sewn_patches && user_not_sewn_patches ? <div>
          <div className='title_with_tag'>
            <h3 className='fit_content'>Tidslinje över {user_data.username}'s {convert_to_lower_case(user_data.ovve_type_name)}</h3>
            {user.username === username ? <>
              <Button variant='contained' onClick={() => set_add_patch_view_active(true)}>Lägg till nytt märke</Button>
            </> : <></>}
          </div>
          <div className='tag'>{format_date(current_time)}</div>
          <div className='timeline_overview' style={{ display: 'flex', marginBottom: '30px' }}>
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
                  <td>{user_not_sewn_patches.length}</td>
                </tr>
                <tr>
                  <td>Totala märken</td>
                  <td>{user_sewn_patches.length + user_not_sewn_patches.length}</td>
                </tr>
                <tr>
                  <td>Mods</td>
                  <td>0</td>
                </tr>
              </tbody>
            </table>
            
            <OvveTimeline
              min={new Date(user_data.purchase_date).getTime()}
              max={new Date().getTime()}
              value={slider_value}
              onChange={(e) => set_slider_value(e.target.value)}
              onChangeCommitted={() => set_current_time(slider_value)}
              format_date={format_date}
              color_hex={user_data.color_hex}
              marks={[
                { value: new Date(user_data.purchase_date).getTime(), label: format_date(user_data.purchase_date) },
                { value: new Date(user_data.inauguration_date).getTime(), label: `` },
                { value: new Date().getTime(), label: `${format_date(new Date())}` }
              ]}
            />
          </div>
          {user_sewn_patches && user_not_sewn_patches ? (
            <div>
              <PatchTable patches={user_sewn_patches} format_date={format_date} />
            </div>
          ) : null}
        </div> : <></>}

      </div> : <></>}
    </>
  );
}

export default Profile;
