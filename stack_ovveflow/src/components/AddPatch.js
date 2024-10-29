import { useEffect, useState } from 'react';
import { Autocomplete, Button, TextField, Checkbox, FormControlLabel, MenuItem } from '@mui/material';

const AddPatch = ({ user, set_add_patch_view_active }) => {
  const [patches, set_patches] = useState([]);
  const [placement_categories, set_placement_categories] = useState([]);
  const [selected_patch, set_selected_patch] = useState(null);
  const [patch_creator, set_patch_creator] = useState('');
  const [checkbox, set_checkbox] = useState(false);
  const [inventory_data, set_inventory_data] = useState({
    patch_id: '',
    profile_id: user.id,
    price: '',
    obtained_date: '',
    lost_date: '9999-12-31',
    obtained_from: '',
  });
  const [patch_status_data, set_patch_status_data] = useState({
    TST: '',
    TET: '9999-12-31',
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

  const handle_submit = async (e) => {
    // 2: lägg till patchen i användarens inventory med angett obtained_date
    // samt lost_date = 9999-12-31 (+ resterande data: patch_id, profile_id, price, obtained_from)
    // 3: lägg till det nya inventory-idt i patch_status (patch).
    // om sewn_on = false:
    // sätt TST = obtained_date och TET = 9999-12-31 och sewn_on = false. 
    // om sewn_on = true, kolla om obtained_date är samma som sy-datum. 
    // om obtained_date = sy-datum: lägg till patchen i patch_status med 
    // TST = obtained_date och TET = 9999-12-31 och sewn_on = true.
    // om obtained_date < sy-datum: lägg till två separata entries i patch_status,
    // ett där TST = obtained_date och TET = sy-datum och sewn_on = false, samt
    // ett där TST = sy-datum och TET = 9999-12-31 och sewn_on = true
    e.preventDefault();

    try {
      console.log(inventory_data);
      // First insert to create-inventory
      const inventory_response = await fetch('http://localhost:3001/create-inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inventory_data),
      });

      if (!inventory_response.ok) {
        throw new Error('Failed to create inventory entry');
      }

      const inventory_result = await inventory_response.json();
      console.log("inserted patch to inventory");
      console.log(inventory_result.user.id);
      console.log("CHECKBOX VALUE");
      console.log(checkbox);
      let status_request_body = { ...patch_status_data, patch: inventory_result.user.id, sewn_on: checkbox };

      // // Update patch_status_data with the new ID
      // set_patch_status_data((prevData) => ({
      //   ...prevData,
      //   patch: newPatchId,
      // }));

      if (checkbox === false) {
        status_request_body = { ...status_request_body, TST: inventory_data.obtained_date, placement: placement_categories.find((obj) => obj.name === 'N/A').id };
        console.log("sewn on is false");
        console.log(status_request_body);
      } else {
        if (inventory_data.obtained_date === patch_status_data.TST) {
          // Patch is bought and sewn on the same day -> only one insert
          console.log("patch is sewn and bought on same day");
          console.log(status_request_body);
        } else if (inventory_data.obtained_date < patch_status_data.TST) {
          const previous_status_body = { ...status_request_body, TET: patch_status_data.TST, TST: inventory_data.obtained_date };
          console.log("patch is sewn after bought, insert this first: ");
          console.log(previous_status_body);
          
          const previous_status_response = await fetch('http://localhost:3001/create-status', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(previous_status_body),
          });
    
          if (!previous_status_response.ok) {
            throw new Error('Failed to create status (sewn)');
          }
          console.log("inserted past patch status");
        } else {
          // Not valid
          throw new Error('Invalid dates (patch can not be sewn before it is obtained).');
        }
      }

      const patch_status_response = await fetch('http://localhost:3001/create-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(status_request_body),
      });

      if (!patch_status_response.ok) {
        throw new Error('Failed to create status (current)');
      }

      console.log('inserted current patch status');
    } catch (error) {
      console.log('An error occurred:', error.message);
    }
    set_add_patch_view_active(false);
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
            name='obtained_date'
            type="date"
            slotProps={{
              inputLabel: { shrink: true, }
            }}
            value={inventory_data.obtained_date}
            onChange={handle_inventory_change}
            sx={{ margin: '8px', width: '300px' }}
          />
          <TextField
            label="Införskaffat från"
            name='obtained_from'
            slotProps={{
              inputProps: { shrink: true }
            }}
            value={inventory_data.obtained_from}
            onChange={handle_inventory_change}
            sx={{ margin: '8px', width: '300px' }}
          />
          <TextField
            required
            type='number'
            label="Pris (kr)"
            name='price'
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
            <Checkbox checked={checkbox} onChange={() => {set_checkbox(!checkbox); console.log(!checkbox)}} />
          }
          label="Jag har sytt på märket"
          sx={{ margin: '0px', width: '100%' }}
        />

        {checkbox ? <div style={{ display: 'flex' }}>
          <TextField
            required
            label="Datum då märket syddes"
            name='TST'
            type="date"
            slotProps={{
              inputLabel: { shrink: true, }
            }}
            value={patch_status_data.TST}
            onChange={handle_patch_status_change}
            sx={{ margin: '8px', width: '300px' }}
          />
          <TextField
            required
            select
            name='placement'
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

        <Button variant='contained' sx={{ margin: '8px' }} onClick={handle_submit}>Lägg till märke</Button>
      </form>
    </div>
  );
}

export default AddPatch;
