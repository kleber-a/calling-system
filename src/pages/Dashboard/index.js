import './dashboard.css';
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";
import Title from '../../components/Title';
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../service/firebaseConnection';
import { format } from 'date-fns'

function Dashboard() {

  const { user, signOutt } = useContext(AuthContext);
  

  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore,setLoadingMore] = useState(true);
  const [isEmpty,setIsEmpty] = useState(false);
  const [lastDocs, setLastDocs] = useState();

  useEffect(()=>{

    loadChamados();

    return () => {

    }
  },[])

  async function loadChamados(){
    await getDocs(query(collection(db, "chamados"),orderBy('created', 'desc')))
    .then((snapshot)=>{
        updateState(snapshot)
    })
    .catch((error)=>{
      console.log('Erro ao buscar: ', error);
      setLoadingMore(false);
    })

    setLoading(false)

  }
  console.warn(chamados)

  async function updateState(snapshot){
    const isCollectionEmpty = snapshot.size === 0;
  
    if(!isCollectionEmpty){
      let lista = [];

      snapshot.forEach((item) =>{
        lista.push({
          id: item.id,
          assunto: item.data().assunto,
          cliente: item.data().cliente,
          clienteId: item.data().clienteId,
          created: item.data().created,
          createdFormated: format(item.data().created.toDate(), 'dd/MM/yyyy'),
          status: item.data().status,
          complemento: item.data().complemento
        })
      })
      const lastDoc = snapshot.docs[snapshot.docs.length -1];

      setChamados(chamados => [...chamados, ...lista]);
      setLastDocs(lastDoc);

    }else{
      setIsEmpty(true);
    }

    setLoadingMore(false)

  }

  return (
    <div className="App">
      <Header />
      <div className='content'>
        <Title name="Chamados">
          <FiMessageSquare size={25} />
        </Title>

        {chamados.length === 0 ? (
          <div className='container dashboard'>
            <span>Nenhum chamado registrado...</span>

            <Link to="/new" className='new'>
              <FiPlus size={25} color="#FFF" />
              Novo Chamado
            </Link>
          </div>
        ) : (
          <>
            <Link to="/new" className='new'>
              <FiPlus size={25} color="#FFF" />
              Novo Chamado
            </Link>

            <table>
              <thead>
                <tr>
                  <th scope='col'>Cliente</th>
                  <th scope='col'>Assunto</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Cadastrado em</th>
                  <th scope="col">#</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Cliente">Sujeito</td>
                  <td data-label="Assunto">Suporte</td>
                  <td data-label="Status">
                    <span className='badge' style={{ background: '#5cb85c' }} >Em aberto</span>
                  </td>
                  <td data-label="Cadastrado">20/06/2021</td>
                  <td data-label="#">
                    <button className='action' style={{background: '#35883f6'}}>
                      <FiSearch color='#FFF' size={17} />
                    </button>
                    <button className='action' style={{background: '#f6a935'}}>
                      <FiEdit2 color='#FFF' size={17} />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

          </>


        )}




      </div>


    </div>
  );
}

export default Dashboard;
