import { useEffect, useState } from 'react';
import { Autocomplete, Button, TextField, Checkbox, FormControlLabel, MenuItem } from '@mui/material';

const AddTradeOffer = ({ user, set_add_trade_offer_active }) => {
  const [users, set_users] = useState([]);
  const [selected_user, set_selected_user] = useState(null);
  const [tradable_patches, set_tradable_patches] = useState([]);

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
    if (selected_user) {
      fetch(`http://localhost:3001/get-tradable-patches-for-profile/3`)
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
    console.log("time to trade!");
  };

  return (
    <div>
      <div className='overlay' onClick={() => set_add_trade_offer_active(false)}></div>
      <form className='add_patch'>
        <h3>Börja byta</h3>

        <div style={{ display: 'flex' }}>
          <Autocomplete
            options={users}
            getOptionLabel={(option) => option.username}
            value={selected_user}
            onChange={(event, new_value) => {
              if (new_value) {
                set_selected_user(new_value);
              } else {
                // Reset state when the input is cleared
                set_selected_user(null);
              }
            }}
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

          <Autocomplete
            disabled={tradable_patches.length === 0}
            options={tradable_patches}
            getOptionLabel={(option) => option.patch_name}
            value={(option) => option.patch_inventory_id}
            onChange={(event, new_value) => {
              if (new_value) {
                set_selected_user(new_value);
              } else {
                // Reset state when the input is cleared
                set_selected_user(null);
              }
            }}
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
              <TextField {...params} label="Märke" variant="outlined" required />
            )}
            sx={{ margin: '8px', width: 300 }}
          />

        </div>

        <Button variant='contained' sx={{ margin: '8px' }} onClick={handle_submit}>Lägg till på min ovve</Button>
      </form>
    </div>
  );
}

export default AddTradeOffer;