import { useState,useContext } from 'react';
import {Link, redirect} from 'react-router-dom'
import logo from '../../assests/logo.png'
import { AuthContext } from '../../contexts/auth'; 

function SignUp() {

  const [nome,setNome] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const {signUp,user} = useContext(AuthContext);

  function handleSubmit(e){
    e.preventDefault();
    
    if(nome != '' && email != '' && password != ''){
      signUp(email,password,nome);
      setNome('');
      setEmail('');
      setPassword('');
      
      
    }
  }
  
  
  return (
    <div className="container-center">
      <div className='login'>
        <div className='login-area'>
          <img src={logo} alt="Sistema Logo"/>

        </div>

        <form onSubmit={handleSubmit}>
          <h1>Cadastrar</h1>
          <input type="text" placeholder='Seu nome' value={nome} onChange={(e)=> setNome(e.target.value)} />
          <input type="text" placeholder="email@email.com" value={email} onChange={(e)=> setEmail(e.target.value)}/>
          <input type="password" placeholder="*******" value={password} onChange={(e)=> setPassword(e.target.value)}/>
          <button type='subimt'>Cadastrar</button>
        </form>
        
        <Link to="/">Ja tenho uma conta?</Link>

      </div>
    </div>
  );
}

export default SignUp;
