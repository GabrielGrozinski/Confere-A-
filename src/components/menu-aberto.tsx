import { allContext } from "../context/all-context";
import BotaoTema from "./botao-tema";
import { useNavigate } from "react-router-dom";


export default function MenuAberto() {
    const navigate = useNavigate();
    const {topicoAtivo, setTopicoAtivo, setMenuAberto} = allContext();

    return (
        <main className={`bg-white flex flex-col mt-16 pt-4 gap-4 ${topicoAtivo === 'Explorar Dados' && 'pb-4 border-b border-b-slate-800/10'}`}>
                <article 
                onClick={() => {
                    navigate('/');
                    setTopicoAtivo('Explorar Dados');
                    setMenuAberto(false);
                }}
                className="flex justify-between px-10 cursor-pointer">
                    <h1 className="text-zinc-800">Explorar Dados</h1>
                    <i className="fa-solid fa-angle-right"></i>
                </article>

                <article 
                onClick={() => {
                    navigate('/');
                    setTopicoAtivo('Produto');
                    setMenuAberto(false);
                }}
                className="flex justify-between px-10 cursor-pointer">
                    <h1 className="text-zinc-800">Produtos</h1>
                    <i className="fa-solid fa-angle-right"></i>
                </article>

                <article 
                onClick={() => {
                    navigate('/');
                    setTopicoAtivo('Preço');
                    setMenuAberto(false);
                }}
                className='flex justify-between px-10 cursor-pointer'>
                    <h1 className="text-zinc-800">Preço</h1>
                    <i className="fa-solid fa-angle-right"></i>
                </article>

                {topicoAtivo !== 'Explorar Dados' &&
                    <article className="flex justify-between py-2 border-y border-y-black/10">
                        <h1 className="text-zinc-800 ml-10">Tema</h1>
                        <span className="mr-10 translate-x-1/2">
                            <BotaoTema />
                        </span>
                    </article>
                }

                <article className="fixed bottom-0 -translate-y-1/2 py-2 border-t border-t-black/20 w-full flex justify-start gap-4">
                    <button className="ml-10 p-2 min-w-30 rounded-2xl border border-zinc-900 cursor-pointer">Login</button>

                    <button className="p-2 min-w-30 rounded-2xl text-white bg-blue-600 cursor-pointer">Começar</button>
                </article>
        </main>
    )
}