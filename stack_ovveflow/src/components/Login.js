import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import bcrypt from 'bcryptjs';

const Login = ({ handle_login }) => {
  const [user_name, set_user_name] = useState('');
  const [password, set_password] = useState('');

  const handle_user_name = (event) => {
    set_user_name(event.target.value);
  };

  const handle_password = (event) => {
    set_password(event.target.value);
  };

  const submit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/get-password?username=${user_name}`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      const is_password_valid = await bcrypt.compare(password, data.result.password);

      console.log(is_password_valid);

      if (is_password_valid) {
        handle_login({hej: user_name});
        console.log("Password is valid");
      } else {
        console.log("Password is invalid");
      }
    } catch (error) {
      console.log("ERROR when fetching profile: " + error);
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <TextField
        label="Användarnamn"
        sx={{ margin: '8px' }}
        value={user_name}
        onChange={handle_user_name} />
      <TextField
        label="Lösenord"
        type="password"
        sx={{ margin: '8px' }}
        value={password}
        onChange={handle_password} />
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
