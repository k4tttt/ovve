import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/test-connection')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setData(data.result);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  return (
    <div className="App">
      <h1>API Data:</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : data ? (
        <ul>
          {data.map((item, index) => (
            <li key={index}>{item.name} - {item.creator}</li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
