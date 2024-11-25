import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../src/pages/Login'
import Signup from '../src/pages/Signup'
import Home from '../src/pages/Home'
import RefreshHandler from './RefreshHandler'
import './App.css';
import { useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const PrivateRoute = ({element}) => {
    return isAuthenticated ? element : <Navigate to={'/login'} />
  }

  return (
    <div className="App">
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
          <Route path='/' element={<Navigate to={"/login"}/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home' element={<PrivateRoute element={<Home />} />} />
      </Routes>
    </div>
  );
}

export default App;
