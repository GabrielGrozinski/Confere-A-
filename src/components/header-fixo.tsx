import { allContext } from "../context/all-context"
import { useEffect, useState } from "react";
import BotaoTema from "./botao-tema";
import { useNavigate } from "react-router-dom";
import { supabase } from "../auth/supabase-client";
import type { Clube } from "./busca-clube";
import { relacaoClubes } from "./busca-clube";
import { ClipLoader } from "react-spinners";
import MenuAberto from "./menu-aberto";

export default function HeaderFixo() {
    const navigate = useNavigate();
    const { largura, topicoAtivo, setTopicoAtivo, menuAberto, setMenuAberto, dark, session, user, deslogarUser, setSession, abaEntretenimento } = allContext();
    const [busca, setBusca] = useState<string>('');
    const [clubes, setClubes] = useState<Clube[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [mostrarIcone, setMostrarIcone] = useState<boolean>(false);
    const [mostrarMenuUser, setMostrarMenuUser] = useState<boolean>(false);
    const [mostrarBorder, setMostrarBorder] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY > 30) {
                setMostrarBorder(true);
            } else {
                setMostrarBorder(false);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
                <div style={{background: dark ? "linear-gradient(to right, #0d1015 40%, #080c14)" : "linear-gradient(to right, #f7fbff, #fdfeff)"}} 
                className={`fixed top-0 w-full left-0 z-999 flex px-4 pt-4 pb-2.5 xl:gap-4 max-h-16 min-h-16 lg:px-[6%] box-border border-b ${menuAberto ? dark ? 'border-b-neutral-400/10 border-b' : 'border-b-neutral-800/10 border-b' : mostrarBorder ? dark ? 'border-b-neutral-400/10' : 'border-b-neutral-800/10 ' : 'border-b-transparent'}`}>

                    <h1 className={`font-[MONELOS] flex items-center ${abaEntretenimento ? 'text-xl' : 'text-2xl'} lg:text-3xl whitespace-nowrap ${dark && 'text-white'}`}>
                        <div className="relative translate-y-1.25 max-w-2xl mx-auto px-3 lg:px-4 text-center">
                            <div className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-amber-400/10 border border-amber-400/15 mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-chart-column w-3.5 h-3.5 text-amber-400"
                                    aria-hidden="true"
                                >
                                    <path d="M3 3v16a2 2 0 0 0 2 2h16"></path>
                                    <path d="M18 17V9"></path>
                                    <path d="M13 17V5"></path>
                                    <path d="M8 17v-3"></path>
                                </svg>
                            </div>
                        </div>
                            <span className="font-semibold tracking-tight">
                                Confere<span className="text-amber-400"> Aê</span>
                            </span>
                    </h1>
                    {largura < 1024 ? (
                        <div className="w-full flex items-center justify-end">
                                {abaEntretenimento &&
                                    <div className="relative flex-1">
                                    <input 
                                    className={`
                                    -translate-y-[2.5%] min-w-[60%] max-w-[75%] sm:min-w-50 flex-1 mx-4 py-2 pr-4 pl-4 border rounded-full ${dark ? 'placeholder:text-neutral-400 border-slate-200/20 text-slate-100' : 'placeholder:text-neutral-500 border-slate-800/30'}`} 
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
                                    <section className={`absolute p-2 bottom-0 ml-4 translate-y-[101%] min-h-20 max-h-120 overflow-y-auto pb-2 min-w-[75%] max-w-[75%] rounded-lg ${dark ? 'bg-[#0b1f33] shadow-[0px_0px_3px_#1e40af4a]' : 'shadow-[0px_0px_3px_#0000004a] bg-[#f7fbff]'}`}>
                                        {loading ?
                                        <div className="w-full flex items-center justify-center">
                                            <ClipLoader color={dark ? "#fff" : "#000"} size={34} className="self-center mt-4" />
                                        </div>
                                        :
                                        clubes &&
                                        clubes.length > 0 ?
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
                                        <div className="min-w-full text-center translate-y-1/5 flex items-center justify-center">
                                            <h1 className={`${dark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                                                Nenhum clube encontrado para "{busca}"
                                            </h1>
                                        </div>
                                        }
                                    </section>
                                    }
                                    </div>
                                }

                            <i 
                                onClick={() => {
                                setMenuAberto(!menuAberto);
                                setBusca('');
                                }} 
                                className={`fa-solid ${menuAberto ? "fa-xmark" : "fa-bars"} cursor-pointer text-xl ${dark ? 'text-zinc-200' : 'text-zinc-900'}`}></i>
                        </div>
                    ) : (
                        <section className="flex w-full justify-between">
                            <div className="flex ml-10 items-center gap-12 flex-1 mr-10">
                                
                                <article 
                                    onClick={() => {
                                    setTopicoAtivo('Explorar Dados');
                                    setTimeout(() => {
                                        navigate('/');
                                    }, 200);
                                    }}
                                    className={`
                                    cursor-pointer relative transition-all 
                                    duration-200 ease-out tracking-wider
                                    after:content-[""] 
                                    after:absolute 
                                    after:h-[1.5px] 
                                    after:left-0
                                    after:-bottom-1
                                    after:transition-all after:duration-400 after:ease-out 
                                    after:w-0
                                    ${(dark && topicoAtivo === 'Explorar Dados') ? 'after:w-full font-medium text-amber-400 after:bg-amber-400' : topicoAtivo === 'Explorar Dados' ? 'after:w-full font-medium text-amber-400 after:bg-amber-400': dark ? 'text-neutral-400 hover:text-neutral-200' : 'text-neutral-500 hover:text-neutral-800'}
                                    `}>
                                    Explorar Dados
                                </article>
                                
                                <article 
                                    onClick={() => {
                                    setTopicoAtivo('Produto');
                                    setTimeout(() => {
                                        navigate('/produtos');
                                    }, 200);
                                    }}
                                    className={`
                                    cursor-pointer relative transition-all 
                                    duration-200 ease-out tracking-wider
                                    after:content-[""] 
                                    after:absolute 
                                    after:h-[1.5px] 
                                    after:left-0
                                    after:-bottom-1
                                    after:transition-all after:duration-200 after:ease-out 
                                    after:w-0
                                    ${(dark && topicoAtivo === 'Produto') ? 'after:w-full font-medium text-amber-400 after:bg-amber-400' : topicoAtivo === 'Produto' ? 'after:w-full font-medium text-amber-400 after:bg-amber-400': dark ? 'text-neutral-400 hover:text-neutral-200' : 'text-neutral-500 hover:text-neutral-800'}`}>
                                    Produtos
                                </article>

                                <article 
                                    onClick={() => {
                                    setTopicoAtivo('Preço');
                                    setTimeout(() => {
                                        navigate('/preco');
                                    }, 200);
                                    }}
                                    className={`
                                    cursor-pointer relative transition-all 
                                    duration-200 ease-out tracking-wider
                                    after:content-[""] 
                                    after:absolute 
                                    after:h-[1.5px] 
                                    after:left-0
                                    after:-bottom-1
                                    after:transition-all after:duration-200 after:ease-out 
                                    after:w-0
                                    ${(dark && topicoAtivo === 'Preço') ? 'after:w-full font-medium text-amber-400 after:bg-amber-400' : topicoAtivo === 'Preço' ? 'after:w-full font-medium text-amber-400 after:bg-amber-400': dark ? 'text-neutral-400 hover:text-neutral-200' : 'text-neutral-500 hover:text-neutral-800'}`}>
                                    Preço
                                </article>

                                {abaEntretenimento &&
                                    <div className="relative">
                                        <input 
                                        className={`
                                        -translate-y-[2.5%] min-w-70 py-2 pr-4 pl-4 border rounded-full ${dark ? 'placeholder:text-neutral-400 border-slate-200/20 text-slate-100' : 'placeholder:text-neutral-500 border-slate-800/30'}`} 
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
                                    <section className={`absolute p-2 bottom-0 translate-y-[101%] min-h-20 max-h-120 overflow-y-auto pb-2 min-w-full rounded-lg ${dark ? 'bg-[#0b1f33] shadow-[0px_0px_3px_#1e40af4a]' : 'shadow-[0px_0px_3px_#0000004a] bg-[#f7fbff]'}`}>
                                        {loading ?
                                        <div className="w-full flex items-center justify-center">
                                            <ClipLoader color={dark ? "#fff" : "#000"} size={34} className="self-center mt-4" />
                                        </div>
                                        :
                                        clubes &&
                                        clubes.length > 0 ?
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
                                        <div className="min-w-full text-center translate-y-1/5 flex items-center justify-center">
                                            <h1 className={`${dark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                                                Nenhum clube encontrado para "{busca}"
                                            </h1>
                                        </div>
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
                                    {user.user_metadata.avatar_url ? 
                                        <img onClick={() => setMostrarMenuUser(!mostrarMenuUser)} src={user.user_metadata.avatar_url} className="min-h-11 max-h-11 min-w-11 max-w-11 rounded-full cursor-pointer shadow-[0px_0px_2px_#0000002a]" alt="" />
                                    :
                                        <i onClick={() => setMostrarMenuUser(!mostrarMenuUser)} className={`fa-solid fa-circle-user text-4xl cursor-pointer ${dark ? 'text-neutral-200' : 'text-neutral-600'}`}></i>
                                    }

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
                                                <button className={`w-[92%] translate-x-[4%] bg-amber-500 p-0.75 pb-1 text-white text-sm text-shadow-[1px_1px_1px_#0000002a] shadow-[1px_1px_1px_#0000002a] cursor-pointer font-medium rounded-md`}>Fazer Upgrade</button>
                                            </div>
                                        </div>
                                    }
                                </div>
                                :
                                <>
                                <button onClick={() => navigate('/login')} className={`mx-2 p-1 min-h-9 max-h-9 min-w-30 rounded-2xl border cursor-pointer transition ${dark ? 'border-zinc-500/90 bg-gray-500/10 text-white' : 'border-zinc-900'}`}>
                                    Login
                                </button>

                                <button onClick={() => navigate('/login/cadastro')} onMouseEnter={() => setMostrarIcone(true)} onMouseLeave={() => setMostrarIcone(false)} className="relative p-1 min-h-9 max-h-9 min-w-30  rounded-2xl text-white bg-amber-500 cursor-pointer">
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

                    {menuAberto &&
                    <MenuAberto />
                    }

                </div>
    );
}
