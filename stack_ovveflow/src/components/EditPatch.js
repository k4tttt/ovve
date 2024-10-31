import { useEffect, useState } from 'react';
import { Button, TextField, FormControl, RadioGroup, Radio, FormControlLabel, Checkbox, MenuItem } from '@mui/material';
import EditPatchInventory from './EditPatchInventory';
import EditPatchStatus from './EditPatchStatus';

const EditPatch = ({ patch, set_edit_view_active }) => {
  const [placement_categories, set_placement_categories] = useState([]);
  const [edit_type, set_edit_type] = useState('inventory');

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
      <div className='add_patch'>
        <h3>Redigera märke</h3>

        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            defaultValue={'inventory'}
            row
          >
            <FormControlLabel value={'inventory'} control={<Radio />} onChange={() => set_edit_type('inventory')} label="Detaljer om märket" />
            <FormControlLabel value={'status'} control={<Radio />} onChange={() => set_edit_type('status')} label="Märkets sy-status" />
          </RadioGroup>
        </FormControl>

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

        <hr style={{marginTop: '16px'}}/>

        {edit_type === 'inventory' ? <EditPatchInventory patch={patch}/> : <EditPatchStatus patch={patch}/>}
      </div>
    </div>
  );
}

export default EditPatch;
