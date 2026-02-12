import { allContext } from "../context/all-context";
import BotaoTema from "./botao-tema";
import { useNavigate } from "react-router-dom";


export default function MenuAberto() {
    const navigate = useNavigate();
    const {dark, setTopicoAtivo, setMenuAberto} = allContext();

    return (
        <main className={`flex h-screen max-h-[calc(100vh-64px-1px)] flex-col mt-16 pt-4 gap-4 ${dark ? 'bg-[#222222]' : 'bg-white'}`}>
                <article 
                onClick={() => {
                    navigate('/');
                    setTopicoAtivo('Explorar Dados');
                    setMenuAberto(false);
                }}
                className={`flex justify-between px-10 cursor-pointer ${dark && 'text-sky-100'}`}>
                    <h1 className={`${dark ? 'text-zinc-200' : 'text-zinc-800'}`}>Explorar Dados</h1>
                    <i className="fa-solid fa-angle-right"></i>
                </article>

                <article 
                onClick={() => {
                    navigate('/produtos');
                    setTopicoAtivo('Produto');
                    setMenuAberto(false);
                }}
                className={`flex justify-between px-10 cursor-pointer ${dark && 'text-sky-100'}`}>
                    <h1 className={`${dark ? 'text-zinc-200' : 'text-zinc-800'}`}>Produtos</h1>
                    <i className="fa-solid fa-angle-right"></i>
                </article>

                <article 
                onClick={() => {
                    navigate('/');
                    setTopicoAtivo('Preço');
                    setMenuAberto(false);
                }}
                className={`flex justify-between px-10 cursor-pointer ${dark && 'text-sky-100'}`}>
                    <h1 className={`${dark ? 'text-zinc-200' : 'text-zinc-800'}`}>Preço</h1>
                    <i className="fa-solid fa-angle-right"></i>
                </article>

                <article className="flex justify-between py-2 border-y border-y-black/10">
                    <h1 className={`ml-10 ${dark ? 'text-zinc-200' : 'text-zinc-800'}`}>Tema</h1>
                    <span className="mr-10 translate-x-1/2">
                        <BotaoTema />
                    </span>
                </article>

                <article className="absolute bottom-0 -translate-y-1/4 py-2 border-t border-t-black/20 w-full flex justify-start gap-4">
                    <button onClick={() => navigate('/login')} className={`ml-10 p-2 min-w-30 rounded-2xl cursor-pointer border ${dark ? 'bg-gray-500/10 text-white border-slate-300/40' : 'border-slate-800/30'}`}>Login</button>

                    <button onClick={() => navigate('/login/cadastro')} className="p-2 min-w-30 rounded-2xl text-white bg-blue-600 cursor-pointer">Começar</button>
                </article>
        </main>
    )
}