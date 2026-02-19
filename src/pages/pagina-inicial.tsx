import "../styles/pagina-inicial.css";
import { useState, useEffect } from "react"
import { allContext } from "../context/all-context";
import { ClipLoader } from "react-spinners";
import { supabase } from "../auth/supabase-client";
import { relacaoClubes, type Clube } from "../components/busca-clube";
import { useNavigate } from "react-router-dom";
import HeaderFixo from "../components/header-fixo";
import MenuAberto from "../components/menu-aberto";


export default function PaginaInicial() {
    const navigate = useNavigate();
    const [valorCuriosidade, setValorCuriosidade] = useState<number>(0);
    const [busca, setBusca] = useState<string>('');
    const [clubes, setClubes] = useState<Clube[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { menuAberto, setTopicoAtivo, dark, setAbaEntretenimento } = allContext();
    const [ativado, setAtivado] = useState<boolean>(false);

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

    const topicosFinanceiros = [
    {
        imagem: "/faturamento-topico.png",
        titulo: "Faturamento dos clubes",
        icone: "fa-solid fa-sack-dollar",
        descricao:
        "Descubra quanto cada clube arrecada por temporada e quem realmente domina financeiramente o futebol brasileiro.",
        itens: [
        "Rankings por faturamento",
        "Evolução por temporada",
        "Comparação entre clubes",
        ],
    },
    {
        imagem: "/divida-topico.png",
        titulo: "Dívidas e saúde financeira",
        icone: "fa-solid fa-triangle-exclamation",
        descricao:
        "Veja o nível de endividamento dos clubes e entenda quem está equilibrado e quem vive no limite.",
        itens: [
        "Dívida total",
        "Relação dívida x faturamento",
        "Chance de quitar a dívida",
        ],
    },
    {
        imagem: "/custo-topico.png",
        titulo: "Quanto custa vencer?",
        icone: "fa-solid fa-hand-holding-dollar",
        descricao:
        "Descubra quanto cada clube gasta para marcar gols, conquistar pontos e vencer partidas.",
        itens: [
        "Custo por gol",
        "Custo por vitória",
        "Custo por ponto",
        ],
    },
    {
        imagem: "/comparacao-topico.png",
        titulo: "Compare clubes lado a lado",
        icone: "fa-solid fa-scale-balanced",
        descricao:
        "Coloque os clubes frente a frente e veja quem gasta melhor, fatura mais e entrega mais resultado.",
        itens: [
        "Percentual único de cada clube",
        "Gráficos comparativos",
        "Comparação entre clubes e coisas além do futebol",
        ],
    },
    ];

    useEffect(() => {
        setTopicoAtivo('Explorar Dados');
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
        const handleScroll = () => {
            if (ativado) return;
            const header = document.getElementById('header');
            const topicos = document.getElementById('topicos');

            if (!header || !topicos) return;

            const headerBottom = header?.getBoundingClientRect().bottom;

            if (headerBottom <= (window.innerHeight + window.innerHeight * 0.2) && headerBottom > 0) {
                topicos.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
                setAtivado(true);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [ativado]);

    return (
        <div style={{background: dark ? "linear-gradient(to bottom right, #0d1015, #080c14)" : "linear-gradient(to bottom right, #f7fbff, #fdfeff)"}}>
            {menuAberto ? 
            <div>
                <HeaderFixo/>
                <MenuAberto />
            </div>
            :
            <>
            <header id="header" className={`relative flex flex-col min-h-[120vh]`}>
                     
                <HeaderFixo />


                <div className='flex flex-col items-center px-12 mb-10 mt-20 text-center gap-2'>

                    <div className={`inline-flex items-center gap-2 px-4 mt-4 py-2 rounded-full backdrop-blur-sm ${dark ? 'bg-white/4 border border-white/6' : 'bg-black/4 border border-black/6'}`} x-file-name="HeroSection" x-line-number="73" x-component="div" x-id="HeroSection_73" x-dynamic="false">
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
                className="relative max-w-1/2 translate-x-1/2 mb-10 z-10"
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
                        className={`lucide lucide-search absolute left-5 w-5 h-5 ${dark ? 'text-white/30' : 'text-black/30'}`}
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
                            buscaClube('')
                            }} 
                            className={`fa-regular fa-circle-xmark absolute top-1/2 -translate-y-[50%] right-0 -translate-x-[36%] cursor-pointer text-2xl ${!busca && 'opacity-0'} ${dark ? 'text-zinc-300' : 'text-sky-950'}`}>
                            
                        </i>
                    </div>

                    {clubes &&
                    <section className={`p-2 min-h-20 mt-2 z-10 max-h-[50vh] overflow-y-auto pb-2 min-w-full border rounded-lg ${dark ? 'bg-slate-900 border-slate-700/20' : 'bg-[#f7fbff]'}`}>

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
                            <p className={`text-2xl sm:text-3xl font-bold mb-1 transition-colors duration-300 ${dark ? 'text-white group-hover:text-amber-400' : 'text-black group-hover:text-amber-500'}`}>
                                <span
                                data-ve-dynamic="true"
                                x-excluded="true"
                                style={{ display: "contents" }}
                                >
                                40+
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
                                10 anos
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
                                25+
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

                    <p key={valorCuriosidade} className={`animacao-entrada text-center mt-12 ${dark && 'text-slate-200'}`}>{curiosidadesFinanceiras[valorCuriosidade]}</p>

                    <i className="fa-solid fa-chevron-down absolute bottom-12 left-1/2 -translate-x-1/2 z-1 text-amber-500 text-lg"></i>
                </>

                }


            </header>

            <section id="topicos" className="flex flex-col scroll-mt-14">
            {topicosFinanceiros.map((topico, index) => (
                <article
                key={index}
                id={`article-${index}`}
                style={{background: index % 2 !== 0 ? dark ? "linear-gradient(to bottom right, #0b1f33, #0e243d)" : "linear-gradient(to bottom right, #f7fbff, #fdfeff)" : dark ? '#0b1f33' : 'white'}}
                className={`flex flex-col py-14 items-center px-[15%] md:px-[5%] lg:px-[10%] xl:px-[15%] justify-between min-h-70 md:max-h-98 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                <img
                    className="max-h-70 md:max-w-70 max-w-full"
                    src={topico.imagem}
                    alt={topico.titulo}
                />

                <div className="flex flex-col justify-center gap-3 md:max-w-1/2 md:min-w-1/2">
                    <h1
                    className={`text-3xl text-center md:text-start font-semibold ${
                        dark ? "text-white" : "text-[#222222]"
                    }`}
                    >
                    <i className={`${topico.icone} mr-2`}></i>
                    {topico.titulo}
                    </h1>

                    <p className={`${dark ? "text-neutral-400" : "text-neutral-700"}`}>
                    {topico.descricao}
                    </p>

                    <ul className="flex flex-col gap-1">
                    {topico.itens.map((item, i) => (
                        <li
                        key={i}
                        className={`before:content-['•'] text-lg before:text-lg before:mr-2 ${
                            dark
                            ? "text-slate-100 before:text-stone-300"
                            : "before:text-stone-600 text-slate-900"
                        }`}
                        >
                        {item}
                        </li>
                    ))}
                    </ul>
                </div>
                </article>
            ))}
            </section>
            </>
            }
        </div>
    )
}
