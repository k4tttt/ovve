import { useEffect, useState } from 'react';
import { Autocomplete, TextField, Checkbox, FormControlLabel, MenuItem } from '@mui/material';

const AddPatch = ({ set_add_patch_view_active }) => {
  const [patches, set_patches] = useState([]);
  const [placement_categories, set_placement_categories] = useState([]);
  const [selected_patch, set_selected_patch] = useState(null);
  const [patch_creator, set_patch_creator] = useState('');
  const [checkbox, set_checkbox] = useState(false);
  const [inventory_data, set_inventory_data] = useState({
    patch_id: '',
    profile_id: '',
    price: '',
    obtained_date: '',
    lost_date: '9999-12-31',
    obtained_from: '',
  });
  const [patch_status_data, set_patch_status_data] = useState({
    TST: '',
    TET: '',
    sewn_on: false,
    placement: '',
    patch: '', // this should be the id that inventory returns on insert
  });

  useEffect(() => {
    fetch(`http://localhost:3001/get-patches`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        set_patches(data.result);  // Store the full patch objects
      })
      .catch((error) => {
        console.log("ERROR when fetching patches: " + error);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3001/get-placement-categories`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        set_placement_categories(data.result);  // Store the full patch objects
      })
      .catch((error) => {
        console.log("ERROR when fetching placement categories: " + error);
      });
  }, []);

  const handle_inventory_change = (e) => {
    const { name, value } = e.target;
    set_inventory_data((prev_data) => ({
      ...prev_data,
      [name]: value
    }));
  };

  const handle_patch_status_change = (e) => {
    const { name, value } = e.target;
    set_patch_status_data((prev_data) => ({
      ...prev_data,
      [name]: value
    }));
  };

  return (
    <div>
      <div className='overlay' onClick={() => set_add_patch_view_active(false)}></div>
      <form className='add_patch'>
        <h3>Lägg till nytt märke</h3>

        <div style={{ display: 'flex' }}>
          <Autocomplete
            options={patches}
            getOptionLabel={(option) => option.name}
            value={selected_patch}
            onChange={(event, new_value) => {
              if (new_value) {
                set_patch_creator(new_value.creator);
                set_selected_patch(new_value);
                set_inventory_data((prev_data) => ({ ...prev_data, patch_id: new_value.id }))
              } else {
                // Reset state when the input is cleared
                set_patch_creator('');
                set_selected_patch(null);
              }
            }}
            renderOption={(props, option) => {
              const { key, ...otherProps } = props; // Destructure `key` from `props`
              return (
                <li key={key} {...otherProps}>
                  {option.name} - {option.creator}  {/* Custom format */}
                </li>
              );
            }}
            filterOptions={(options, { inputValue }) => {
              return options.filter(option => {
                const lowerInputValue = inputValue.toLowerCase();
                return (
                  option.name.toLowerCase().includes(lowerInputValue) ||
                  option.creator.toLowerCase().includes(lowerInputValue)
                );
              });
            }}
            renderInput={(params) => (
              <TextField {...params} label="Märke" variant="outlined" required />
            )}
            sx={{ margin: '8px', width: 300 }}
          />

          <TextField
            disabled
            value={patch_creator}
            label="Märkesskapare"
            sx={{ margin: '8px', width: 300 }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            required
            label="Datum då märket införskaffades"
            type="date"
            slotProps={{
              inputProps: { shrink: true }
            }}
            value={inventory_data.obtained_date}
            onChange={handle_inventory_change}
            sx={{ margin: '8px', width: '300px' }}
          />
          <TextField
            required
            label="Införskaffat från"
            slotProps={{
              inputProps: { shrink: true }
            }}
            value={inventory_data.obtained_from}
            onChange={handle_inventory_change}
            sx={{ margin: '8px', width: '300px' }}
          />
          <TextField
            required
            label="Pris (kr)"
            slotProps={{
              inputProps: { shrink: true }
            }}
            value={inventory_data.price}
            onChange={handle_inventory_change}
            sx={{ margin: '8px', width: '300px' }}
          />
        </div>

        <FormControlLabel
          control={
            <Checkbox checked={checkbox} onChange={() => set_checkbox(!checkbox)} />
          }
          label="Jag har sytt på märket"
          sx={{ margin: '0px' }}
        />

        {checkbox ? <div style={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            required
            label="Datum då märket syddes"
            type="date"
            slotProps={{
              inputProps: { shrink: true }
            }}
            value={patch_status_data.TST}
            onChange={handle_patch_status_change}
            sx={{ margin: '8px', width: '300px' }}
          />
          <TextField
            required
            select
            label="Placering av märket"
            value={patch_status_data.placement}
            onChange={handle_patch_status_change}
            sx={{ margin: '8px', width: '300px' }}
          >
            {placement_categories.map((p) => (
              <MenuItem key={p.id} value={p.id}>
                {p.name}
              </MenuItem>
            ))}
          </TextField>
        </div> : <></>}
      </form>
    </div>
  );
}

export default AddPatch;
