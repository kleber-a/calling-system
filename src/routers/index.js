import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Dashboard from '../pages/Dashboard';
import New from '../pages/New';

import PrivateRoute from './privateRoute';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/auth';
import Profile from '../pages/Profile'
import Customers from '../pages/Customers';

export default function Rotas() {

    const {user,logado} = useContext(AuthContext);
    const [teste,setTeste] = useState(false)

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ user? <Navigate to="/dashboard" /> : <SignIn />} />
                <Route path="/register" element={user? <Navigate to="/dashboard" /> : <SignUp />} />
                <Route path="/dashboard" element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
                <Route path="/profile" element={<PrivateRoute> <Profile /> </PrivateRoute>} />
                <Route path="/customers" element={<PrivateRoute> <Customers /> </PrivateRoute>} />
                <Route path="/new" element={<PrivateRoute> <New /> </PrivateRoute>} />
            </Routes>
        </BrowserRouter>
    )
}