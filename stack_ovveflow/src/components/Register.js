import { useEffect, useState } from 'react';
import bcrypt from 'bcryptjs';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
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

  const [message, setMessage] = useState('');
  const [universities, setUniversities] = useState([]);
  const [determinators, setDeterminators] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState('');

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const res = await fetch('http://localhost:3001/get-universities');
        const data = await res.json();
        setUniversities(data.result);  // Use 'result' field from the response
      } catch (error) {
        console.error('Error fetching universities:', error);
      }
    };
    fetchUniversities();
  }, []);
  
  useEffect(() => {
    if (selectedUniversity) {
      const fetchDeterminators = async () => {
        try {
          const res = await fetch(`http://localhost:3001/get-determinators/${selectedUniversity}`);
          const data = await res.json();
          setDeterminators(data.result);  // Use 'result' field from the response
        } catch (error) {
          console.error('Error fetching determinators:', error);
        }
      };
      fetchDeterminators();
    }
  }, [selectedUniversity]);  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const salt = await bcrypt.genSalt(10);
      const pw = formData.password;
      const hashedPw = await bcrypt.hash(pw, salt);
      formData.password = hashedPw;

      const response = await fetch('http://localhost:3001/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setMessage('Registration successful!');
      } else if (response.status === 409) {
        setMessage('Username is already taken.');
      } else {
        setMessage('Registration failed. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred while connecting to the server.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username (required):</label>
          <input
            type="text"
            name="username"
            value={formData.uname}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div>
          <label>Password (required):</label>
          <input
            type="password"
            name="password"
            value={formData.passw}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email (required):</label>
          <input
            type="text"
            name="email"
            value={formData.uname}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div>
          <label>Type (required):</label>
          <input
            type="text"
            name="type"
            value={formData.uname}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div>
          <label>Ovve name:</label>
          <input
            type="text"
            name="ovve_name"
            value={formData.uname}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div>
          <label>Bio:</label>
          <input
            type="text"
            name="biography"
            value={formData.uname}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div>
          <label>University (required):</label>
          <select
            name="university"
            value={selectedUniversity}
            onChange={(e) => {
              setSelectedUniversity(e.target.value);
              setFormData({ ...formData, color: '' });
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
            value={formData.color}
            onChange={(e) => handleChange(e)}
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
            value={formData.uname}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div>
          <label>Inauguration date:</label>
          <input
            type="date"
            name="inauguration_date"
            value={formData.uname}
            onChange={(e) => handleChange(e)}
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