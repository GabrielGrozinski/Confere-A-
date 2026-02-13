import { allContext } from "../context/all-context"
import { useState } from "react";
import BotaoTema from "./botao-tema";
import { useNavigate } from "react-router-dom";
import { supabase } from "../auth/supabase-client";
import type { Clube } from "./busca-clube";
import { relacaoClubes } from "./busca-clube";

export default function HeaderFixo() {
    const navigate = useNavigate();
    const { largura, topicoAtivo, setTopicoAtivo, menuAberto, setMenuAberto, dark, session, user, deslogarUser, setSession, abaEntretenimento } = allContext();
    const [busca, setBusca] = useState<string>('');
    const [clubes, setClubes] = useState<Clube[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [mostrarIcone, setMostrarIcone] = useState<boolean>(false);
    const [mostrarMenuUser, setMostrarMenuUser] = useState<boolean>(false);

    function formatarString(texto: string) {
        return texto
        .toLocaleLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, "");
    }

    function navegar(nomeClube: string) {
        const nomeRota = relacaoClubes(nomeClube);
        navigate(`/${nomeRota}`);
    }

    async function buscaClube(textoDigitado: string) {
        setLoading(true);
        if (textoDigitado === '') {
            setLoading(false);
            setBusca('')
            setClubes(null);
            return;
        }
        const nome_dos_clubes = [
            'Flamengo',
            'São Paulo',
            'Santos',
            'Fortaleza',
            'Palmeiras',
            'Corinthians',
            'Vasco',
            'Fluminense',
            'Botafogo',
            'Grêmio',
            'Internacional',
            'Atlético Mineiro',
            'Cruzeiro',
            'Sport',
            'Ceará',
            'Bahia',
            'Vitória',
            'Mirassol',
            'Bragantino',
            'Juventude'
        ]

        const clubesFiltrados = nome_dos_clubes.filter((nome_clube) => formatarString(nome_clube).includes((formatarString(textoDigitado))));

        const { data, error } = await supabase
            .from('clubes_2025')
            .select('*')
            .in('nome', clubesFiltrados);

        if (error) {
            console.error('Houve um erro ao buscar os clubes', error);
        }
        setLoading(false);
        setClubes(data);

    }

    return (
                <div style={{background: dark ? "linear-gradient(to right, #0b1f33 40%, #0e243d)" : "linear-gradient(to right, #f7fbff, #fdfeff)"}} 
                className={`fixed top-0 w-full left-0 z-10 flex border-b px-4 pt-4 pb-2 xl:gap-4 max-h-16 min-h-16 ${dark ? 'border-b-neutral-100/10' : 'border-b-neutral-800/10'}`}>

                    <h1 className={`font-[MONELOS] text-3xl whitespace-nowrap ${dark && 'text-white'}`}>Confere Aê</h1>
                    {largura < 1024 ? (
                        <div className="w-full flex items-center justify-end">
                            <button className="mr-4 cursor-pointer bg-blue-500 py-1 px-3 rounded-xl text-slate-100 shadow-[1px_1px_2px_#0000002a]">Baixar aplicativo</button>

                            <i onClick={() => setMenuAberto(!menuAberto)} className={`fa-solid ${menuAberto ? "fa-xmark" : "fa-bars"} cursor-pointer text-xl ${dark ? 'text-zinc-200' : 'text-zinc-900'}`}></i>
                        </div>
                    ) : (
                        <section className="flex w-full justify-between">
                            <div className="flex ml-10 items-center gap-12 flex-1 mr-10">
                                
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

                                {abaEntretenimento &&
                                    <div className="relative">
                                    <input 
                                    className={`
                                    -translate-y-[2.5%] min-w-70 py-2 pr-4 pl-4 border rounded-full ${dark ? 'placeholder:text-neutral-400 border-slate-200/20 bg-slate-900 text-slate-100' : 'placeholder:text-neutral-500 bg-white border-slate-800/30'}`} 
                                    placeholder="Buscar clube" 
                                    type="search"
                                    value={busca}
                                    onChange={(e) => {
                                        setBusca(e.currentTarget.value);
                                        buscaClube(e.currentTarget.value);
                                    }}
                                    name="buscar-topico" 
                                    id="buscar-topico" />

                                    {busca &&
                                    <section className={`absolute p-2 bottom-0 translate-y-[101%] min-h-82 max-h-120 overflow-y-auto pb-2 min-w-full rounded-lg ${dark ? 'bg-[#0b1f33] shadow-[0px_0px_3px_#1e40af4a]' : 'shadow-[0px_0px_3px_#0000004a] bg-[#f7fbff]'}`}>
                                        {clubes && clubes.length > 0 ?
                                        <div className="flex flex-col gap-4 justify-center py-2">
                                            {clubes.map((clube, index) => (
                                                <div onClick={() => navegar(clube.nome)} className={`cursor-pointer gap-6 items-center w-full flex pl-2 ${index !== clubes.length - 1 ? dark ? 'border-b pb-4 border-b-slate-300/20' : 'border-b pb-4 border-b-slate-800/20' : ''}`} key={index}>
                                                    <img className="max-w-10 max-h-10" src={clube.imagem} alt="" />
                                                    <div>
                                                        <h1 className={`${dark ? 'text-slate-50 font-medium' : 'text-[#222222] font-medium'}`}>{clube.nome}</h1>
                                                        <h2 className={`${dark ? 'text-neutral-400' : 'text-neutral-600'}`}>Série A</h2>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        :
                                        <div></div>
                                        }
                                    </section>
                                    }
                                    </div>
                                }

                            </div>

                            <article className="flex gap-1 items-center">
                                <span className={`border-r-2 py-2 pr-3 ${dark ? 'border-r-white/30' : 'border-r-black/30'}`}><BotaoTema/></span>

                                {session ? 
                                user &&
                                <div className="ml-2 relative">
                                    <img onClick={() => setMostrarMenuUser(!mostrarMenuUser)} src={user.user_metadata.avatar_url} className="min-h-11 max-h-11 min-w-11 max-w-11 rounded-full cursor-pointer" alt="" />

                                    {mostrarMenuUser &&
                                        <div className={`absolute bottom-0 translate-y-[101%] min-w-[500%] -translate-x-[calc(100%-44px)] min-h-80 rounded-xl flex flex-col justify-between ${dark ? 'bg-slate-950' : 'bg-white shadow-[0px_0px_2px_#0000005a]'}`}>
                                            <div className="w-full flex-1 pt-3 flex flex-col justify-end gap-1 pb-3">

                                                <button 
                                                onClick={() => {
                                                    setMostrarMenuUser(false);
                                                    navigate('/produtos');
                                                }}
                                                className={`flex w-[94%] justify-between items-center translate-x-[3%] mb-3 p-1 px-2 cursor-pointer rounded-md ${dark ? 'hover:bg-gray-900 text-neutral-400 hover:text-neutral-200' : 'hover:bg-gray-100 text-neutral-600 hover:text-neutral-800'}`}>
                                                    Analisar Clube
                                                    <i className="fa-solid fa-ranking-star"></i>
                                                </button>

                                                <div className={`py-3 gap-3 flex flex-col border-t ${dark ? 'border-t-slate-200/30' : 'border-t-slate-600/20'}`}>
                                                    <button 
                                                    onClick={() => {
                                                        setMostrarMenuUser(false);
                                                        navigate('/comparador-de-clubes');
                                                    }}
                                                    className={`flex w-[94%] justify-between items-center translate-x-[3%] p-1 px-2 cursor-pointer rounded-md ${dark ? 'hover:bg-gray-900 text-neutral-400 hover:text-neutral-200' : 'hover:bg-gray-100 text-neutral-600 hover:text-neutral-800'}`}>
                                                        Comparar Clubes
                                                        <i className="fa-solid fa-layer-group"></i>
                                                    </button>

                                                    <button
                                                    onClick={() => {
                                                        setMostrarMenuUser(false);
                                                        navigate('/comparador-de-coisas');
                                                    }} 
                                                    className={`flex w-[94%] justify-between items-center translate-x-[3%] p-1 px-2 cursor-pointer rounded-md ${dark ? 'hover:bg-gray-900 text-neutral-400 hover:text-neutral-200' : 'hover:bg-gray-100 text-neutral-600 hover:text-neutral-800'}`}>
                                                        Comparar Coisas
                                                        <i className="fa-solid fa-chart-simple"></i>
                                                    </button>
                                                </div>
                                                
                                                <div className={`pt-3 gap-3 flex flex-col border-t ${dark ? 'border-t-slate-200/30' : 'border-t-slate-600/20'}`}>
                                                    <button 
                                                    onClick={() => {
                                                        deslogarUser();
                                                        navigate('/');
                                                    }} 
                                                    className={`flex w-[94%] justify-between items-center translate-x-[3%] p-1 px-2 cursor-pointer rounded-md ${dark ? 'hover:bg-gray-900 text-neutral-400 hover:text-neutral-200' : 'hover:bg-gray-100 text-neutral-600 hover:text-neutral-800'}`}>
                                                        Sair
                                                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                                    </button>

                                                    <button 
                                                    onClick={() => {
                                                        deslogarUser();
                                                        setSession(undefined);
                                                        navigate('/login');
                                                    }}
                                                    className={`flex w-[94%] justify-between items-center translate-x-[3%] p-1 px-2 cursor-pointer rounded-md ${dark ? 'hover:bg-gray-900 text-neutral-400 hover:text-neutral-200' : 'hover:bg-gray-100 text-neutral-600 hover:text-neutral-800'}`}>
                                                        Trocar conta
                                                        <i className="fa-solid fa-door-open"></i>
                                                    </button>
                                                </div>

                                            </div>

                                            <div className={`py-3 w-full border-t ${dark ? 'border-t-slate-200/30' : 'border-t-slate-600/20'}`}>
                                                <button className={`w-[92%] translate-x-[4%] bg-blue-500 p-0.75 pb-1 text-white text-sm text-shadow-[1px_1px_1px_#0000002a] shadow-[1px_1px_1px_#0000002a] cursor-pointer font-medium rounded-md`}>Fazer Upgrade</button>
                                            </div>
                                        </div>
                                    }
                                </div>
                                :
                                <>
                                <button onClick={() => navigate('/login')} className={`mx-2 p-1 min-h-9 max-h-9 min-w-30 rounded-2xl border cursor-pointer transition ${dark ? 'border-zinc-500/90 bg-gray-500/10 text-white' : 'border-zinc-900'}`}>
                                    Login
                                </button>

                                <button onClick={() => navigate('/login/cadastro')} onMouseEnter={() => setMostrarIcone(true)} onMouseLeave={() => setMostrarIcone(false)} className="relative p-1 min-h-9 max-h-9 min-w-30  rounded-2xl text-white bg-blue-600 cursor-pointer">
                                    <span className={`transition-all duration-200 ease-out absolute top-1/2 -translate-y-[54.7%] left-1/2 -translate-x-1/2 ${mostrarIcone ? 'left-[40%]' : ''}`}>Começar</span>
                                    <span>
                                        <i className={`fa-solid fa-crosshairs ml-1 text-slate-50 text-shadow-[1px_1px_1px_#0000002a] transition-all duration-200 ease-out absolute top-1/2 -translate-y-[44%] ${mostrarIcone ? 'opacity-100 right-[15%]' : 'opacity-0 right-0'}`}></i>
                                    </span>

                                </button>
                                </>
                                }

                            </article>
                        </section>
                    )}

                </div>
    );
}
