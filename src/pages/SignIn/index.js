import { useState, useContext } from 'react';
import {Link} from 'react-router-dom'
import './signin.css'
import logo from '../../assests/logo.png'
import { AuthContext } from "../../contexts/auth";

import Loading from '../../components/Loading';
import Loader from '../../components/Loader';


function SignIn() {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');


  const {signIn, loadingAuth} = useContext(AuthContext);

  function handleSubmit(e){
    e.preventDefault();
    
    if(email != '' && password != ''){
      signIn(email,password);
    }
    
    
  }

  return (
    <div className="container-center">
      <div className='login'>
        <div className='login-area'>
          <img src={logo} alt="Sistema Logo"/>

        </div>

        <form onSubmit={handleSubmit}>
          <h1>Entrar</h1>
          {loadingAuth? (
            <Loader />
          ) : (
            <>
          <input type="text" placeholder="email@email.com" value={email} onChange={(e)=> setEmail(e.target.value)}/>
          <input type="password" placeholder="*******" value={password} onChange={(e)=> setPassword(e.target.value)}/>
            </>
          )}
         {loadingAuth? (
          <Loading />
         ) : (
           <button type='subimt'>Acessar</button>
           )} 
        
        </form>
        
        <Link to="/register">Criar uma conta</Link>

      </div>
    </div>
  );
}

export default SignIn;
