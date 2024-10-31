import { useEffect, useState } from 'react';
import { Button, TextField, MenuItem } from '@mui/material';

const EditPatchStatus = ({ patch }) => {
  const [placement_categories, set_placement_categories] = useState([]);
  const [patch_sewn_statuses, set_patch_sewn_statuses] = useState([{ ...patch }]);

  useEffect(() => {
    fetch(`http://localhost:3001/get-placement-categories`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        set_placement_categories(data.result);
      })
      .catch((error) => {
        console.log("ERROR when fetching placement categories: " + error);
      });
  }, []);

  const handle_submit = async (e) => {
    e.preventDefault();
    console.log(patch_sewn_statuses);
    // try {
    //   const response = await fetch('http://localhost:3001/set-trade-offer-to-approved', {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(patch_sewn_statuses), // Send all patch_sewn_statuses at once
    //   });

    //   if (!response.ok) {
    //     throw new Error('Failed to update trade status');
    //   }

    //   const data = await response.json();
    //   console.log('Update successful:', data);
    // } catch (error) {
    //   console.log('An error occurred:', error.message);
    // }
  };

  const add_patch_entry = () => {
    set_patch_sewn_statuses([...patch_sewn_statuses, { ...patch }]); // Add a new patch entry
  };

  const handle_patch_change = (index, field, value) => {
    const new_patch_sewn_statuses = [...patch_sewn_statuses];
    new_patch_sewn_statuses[index][field] = value;
    set_patch_sewn_statuses(new_patch_sewn_statuses);
  };

  return (
    <div>
      <form onSubmit={handle_submit}>
        {patch_sewn_statuses.map((patchEntry, index) => (
          <div key={index} style={{ display: 'flex', marginBottom: '16px' }}>
            <TextField
              required
              label="Datum då märket syddes"
              name='TST'
              type="date"
              slotProps={{ inputLabel: { shrink: true } }}
              value={patchEntry.tst.substring(0, 10)}
              onChange={(e) => handle_patch_change(index, 'tst', e.target.value)}
              sx={{ margin: '8px', width: '300px' }}
            />
            <TextField
              required
              select
              name='placement'
              label="Placering av märket"
              value={patchEntry.placement}
              onChange={(e) => handle_patch_change(index, 'placement', e.target.value)}
              sx={{ margin: '8px', width: '300px' }}
            >
              {placement_categories.map((p) => (
                <MenuItem key={p.id} value={p.id}>
                  {p.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              required
              label="Datum då märket togs bort"
              name='TET'
              type="date"
              slotProps={{ inputLabel: { shrink: true } }}
              value={patchEntry.tet.substring(0, 10)}
              onChange={(e) => handle_patch_change(index, 'tet', e.target.value)}
              sx={{ margin: '8px', width: '300px' }}
            />
          </div>
        ))}
        {/* Render the add button only if the last entry's `tet` is "9999-12-31" */}
        {patch_sewn_statuses[patch_sewn_statuses.length - 1].tet < '5000-12-31' && (
          <Button variant='outlined' onClick={add_patch_entry} sx={{ margin: '8px' }}>
            Lägg till ny sy-status
          </Button>
        )}
        <br />
        <Button type='submit' variant='contained' sx={{ margin: '8px' }}>Uppdatera märke</Button>
      </form>
    </div>
  );
};

export default EditPatchStatus;
