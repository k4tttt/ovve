import React from 'react';
import { AppBar, Toolbar, Typography, Tabs, Tab } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = ({user}) => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      navigate('/tradelist');
    } else if (newValue === 1) {
      navigate(`/trade`);
    }
    else if (newValue === 2) {
      navigate(`/profile/${user.username}`);
    }
  };

  return (
    <AppBar position="static" sx={{backgroundColor: '#000'}}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Stack OvveFlow
        </Typography>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          indicatorColor="secondary"
        >
          <Tab label="Märketplace"/>
          <Tab label="Byteshandel" />
          <Tab label="Profil" />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
