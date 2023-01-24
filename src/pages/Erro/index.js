import {Link} from 'react-router-dom'
import './erro.css'

function Erro(){
    return(
        <div className="not-found">
            <h2>404</h2>
            <h2>Página não encontrada</h2>
            <Link to="/" >Acesse aqui </Link>
        </div>
    )
}
export default Erro;