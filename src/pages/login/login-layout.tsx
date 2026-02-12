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
        <main style={{background: "radial-gradient(circle at center, #cfd9ff 0%, #9fb3ff 40%, #6f8df5 100%)"}} className='cadastro-screen' id="imagem">
            <Outlet/>
        </main>
    );
}
