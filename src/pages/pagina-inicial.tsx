import "../styles/pagina-inicial.css";
import { useState, useEffect } from "react"
import { allContext } from "../context/all-context";
import fundo from '../assets/imagens/fundo.png';
import BotaoTema from "../components/botao-tema";
import { supabase } from "../auth/supabase-client";

interface Clube {
    id: string;
    nome: string;
    estado: string;
    numero_torcedores: number;
    faturamento: number;
    lucro: number;
    divida: number;
    valor_contratacoes: number;
    maior_contratacao: string;
    folha_salarial: number;
}

export default function PaginaInicial() {
    const [menuAberto, setMenuAberto] = useState<boolean>(false);
    const [valorCuriosidade, setValorCuriosidade] = useState<number>(0);
    const [mostrarIcone, setMostrarIcone] = useState<boolean>(false);
    const [topicoAtivo, setTopicoAtivo] = useState<'Explorar Dados' | 'Produto' | 'Preço'>('Explorar Dados');
    const [busca, setBusca] = useState<string>('');
    const [clubes, setClubes] = useState<Clube[]>();
    const { largura } = allContext();

    const curiosidadesFinanceiras = [
    "Se você pagasse R$1 milhão da dívida do Corinthians por dia, levaria quase 3.000 dias para quitá-la!",
    "O Palmeiras arrecadou mais de R$700 milhões com venda de jogadores em um único ano.",
    "A dívida total do futebol brasileiro ultrapassa R$10 bilhões.",
    "O Flamengo já fatura mais de R$1 bilhão por ano — mais que muitas empresas médias do Brasil.",
    "O Santos já teve folha salarial menor que o valor de uma única venda do Palmeiras.",
    "Mesmo campeão, muitos clubes gastam mais de 80% da receita só com salários.",
    "Há clubes na Série A que gastam mais com juros de dívida do que com contratações.",
    "Uma venda de jogador pode pagar a folha salarial de um clube médio por um ano inteiro."
    ];

    useEffect(() => {
        const intervalo = setInterval(() => {
            setValorCuriosidade((prev) => (prev > 6 ? 0 : prev + 1));
        }, 5000);

        return () => clearInterval(intervalo);
    }, []);


    const topicos: any[] = [
        {
            id: "faturamento",
            curiosidade: "Tem clube faturando como empresa internacional… mas administrando como time de várzea. 👀",
            titulo: "Maiores faturamentos",
            icone: "fa-money-bill-trend-up",
            imagemdeFundo: "/faturamento.png",
            cor: "#56ce90",
            corBg: "#F5FFF7",
            pergunta: "Quem fatura mais, leva mais títulos?",
            clubes: [
                {
                    id: 1,
                    valor: "R$ 850 milhões",
                    nome: "São Paulo",
                    imagem: "/sp.png",
                    variacao: "+25,4%"
                },
                {
                    id: 2,
                    valor: "R$ 650 milhões",
                    nome: "Santos",
                    imagem: "/santos.png",
                    variacao: "+12,0%"
                },
                {
                    id: 3,
                    valor: "R$ 600 milhões",
                    nome: "Grêmio",
                    imagem: "/gremio.png",
                    variacao: "+14,1%"
                },
                {
                    id: 4,
                    valor: "R$ 350 milhões",
                    nome: "Palmeiras",
                    imagem: "/palmeiras.png",
                    variacao: "-4,2%"
                }
            ]
        },
        {
            id: "dividas",
            curiosidade: "Alguns clubes devem tanto que, se dívida desse título, já teriam levantado mais taças que o Real Madrid. 🏆😬",
            titulo: "Maiores dívidas",
            icone: "fa-money-bill-trend-down",
            imagemdeFundo: "/divida.png",
            cor: "#ef4444",
            corBg: "#FFF5F5",
            pergunta: "Quem está mais endividado?",
            clubes: [
                {
                    id: 1,
                    valor: "R$ 450 milhões",
                    nome: "Flamengo",
                    imagem: "/sp.png",
                    variacao: "+8,3%"
                },
                {
                    id: 2,
                    valor: "R$ 380 milhões",
                    nome: "Corinthians",
                    imagem: "/santos.png",
                    variacao: "+15,2%"
                },
                {
                    id: 3,
                    valor: "R$ 320 milhões",
                    nome: "Vasco",
                    imagem: "/gremio.png",
                    variacao: "+5,8%"
                },
                {
                    id: 4,
                    valor: "R$ 280 milhões",
                    nome: "Botafogo",
                    imagem: "/palmeiras.png",
                    variacao: "-2,1%"
                }
            ]
        },
        {
            id: "folhas-salariais",
            curiosidade: "Quando a folha salarial assusta mais que o adversário. 😬💰",
            titulo: "Maiores folhas salariais",
            icone: "fa-money-bill-wave",
            imagemdeFundo: "/salario.png",
            cor: "#3b82f6",
            corBg: "#fffdf4",
            pergunta: "Quem gasta mais com salários?",
            clubes: [
                {
                    id: 1,
                    valor: "R$ 250 milhões/ano",
                    nome: "PSG",
                    imagem: "/sp.png",
                    variacao: "+18,5%"
                },
                {
                    id: 2,
                    valor: "R$ 220 milhões/ano",
                    nome: "Manchester City",
                    imagem: "/santos.png",
                    variacao: "+12,3%"
                },
                {
                    id: 3,
                    valor: "R$ 200 milhões/ano",
                    nome: "Barcelona",
                    imagem: "/gremio.png",
                    variacao: "+9,7%"
                },
                {
                    id: 4,
                    valor: "R$ 180 milhões/ano",
                    nome: "Real Madrid",
                    imagem: "/palmeiras.png",
                    variacao: "+7,4%"
                }
            ]
        },
        {
            id: "superavits",
            curiosidade: "Tem clube que não ganha tudo em campo, mas ganha bonito no caixa. 🧮😎",
            titulo: "Maiores superávits",
            icone: "fa-chart-line",
            imagemdeFundo: "/lucro.png",
            cor: "#10b981",
            corBg: "#F5FEFF",
            pergunta: "Quem tem os melhores números?",
            clubes: [
                {
                    id: 1,
                    valor: "R$ 125 milhões",
                    nome: "Atlético Mineiro",
                    imagem: "/sp.png",
                    variacao: "+22,1%"
                },
                {
                    id: 2,
                    valor: "R$ 98 milhões",
                    nome: "Fortaleza",
                    imagem: "/santos.png",
                    variacao: "+19,4%"
                },
                {
                    id: 3,
                    valor: "R$ 85 milhões",
                    nome: "Cebolinha",
                    imagem: "/gremio.png",
                    variacao: "+16,8%"
                },
                {
                    id: 4,
                    valor: "R$ 72 milhões",
                    nome: "Internacional",
                    imagem: "/palmeiras.png",
                    variacao: "+13,2%"
                }
            ]
        }
    ];

    async function buscaClube(textoDigitado: string) {
        const nome_dos_clubes = [
            'Flamengo',
            'São Paulo',
            'Santos',
            'Fortaleza',
            'Palmeiras',
            'Corinthians',
            'Vasco da Gama',
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

        console.log('data', data);

        

    }

    function formatarString(texto: string) {
        return texto
        .toLocaleLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, "");
    }

    return (
        <div>
            <header style={{background: "linear-gradient(to bottom right, #f0f9ff, #fdfeff)"}} className="relative flex flex-col border-b border-b-slate-400/10 min-h-screen">
                     
                <div style={{background: "linear-gradient(to right, #f0f9ff 40%, #f3f9ff)"}} 
                className="fixed top-0 w-full left-0 z-1 flex border-b border-b-neutral-800/10 px-4 pt-4 pb-2 xl:gap-4 max-h-16 min-h-16">

                    <h1 className="font-[MONELOS] text-3xl whitespace-nowrap">Confere Aê</h1>
                    {largura < 1024 ? (
                        <div className="w-full flex items-center justify-end">
                            <button className="mr-4 cursor-pointer bg-blue-500 py-1 px-3 rounded-xl text-slate-100 shadow-[1px_1px_2px_#0000002a]">Baixar aplicativo</button>

                            <i onClick={() => setMenuAberto(!menuAberto)} className={`fa-solid ${menuAberto ? "fa-xmark" : "fa-bars"} cursor-pointer text-xl text-zinc-900`}></i>
                        </div>
                    ) : (
                        <section className="flex w-full justify-between">
                            <div className="flex ml-10 items-center gap-12">
                                
                                <article onClick={() => setTopicoAtivo('Explorar Dados')} className={`
                                    cursor-pointer relative transition-all 
                                    duration-200 ease-out tracking-wider
                                    hover:font-semibold 
                                    after:content-[""] 
                                    after:absolute 
                                    after:h-[1.5px] 
                                    after:left-0
                                    after:-bottom-1
                                    after:bg-blue-600
                                    after:transition-all 
                                    after:duration-300 
                                    after:ease
                                    after:w-0
                                    ${topicoAtivo === 'Explorar Dados' && 'after:w-full font-semibold text-blue-600'}`}>
                                    Explorar Dados
                                </article>
                                
                                <article onClick={() => setTopicoAtivo('Produto')} className={`
                                    cursor-pointer relative transition-all 
                                    duration-200 ease-out tracking-wider
                                    hover:font-semibold 
                                    after:content-[""] 
                                    after:absolute 
                                    after:h-[1.5px] 
                                    after:left-0
                                    after:-bottom-1
                                    after:bg-blue-600
                                    after:transition-all 
                                    after:duration-300 
                                    after:ease
                                    after:w-0
                                    ${topicoAtivo === 'Produto' && 'after:w-full font-semibold text-blue-600'}`}>
                                    Produtos
                                </article>

                                <article onClick={() => setTopicoAtivo('Preço')} className={`
                                    cursor-pointer relative transition-all 
                                    duration-200 ease-out tracking-wider
                                    hover:font-semibold 
                                    after:content-[""] 
                                    after:absolute 
                                    after:h-[1.5px] 
                                    after:left-0
                                    after:-bottom-1
                                    after:bg-blue-600 
                                    after:transition-all 
                                    after:duration-300 
                                    after:ease 
                                    after:w-0
                                    ${topicoAtivo === 'Preço' && 'after:w-full font-semibold text-blue-600'}`}>
                                    Preço
                                </article>

                            </div>

                            <article className="flex gap-1 items-center">
                                <span className="border-r-2 border-r-black/30 py-2 pr-3"><BotaoTema/></span>

                                <button className='mx-2 p-1 min-h-9 max-h-9 min-w-30 rounded-2xl border border-zinc-900 cursor-pointer transition'>
                                    Login
                                </button>

                                <button onMouseEnter={() => setMostrarIcone(true)} onMouseLeave={() => setMostrarIcone(false)} className="relative p-1 min-h-9 max-h-9 min-w-30  rounded-2xl text-white bg-blue-600 cursor-pointer">
                                    <span className={`transition-all duration-200 ease-out absolute top-1/2 -translate-y-[54.7%] left-1/2 -translate-x-1/2 ${mostrarIcone ? 'left-[40%]' : ''}`}>Começar</span>
                                    <span>
                                        <i className={`fa-solid fa-crosshairs ml-1 text-slate-50 text-shadow-[1px_1px_1px_#0000002a] transition-all duration-200 ease-out absolute top-1/2 -translate-y-[44%] ${mostrarIcone ? 'opacity-100 right-[15%]' : 'opacity-0 right-0'}`}></i>
                                    </span>

                                </button>
                            </article>
                        </section>
                    )}

                </div>

                {!menuAberto ? (
                    <>
                        <div className='flex flex-col items-center px-12 mb-10 mt-20 text-center gap-2'>
                            <h1 className="text-4xl">O raio-X financeiro <br /> do futebol brasileiro</h1>
                            <p className="text-neutral-500 text-center">Descubra quem ganha muito, quem gasta mal e quem tá devendo!</p>
                            <p key={valorCuriosidade} className="animacao-entrada">{curiosidadesFinanceiras[valorCuriosidade]}</p>
                        </div>

                        <div className="relative max-w-3/4 translate-x-1/5 sm:max-w-1/2 sm:translate-x-1/2 lg:max-w-1/3 lg:translate-x-full">
                            <input 
                            className="
                            w-full py-2 pr-4 pl-9 border border-slate-800/20 rounded-full
                            placeholder:text-neutral-500
                            " 
                            placeholder="Buscar clube" 
                            type="search"
                            value={busca}
                            onChange={(e) => {
                                setBusca(e.currentTarget.value);
                                buscaClube(e.currentTarget.value);
                            }}
                            name="buscar-topico" 
                            id="buscar-topico" />

                            <i className="fa-solid fa-magnifying-glass absolute left-0 top-1/2 -translate-y-[40.4%] translate-x-1/2 text-neutral-600"></i>

                            <i onClick={() => setBusca('')} className={`fa-regular fa-circle-xmark absolute top-1/2 -translate-y-[45%] right-0 -translate-x-[66%] cursor-pointer text-lg text-sky-950 ${!busca && 'opacity-0'}`}></i>
                        </div>

                        <h2 className="max-w-3/4 translate-x-1/5 sm:max-w-1/2 sm:translate-x-1/2 lg:max-w-1/3 lg:translate-x-full ml-2 text-slate-700 font-medium flex items-center mb-8 mt-1 text-[14px]">
                        <i className="fa-solid fa-circle text-green-500 text-shadow-[1px_1px_1px_#0000001a] text-[8.5px] mr-2 translate-y-[15%]"></i>
                        Dados atualizados 
                        <i className="fa-solid fa-circle text-slate-600 text-[3px] mx-1.5 translate-y-[50%]"></i>
                        <span className="font-normal">Temporada 2026</span>
                        </h2>

                        <i className="fa-solid fa-chevron-down self-center text-slate-500 text-lg mb-4"></i>
                    </>
                ) : (
                    <main className="bg-white flex flex-col mt-16 pt-4 gap-4">
                        <article className="flex justify-between px-10 cursor-pointer">
                            <h1 className="text-zinc-800">Explorar Dados</h1>
                            <i className="fa-solid fa-angle-right"></i>
                        </article>

                        <article className="flex justify-between px-10 cursor-pointer">
                            <h1 className="text-zinc-800">Produtos</h1>
                            <i className="fa-solid fa-angle-right"></i>
                        </article>

                        <article className="flex justify-between px-10 cursor-pointer">
                            <h1 className="text-zinc-800">Preço</h1>
                            <i className="fa-solid fa-angle-right"></i>
                        </article>

                        <article className="flex justify-between py-2 border-y border-y-black/10">
                            <h1 className="text-zinc-800 ml-10">Tema</h1>
                            <span className="mr-10 translate-x-1/2">
                                <BotaoTema />
                            </span>
                        </article>

                        <article className="fixed bottom-0 -translate-y-1/2 py-2 border-t border-t-black/20 w-full flex justify-start gap-4">
                            <button className="ml-10 p-2 min-w-30 rounded-2xl border border-zinc-900 cursor-pointer">Login</button>

                            <button className="p-2 min-w-30 rounded-2xl text-white bg-blue-600 cursor-pointer">Começar</button>
                        </article>
                    </main>
                )}
            </header>

            <main className="bg-white pt-4">



            </main>

        </div>
    )
}