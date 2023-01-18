import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { useState, createContext, useEffect } from 'react';
import { auth, db } from '../service/firebaseConnection';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'



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
                        setLoadingAuth(false)
                        alert('Message submitted 👍');
                    })
                    .catch((error) => {
                        alert(error.message);
                        setLoadingAuth(false)
                    });

            })

            await signInWithEmailAndPassword(auth, email,password)
            .then((value)=>{
                console.warn(value.user);
                setLogado(value.user);
            })
    }

    function storageUser(data) {
        localStorage.setItem('SistemaUser', JSON.stringify(data));
    }

    async function signOut(){
        await signOut(auth);  
        localStorage.removeItem('SistemaUser');
        setUser(null);
    }



    return (
        <AuthContext.Provider value={{ signed: !!user, user, setUser, loading, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
