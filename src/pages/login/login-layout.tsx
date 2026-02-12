import { useEffect } from 'react';
import '../../styles/login.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { allContext } from '../../context/all-context';


export default function LoginLayout() {
  const navigate = useNavigate();
  const { session } = allContext();

  useEffect(() => {
    if (session) {
      navigate('/');
    }
  }, [session]);

    return (
        <main className='cadastro-screen' id="imagem">
            <Outlet/>
        </main>
    );
}
