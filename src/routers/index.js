import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Dashboard from '../pages/Dashboard';

import PrivateRoute from './privateRoute';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/auth';

export default function Rotas() {

    const {user,logado} = useContext(AuthContext);
    const [teste,setTeste] = useState(false)

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ user? <Navigate to="/dashboard" /> : <SignIn />} />
                <Route path="/register" element={user? <Navigate to="/dashboard" /> : <SignUp />} />
                <Route path="/dashboard" element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
            </Routes>
        </BrowserRouter>
    )
}