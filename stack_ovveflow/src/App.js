import { useEffect, useState } from 'react';
import './App.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from './components/Login';
import Profile from './components/Profile';

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
      <HelmetProvider>
        <Helmet>
          <title>Stack OvveFlow</title>
          <meta charSet="UTF-8" />
          {/* <meta name="author" content="Tyra Wodén" /> */}
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Helmet>
      </HelmetProvider>

      <Router basename='/'>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/profile/:username" element={<Profile />} />
        </Routes>
      </Router>
      {/* {error ? (
        <p>Error: {error}</p>
      ) : data ? (
        <ul>
          {data.map((item, index) => (
            <li key={index}>{item.name} - {item.creator}</li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )} */}
    </div>
  );
}

export default App;
