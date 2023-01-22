import ContentLoader from "react-content-loader"


export default function Loader({screen}){

    if(screen === 'Cadastro'){
        return(
            <ContentLoader 
            speed={2}
            width={476}
            height={124}
            viewBox="0 0 476 124"
            backgroundColor="#8ea0b8"
            foregroundColor="#ecebeb"
            
          >
            <rect x="50" y="0" rx="50" ry="0" width="600" height="25" /> 
            <rect x="50" y="40" rx="50" ry="0" width="600" height="25" /> 
            <rect x="50" y="80" rx="0" ry="0" width="600" height="25" />
          </ContentLoader>        )
    }

    return(
        <ContentLoader 
        speed={2}
        width={476}
        height={124}
        viewBox="0 0 476 124"
        backgroundColor="#8ea0b8"
        foregroundColor="#ecebeb"
        
      >
        <rect x="50" y="10" rx="50" ry="0" width="600" height="32" /> 
        
        <rect x="50" y="60" rx="50" ry="0" width="600" height="32" />
      </ContentLoader>
    )
}