import { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';

const Login = () => {
  const [user_name, set_user_name] = useState('');
  const [password, set_password] = useState('');
  const [user_data, set_user_data] = useState(null);

  const handle_user_name = (event) => {
    set_user_name(event.target.value);
  };

  const handle_password = (event) => {
    set_password(event.target.value);
  };

  const submit = (event) => {
    console.log("user:", user_name, "password:", password);

    fetch(`http://localhost:3001/get_profile?username=${user_name}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.result[0]);
        set_user_data(data.result[0]);
      })
      .catch((error) => {
        console.log("ERROR when fetching profile: " + error);
      });
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <TextField
        label="Användarnamn"
        sx={{ margin: '8px' }}
        value={user_name} 
        onChange={handle_user_name}/>
      <TextField
        label="Lösenord"
        type="password"
        sx={{ margin: '8px' }}
        value={password} 
        onChange={handle_password}/>
      <Button
        variant="contained"
        sx={{ margin: '8px', width: '10vw' }}
        onClick={submit}>
        Logga in
      </Button>
    </div>
  );
}

export default Login;
