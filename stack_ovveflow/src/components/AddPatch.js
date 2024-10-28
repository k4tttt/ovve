import { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';

const AddPatch = ({ set_add_patch_view_active }) => {
  const [patches, set_patches] = useState(null);
  const [selected_patch, set_selected_patch] = useState('');
  const [patch_names, set_patch_names] = useState([]);  // Initialize as an empty array

  useEffect(() => {
    fetch(`http://localhost:3001/get-patches`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        set_patches(data.result);
        set_patch_names(data.result.map((patch) => patch.name));
      })
      .catch((error) => {
        console.log("ERROR when fetching patches: " + error);
      });
  }, []);

  return (
    <div>
      <div className='overlay' onClick={() => set_add_patch_view_active(false)}></div>
      <div className='add_patch'>
        <h3>Lägg till nytt märke</h3>
        <Autocomplete
          options={patch_names} // Options for autocomplete
          value={selected_patch} // Controlled value
          onChange={(event, new_value) => {
            set_selected_patch(new_value); // Update state with the selected name
          }}
          renderInput={(params) => (
            <TextField {...params} label="Select a Patch" variant="outlined" />
          )}
          sx={{ width: 300 }} // Optional styling
        />
        <h1>{selected_patch}</h1>
      </div>
    </div>
  );
}

export default AddPatch;
