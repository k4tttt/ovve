import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const PatchTable = ({ sewn_patches, not_sewn_patches, trade_patches, format_date, is_owner }) => {
  const [selected_category, set_selected_category] = useState('Alla märken');

  const get_patches = () => {
    switch (selected_category) {
      case 'Alla märken':
        return [...sewn_patches, ...not_sewn_patches];
      case 'Sydda märken':
        return sewn_patches;
      case 'Osydda märken':
        return not_sewn_patches;
      case 'Bytesmärken':
        return trade_patches;
      default:
        return [];
    }
  };

  const handle_edit_patch = (patch) => {
    console.log(`Editing patch: ${patch.name}`);
  };

  return (
    <div className='patch_table'>
      <h3>{selected_category}</h3>
      <div className='category_buttons'>
        {['Alla märken', 'Sydda märken', 'Osydda märken', 'Bytesmärken'].map((category) => (
          <button
            key={category}
            onClick={() => set_selected_category(category)}
            className={category === selected_category ? 'active' : ''}
          >
            {category}
          </button>
        ))}
      </div>
      
      <table>
        <thead>
          <tr>
            {is_owner && <th style={{ width: '40px' }}>Edit</th>}
            <th>Märke</th>
            <th>Skapare</th>
            <th>Införskaffad</th>
            <th>Införskaffad från</th>
            <th>Pris</th>
            <th>Placering</th>
          </tr>
        </thead>
        <tbody>
          {get_patches().map((patch, index) => (
            <tr key={index}>
              {is_owner && (
                <td>
                  <IconButton aria-label="edit" onClick={() => handle_edit_patch(patch)}>
                    <EditIcon />
                  </IconButton>
                </td>
              )}
              <td>{patch.name}</td>
              <td>{patch.creator}</td>
              <td>{format_date(patch.obtained_date)}</td>
              <td>{patch.obtained_from}</td>
              <td>{patch.price} kr</td>
              <td>{patch.placement_category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatchTable;
