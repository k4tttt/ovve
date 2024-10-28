import './App.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CookiesProvider, useCookies } from 'react-cookie';

import Login from './components/Login';
import Profile from './components/Profile';
import Register from './components/Register';
import Welcome from './components/Welcome';

function App() {
  const [cookies, set_cookie] = useCookies(['user'])

  function handle_login(user) {
    set_cookie('user', user, { path: '/' })
  }

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

      <CookiesProvider>
        <Router basename='/'>
          <Routes>
            <Route exact path="/" element={<Login handle_login={handle_login} />} />
            <Route path="/profile/:username" element={<Profile user={cookies.user}/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/welcome" element={<Welcome user={cookies.user}/>} />
          </Routes>
        </Router>
      </CookiesProvider>
    </div>
  );
}

export default App;
