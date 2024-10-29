import React from 'react';

const PatchTable = ({ patches, format_date }) => {
  return (
    <div className='patch_table'>
      <h3>Sydda märken</h3>
      <table>
        <thead>
          <tr>
            <th>Märke</th>
            <th>Skapare</th>
            <th>Införskaffad</th>
            <th>Införskaffad från</th>
            <th>Pris</th>
            <th>Placering</th>
          </tr>
        </thead>
        <tbody>
          {patches.map((patch, index) => (
            <tr key={index}>
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
