import './header.css';
import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import avatar from '../../assests/avatar.png';
import { Link } from 'react-router-dom';

import { BiHome, BiUser, } from "react-icons/bi";
import { DiAptana } from "react-icons/di";


export default function Header() {

    const { user } = useContext(AuthContext);

    return (
        <div className='sidebar'>
            <div>
                <img src={user.avatarUrl ? user.avatarUrl : avatar} alt="Foto avatar" />
            </div>

            <Link to="/dashboard">
                <BiHome color='#FFF' size={24} />
                Chamados
            </Link>
            <Link to="/customers">
                <BiUser color='#FFF' size={24} />
                Clientes
            </Link>
            <Link to="/profile">
                <DiAptana color='#FFF' size={24} />
                Configurações
            </Link>
        </div>
    )
}