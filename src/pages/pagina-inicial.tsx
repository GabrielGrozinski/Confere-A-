import "../styles/pagina-inicial.css";
import { useState, useEffect, useRef } from "react"
import { allContext } from "../context/all-context";
import { ClipLoader } from "react-spinners";
import { supabase } from "../auth/supabase-client";
import { relacaoClubes, type Clube } from "../components/busca-clube";
import { useNavigate } from "react-router-dom";
import HeaderFixo from "../components/header-fixo";
import FooterFixo from "../components/footer-fixo";


export default function PaginaInicial() {
    const navigate = useNavigate();
    const [valorCuriosidade, setValorCuriosidade] = useState<number>(0);
    const [busca, setBusca] = useState<string>('');
    const [clubes, setClubes] = useState<Clube[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [mostrarTopicos, setMostrarTopicos] = useState<boolean>(false);
    const [mostrarTopicos2, setMostrarTopicos2] = useState<boolean>(false);
    const { setTopicoAtivo, dark, setAbaEntretenimento } = allContext();
    const [topicoEscolhido, setTopicoEscolhido] = useState<'faturamento' | 'dividas' | 'custo' | 'comparacao' | string>('faturamento')
    const sectionRef = useRef<HTMLDivElement | null>(null)
    const sectionRef2 = useRef<HTMLDivElement | null>(null)

    const curiosidadesFinanceiras = [
        "Se você pagasse R$1 milhão da dívida do Corinthians por dia, levaria quase 3.000 dias para quitá-la!",
        "O Palmeiras arrecadou mais de R$700 milhões com venda de jogadores em um único ano.",
        "A dívida total do futebol brasileiro ultrapassa R$10 bilhões.",
        "O Flamengo já fatura mais de R$2 bilhões por ano, mais que muitas empresas médias do Brasil.",
        "Mesmo campeão, muitos clubes gastam mais de 80% da receita só com salários.",
        "Há clubes na Série A que gastam mais com juros de dívida do que com contratações.",
        "Uma venda de jogador pode pagar a folha salarial de um clube médio por um ano inteiro.",
        "Alguns clubes brasileiros comprometem receitas de TV por anos para antecipar dinheiro no presente.",
        "A diferença de faturamento entre o clube que mais arrecada e o que menos arrecada na Série A passa de R$1 bilhão.",
        "Há clubes que já venderam mais em atletas da base do que arrecadam com bilheteria em várias temporadas somadas.",
        "Um contrato de patrocínio master pode representar mais de 20% da receita anual de um clube médio.",
        "Em muitos clubes, a folha salarial de um mês ultrapassa o orçamento anual de equipes da série B.",
        "Premiações de competições continentais podem dobrar o lucro de um clube em uma única temporada.",
        "Alguns estádios modernos custaram mais de R$1 bilhão para serem construídos.",
        "Uma única negociação internacional pode equilibrar o caixa de um clube por vários anos.",
        "Clubes rebaixados podem perder mais de 40% da receita no ano seguinte.",
        "A venda de naming rights de um estádio pode render centenas de milhões ao longo do contrato.",
        "Alguns clubes levam mais de uma década para quitar dívidas acumuladas em apenas três ou quatro temporadas.",
        "Bônus por metas esportivas podem aumentar em milhões o custo real de uma contratação.",
    ];

    const botoesTopicos = [
    {
        id: 'revenue',
        key: 'faturamento',
        titulo: 'Faturamento dos Clubes',
        descricao: `Analise a receita de todos os clubes.
    Veja a evolução do faturamento ao longo dos anos e compare com
    outros clubes.`,
        icone: (
        <>
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
            <polyline points="16 7 22 7 22 13"></polyline>
        </>
        ),
        subTopico: ['R$ 12.5B', 'Receita total da Série A em 2025'],
    },
    {
        id: 'debt',
        key: 'dividas',
        titulo: 'Dívidas e Saúde Financeira',
        descricao: `Entenda a real situação financeira de cada clube. Descubra o nível
    de endividamento, capacidade de pagamento e riscos financeiros.`,
        icone: (
        <>
            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
            <path d="M12 8v4"></path>
            <path d="M12 16h.01"></path>
        </>
        ),
        subTopico: ['55%', 'dos clubes têm dívidas superiores à receita'],
    },
    {
        id: 'cost',
        key: 'custo',
        titulo: 'Quanto Custa Vencer',
        descricao: `Descubra o custo real de cada vitória e ponto. Compare o
    investimento necessário e a eficiência financeira de cada clube.`,
        icone: (
        <>
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
            <path d="M4 22h16"></path>
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
        </>
        ),
        subTopico: ['R$ 13.3M', 'Custo médio por vitória na Série A'],
    },
    {
        id: 'compare',
        key: 'comparacao',
        titulo: 'Compare Clubes Lado a Lado',
        descricao: `Coloque dois ou mais clubes frente a frente. Visualize diferenças
    em receita, dívida, investimento e desempenho financeiro.`,
        icone: (
        <>
            <path d="M8 3 4 7l4 4"></path>
            <path d="M4 7h16"></path>
            <path d="m16 21 4-4-4-4"></path>
            <path d="M20 17H4"></path>
        </>
        ),
        subTopico: ['20+', 'clubes da Série A disponíveis'],
    }
    ];

    const itensFaturamento = [
        {
            nome: 'Flamengo',
            faturamento: '2.089 BI'
        },
        {
            nome: 'Palmeiras',
            faturamento: '1.742 BI'
        },
        {
            nome: 'Botafogo',
            faturamento: '1.070 BI'
        },
        {
            nome: 'Corinthians',
            faturamento: '860 MI'
        },
        {
            nome: 'São Paulo',
            faturamento: '860 MI'
        },
    ];

    const itensDivida = [
        {
            nome: 'Corinthians',
            faturamento: '2.800 BI'
        },
        {
            nome: 'Botafogo',
            faturamento: '1.589 BI'
        },
        {
            nome: 'Atlético Mineiro',
            faturamento: '1.471 BI'
        },
        {
            nome: 'Cruzeiro',
            faturamento: '1.244 BI'
        },
        {
            nome: 'Santos',
            faturamento: '1.181 BI'
        },
    ];

    const itensCusto = [
        {
            nome: 'Palmeiras',
            faturamento: '28.5M'
        },
        {
            nome: 'Botafogo',
            faturamento: '27.3M'
        },
        {
            nome: 'Flamengo',
            faturamento: '22.9M'
        },
        {
            nome: 'Santos',
            faturamento: '21.1M'
        },
        {
            nome: 'Atlético Mineiro',
            faturamento: '19.1M'
        },
    ];

    useEffect(() => {
        setTopicoAtivo('Explorar Dados');
        window.scrollTo({
            top: 0
        })
        setAbaEntretenimento(false);

        const intervalo = setInterval(() => {
            setValorCuriosidade((prev) => (prev > 6 ? 0 : prev + 1));
        }, 5000);

        return () => clearInterval(intervalo);
    }, []);

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

    useEffect(() => {

        const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                setMostrarTopicos(true);
            }
        },
        {
            root: null,
            threshold: 0,
        }
        );

        if (sectionRef.current) {
        observer.observe(sectionRef.current);
        }

        const observer2 = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                setMostrarTopicos2(true);
            }
        },
        {
            root: null,
            threshold: 0,
        }
        );

        if (sectionRef2.current) {
        observer2.observe(sectionRef2.current);
        }

        return () => {
        observer.disconnect();
        observer2.disconnect();
        };   
    }, []);

    return (
        <div id="body" style={{ background: dark ? "linear-gradient(to bottom right, #0d1015, #080c14)" : "linear-gradient(to bottom right, #f7fbff, #fdfeff)"}}>

            <header className={`relative flex flex-col min-h-[120vh] border-b ${dark ? 'border-b-slate-600/20' : 'border-b-slate-400/20'}`}>

                <HeaderFixo />


                <div className='flex flex-col items-center px-12 mb-10 mt-20 text-center gap-2'>

                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm ${dark ? 'bg-white/4 border border-white/6' : 'bg-black/4 border border-black/6'}`} x-file-name="HeroSection" x-line-number="73" x-component="div" x-id="HeroSection_73" x-dynamic="false">
                        <div className={`w-2 h-2 rounded-full animate-pulse ${dark ? 'bg-emerald-400' : 'bg-emerald-600'}`} x-file-name="HeroSection" x-line-number="74" x-component="div" x-id="HeroSection_74" x-dynamic="false">
                        </div>
                        <span className={`text-xs font-medium tracking-wide uppercase ${dark ? 'text-white/50' : 'text-black/60'}`} x-file-name="HeroSection" x-line-number="75" x-component="span" x-id="HeroSection_75" x-dynamic="false">
                            Dados atualizados para 2025
                        </span>
                    </div>

                    <h1 className={`text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6 ${dark ? 'text-white' : 'text-[#222222]'}`} x-file-name="HeroSection" x-line-number="81" x-component="h1" x-id="HeroSection_81" x-dynamic="true" x-source-type="unknown" x-source-editable="false">
                        Entenda as finanças do <br />
                        <span className="relative" x-file-name="HeroSection" x-line-number="83" x-component="span" x-id="HeroSection_83" x-dynamic="false">
                            <span className={`text-transparent bg-clip-text ${dark ? 'bg-linear-to-r from-amber-300 to-amber-500' : 'bg-linear-to-r from-amber-400 to-amber-500'}`} x-file-name="HeroSection" x-line-number="84" x-component="span" x-id="HeroSection_84" x-dynamic="false">
                                futebol brasileiro
                            </span>

                            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none" x-file-name="HeroSection" x-line-number="85" x-component="svg" x-id="HeroSection_85" x-dynamic="false">
                                <path d="M2 8 C50 2, 100 2, 150 6 S250 10, 298 4" stroke="url(#gold-line)" stroke-width="3" stroke-linecap="round" x-file-name="HeroSection" x-line-number="86" x-component="path" x-id="HeroSection_86" x-dynamic="false">
                                </path>
                                <defs x-file-name="HeroSection" x-line-number="87" x-component="defs" x-id="HeroSection_87" x-dynamic="false">
                                    <linearGradient id="gold-line" x1="0" y1="0" x2="300" y2="0" x-file-name="HeroSection" x-line-number="88" x-component="linearGradient" x-id="HeroSection_88" x-dynamic="false">
                                        <stop offset="0%" stop-color="#D4A74A" stop-opacity="0.2" x-file-name="HeroSection" x-line-number="89" x-component="stop" x-id="HeroSection_89" x-dynamic="false">
                                        </stop>
                                        <stop offset="50%" stop-color="#D4A74A" stop-opacity="0.6" x-file-name="HeroSection" x-line-number="90" x-component="stop" x-id="HeroSection_90" x-dynamic="false"></stop><stop offset="100%" stop-color="#D4A74A" stop-opacity="0.2" x-file-name="HeroSection" x-line-number="91" x-component="stop" x-id="HeroSection_91" x-dynamic="false">
                                        </stop>
                                    </linearGradient>
                                </defs>
                            </svg>
                        </span>
                    </h1>

                    <p className={`text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed ${dark ? 'text-white/40' : 'text-black/60'}`} x-file-name="HeroSection" x-line-number="97" x-component="p" x-id="HeroSection_97" x-dynamic="false">
                        Faturamento, dívidas, custo por vitória e comparações detalhadas. Tudo o que você precisa para entender a saúde financeira dos clubes.
                    </p>
                </div>

                <div
                    className="relative w-[90%] translate-x-[5%] lg:max-w-1/2 lg:translate-x-1/2 mb-10 z-10"
                    x-file-name="HeroSection"
                    x-line-number="104"
                    x-component="div"
                    x-id="HeroSection_104"
                    x-dynamic="false"
                >
                    <div
                        className="relative flex items-center"
                        x-file-name="HeroSection"
                        x-line-number="105"
                        x-component="div"
                        x-id="HeroSection_105"
                        x-dynamic="false"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`lucide lucide-search absolute left-5 w-5 h-5 ${dark ? 'text-white/30' : 'text-black/50'}`}
                            aria-hidden="true"
                        >
                            <path d="m21 21-4.34-4.34"></path>
                            <circle cx="11" cy="11" r="8"></circle>
                        </svg>

                        <input
                            placeholder="Pesquise um clube... ex: Flamengo, Palmeiras"
                            className={`w-full pl-14 pr-5 py-4 sm:py-5 border rounded-2xl  focus:outline-none transition-all duration-300 text-base sm:text-lg backdrop-blur-sm ${dark ? 'bg-white/4 border-white/8 text-white placeholder:text-white/25 focus:border-amber-400/30 focus:bg-white/6' : 'bg-black/4 border-black/8 text-black placeholder:text-black/35 focus:border-amber-500/70 focus:bg-black/6'}`}
                            x-file-name="HeroSection"
                            x-line-number="107"
                            x-component="input"
                            x-id="HeroSection_107"
                            x-dynamic="false"
                            type="search"
                            value={busca}
                            onChange={(e) => {
                                setBusca(e.currentTarget.value);
                                buscaClube(e.currentTarget.value);
                            }}
                        />

                        <span
                            data-ve-dynamic="true"
                            x-excluded="true"
                            style={{ display: "contents" }}
                        ></span>

                        <i onClick={() => {
                            setBusca('');
                            buscaClube('');
                        }}
                            className={`fa-regular fa-circle-xmark absolute top-1/2 -translate-y-[50%] right-0 -translate-x-[36%] cursor-pointer text-2xl ${!busca && 'opacity-0'} ${dark ? 'text-zinc-300' : 'text-sky-950'}`}>

                        </i>
                    </div>

                    {clubes &&
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
                </div>

                {!clubes &&
                    <>
                        <span
                            data-ve-dynamic="true"
                            x-excluded="true"
                            style={{ display: "contents" }}
                        >
                            <div
                                className="max-w-3xl mx-auto"
                                x-file-name="HeroSection"
                                x-line-number="223"
                                x-component="div"
                                x-id="HeroSection_223"
                                x-dynamic="false"
                            >
                                <div
                                    className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6"
                                    x-file-name="HeroSection"
                                    x-line-number="224"
                                    x-component="div"
                                    x-id="HeroSection_224"
                                    x-dynamic="false"
                                >
                                    <span
                                        data-ve-dynamic="true"
                                        x-excluded="true"
                                        style={{ display: "contents" }}
                                    >
                                        {/* Item 1 */}
                                        <div
                                            className="text-center group"
                                            x-file-name="HeroSection"
                                            x-line-number="226"
                                            x-component="div"
                                            x-id="HeroSection_226"
                                            x-dynamic="true"
                                        >
                                            <p className={`text-2xl sm:text-3xl font-bold mb-1 transition-colors duration-300 translate-x-[4.2%] ${dark ? 'text-white group-hover:text-amber-400' : 'text-black group-hover:text-amber-500'}`}>
                                                <span
                                                    data-ve-dynamic="true"
                                                    x-excluded="true"
                                                    style={{ display: "contents" }}
                                                >
                                                    20+
                                                </span>
                                            </p>

                                            <p className={`text-xs sm:text-sm ${dark ? 'text-white/30' : 'text-black/40'}`}>
                                                <span
                                                    data-ve-dynamic="true"
                                                    x-excluded="true"
                                                    style={{ display: "contents" }}
                                                >
                                                    Clubes analisados
                                                </span>
                                            </p>
                                        </div>

                                        {/* Item 2 */}
                                        <div className="text-center group">
                                            <p className={`text-2xl sm:text-3xl font-bold mb-1 transition-colors duration-300 ${dark ? 'text-white group-hover:text-amber-400' : 'text-black group-hover:text-amber-500'}`}>
                                                <span
                                                    data-ve-dynamic="true"
                                                    x-excluded="true"
                                                    style={{ display: "contents" }}
                                                >
                                                    2025
                                                </span>
                                            </p>

                                            <p className={`text-xs sm:text-sm ${dark ? 'text-white/30' : 'text-black/40'}`}>
                                                <span
                                                    data-ve-dynamic="true"
                                                    x-excluded="true"
                                                    style={{ display: "contents" }}
                                                >
                                                    Dados financeiros
                                                </span>
                                            </p>
                                        </div>

                                        {/* Item 3 */}
                                        <div className="text-center group">
                                            <p className={`text-2xl sm:text-3xl font-bold mb-1 transition-colors duration-300 ${dark ? 'text-white group-hover:text-amber-400' : 'text-black group-hover:text-amber-500'}`}>
                                                <span
                                                    data-ve-dynamic="true"
                                                    x-excluded="true"
                                                    style={{ display: "contents" }}
                                                >
                                                    15+
                                                </span>
                                            </p>

                                            <p className={`text-xs sm:text-sm ${dark ? 'text-white/30' : 'text-black/40'}`}>
                                                <span
                                                    data-ve-dynamic="true"
                                                    x-excluded="true"
                                                    style={{ display: "contents" }}
                                                >
                                                    Indicadores
                                                </span>
                                            </p>
                                        </div>

                                        {/* Item 4 */}
                                        <div className="text-center group">
                                            <p className={`text-2xl sm:text-3xl font-bold mb-1 transition-colors duration-300 ${dark ? 'text-white group-hover:text-amber-400' : 'text-black group-hover:text-amber-500'}`}>
                                                <span
                                                    data-ve-dynamic="true"
                                                    x-excluded="true"
                                                    style={{ display: "contents" }}
                                                >
                                                    Mensais
                                                </span>
                                            </p>

                                            <p className={`text-xs sm:text-sm ${dark ? 'text-white/30' : 'text-black/40'}`}>
                                                <span
                                                    data-ve-dynamic="true"
                                                    x-excluded="true"
                                                    style={{ display: "contents" }}
                                                >
                                                    Atualizações
                                                </span>
                                            </p>
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </span>

                        <p key={valorCuriosidade} className={`animacao-entrada font-mono text-center mt-12 translate-y-[25%] px-8 lg:translate-y-[150%] lg:px-0 ${dark && 'text-slate-200'}`}>{curiosidadesFinanceiras[valorCuriosidade]}</p>

                        <i className="fa-solid fa-chevron-down absolute bottom-12 left-1/2 -translate-x-1/2 z-1 text-amber-500 text-lg"></i>
                    </>

                }


            </header>
            
            <section style={{ background: dark ? "linear-gradient(to bottom right, #0d1015, #080c14)" : "linear-gradient(to bottom right, #f7fbff, #fdfeff)" }} className={`flex opacity-0 flex-col mt-14 ${mostrarTopicos && 'animacao-entrada-2 opacity-100'}`}>
                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="max-w-2xl mb-16">
                        <p className={`text-sm font-medium uppercase tracking-widest mb-4 ${dark ? 'text-amber-400/70' : 'text-amber-500/90'}`}>
                            Funcionalidades
                        </p>

                        <h2 ref={sectionRef} className={`text-3xl sm:text-4xl lg:text-5xl font- leading-tight mb-6 ${dark ? 'text-white' : 'text-[#222222]'}`}>
                            Tudo sobre as finanças do seu clube
                        </h2>

                        <p className={`text-lg leading-relaxed ${dark ? 'text-white/35' : 'text-black/45'}`}>
                            Dados completos, análises profundas e comparações detalhadas para você
                            entender de verdade a situação financeira do futebol brasileiro.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-5 gap-8">

                        {/* <!-- COLUNA ESQUERDA --> */}
                        <div className="lg:col-span-3 space-y-3">
                        {botoesTopicos.map((botao) => (
                            <button
                            key={botao.id}
                            id={botao.id}
                            onClick={() => setTopicoEscolhido(botao.key)}
                            className={`cursor-pointer w-full text-left group rounded-2xl p-6 sm:p-8 transition-all duration-500 border shadow-lg ${
                                dark
                                ? topicoEscolhido === botao.key
                                    ? 'border-amber-400/20 shadow-amber-400/3'
                                    : 'border-white/5 bg-white/5'
                                : topicoEscolhido === botao.key
                                ? 'border-amber-400/50 shadow-amber-400/8 bg-amber-50/75'
                                : 'border-black/10 bg-white'
                            }`}
                            >
                            <div className="flex items-start gap-5">
                                <div
                                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 border ${
                                    dark
                                    ? topicoEscolhido === botao.key
                                        ? 'border-amber-400/25 bg-amber-400/15'
                                        : 'bg-white/4 border-white/6'
                                    : topicoEscolhido === botao.key
                                    ? 'border-amber-400/55 bg-amber-400/40'
                                    : 'bg-neutral-50/75 border-black/18'
                                }`}
                                >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className={`lucide lucide-trending-up w-5 h-5 transition-colors duration-300 ${
                                    dark
                                        ? topicoEscolhido === botao.key
                                        ? 'text-amber-400'
                                        : 'text-white-40 group-hover:text-white/60'
                                        : topicoEscolhido === botao.key
                                        ? 'text-amber-600'
                                        : 'text-neutral-500/80 group-hover:text-neutral-600'
                                    }`}
                                >
                                    {botao.icone}
                                </svg>
                                </div>

                                <div className="flex-1 min-w-0">
                                <h3 className={`text-lg font-semibold ${dark ? 'text-white' : 'text-[#222222]'}`}>
                                    {botao.titulo}
                                </h3>

                                <p className={`text-sm leading-relaxed ${dark ? 'text-white/50' : 'text-black/50'}`}>
                                    {botao.descricao}
                                </p>

                                {topicoEscolhido === botao.key && (
                                    <div className={`mt-5 pt-5 border-t ${dark ? 'border-white/6' : 'border-black/12'}`}>
                                    <div className="flex items-baseline gap-3">
                                        <span className={`text-lg sm:text-2xl lg:text-3xl font-bold ${dark ? 'text-amber-400' : 'text-amber-500'}`}>
                                        {botao.subTopico[0]}
                                        </span>
                                        <span className={`text-xs sm:text-sm ${dark ? 'text-white/30' : 'text-black/40'}`}>
                                        {botao.subTopico[1]}
                                        </span>
                                    </div>
                                    </div>
                                )}
                                </div>
                            </div>
                            </button>
                        ))}
                        </div>

                        {/* <!-- COLUNA DIREITA --> */}
                        <div className="lg:col-span-2">
                            <div className={`sticky top-28 backdrop-blur-sm border rounded-2xl p-6 sm:p-8 ${dark ? 'bg-white/2 border-white/6' : 'bg-white border-black/12'}`}>

                                <h4 className={`text-sm font-medium uppercase tracking-wide mb-5 ${dark ? 'text-white/40' : 'text-black/55'}`}>
                                    {topicoEscolhido === 'faturamento' ? 'Top 5 Receitas (R$ milhões)'
                                    :
                                    topicoEscolhido === 'dividas' ?
                                    'Maiores Dívidas (R$ milhões)'
                                    :
                                    topicoEscolhido === 'custo' ?
                                    'Preço por Vitória (R$ milhões)'
                                    :
                                    'Exemplo: FLA VS PAL'
                                    }
                                </h4>

                                {/* <!-- ITEM --> */}
                                <div className="group mb-4 flex-col space-y-6">
                                    {topicoEscolhido === 'faturamento' ?
                                    itensFaturamento.map((item) =>
                                        <main key={item.nome}>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className={`text-sm font-mono ${dark ? 'text-white/60' : 'text-slate-900/80'}`}>{item.nome}</span>
                                                <span className={`text-sm font-semibold ${dark ? 'text-white' : 'text-[#222222]'}`}>R$ {item.faturamento}</span>
                                            </div>
                                            <div className="h-2 bg-white/4 rounded-full overflow-hidden">
                                                <div className="h-full rounded-full bg-linear-to-r from-amber-400/90 to-amber-300 w-full"></div>
                                            </div>
                                        </main>
                                    )
                                    :
                                    topicoEscolhido === 'dividas' ?
                                    itensDivida.map((item) =>
                                        <main key={item.nome}>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className={`text-sm font-mono ${dark ? 'text-white/60' : 'text-slate-900/80'}`}>{item.nome}</span>
                                                <span className={`text-sm font-semibold ${dark ? 'text-white' : 'text-[#222222]'}`}>R$ {item.faturamento}</span>
                                            </div>
                                            <div className="h-2 bg-white/4 rounded-full overflow-hidden">
                                                <div className="h-full rounded-full bg-linear-to-r from-red-400 to-red-400/90 w-full"></div>
                                            </div>
                                        </main>
                                    )
                                    :
                                    topicoEscolhido === 'custo' ?
                                    itensCusto.map((item, index) =>
                                        <main key={item.nome}>
                                            <div className={`flex items-center justify-between mb-2 pb-2 ${index !== 4 ? dark ? 'border-b-slate-200/20 border-b' : 'border-b-slate-800/20 border-b' : ''}`}>
                                                <span className={`text-sm font-mono ${dark ? 'text-white/60' : 'text-slate-900/80'}`}> 
                                                    <span className={`mr-2 ${dark ? 'text-neutral-200' : 'text-neutral-800'}`}>
                                                        0{index + 1}
                                                    </span> 
                                                    {item.nome}
                                                </span>

                                                <span className={`text-sm font-semibold ${dark ? 'text-emerald-400' : 'text-emerald-600'}`}>R$ {item.faturamento}</span>
                                            </div>
                                        </main>
                                    )
                                    :
                                    <div>
                                        <div className="grid grid-cols-3 gap-3">
                                            
                                            <div className="text-right">
                                            <p className={`text-lg font-bold ${dark ? 'text-white' : 'text-[#222222]'}`}>FLA</p>
                                            <p className={`text-xs mt-1 ${dark ? 'text-white/30' : 'text-black/50'}`}>Rio de Janeiro</p>
                                            </div>

                                            <div className="text-center">
                                            <p className={`text-xs uppercase tracking-wider ${dark ? 'text-white/20' : 'text-black/50'}`}>VS</p>
                                            </div>

                                            <div className="text-left">
                                            <p className={`text-lg font-bold ${dark ? 'text-white' : 'text-[#222222]'}`}>PAL</p>
                                            <p className={`text-xs mt-1 ${dark ? 'text-white/30' : 'text-black/50'}`}>São Paulo</p>
                                            </div>

                                        </div>

                                        <div className="mt-5 space-y-3">
                                            
                                            <div className="grid grid-cols-3 gap-3 py-2 border-b border-white/4 last:border-0">
                                            <p className="text-sm text-right font-medium text-amber-400">R$ 2.089 BI</p>
                                            <p className={`text-sm text-center self-center ${dark ? 'text-white/20' : 'text-black/36'}`}>Receita</p>
                                            <p className={`text-sm text-left font-medium ${dark ? 'text-white/50' : 'text-black/60'}`}>R$ 1.742 bi</p>
                                            </div>

                                            <div className="grid grid-cols-3 gap-3 py-2 border-b border-white/4 last:border-0">
                                            <p className={`text-sm text-right font-medium ${dark ? 'text-white/50' : 'text-black/60'}`}>R$ 456 MI</p>
                                            <p className={`text-sm text-center self-center ${dark ? 'text-white/20' : 'text-black/36'}`}>Contratações</p>
                                            <p className="text-sm text-left font-medium text-amber-400">R$ 700 MI</p>
                                            </div>

                                            <div className="grid grid-cols-3 gap-3 py-2 border-b border-white/4 last:border-0">
                                            <p className="text-sm text-right font-medium text-amber-400">R$ 96 MI</p>
                                            <p className={`text-sm text-center self-center ${dark ? 'text-white/20' : 'text-black/36'}`}>Dívida</p>
                                            <p className={`text-sm text-left font-medium ${dark ? 'text-white/50' : 'text-black/60'}`}>R$ 825 MI</p>
                                            </div>

                                            <div className="grid grid-cols-3 gap-3 py-2 border-b border-white/4 last:border-0">
                                            <p className={`text-sm text-right font-medium ${dark ? 'text-white/50' : 'text-black/60'}`}>R$ 196 MI</p>
                                            <p className={`text-sm text-center self-center ${dark ? 'text-white/20' : 'text-black/36'}`}>Superávit</p>
                                            <p className="text-sm text-left font-medium text-amber-400">R$ 257 MI</p>
                                            </div>

                                        </div>
                                    </div>
                                    }
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

            </section>

            <section style={{ background: dark ? "linear-gradient(to bottom right, #0d1015, #080c14)" : "linear-gradient(to bottom right, #f7fbff, #fdfeff)" }} className="relative py-24 sm:py-32 overflow-hidden">
                <div className={`absolute inset-0 ${dark ? 'bg-[#080C14]' : 'bg-[#fdfeff]'}`}></div>


                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-100 bg-amber-400/3 rounded-full blur-[100px]"></div>

                <div className={`relative z-10 opacity-0 max-w-4xl mx-auto px-6 lg:px-8 text-center ${mostrarTopicos2 && 'animacao-entrada-2 opacity-100'}`}>

                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl border mb-8 ${dark ? 'border-amber-400/15 bg-amber-400/10' : 'border-amber-400/35 bg-amber-400/20'}`}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="lucide lucide-chart-column w-7 h-7 text-amber-400"
                            aria-hidden="true"
                        >
                            <path d="M3 3v16a2 2 0 0 0 2 2h16"></path>
                            <path d="M18 17V9"></path>
                            <path d="M13 17V5"></path>
                            <path d="M8 17v-3"></path>
                        </svg>
                    </div>

                    <h2 ref={sectionRef2} className={`text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6 ${dark ? 'text-white' : 'text-[#222222]/92'}`}>
                        Pronto para entender as
                        <span className="text-transparent ml-2.75 bg-clip-text bg-linear-to-r from-amber-300 to-amber-500">
                            finanças do seu clube?
                        </span>
                    </h2>

                    <p className={`text-lg max-w-2xl mx-auto mb-10 leading-relaxed ${dark ? 'text-white/35' : 'text-black/50'}`}>
                        Acesse dados financeiros detalhados de todos os clubes da Série A.
                        Compare, analise e descubra a real situação financeira do futebol brasileiro.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

                        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow h-9 bg-amber-400/90 hover:bg-amber-400 text-[#080C14] font-semibold text-base px-8 py-6 rounded-xl group cursor-pointer">
                            Explorar dados agora
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                className="lucide lucide-arrow-right w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                                aria-hidden="true"
                            >
                                <path d="M5 12h14"></path>
                                <path d="m12 5 7 7-7 7"></path>
                            </svg>
                        </button>

                        <button className={`inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border shadow-sm h-9 bg-transparent text-base px-8 py-6 rounded-xl cursor-pointer ${dark ? 'border-white/10 text-white/60 hover:text-white hover:bg-white/4' : 'border-slate-800/20 text-black/60 hover:text-[#222222] hover:bg-slate-50'}`}>
                            Ver metodologia
                        </button>

                    </div>

                    <div className="mt-16 flex flex-wrap items-center justify-center gap-8 sm:gap-12">

                        <div className="text-center">
                            <p className={`text-sm font-medium ${dark ? 'text-white/40' : 'text-black/50'}`}>Dados públicos</p>
                            <p className={`text-xs mt-0.5 ${dark ? 'text-white/20' : 'text-black/40'}`}>Fontes oficiais</p>
                        </div>

                        <div className="text-center">
                            <p className={`text-sm font-medium ${dark ? 'text-white/40' : 'text-black/50'}`}>Atualização por temporada</p>
                            <p className={`text-xs mt-0.5 ${dark ? 'text-white/20' : 'text-black/40'}`}>Sempre atual</p>
                        </div>

                        <div className="text-center">
                            <p className={`text-sm font-medium ${dark ? 'text-white/40' : 'text-black/50'}`}>Gratuito</p>
                            <p className={`text-xs mt-0.5 ${dark ? 'text-white/20' : 'text-black/40'}`}>Sem custo</p>
                        </div>

                    </div>

                </div>
            </section>

            <FooterFixo />

        </div>
    )
}
