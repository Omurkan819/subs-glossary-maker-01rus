import React, { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alerts';
import PrivateRoute from './components/routing/PrivateRoute';

import SubitemState from './context/subitem/SubitemState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import './App.css';

const App = () => {
  return (
    <AuthState>
      <SubitemState>
        <AlertState>
          <BrowserRouter>
            <Fragment>
              <Navbar />
              <div className='container'>
                <Alerts />
                <Routes>
                  <Route path='/' element={<PrivateRoute component={Home} />} />
                  <Route path='about' element={<About />} />
                  <Route path='register' element={<Register />} />
                  <Route path='login' element={<Login />} />
                </Routes>
              </div>
            </Fragment>
          </BrowserRouter>
        </AlertState>
      </SubitemState>
    </AuthState>
  );
};

export default App;
