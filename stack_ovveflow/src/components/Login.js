import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import bcrypt from 'bcryptjs';

const Login = ({ handle_login }) => {
  const [username, set_username] = useState('');
  const [password, set_password] = useState('');
  const navigate = useNavigate();

  const handle_username = (event) => {
    set_username(event.target.value);
  };

  const handle_password = (event) => {
    set_password(event.target.value);
  };

  const handle_submit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/get-password?username=${username}`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      const is_password_valid = await bcrypt.compare(password, data.result.password);

      if (is_password_valid) {
        handle_login({username: username, id: data.result.id});
        navigate(`/profile/${username}`);

      } else {
        console.log("Password is invalid");
      }
    } catch (error) {
      console.log("ERROR when fetching profile: " + error);
    }
  };

  return (
    <form onSubmit={handle_submit} className="register-form" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '20px' }}>
      <h1>Login</h1>
      <TextField
        label="Användarnamn"
        name="username"
        value={username}
        onChange={handle_username}
        sx={{ margin: '8px' }} />
      <TextField
        label="Lösenord"
        name="password"
        type="password"
        value={password}
        onChange={handle_password} 
        sx={{ margin: '8px' }} />
      <Button
        variant="contained"
        type="submit"
        sx={{ margin: '8px', width: '10vw' }}>
        Logga in
      </Button>
    </form>
  );
}

export default Login;
