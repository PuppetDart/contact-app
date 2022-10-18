import styled from 'styled-components';
import { RouterProvider, Route } from 'react-router-dom';

import router from './routes';
import './App.css';

function App() {

  return (
    //'router' is in file named ->'routes.js'
    //on the same level of directory
    <RouterProvider router={router} />
  );
}

export default App;
