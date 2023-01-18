import { signOut } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { auth } from "../../service/firebaseConnection";

function Dashboard() {
  
  const {user, setUser,signOutt, logado} = useContext(AuthContext);
  console.log(logado)

  async function signOuttt(){
    setUser(null);    
    localStorage.removeItem('SistemaUser')
    await signOut(auth)
    .then((e)=>{
      console.warn(`EVENTO ${e}`)

    })
}
    return (
      <div className="App">
        <h2>Dashboard</h2>
        <button onClick={()=>signOuttt()}>Sair</button>
        <button onClick={()=>setUser()}>SairUser</button>
      </div>
    );
  }
  
  export default Dashboard;
  