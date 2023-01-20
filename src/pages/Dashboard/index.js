import './dashboard.css';
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";
import Title from '../../components/Title';
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function Dashboard() {

  const { user, signOutt } = useContext(AuthContext);
  console.log(user)

  const [chamados, setChamados] = useState([]);

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
