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
    const { largura, topicoAtivo, setTopicoAtivo, menuAberto, setMenuAberto, dark, session, user, deslogarUser, setSession, abaEntretenimento, setMostrarClubes, assinanteAtual } = allContext();
    const [busca, setBusca] = useState<string>('');
    const [clubes, setClubes] = useState<Clube[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [ativarPesquisa, setAtivarPesquisa] = useState(false);
    const [ativarPesquisaMobile, setAtivarPesquisaMobile] = useState(false);
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

    useEffect(() => {
    if (ativarPesquisaMobile) {
        window.scrollTo({
            top: 0
        });
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
    } else {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
    }
    }, [ativarPesquisaMobile]);

    return (
        <>
                <div style={{background: dark ? "linear-gradient(to right, #0d1015 40%, #080c14)" : "linear-gradient(to right, #f7fbff, #fdfeff)"}} 
                className={`fixed top-0 w-full max-w-full left-0 z-999 flex pt-4 pb-2.5 xl:gap-4 max-h-16 min-h-16 lg:px-[2%] xl:px-[4%] box-border ${
                menuAberto || mostrarBorder
                    ? dark
                    ? 'border-b border-neutral-400/10'
                    : 'border-b border-neutral-500/10'
                    : 'border-b border-transparent'
                }`}>

                    <h1 onClick={() => navigate('/')} className={`font-[MONELOS] flex items-center text-xl lg:text-3xl whitespace-nowrap ${dark && 'text-white'}`}>
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
                        abaEntretenimento ?
                            <div className="w-full flex items-center justify-end px-2">
                                <div className="flex-1 flex justify-end ml-2">
                                    <div className="relative min-w-10 max-w-26">

                                        <i onClick={() => setAtivarPesquisaMobile(true)} className={`fa-brands fa-sistrix text-xl translate-y-px transition-all duration-200 ease-in-out hover:scale-110 hover:-rotate-6 ${dark ? 'hover:text-amber-400 text-zinc-400' : 'hover:text-amber-500 text-zinc-600'}`}></i>
                                    </div>
                                </div>

                                <i 
                                    onClick={() => {
                                    setMenuAberto(!menuAberto);
                                    setBusca('');
                                    }} 
                                    className={`fa-solid ${menuAberto ? "fa-xmark" : "fa-bars"} cursor-pointer text-xl ${dark ? 'text-zinc-200' : 'text-zinc-900'}`}>

                                </i>
                            </div>
                            :
                            <div className="w-full flex items-center justify-end pr-4">
                                <i 
                                    onClick={() => {
                                    setMenuAberto(!menuAberto);
                                    setBusca('');
                                    }} 
                                    className={`fa-solid ${menuAberto ? "fa-xmark" : "fa-bars"} cursor-pointer text-xl ${dark ? 'text-zinc-200' : 'text-zinc-900'}`}>
                                </i>
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
                                        -translate-y-[2.5%] ${ativarPesquisa ? 'max-w-70 min-w-70 opacity-100 relative' : 'max-w-0 min-w-0 opacity-0 pointer-events-none absolute'} transition-all duration-500 py-2 pr-4 pl-4 border rounded-full ${dark ? 'placeholder:text-neutral-400 border-slate-200/20 text-slate-100' : 'placeholder:text-neutral-500 border-slate-800/30'}`} 
                                        placeholder="Buscar clube" 
                                        type="search"
                                        value={busca}
                                        onChange={(e) => {
                                            setBusca(e.currentTarget.value);
                                            buscaClube(e.currentTarget.value);
                                        }}
                                        name="buscar-topico" 
                                        id="buscar-topico" />
                                        
                                        {!ativarPesquisa &&
                                            <i onClick={() => setAtivarPesquisa(true)} className={`fa-brands fa-sistrix text-2xl translate-y-px transition-all duration-200 ease-in-out hover:scale-110 hover:-rotate-6 ${dark ? 'hover:text-amber-400 text-zinc-400' : 'hover:text-amber-500 text-zinc-600'}`}></i>
                                        }

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
                                        <div className={`absolute bottom-0 translate-y-[101%] min-w-[500%] -translate-x-[calc(100%-44px)] border min-h-80 rounded-xl flex flex-col justify-between ${dark ? 'bg-[rgb(26,28,30)] border-slate-200/20' : 'bg-white border-slate-800/28'}`}>
                                            <div className="w-full flex-1 pt-3 flex flex-col justify-end gap-1 pb-3">

                                                <button 
                                                onClick={() => {
                                                    setMostrarMenuUser(false);
                                                    navigate('/produtos');
                                                    setMostrarClubes(true);
                                                }}
                                                className={`flex w-[94%] justify-between mb-3 items-center translate-x-[3%] p-1 px-2 transition-all duration-150 cursor-pointer rounded-md ${dark ? 'hover:bg-zinc-700 text-neutral-400 hover:text-neutral-200' : 'hover:bg-zinc-300 text-neutral-600 hover:text-neutral-800'}`}>
                                                    Analisar Clube
                                                    <i className="fa-solid fa-ranking-star"></i>
                                                </button>

                                                <div className={`py-3 gap-3 flex flex-col border-t ${dark ? 'border-t-slate-200/30' : 'border-t-slate-600/20'}`}>
                                                    <button 
                                                    onClick={() => {
                                                        setMostrarMenuUser(false);
                                                        navigate('/comparador-de-clubes');
                                                    }}
                                                    className={`flex w-[94%] justify-between items-center translate-x-[3%] p-1 px-2 transition-all duration-150 cursor-pointer rounded-md ${dark ? 'hover:bg-zinc-700 text-neutral-400 hover:text-neutral-200' : 'hover:bg-zinc-300 text-neutral-600 hover:text-neutral-800'}`}>
                                                        Comparar Clubes
                                                        <i className="fa-solid fa-layer-group"></i>
                                                    </button>

                                                    <button
                                                    onClick={() => {
                                                        setMostrarMenuUser(false);
                                                        navigate('/comparador-de-coisas');
                                                    }} 
                                                    className={`flex w-[94%] justify-between items-center translate-x-[3%] p-1 px-2 transition-all duration-150 cursor-pointer rounded-md ${dark ? 'hover:bg-zinc-700 text-neutral-400 hover:text-neutral-200' : 'hover:bg-zinc-300 text-neutral-600 hover:text-neutral-800'}`}>
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
                                                    className={`flex w-[94%] justify-between items-center translate-x-[3%] p-1 px-2 transition-all duration-150 cursor-pointer rounded-md ${dark ? 'hover:bg-zinc-700 text-neutral-400 hover:text-neutral-200' : 'hover:bg-zinc-300 text-neutral-600 hover:text-neutral-800'}`}>
                                                        Sair
                                                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                                    </button>

                                                    <button 
                                                    onClick={() => {
                                                        deslogarUser();
                                                        setSession(undefined);
                                                        navigate('/login');
                                                    }}
                                                    className={`flex w-[94%] justify-between items-center translate-x-[3%] p-1 px-2 transition-all duration-150 cursor-pointer rounded-md ${dark ? 'hover:bg-zinc-700 text-neutral-400 hover:text-neutral-200' : 'hover:bg-zinc-300 text-neutral-600 hover:text-neutral-800'}`}>
                                                        Trocar conta
                                                        <i className="fa-solid fa-door-open"></i>
                                                    </button>
                                                </div>

                                            </div>

                                            <div className={`py-3 w-full border-t ${dark ? 'border-t-slate-200/30' : 'border-t-slate-600/20'}`}>
                                                {assinanteAtual !== 'Sócio' &&
                                                <button onClick={() => navigate('/preco')} className={`w-[92%] translate-x-[4%] p-0.75 pb-1 text-white text-sm text-shadow-[1px_1px_1px_#0000002a] shadow-[1px_1px_1px_#0000002a] cursor-pointer font-medium rounded-md ${assinanteAtual === 'Torcedor' ? 'bg-red-500' : 'bg-amber-500'}`}>
                                                    Fazer Upgrade
                                                </button>
                                                }
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

                {ativarPesquisaMobile &&
                    <div className="bg-black/80 backdrop-blur-lg absolute inset-0 z-999 flex flex-col p-4 min-h-screen">
                        <h1 className={`absolute left-1/2 -translate-x-1/2 top-6 text-neutral-200/90`}>
                            Toque fora para fechar
                        </h1>
                        <div onClick={() => setAtivarPesquisaMobile(false)} className={`min-h-10 min-w-10 max-h-10 max-w-10 flex items-center justify-center rounded-full mb-4 cursor-pointer ${dark ? 'bg-gray-800 text-white' : 'bg-gray-50 text-zinc-900'}`}>
                            <i className="fa-solid fa-xmark"></i>
                        </div>
                        <div className="relative flex items-center">
                            <i className={`fa-brands fa-sistrix left-8 -translate-x-1/2 absolute text-2xl top-1/2 -translate-y-1/2 ${dark ? 'text-zinc-500' : 'text-zinc-700'}`}></i>
                            <input
                                placeholder="Pesquise um clube... ex: Flamengo, Palmeiras"
                                className={`w-full pl-14 pr-5 py-4 sm:py-5 border-2 rounded-2xl focus:outline-none transition-all duration-300 text-base sm:text-lg ${dark ? 'bg-gray-800 border-white/8 text-white placeholder:text-white/25 focus:border-amber-500/50' : 'bg-gray-50 border-black/8 text-black placeholder:text-black/35 focus:border-amber-500/70'}`}
                                type="search"
                                value={busca}
                                onChange={(e) => {
                                    setBusca(e.currentTarget.value);
                                    buscaClube(e.currentTarget.value);
                                }}
                            />
                        </div>

                        {busca && clubes &&
                        <section className={`p-2 min-h-20 mt-2 z-10 max-h-[50vh] overflow-y-auto pb-2 min-w-full border rounded-lg ${dark ? 'bg-slate-900 border-slate-700/20' : 'bg-[#f7fbff] border-slate-500/30'}`}>

                            {loading ?
                                <div className="flex justify-center">
                                    <ClipLoader color={dark ? "#fff" : "#000"} size={34} className="self-center mt-4" />
                                </div>
                                :
                                clubes.length > 0 ?
                                    <div className="flex flex-col gap-4 justify-center py-2">
                                        {clubes.map((clube, index) => (
                                            <div onClick={() => navegar(clube.nome)} className={`cursor-pointer gap-6 items-center w-full flex pl-2 relative ${index !== clubes.length - 1 ? dark ? 'border-b pb-4 border-b-slate-300/20' : 'border-b pb-4 border-b-slate-800/20' : ''}`} key={index}>
                                                <img className="max-w-10 max-h-10" src={clube.imagem} alt="" />
                                                <div className="relative w-full text-start">
                                                    <h1 className={`${dark ? 'text-slate-50 font-medium' : 'text-[#222222] font-medium'}`}>{clube.nome}</h1>
                                                    <h2 className={`${dark ? 'text-neutral-400' : 'text-neutral-600'}`}>Série A</h2>
                                                    <i className={`fa-solid fa-angle-right absolute top-1/2 right-4 -translate-y-1/2 ${dark ? 'text-slate-400' : ''}`}></i>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    :
                                    <div className="min-w-full translate-y-[calc(50%+4px)] flex items-center justify-center">
                                        <h1 className={`${dark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                                            Nenhum clube encontrado para "{busca}"
                                        </h1>
                                    </div>
                            }

                        </section>
                        }

                        <div onClick={() => setAtivarPesquisaMobile(false)} className="flex-1" />
                    </div>
                }
        </>
    );
}
