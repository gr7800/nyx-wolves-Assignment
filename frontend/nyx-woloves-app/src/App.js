import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Navbar from './Component/Navbar';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Edit from './Pages/Edit';
import Profile from './Pages/Profile';

function App() {
  return (

    <Box className="app" minHeight="100vh" display="flex" flexDirection="column">
      <Navbar />
      <Box flex="1" boxShadow="card">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/userprofile/:id" element={<Profile />} />
        </Routes>
      </Box>
    </Box>

  );
}

export default App;
