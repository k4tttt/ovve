import React, { useState } from 'react';

const PatchTable = ({ sewnPatches, notSewnPatches, tradePatches, format_date }) => {
  const [selectedCategory, setSelectedCategory] = useState('Sydda märken');

  // Helper to get patches based on the selected category
  const getPatches = () => {
    switch (selectedCategory) {
      case 'Alla märken':
        return [...sewnPatches, ...notSewnPatches];
      case 'Sydda märken':
        return sewnPatches;
      case 'Osydda märken':
        return notSewnPatches;
      case 'Bytesmärken':
        return tradePatches;
      default:
        return [];
    }
  };

  return (
    <div className='patch_table'>
      <h3>{selectedCategory}</h3>
      <div className='category_buttons'>
        {['Sydda märken', 'Alla märken', 'Osydda märken', 'Bytesmärken'].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={category === selectedCategory ? 'active' : ''}
          >
            {category}
          </button>
        ))}
      </div>
      
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
          {getPatches().map((patch, index) => (
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
