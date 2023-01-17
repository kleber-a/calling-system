import Rotas from './routers'
import AuthProvider from './contexts/auth';

function App() {
  return (
    <AuthProvider>
      <Rotas />
    </AuthProvider>
  );
}

export default App;
