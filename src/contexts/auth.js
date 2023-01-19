import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useState, createContext, useEffect } from 'react';
import { auth, db } from '../service/firebaseConnection';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { toast } from 'react-toastify';



export const AuthContext = createContext({});

function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [logado, setLogado] = useState(null)
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        function loadStorage() {

            const storageUser = localStorage.getItem('SistemaUser');

            if (storageUser) {
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }

            setLoading(false)
        }
        loadStorage();


    }, [])

    //Fazer Login
    async function signIn(email,password){
        setLoadingAuth(true);
        
        await signInWithEmailAndPassword(auth,email,password)
        .then(async(value)=>{
            let uid = value.user.uid;

            const userProfile = await getDoc(doc(db,"users",uid))

            let data = {
                uid: uid,
                nome: userProfile.data().name,
                avatarUrl: userProfile.data().avatarUrl,
                email: value.user.email
            };
            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
            toast.success('Bem vindo de volta')

        }) 
        .catch((error)=>{
            console.log(error)
            toast.success('Ops algo deu errado')
            setLoadingAuth(false)
        })
    }
    
    //Cadastrar Novo Usuário
    async function signUp(email, password, name) {
        setLoadingAuth(true);
        await createUserWithEmailAndPassword(auth, email, password)
            .then(async (value) => {
                let uid = value.user.uid;

                await setDoc(doc(db, "users", uid), {
                    name: name,
                    avatarUrl: null
                })
                    .then(() => {
                        let data = {
                            uid: uid,
                            name: name,
                            email: value.user.email,
                            avatarUrl: null
                        };
                        setUser(data);
                        storageUser(data);
                        setLoadingAuth(false);
                        toast.success('Bem vindo a plataforma!')
                    })
                    .catch((error) => {
                        console.log(error);
                        toast.error('Ops algo deu errado')
                        setLoadingAuth(false);
                    });

            })
    }

    function storageUser(data) {
        localStorage.setItem('SistemaUser', JSON.stringify(data));
    }

    //Fazer Logout do usuario
    async function signOutt(){
        await signOut(auth);  
        localStorage.removeItem('SistemaUser');
        setUser(null);
        setLogado(null);
    }



    return (
        <AuthContext.Provider value={{ 
            signed: !!user, 
            user, 
            setUser, 
            loading, 
            signUp, 
            signOutt, 
            signIn, 
            loadingAuth, 
            setUser,
            storageUser,
            logado 
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
