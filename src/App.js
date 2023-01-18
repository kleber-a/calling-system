import 'react-toastify/dist/ReactToastify.css';
import Rotas from './routers'
import AuthProvider from './contexts/auth';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <AuthProvider>
      <ToastContainer autoClose={3000} />
      <Rotas />
    </AuthProvider>
  );
}

export default App;
