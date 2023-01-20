import Header from '../../components/Header';
import Title from '../../components/Title';

import './new.css';

import { FiPlusCircle } from 'react-icons/fi'
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

export default function New() {

    const [assunto, setAssunto] = useState('Suporte');
    const [status, setStatus] = useState('Aberto');
    const [complemento,setComplemento] = useState('');

    const {user} = useContext(AuthContext);

    function handleRegister(e) {
        e.preventDefault();
        alert("Teste");
    }

    function handleChangeSelect(e) {
        setAssunto(e.target.value);
    }

    function handleOptionChange(e) {
        setStatus(e.target.value);
    }

    return (
        <div>
            <Header />
            <div className='content'>
                <Title name="Novo chamado" >
                    <FiPlusCircle size={25} />
                </Title>

                <div className='container'>
                    <form className='form-profile' onSubmit={handleRegister}>
                        <label>Cliente</label>
                        <select>
                            <option key={1} value={1}>
                                Sujeito Programador
                            </option>
                        </select>

                        <label>Assunto</label>
                        <select value={assunto} onChange={handleChangeSelect}>
                            <option value='Suporte'>Suporte</option>
                            <option value='Visita Tecnica'>Visita Tecnica</option>
                            <option value='Financeiro'>Financeiro</option>
                        </select>

                        <label>Status</label>
                        <div className='status'>
                            <input type="radio" name='radio' value='Aberto' onChange={handleOptionChange} checked={status === 'Aberto'}/>
                            <span>Em Aberto</span>
                        </div>
                        <div className='status'>
                            <input type="radio" name='radio' value='Progresso' onChange={handleOptionChange} checked={status === 'Progresso'} />
                            <span>Progresso</span>
                        </div>
                        <div className='status'>
                            <input type="radio" name='radio' value='Atendido' onChange={handleOptionChange} checked={status === 'Atendido'} />
                            <span>Atendido</span>
                        </div>

                        <label>Complemento</label>
                        <textarea type='text' placeholder='Descreva seu problema (opcional)' value={complemento} onChange={(e)=>setComplemento(e.target.value)} />

                        <button type="submit">Registrar</button>

                    </form>

                </div>


            </div>

        </div>
    )
}