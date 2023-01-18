import { signOut } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";

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
        <h2>Dashboard</h2>
        <button onClick={()=>signOuttt()}>Sair</button>
        
      </div>
    );
  }
  
  export default Dashboard;
  