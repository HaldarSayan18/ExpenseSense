import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <>
      <Routes>
        {/* <Route path='/' element={<ProtectedRoutes><Homepage /></ProtectedRoutes>} /> */}
        <Route path='/' element={<Homepage />} />
        {/* <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} /> */}
      </Routes>
    </>
  );
}

export function ProtectedRoutes(props) {
  if (localStorage.getItem("user")) {
    return props.chilfren;
  } else {
    return <Navigate to='/login'/>
  }
}

export default App;
