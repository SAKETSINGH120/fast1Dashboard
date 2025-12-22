import React from 'react';
import './App.css';

import { Router } from './Routes';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter } from 'react-router-dom';
import { Sidebar } from './Components/Sidebar/Sidebar';
import Snackbar from './Components/Snackbar/Snackbar';

function App() {
  return (
    <>
      <Snackbar>
        <BrowserRouter>
          {/* <Sidebar> */}
          <Router />
          {/* </Sidebar> */}
        </BrowserRouter>
      </Snackbar>
    </>
  );
}

export default App;
