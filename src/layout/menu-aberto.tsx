import { allContext } from "../context/all-context";
import BotaoTema from "./botao-tema";
import { useNavigate } from "react-router-dom";


export default function MenuAberto() {
    const navigate = useNavigate();
    const {dark, setTopicoAtivo, setMenuAberto, user, deslogarUser, session, setSession, assinanteAtual} = allContext();

    return (
        <main className={`flex fixed top-16 ${(session && user) ? assinanteAtual === 'Sócio' ? 'min-h-70' : 'min-h-80' : 'min-h-80'} w-full left-0 z-999 flex-col pt-4 gap-4 border-b ${dark ? 'bg-[#0d1015] border-b-slate-600/40' : 'bg-[#f7fbff] border-b-slate-800/20'}`}>
                <article 
                onClick={() => {
                    navigate('/');
                    setTopicoAtivo('Explorar Dados');
                    setMenuAberto(false);
                }}
                className={`flex justify-between items-center  px-10 cursor-pointer ${dark && 'text-sky-100'}`}>
                    <h1 className={`${dark ? 'text-zinc-200' : 'text-zinc-800'}`}>Explorar Dados</h1>
                    <i className="fa-solid fa-angle-right"></i>
                </article>

                <article 
                onClick={() => {
                    navigate('/produtos');
                    setTopicoAtivo('Produto');
                    setMenuAberto(false);
                }}
                className={`flex justify-between items-center  px-10 cursor-pointer ${dark && 'text-sky-100'}`}>
                    <h1 className={`${dark ? 'text-zinc-200' : 'text-zinc-800'}`}>Produtos</h1>
                    <i className="fa-solid fa-angle-right"></i>
                </article>

                <article 
                onClick={() => {
                    navigate('/preco');
                    setTopicoAtivo('Preço');
                    setMenuAberto(false);
                }}
                className={`flex justify-between items-center  px-10 cursor-pointer ${dark && 'text-sky-100'}`}>
                    <h1 className={`${dark ? 'text-zinc-200' : 'text-zinc-800'}`}>Preço</h1>
                    <i className="fa-solid fa-angle-right"></i>
                </article>

                <article className={`flex justify-between items-center  py-2 border-y ${dark ? 'border-y-slate-600/20' : 'border-y-black/10'}`}>
                    <h1 className={`ml-10 ${dark ? 'text-zinc-200' : 'text-zinc-800'}`}>Tema</h1>
                    <span className="mr-10 translate-x-1/2">
                        <BotaoTema />
                    </span>
                </article>

                {session ? 
                user &&
                    <>
                        <article 
                        onClick={() => {
                            deslogarUser();
                            navigate('/');
                            setMenuAberto(false);
                        }}
                        className={`flex justify-between items-center  px-10 cursor-pointer ${dark && 'text-sky-100'}`}>
                            <h1 className={`${dark ? 'text-zinc-200' : 'text-zinc-800'}`}>Sair</h1>
                            <i className="fa-solid fa-angle-right"></i>
                        </article>

                        <article 
                        onClick={() => {
                            deslogarUser();
                            setSession(undefined);
                            navigate('/login');
                            setMenuAberto(false);
                        }}
                        className={`flex justify-between items-center  px-10 cursor-pointer ${dark && 'text-sky-100'}`}>
                            <h1 className={`${dark ? 'text-zinc-200' : 'text-zinc-800'}`}>Trocar conta</h1>
                            <i className="fa-solid fa-angle-right"></i>
                        </article>

                        {assinanteAtual !== 'Sócio' &&
                            <article 
                            onClick={() => {
                                deslogarUser();
                                setSession(undefined);
                                navigate('/login');
                                setMenuAberto(false);
                            }}
                            className={`flex justify-center items-center ml-8 pl-2 mr-10 cursor-pointer py-1 rounded-md ${assinanteAtual === 'Torcedor' ? 'bg-red-500' : 'bg-amber-500'}`}>
                                <h1 className="text-zinc-100/97 font-medium">Fazer Upgrade</h1>
                            </article>
                        }
                    </>

                :
                    <article className="absolute bottom-0 -translate-y-1/4 py-2 w-full flex justify-start gap-4">
                        <button onClick={() => navigate('/login')} className={`ml-10 p-2 min-w-30 rounded-2xl cursor-pointer border ${dark ? 'bg-gray-500/10 text-white border-slate-300/40' : 'border-slate-800/30'}`}>Login</button>

                        <button onClick={() => navigate('/login/cadastro')} className="p-2 min-w-30 rounded-2xl text-white bg-amber-500 cursor-pointer">Começar</button>
                    </article>
                }
        </main>
    )
}