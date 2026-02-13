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

            if (headerBottom <= window.innerHeight && headerBottom > 0) {
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
        <div style={{background: dark ? "linear-gradient(to bottom right, #0b1f33, #0e243d)" : "linear-gradient(to bottom right, #f7fbff, #fdfeff)"}}>
            {menuAberto ? 
            <div>
                <HeaderFixo/>
                <MenuAberto />
            </div>
            :
            <>
            <header id="header" className="relative flex flex-col min-h-screen">
                     
                <HeaderFixo />


                <div className='flex flex-col items-center px-12 mb-10 mt-20 text-center gap-2'>
                    <h1 className={`text-4xl font-mono ${dark && 'text-slate-200'}`}>O raio-X financeiro <br /> do futebol brasileiro</h1>
                    <p className={`text-center ${dark ? 'text-neutral-400' : 'text-neutral-500'}`}>Descubra quem ganha muito, quem gasta mal e quem tá devendo!</p>
                    <p key={valorCuriosidade} className={`animacao-entrada ${dark && 'text-slate-200'}`}>{curiosidadesFinanceiras[valorCuriosidade]}</p>
                </div>

                <div className="relative max-w-3/4 translate-x-1/5 sm:max-w-1/2 sm:translate-x-1/2 lg:max-w-1/3 lg:translate-x-full">
                    <input 
                    className={`
                    w-full py-2 pr-4 pl-9 border rounded-full ${dark ? 'placeholder:text-neutral-400 border-slate-200/20 text-slate-100' : 'placeholder:text-neutral-500 border-slate-800/20'}`} 
                    placeholder="Buscar clube" 
                    type="search"
                    value={busca}
                    onChange={(e) => {
                        setBusca(e.currentTarget.value);
                        buscaClube(e.currentTarget.value);
                    }}
                    name="buscar-topico" 
                    id="buscar-topico" />

                    <i className={`fa-solid fa-magnifying-glass absolute left-0 top-1/2 -translate-y-[40.4%] translate-x-1/2 ${dark ? 'text-neutral-300' : 'text-neutral-600'}`}></i>

                    <i onClick={() => {
                        setBusca('');
                        buscaClube('')
                        }} 
                        className={`fa-regular fa-circle-xmark absolute top-1/2 -translate-y-[45%] right-0 -translate-x-[66%] cursor-pointer text-lg ${!busca && 'opacity-0'} ${dark ? 'text-sky-100' : 'text-sky-950'}`}></i>

                </div>

                {loading ? 
                    <ClipLoader color={dark ? "#fff" : "#000"} size={34} className="self-center mt-4" />
                : 
                    (clubes && clubes.length > 0) ? (
                        <div 
                        className='max-w-3/4 translate-x-1/5 sm:max-w-1/2 sm:translate-x-1/2 lg:max-w-1/3 lg:translate-x-full min-h-20 mt-1 rounded-xl p-4 pb-0 flex flex-wrap justify-center gap-2'>
                            {clubes.map((clube, index) => (
                                <article onClick={() => navegar(clube.nome)} className="max-w-[40%] min-w-[40%] p-2 cursor-pointer mb-2 flex flex-col items-center" key={index}>
                                    <img className="max-h-20 max-w-20 sm:max-w-24 sm:max-h-24 lg:max-w-30 lg:max-h-30" src={clube.imagem} alt="" />
                                    <div className={`mt-1 text-lg ${dark ? 'text-stone-200' : 'text-stone-700'}`}>
                                        <h1 className="text-center">{clube.nome}<span className="mx-1">-</span>{clube.estado}</h1>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : !busca ? (
                        <>
                            <h2 className={`max-w-3/4 translate-x-1/5 sm:max-w-1/2 sm:translate-x-1/2 lg:max-w-1/3 lg:translate-x-full ml-2 font-medium flex items-center mb-8 mt-1 text-[14px] ${dark ? 'text-slate-300' : 'text-slate-700'}`}>
                            <i className="fa-solid fa-circle text-green-500 text-shadow-[1px_1px_1px_#0000001a] text-[8.5px] mr-2 translate-y-[15%]"></i>
                            Dados atualizados 
                            <i className="fa-solid fa-circle text-slate-600 text-[3px] mx-1.5 translate-y-[50%]"></i>
                            <span className="font-normal">Temporada 2026</span>
                            </h2>

                            <i className="fa-solid fa-chevron-down absolute bottom-16 left-1/2 -translate-x-1/2  text-slate-500 text-lg"></i>
                        </>
                    ) : (
                        <h1 className="text-center text-xl text-slate-900 mt-4">Nenhum clube encontrado</h1>
                    )
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
                        className={`before:content-['•'] before:mr-1 ${
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
