import { useContext, useState } from 'react';
import './profile.css';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { AuthContext } from '../../contexts/auth';
import { DiAptana } from "react-icons/di";
import { FiUpload } from "react-icons/fi";
import avatar from '../../assests/avatar.png'
import { doc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../service/firebaseConnection';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export default function Profile() {

    const { user, signOutt, setUser, storageUser } = useContext(AuthContext);
    const [nome, setNome] = useState(user && user.nome);
    const [email, setEmail] = useState(user && user.email);
    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
    const [imageAvatar, setImageAvatar] = useState(null);

    function handleFile(e) {
        //console.log(e.target.files[0])
        if (e.target.files[0]) {
            const image = e.target.files[0];

            if (image.type === 'image/jpeg' || image.type === 'image/png') {
                setImageAvatar(image);
                setAvatarUrl(URL.createObjectURL(e.target.files[0]))
            } else {
                alert("Envie uma imagem do tipo PNG ou JPEG");
                setImageAvatar(null);
                return null
            }

        }
    }

    async function handleUpload() {
        const currentUid = user.uid;

        const storageRef = ref(storage, `images/${currentUid}/${imageAvatar.name}`)
        await uploadBytes(storageRef, imageAvatar)
            .then(async (value) => {
                console.log("FOTO ENVIADA COM SUCESSO!");

                await getDownloadURL(ref(storage, `images/${currentUid}/${imageAvatar.name}`))
                    .then(async (url) => {
                        let urlFoto = url;
                        console.log(urlFoto);
                        await updateDoc(doc(db, "users", user.uid), {
                            avatarUrl: urlFoto,
                            name: nome
                        })
                            .then(() => {
                                let data = {
                                    ...user,
                                    nome: nome,
                                    avatarUrl: urlFoto
                                };
                                setUser(data);
                                storageUser(data);
                            })

                    })

            })


    }

    async function handleSave(e) {
        e.preventDefault();

        if (imageAvatar === null && nome != '') {
            await updateDoc(doc(db, "users", user.uid), {
                name: nome
            })
                .then(() => {
                    let data = {
                        ...user,
                        nome: nome
                    };
                    setUser(data);
                    storageUser(data);
                })
        }
        else if (nome !== '' && imageAvatar !== null) {
            handleUpload();
        }

    }

    return (
        <div >
            <Header />
            <div className='content'>
                <Title name="Meu Perfil">
                    <DiAptana size={25} />
                </Title>

                <div className='container'>
                    <form className='form-profile' onSubmit={handleSave}>
                        <label className='label-avatar'>
                            <span>
                                <FiUpload color='#FFF' size={25} />
                            </span>

                            <input type="file" accept='image/*' onChange={handleFile} /> <br />
                            {avatarUrl === null ?
                                <img src={avatar} width="250" height="250" alt='Foto perfil do usuario' />
                                :
                                <img src={avatarUrl} width="250" height="250" alt='Foto perfil do usuario' />

                            }
                        </label>

                        <label>Nome</label>
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                        <label>Email</label>
                        <input type="text" value={email} disabled={true} />

                        <button type='submit'>Salvar</button>
                    </form>
                </div>
                <div className='container'>
                    <button className='logout-btn' onClick={() => signOutt()}>Sair</button>
                </div>
            </div>


        </div>
    )
}