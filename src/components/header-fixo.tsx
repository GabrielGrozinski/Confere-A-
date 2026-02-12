import { allContext } from "../context/all-context"
import { useState } from "react";
import BotaoTema from "./botao-tema";
import { useNavigate } from "react-router-dom";

export default function HeaderFixo() {
    const navigate = useNavigate();
    const { largura, topicoAtivo, setTopicoAtivo, menuAberto, setMenuAberto, dark } = allContext();
    const [mostrarIcone, setMostrarIcone] = useState<boolean>(false);

    return (
                <div style={{background: dark ? "linear-gradient(to right, #0b1f33 40%, #0e243d)" : "linear-gradient(to right, #f7fbff, #fdfeff)"}} 
                className={`fixed top-0 w-full left-0 z-999 flex border-b px-4 pt-4 pb-2 xl:gap-4 max-h-16 min-h-16 ${dark ? 'border-b-neutral-100/10' : 'border-b-neutral-800/10'}`}>

                    <h1 className={`font-[MONELOS] text-3xl whitespace-nowrap ${dark && 'text-white'}`}>Confere Aê</h1>
                    {largura < 1024 ? (
                        <div className="w-full flex items-center justify-end">
                            <button className="mr-4 cursor-pointer bg-blue-500 py-1 px-3 rounded-xl text-slate-100 shadow-[1px_1px_2px_#0000002a]">Baixar aplicativo</button>

                            <i onClick={() => setMenuAberto(!menuAberto)} className={`fa-solid ${menuAberto ? "fa-xmark" : "fa-bars"} cursor-pointer text-xl ${dark ? 'text-zinc-200' : 'text-zinc-900'}`}></i>
                        </div>
                    ) : (
                        <section className="flex w-full justify-between">
                            <div className="flex ml-10 items-center gap-12">
                                
                                <article 
                                    onClick={() => {
                                    setTopicoAtivo('Explorar Dados');
                                    navigate('/')
                                    }}
                                    className={`
                                    cursor-pointer relative transition-all 
                                    duration-200 ease-out tracking-wider
                                    hover:font-semibold 
                                    after:content-[""] 
                                    after:absolute 
                                    after:h-[1.5px] 
                                    after:left-0
                                    after:-bottom-1
                                    after:transition-all 
                                    after:duration-300 
                                    after:ease
                                    after:w-0
                                    ${(dark && topicoAtivo === 'Explorar Dados') ? 'after:w-full font-semibold text-blue-400 after:bg-blue-400' : topicoAtivo === 'Explorar Dados' ? 'after:w-full font-semibold text-blue-600 after:bg-blue-600': dark ? 'text-slate-200 ' : ''}
                                    `}>
                                    Explorar Dados
                                </article>
                                
                                <article 
                                    onClick={() => {
                                    setTopicoAtivo('Produto');
                                    navigate('/produtos')
                                    }}
                                    className={`
                                    cursor-pointer relative transition-all 
                                    duration-200 ease-out tracking-wider
                                    hover:font-semibold 
                                    after:content-[""] 
                                    after:absolute 
                                    after:h-[1.5px] 
                                    after:left-0
                                    after:-bottom-1
                                    after:transition-all 
                                    after:duration-300 
                                    after:ease
                                    after:w-0
                                    ${(dark && topicoAtivo === 'Produto') ? 'after:w-full font-semibold text-blue-400 after:bg-blue-400' : topicoAtivo === 'Produto' ? 'after:w-full font-semibold text-blue-600 after:bg-blue-600': dark ? 'text-slate-200' : ''}`}>
                                    Produtos
                                </article>

                                <article 
                                    onClick={() => {
                                    setTopicoAtivo('Produto');
                                    navigate('/')
                                    }}
                                    className={`
                                    cursor-pointer relative transition-all 
                                    duration-200 ease-out tracking-wider
                                    hover:font-semibold 
                                    after:content-[""] 
                                    after:absolute 
                                    after:h-[1.5px] 
                                    after:left-0
                                    after:-bottom-1
                                    after:transition-all 
                                    after:duration-300 
                                    after:ease 
                                    after:w-0
                                    ${(dark && topicoAtivo === 'Preço') ? 'after:w-full font-semibold text-blue-400 after:bg-blue-400' : topicoAtivo === 'Preço' ? 'after:w-full font-semibold text-blue-600 after:bg-blue-600': dark ? 'text-slate-200' : ''}`}>
                                    Preço
                                </article>

                            </div>

                            <article className="flex gap-1 items-center">
                                <span className={`border-r-2 py-2 pr-3 ${dark ? 'border-r-white/30' : 'border-r-black/30'}`}><BotaoTema/></span>

                                <button onClick={() => navigate('/login')} className={`mx-2 p-1 min-h-9 max-h-9 min-w-30 rounded-2xl border cursor-pointer transition ${dark ? 'border-zinc-500/90 bg-gray-500/10 text-white' : 'border-zinc-900'}`}>
                                    Login
                                </button>

                                <button onClick={() => navigate('/login/cadastro')} onMouseEnter={() => setMostrarIcone(true)} onMouseLeave={() => setMostrarIcone(false)} className="relative p-1 min-h-9 max-h-9 min-w-30  rounded-2xl text-white bg-blue-600 cursor-pointer">
                                    <span className={`transition-all duration-200 ease-out absolute top-1/2 -translate-y-[54.7%] left-1/2 -translate-x-1/2 ${mostrarIcone ? 'left-[40%]' : ''}`}>Começar</span>
                                    <span>
                                        <i className={`fa-solid fa-crosshairs ml-1 text-slate-50 text-shadow-[1px_1px_1px_#0000002a] transition-all duration-200 ease-out absolute top-1/2 -translate-y-[44%] ${mostrarIcone ? 'opacity-100 right-[15%]' : 'opacity-0 right-0'}`}></i>
                                    </span>

                                </button>
                            </article>
                        </section>
                    )}

                </div>
    );
}
