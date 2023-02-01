import Header from '../../components/Header';
import Title from '../../components/Title';

import './new.css';

import { useNavigate, useParams } from 'react-router-dom';

import { FiPlusCircle } from 'react-icons/fi'
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../service/firebaseConnection';
import { toast } from 'react-toastify';

export default function New() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [customers, setCustomers] = useState([])
    const [loadCustomers, setLoadCustomers] = useState(true);
    const [customerSelected, setCustomerSelected] = useState(0);
    const [button, setButton] = useState(false)

    const [assunto, setAssunto] = useState('Suporte');
    const [status, setStatus] = useState('Aberto');
    const [complemento, setComplemento] = useState('');

    const [idCustomers, setIdCustomers] = useState(false)

    const { user } = useContext(AuthContext);

    useEffect(() => {
        async function loadCustomers() {
            await getDocs(collection(db, "customers"))
                .then((snapshot) => {
                    let lista = [];

                    snapshot.forEach((value) => {
                        lista.push({
                            id: value.id,
                            nomeFantasia: value.data().nomeFantasia
                        })
                    })

                    if (lista.length === 0) {
                        setCustomers([{ id: 1, nomeFantasia: 'Nenhum cliente cadastrado' }])
                        setLoadCustomers(false);
                        setButton(true)
                        return;
                    }

                    setCustomers(lista);
                    setLoadCustomers(false);
                    if (id) {
                        loadId(lista);
                    }

                })
                .catch((error) => {
                    console.log("Deu erro ", error);
                    setLoadCustomers(false);
                    setCustomers([{ id: 1, nomeFantasia: '' }]);
                })
        }
        loadCustomers();
    }, [id])
    
    async function loadId(lista) {
        await getDoc(doc(db, 'chamados', id))
            .then((snapshot) => {
                setAssunto(snapshot.data().assunto);
                setStatus(snapshot.data().status);
                setComplemento(snapshot.data().complemento);

                let index = lista.findIndex(item => item.id === snapshot.data().clienteId)
                setCustomerSelected(index);
                setIdCustomers(true)
            })
            .catch((error) => {
                console.log(`ERRO NO ID PASSADO: `, error)
                setIdCustomers(false)
            })

    }

    async function handleRegister(e) {
        e.preventDefault();

        if (idCustomers) {
            await updateDoc(doc(db, "chamados", id), {
                cliente: customers[customerSelected].nomeFantasia,
                clienteId: customers[customerSelected].id,
                assunto: assunto,
                status: status,
                complemento: complemento,
                userId: user.uid
            })
                .then(() => {
                    toast.success('Chamado editado com sucesso');
                    setCustomerSelected(0);
                    setComplemento('');
                    navigate("/")
                })
                .catch((error) => {
                    toast.error('Ops erro ao resgistrar, tente mais tarde')
                    console.log(error);
                })
            return;
        }

        await addDoc(collection(db, 'chamados'), {
            created: new Date(),
            cliente: customers[customerSelected].nomeFantasia,
            clienteId: customers[customerSelected].id,
            assunto: assunto,
            status: status,
            complemento: complemento,
            userId: user.uid,
            userName: user.nome,
            userEmail: user.email,
            userAvatarUrl: user.avatarUrl

        })
            .then(() => {
                toast.success('Chamado criado com sucesso');
                setComplemento('');
                setCustomerSelected(0);
                navigate("/")
            })
            .catch((error) => {
                console.log(error);
                toast.error('Ops erro ao registrar, tente mais tarde');

            })

    }
    function handleChangeSelect(e) {
        setAssunto(e.target.value);
    }

    function handleOptionChange(e) {
        setStatus(e.target.value);
    }

    function handleChangeCustomers(e) {
        console.log(`Index do cliente selecionado ${e.target.value} `)
        console.log(`Cliente selecionado ${customers[e.target.value]}`)
        setCustomerSelected(e.target.value);
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

                        {loadCustomers ? (
                            <input type="text" disabled={true} value="Carregando clientes..." />
                        ) : (
                            <select value={customerSelected} onChange={handleChangeCustomers}>
                                {customers.map((item, index) => {
                                    return (
                                        <option key={item.id} value={index} >

                                            {item.nomeFantasia}

                                        </option>
                                    )
                                })}
                            </select>
                        )
                        }
                        <label>Assunto</label>
                        <select value={assunto} onChange={handleChangeSelect}>
                            <option value='Suporte'>Suporte</option>
                            <option value='Visita Tecnica'>Visita Tecnica</option>
                            <option value='Financeiro'>Financeiro</option>
                        </select>

                        <label>Status</label>
                        <div className='status'>
                            <input type="radio" name='radio' value='Aberto' onChange={handleOptionChange} checked={status === 'Aberto'} />
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
                        <textarea type='text' placeholder='Descreva seu problema (opcional)' value={complemento} onChange={(e) => setComplemento(e.target.value)} />
                        {
                            button ? (
                                <span className='noSubmit'>Registrar</span>
                                ) : (
                                <button type="submit">Registrar</button>
                            )
                        }

                    </form>

                </div>


            </div>

        </div>
    )
}