import { useState } from 'react'
import './customers.css'
import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiUser } from 'react-icons/fi'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { db } from '../../service/firebaseConnection'
import { toast } from 'react-toastify'

export default function Customers() {

    const [nomeFantasia, setNomeFantasia] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [endereco, setEndereco] = useState('');

    async function handleAdd(e){
        e.preventDefault()
        if(nomeFantasia !== '' && cnpj !== '' && endereco !== ''){
            await addDoc(collection(db, "customers"),{
                nomeFantasia: nomeFantasia,
                cnpj: cnpj,
                endereco: endereco
            })
            .then(()=>{
                setNomeFantasia('');
                setCnpj('');
                setEndereco('');
                toast.success("Empresa cadastrada com sucesso");
            })
            .catch((error)=>{
                toast.error("Preencha todos os campos");
            })
        } else{
            toast.error('Preencha todos os campos');
        }
    }

    return (
        <div>
            <Header />
            <div className='content'>
                <Title name="Clientes">
                    <FiUser size={25} />
                </Title>

                <div className='container'>
                    <form className='form-profile customers' onSubmit={handleAdd} >
                        <label>Nome Fantasia</label>
                        <input type="text" value={nomeFantasia} placeholder="Nome da sua empresa" onChange={(e) => setNomeFantasia(e.target.value)} />

                        <label>CNPJ</label>
                        <input type="text" value={cnpj} placeholder="Seu CNPJ" onChange={(e) => setCnpj(e.target.value)} />

                        <label>Endereço</label>
                        <input type="text" value={endereco} placeholder="Endereço da Empresa" onChange={(e) => setEndereco(e.target.value)} />

                        <button type='submit'>Cadastrar</button>
                    </form>
                </div>

            </div>
        </div>
    )
}