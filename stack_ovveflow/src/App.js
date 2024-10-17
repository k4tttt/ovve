import './App.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from './components/Login';
import Profile from './components/Profile';
import Register from './components/Register';

function App() {
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
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
