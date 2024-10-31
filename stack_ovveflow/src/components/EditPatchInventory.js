import { useEffect, useState } from 'react';
import { Button, TextField, FormControl, RadioGroup, Radio, FormControlLabel, Checkbox, MenuItem } from '@mui/material';

const EditPatchInventory = ({ patch }) => {

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
      <form className=''>
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

        <Button variant='contained' sx={{ margin: '8px', marginBottom: '100px' }} onClick={handle_submit}>Uppdatera märke</Button>
      </form>
    </div>
  );
}

export default EditPatchInventory;
