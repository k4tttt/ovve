import { useEffect, useState } from 'react';
import bcrypt from 'bcryptjs';
import { TextField, Button, MenuItem } from '@mui/material';

const RegisterForm = () => {
  const [form_data, set_form_data] = useState({
    username: '',
    password: '',
    ovve_name: '',
    purchase_date: '',
    inauguration_date: '',
    biography: '',
    color: '',
    type: '',
    email: ''
    })
  const [message, set_message] = useState('');
  const [universities, set_universities] = useState([]);
  const [determinators, set_determinators] = useState([]);
  const [ovve_types, set_ovve_types] = useState([]);
  const [selected_university, set_selected_university] = useState('');

  useEffect(() => {
    const fetch_universities = async () => {
      try {
        const res = await fetch('http://localhost:3001/get-universities');
        const data = await res.json();
        set_universities(data.result);  // Use 'result' field from the response
      } catch (error) {
        console.error('Error fetching universities:', error);
      }
    };
    fetch_universities();
  }, []);

  useEffect(() => {
    const fetch_ovve_types = async () => {
      try {
        const res = await fetch('http://localhost:3001/get-ovve-types');
        const data = await res.json();
        set_ovve_types(data.result);  // Use 'result' field from the response
      } catch (error) {
        console.error('Error fetching ovve_types:', error);
      }
    };
    fetch_ovve_types();
  }, []);
  
  useEffect(() => {
    if (selected_university) {
      const fetch_determinators = async () => {
        try {
          const res = await fetch(`http://localhost:3001/get-determinators/${selected_university}`);
          const data = await res.json();
          set_determinators(data.result);  // Use 'result' field from the response
        } catch (error) {
          console.error('Error fetching determinators:', error);
        }
      };
      fetch_determinators();
      set_form_data((prev_data) => ({
        ...prev_data,
        color: ''
      }));    
    } else {
      set_determinators([]);
    }
  }, [selected_university]);  

  const handle_change = (e) => {
    const { name, value } = e.target;
    set_form_data((prev_data) => ({
      ...prev_data,
      [name]: value
    }));
  };

  const handle_submit = async (e) => {
    e.preventDefault();

    try {
      const salt = await bcrypt.genSalt(10);
      const hashed_pw = await bcrypt.hash(form_data.password, salt);
      const request_body = {...form_data, password: hashed_pw};

      console.log(request_body);
      const response = await fetch('http://localhost:3001/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request_body)
      });

      if (response.ok) {
        set_message('Registration successful!');
      } else if (response.status === 409) {
        set_message('Username is already taken.');
      } else {
        set_message('Registration failed. Please try again.');
      }
    } catch (error) {
      set_message('An error occurred while connecting to the server.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
    
      <form onSubmit={handle_submit} className="register-form" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '20px' }}>
        <TextField
          required
          label="Användarnamn"
          name="username"
          value={form_data.username}
          onChange={handle_change}
          sx={{ margin: '8px', width: '300px' }}
        />
        
        <TextField
          required
          label="Lösenord"
          name="password"
          type='password'
          value={form_data.password}
          onChange={handle_change}
          sx={{ margin: '8px', width: '300px' }}
        />

        <TextField
          label="Namn på ovven"
          name="ovve_name"
          value={form_data.ovve_name}
          onChange={handle_change}
          sx={{ margin: '8px', width: '300px' }}
        />

        <TextField
          label="Biografi"
          name="biography"
          multiline
          rows={4}
          value={form_data.biography}
          onChange={handle_change}
          sx={{ margin: '8px', width: '300px' }}
        />

        <TextField
          required
          label="Email"
          name="email"
          type="email"
          value={form_data.email}
          onChange={handle_change}
          sx={{ margin: '8px', width: '300px' }}
        />

        <TextField
          required
          label="Datum då ovve inköptes"
          name="purchase_date"
          type="date"
          slotProps={{
            inputProps: { shrink: true }
          }}
          value={form_data.purchase_date}
          onChange={handle_change}
          sx={{ margin: '8px', width: '300px' }}
        />

        <TextField
          label="Datum då ovve invigdes"
          name="inauguration_date"
          type="date"
          value={form_data.inauguration_date}
          onChange={handle_change}
          sx={{ margin: '8px', width: '300px' }}
        />

        <TextField
          required
          select
          label="Universitet/Högskola"
          name="university"
          value={selected_university}
          onChange={(e) => (set_selected_university(e.target.value))}
          sx={{ margin: '8px', width: '300px' }}
        >
          {universities.map((uni) => (
            <MenuItem key={uni.university} value={uni.university}>
              {uni.university}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          required
          select
          label="Program/Sektion"
          name="color"
          value={form_data.color}
          onChange={handle_change}
          sx={{ margin: '8px', width: '300px' }}
        >
          {determinators.map((det) => (
            <MenuItem key={det.determinator} value={det.id}>
              {det.determinator}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          required
          select
          label="Typ av ovve"
          name="type"
          value={form_data.type}
          onChange={handle_change}
          sx={{ margin: '8px', width: '300px' }}
        >
          {ovve_types.map((type) => (
            <MenuItem key={type.id} value={type.id}>
              {type.name}
            </MenuItem>
          ))}
        </TextField>

        <Button
          variant="contained"
          type="submit"
          sx={{ margin: '8px', width: '150px' }}
        >
          Skapa konto
        </Button>
      </form>
   

      <form onSubmit={handle_submit}>
        <div>
          <label>Username (required):</label>
          <input
            type="text"
            name="username"
            value={form_data.uname}
            onChange={(e) => handle_change(e)}
            required
          />
        </div>
        <div>
          <label>Password (required):</label>
          <input
            type="password"
            name="password"
            value={form_data.passw}
            onChange={handle_change}
            required
          />
        </div>
        <div>
          <label>Email (required):</label>
          <input
            type="text"
            name="email"
            value={form_data.uname}
            onChange={(e) => handle_change(e)}
            required
          />
        </div>
        <div>
          <label>Type (required):</label>
          <input
            type="text"
            name="type"
            value={form_data.uname}
            onChange={(e) => handle_change(e)}
            required
          />
        </div>
        <div>
          <label>Ovve name:</label>
          <input
            type="text"
            name="ovve_name"
            value={form_data.uname}
            onChange={(e) => handle_change(e)}
            required
          />
        </div>
        <div>
          <label>Bio:</label>
          <input
            type="text"
            name="biography"
            value={form_data.uname}
            onChange={(e) => handle_change(e)}
            required
          />
        </div>
        <div>
          <label>University (required):</label>
          <select
            name="university"
            value={selected_university}
            onChange={(e) => {
              set_selected_university(e.target.value);
              set_form_data({ ...form_data, color: '' });
            }}
            required
          >
            <option value="">Select a university</option>
            {universities.length > 0 && universities.map((uni) => (
              <option key={uni.university} value={uni.university}>
                {uni.university}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Determinator (required):</label>
          <select
            name="color"
            value={form_data.color}
            onChange={(e) => handle_change(e)}
            required
          >
            <option value="">Select a determinator</option>
            {determinators.length > 0 && determinators.map((det) => (
              <option key={det.determinator} value={det.determinator}>
                {det.determinator}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Purchase date (required):</label>
          <input
            type="date"
            name="purchase_date"
            value={form_data.uname}
            onChange={(e) => handle_change(e)}
            required
          />
        </div>
        <div>
          <label>Inauguration date:</label>
          <input
            type="date"
            name="inauguration_date"
            value={form_data.uname}
            onChange={(e) => handle_change(e)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>

      
      {message && <p>{message}</p>}
    </div>
  );
}

export default RegisterForm;