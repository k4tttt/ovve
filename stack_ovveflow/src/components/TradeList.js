import React, { useEffect, useState } from 'react';
import TradePost from './TradePost';
import { Button, TextField } from '@mui/material';
import '../App.css';

const TradeList = ({ user }) => {
  const [patches, setPatches] = useState([]);
  const [filteredUniversities, setFilteredUniversities] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/get-all-trade-patches')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Ensure unique patches
        const uniquePatches = Array.from(new Set(data.result.map(patch => JSON.stringify(patch))))
          .map(patch => JSON.parse(patch));
        setPatches(uniquePatches.filter(patch => patch.username !== user.username));
      })
      .catch((error) => {
        console.error("ERROR when fetching patches: " + error);
      });
  }, []);

  // Get unique universities for the dropdown
  const uniqueUniversities = [...new Set(patches.map(patch => patch.university))];

  // Toggle university selection
  const toggleUniversityFilter = (university) => {
    setFilteredUniversities((prevSelected) =>
      prevSelected.includes(university)
        ? prevSelected.filter((u) => u !== university)
        : [...prevSelected, university]
    );
  };

  // Filter patches based on selected universities and search query
  const filteredPatches = patches.filter(patch => {
    const matchesUniversity = filteredUniversities.length === 0 || filteredUniversities.includes(patch.university);
    const matchesSearchQuery =
      patch.patch_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patch.patch_maker.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesUniversity && matchesSearchQuery;
  });

  return (
    <div className="patch-list">
      <h1>Märketplace</h1>

      <div className="filter-container" style={{ display: 'flex', alignItems: 'center' }}>
        {/* Filter by University Dropdown */}
        <div className="dropdown">
          <Button
            variant="outlined"
            size="large"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="dropdown-toggle"
          >
            Filtrera universitet
          </Button>
          {dropdownOpen && (
            <div className="dropdown-menu">
              {uniqueUniversities.map((university) => (
                <label key={university} className="dropdown-item">
                  <input
                    type="checkbox"
                    value={university}
                    checked={filteredUniversities.includes(university)}
                    onChange={() => toggleUniversityFilter(university)}
                  />
                  {university}
                </label>
              ))}
            </div>
          )}
        </div>

        <TextField
          label="Sök märke eller skapare"
          id="outlined-size-small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
          sx={{ marginLeft: 2, height: '66px' }}
        />
      </div>

      <div className="patch-list-grid">
        {filteredPatches.map((patch) => (
          <TradePost
            key={patch.id}
            username={patch.username}
            university={patch.university}
            patch_name={patch.patch_name}
            patch_maker={patch.patch_maker}
            patch_price={patch.patch_price}
          />
        ))}
      </div>
    </div>
  );
};

export default TradeList;
