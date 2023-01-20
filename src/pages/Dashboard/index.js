import './dashboard.css';
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";
import Title from '../../components/Title'
import { FiMessageSquare } from 'react-icons/fi'

function Dashboard() {
  
  const {user,signOutt} = useContext(AuthContext);
  console.log(user)

  function signOuttt(){
    signOutt()
    .then((e)=>{
      console.warn(`Erro ao deslogar ${e}`)

    })
    .catch((error)=>{ alert(`Error ao deslogar -> ${error}`)})
    
}
    return (
      <div className="App">
        <Header/>
        <div className='content'>
          <Title name="Chamados">
            <FiMessageSquare size={25} />
          </Title>

          <div className='container dashboard' >

          </div>

        </div>
        
        
      </div>
    );
  }
  
  export default Dashboard;
  