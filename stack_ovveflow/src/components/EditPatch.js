import { useEffect, useState } from 'react';
import { Button, TextField, FormControlLabel, Checkbox, MenuItem } from '@mui/material';

const EditPatch = ({ patch, set_edit_view_active }) => {
  const [placement_categories, set_placement_categories] = useState([]);

  console.log(patch);

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

  const handle_submit = async () => {
    try {
      const response = await fetch('http://localhost:3001/set-trade-offer-to-approved', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error('Failed to update trade status');
      }

      const data = await response.json();
      console.log('Update successful:', data);
    } catch (error) {
      console.log('An error occurred:', error.message);
    }
  }

  return (
    <div>
      <div className='overlay' onClick={() => set_edit_view_active(null)}></div>
      <form className='add_patch'>
        <h3>Redigera märke</h3>

        <div style={{ display: 'flex' }}>
          <TextField
            disabled
            value={patch.name}
            label="Märke"
            sx={{ margin: '8px', width: 300 }}
          />
          <TextField
            disabled
            value={patch.creator}
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
            value={patch.obtained_date.substring(0, 10)}
            // onChange={handle_inventory_change}
            sx={{ margin: '8px', width: '300px' }}
          />
          <TextField
            label="Införskaffat från"
            name='obtained_from'
            slotProps={{
              inputProps: { shrink: true }
            }}
            value={patch.obtained_from}
            // onChange={handle_inventory_change}
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
            value={patch.price}
            // onChange={handle_inventory_change}
            sx={{ margin: '8px', width: '300px' }}
          />
        </div>

        <FormControlLabel
          control={
            <Checkbox
              checked={patch.tradable === true ? 'on' : 'off'}
            // onChange={() => { set_tradeable_checkbox(!tradeable_checkbox) }}
            />
          }
          label="Jag vill markera märket som bytbart"
          sx={{ margin: '0px', width: '100%' }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={patch.sewn_on === true ? 'on' : 'off'}
            // onChange={() => { set_tradeable_checkbox(!tradeable_checkbox) }}
            />
          }
          label="Jag har sytt på märket"
          sx={{ margin: '0px', width: '100%' }}
        />

        {patch.sewn_on ? <div style={{ display: 'flex' }}>
          <TextField
            required
            label="Datum då märket syddes"
            name='TST'
            type="date"
            slotProps={{
              inputLabel: { shrink: true, }
            }}
            value={patch.tst.substring(0, 10)}
            // onChange={handle_patch_status_change}
            sx={{ margin: '8px', width: '300px' }}
          />
          <TextField
            required
            select
            name='placement'
            label="Placering av märket"
            value={patch.placement}
            // onChange={handle_patch_status_change}
            sx={{ margin: '8px', width: '300px' }}
          >
            {placement_categories.map((p) => (
              <MenuItem key={p.id} value={p.id}>
                {p.name}
              </MenuItem>
            ))}
          </TextField>
        </div> : <></>}

        <Button variant='contained' sx={{ margin: '8px', marginBottom: '100px' }} onClick={handle_submit}>Uppdatera märke</Button>
      </form>
    </div>
  );
}

export default EditPatch;
