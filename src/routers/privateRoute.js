import React, { useContext } from "react";
import { AuthContext } from "../contexts/auth";

import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
    //  const user = false;
    //   const signed = false;
    const { signed, loading } = useContext(AuthContext);


    if (loading)
        return <div>Carregando</div>
    else{
        return signed == true ? children : <Navigate to="/" />
    }
    }