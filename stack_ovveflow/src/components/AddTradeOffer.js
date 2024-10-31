import { useEffect, useState } from 'react';
import { Autocomplete, Button, TextField } from '@mui/material';

const AddTradeOffer = ({ user, set_add_trade_offer_active }) => {
  const [users, set_users] = useState([]);
  const [selected_user, set_selected_user] = useState(null);
  const [tradable_patches, set_tradable_patches] = useState([]);
  const [logged_in_user_patches, set_logged_in_user_patches] = useState([]);
  const [selected_receiving_patches, set_selected_receiving_patches] = useState([{ patch_name: '', patch_inventory_id: null }]);
  const [selected_giving_patches, set_selected_giving_patches] = useState([{ patch_name: '', patch_inventory_id: null }]);

  useEffect(() => {
    fetch(`http://localhost:3001/get-tradable-patches-for-profile/${user.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.result);
        set_logged_in_user_patches(data.result);
      })
      .catch((error) => {
        console.log("ERROR when fetching tradable patches: " + error);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3001/get-users`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        set_users(data.result);
      })
      .catch((error) => {
        console.log("ERROR when fetching users: " + error);
      });
  }, []);

  useEffect(() => {
    set_selected_receiving_patches([{ patch_name: '', patch_inventory_id: null }]);
    if (selected_user) {
      fetch(`http://localhost:3001/get-tradable-patches-for-profile/${selected_user.id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          set_tradable_patches(data.result);
        })
        .catch((error) => {
          console.log("ERROR when fetching users: " + error);
        });
    } else {
      set_tradable_patches([]);
    }
  }, [selected_user]);

  const handle_submit = async (e) => {
    e.preventDefault();
    try {
      const request_body = {
        sending_profile_id: user.id,
        receiving_profile_id: selected_user.id,
        sending_profile_patch_ids: selected_giving_patches
          .map(patch => patch.patch_inventory_id)
          .filter(id => id !== null),
        receiving_profile_patch_ids: selected_receiving_patches
          .map(patch => patch.patch_inventory_id)
          .filter(id => id !== null),
      };

      const response = await fetch('http://localhost:3001/create-trade-offer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request_body),
      });

      if (!response.ok) {
        throw new Error('Failed to create trade offer');
      }
    } catch (error) {
      console.log('An error occurred:', error.message);
    }
  };

  return (
    <div>
      <div className='overlay' onClick={() => set_add_trade_offer_active(false)}></div>
      <form className='add_patch'>
        <h3>Börja byta</h3>

        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>

            <TextField
              defaultValue={`${user.username} (jag)`}
              disabled
              sx={{
                '& .MuiInputBase-input.Mui-disabled': {
                  color: 'rgba(0, 0, 0, 0.87)', // Set to the same color as enabled text field
                  WebkitTextFillColor: 'rgba(0, 0, 0, 0.87)', // Required for Safari
                },
                margin: '8px',
                width: '300px'
              }}
            />

            {selected_giving_patches.map((patch, index) => (
              <Autocomplete
                key={index}
                disabled={logged_in_user_patches.length === 0}
                options={logged_in_user_patches}
                getOptionLabel={(option) => option.patch_name}
                value={selected_giving_patches[index]}
                onChange={(event, new_value) => set_selected_giving_patches((prev) => {
                  const updated_patches = [...prev];
                  updated_patches[index] = new_value;
                  return updated_patches;
                })}
                renderOption={(props, option) => {
                  const { key, ...otherProps } = props; // Destructure `key` from `props`
                  return (
                    <li key={key} {...otherProps}>
                      {option.patch_name}
                    </li>
                  );
                }}
                filterOptions={(options, { inputValue }) => {
                  return options.filter(option => {
                    const lowerInputValue = inputValue.toLowerCase();
                    return (
                      option.patch_name.toLowerCase().includes(lowerInputValue)
                    );
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Märke" variant="outlined" required={index == 0} />  // helperText={logged_in_user_patches.length === 0 ? "Du har inga märken" : ""}
                )}
                sx={{ margin: '8px', width: 300 }}
              />
            ))}
            <Button variant='contained' sx={{ margin: '8px' }} onClick={() => set_selected_giving_patches((prev_patches) => [...prev_patches, { patch_name: '', patch_inventory_id: null }])}>En till från mig</Button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Autocomplete
              options={users}
              getOptionLabel={(option) => option.username}
              value={selected_user}
              onChange={(event, new_value) => set_selected_user(new_value)}
              renderOption={(props, option) => {
                const { key, ...otherProps } = props; // Destructure `key` from `props`
                return (
                  <li key={key} {...otherProps}>
                    {option.username}
                  </li>
                );
              }}
              filterOptions={(options, { inputValue }) => {
                return options.filter(option => {
                  const lowerInputValue = inputValue.toLowerCase();
                  return (
                    option.username.toLowerCase().includes(lowerInputValue)
                  );
                });
              }}
              renderInput={(params) => (
                <TextField {...params} label="Användare" variant="outlined" required />
              )}
              sx={{ margin: '8px', width: 300 }}
            />

            {selected_receiving_patches.map((patch, index) => (
              <Autocomplete
                key={index}
                disabled={tradable_patches.length === 0}
                options={tradable_patches}
                getOptionLabel={(option) => option.patch_name}
                value={selected_receiving_patches[index]}
                onChange={(event, new_value) => set_selected_receiving_patches((prev) => {
                  const updated_patches = [...prev];
                  updated_patches[index] = new_value;
                  return updated_patches;
                })}
                renderOption={(props, option) => {
                  const { key, ...otherProps } = props; // Destructure `key` from `props`
                  return (
                    <li key={key} {...otherProps}>
                      {option.patch_name}
                    </li>
                  );
                }}
                filterOptions={(options, { inputValue }) => {
                  return options.filter(option => {
                    const lowerInputValue = inputValue.toLowerCase();
                    return (
                      option.patch_name.toLowerCase().includes(lowerInputValue)
                    );
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Märke" variant="outlined" required={index == 0} />
                )}
                sx={{ margin: '8px', width: 300 }}
              />
            ))}
            <Button variant='contained' sx={{ margin: '8px' }} onClick={() => set_selected_receiving_patches((prev_patches) => [...prev_patches, { patch_name: '', patch_inventory_id: null }])}>En till till mig</Button>
          </div>
        </div>
        <Button variant='contained' sx={{ margin: '8px' }} onClick={handle_submit}>Skicka erbjudande</Button>
      </form>
    </div>
  );
}

export default AddTradeOffer;
