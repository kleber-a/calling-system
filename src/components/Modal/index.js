import './modal.css'

import {FiX} from 'react-icons/fi'

export default function Modal({conteudo, close}){
    console.log(conteudo);

    let status = ''
    if(conteudo.status === 'Aberto'){
      status = '#027fe9'
    } else if(conteudo.status === 'Atendido'){
      status = '#5cb85c'
    }else {
      status = '#ee9b57'
    }

    return(
        <div className='modal'>
            <div className='container'>
                <button className='close' onClick={close}>
                    <FiX size={23} color="#FFF" />
                    Voltar
                </button>

                <div>
                    <h2>Detalhes do chamado</h2>
                    <div className='row'>
                        <span>
                            Cliente: <i>{conteudo.cliente}</i>
                        </span>
                    </div>

                    <div className='row'>
                        <span>
                            Assunto: <i>{conteudo.assunto}  </i>
                        </span>
                        
                        <span>
                             Cadastrado em: <i>{conteudo.createdFormated}</i>
                        </span>
                    </div>

                    <div className='row'>
                        <span>
                            Status: <i style={{ color: '#FFF', backgroundColor: status}}>{conteudo.status}</i>
                        </span>
                    </div>

                    {conteudo.complemento !== '' && (
                        <>
                            <h3>Complemento</h3>
                            <p>
                                {conteudo.complemento}
                            </p>
                        </>
                    )}
                    <div className='row'>
                    
                    <img src={conteudo.userAvatarUrl} />
                    <span>Chamado aberto por: {conteudo.userName}</span>
                    <span>Email: {conteudo.userEmail}</span>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}