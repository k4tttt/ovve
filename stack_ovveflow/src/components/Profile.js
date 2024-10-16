import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Profile = () => {
  const {username} = useParams();
  const [user_data, set_user_data] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/get_profile?username=${username}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        set_user_data(data.result);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  return (
    <div className="">
      <h1>Profile</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : user_data ? (
        <ul>
          {user_data.map((item, index) => (
            <li key={index}>{item.name} - {item.creator}</li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;
