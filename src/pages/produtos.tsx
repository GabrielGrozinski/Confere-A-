import HeaderFixo from "../components/header-fixo"
import { useNavigate } from "react-router-dom";
import { allContext } from "../context/all-context";
import { useEffect } from "react";
import FooterFixo from "../components/footer-fixo";
import CardTodosClubes from "../components/card-todos-clubes";


export default function Produtos() {
    const navigate = useNavigate();
    const {dark, setTopicoAtivo, setAbaEntretenimento, mostrarClubes, setMostrarClubes} = allContext();

    const cards = [
    {
        id: 1,
        navigate: '/clube-vs-clube',
        tag: "Clube vs Clube",
        title: "Comparação Direta",
        description: (
        <>
            Compare dois clubes lado a lado. <br />
            Receita, dívidas e indicadores financeiros organizados para você ver quem está na frente.
        </>
        ),
        icon: (
        <>
            <circle cx="5" cy="6" r="3" />
            <path d="M12 6h5a2 2 0 0 1 2 2v7" />
            <path d="m15 9-3-3 3-3" />
            <circle cx="19" cy="18" r="3" />
            <path d="M12 18H7a2 2 0 0 1-2-2V9" />
            <path d="m9 15 3 3-3 3" />
        </>
        ),
        iconClass: "lucide-git-compare-arrows",
    },
    {
        id: 2,
        navigate: '/clube-vs-mundo',
        tag: "Clube vs Mundo",
        title: "Além do Futebol (individual)",
        description:
        "Descubra quantas Ferraris cabem no orçamento de um clube, quantas mansões equivalem à dívida e outras perspectivas surpreendentes.",
        icon: (
        <>
            <path d="M6 3h12l4 6-10 13L2 9Z" />
            <path d="M11 3 8 9l4 13 4-13-3-6" />
            <path d="M2 9h20" />
        </>
        ),
        iconClass: "lucide-gem",
    },
    {
        id: 3,
        navigate: '',
        tag: "Raio-X Financeiro",
        title: "Análise Individual",
        description:
        "Mergulhe fundo nas finanças de cada clube. Receita, despesas, dívidas, patrimônio e tendências ao longo dos anos.",
        icon: (
        <>
            <path d="M3 3v16a2 2 0 0 0 2 2h16" />
            <path d="M18 17V9" />
            <path d="M13 17V5" />
            <path d="M8 17v-3" />
        </>
        ),
        iconClass: "lucide-chart-column",
    },
    {
        id: 4,
        navigate: '/comparador-de-clubes',
        tag: "Comparação Geral",
        title: "Comparar Vários Clubes",
        description: (
        <>
            Selecione quantos clubes quiser e visualize os dados em gráficos de barras. <br />
            Compare receitas, dívidas ou qualquer indicador em uma visão ampla e estratégica.
        </>
        ),
        icon: (
        <>
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
            <polyline points="16 7 22 7 22 13" />
        </>
        ),
        iconClass: "lucide-git-compare-arrows",
    },
    {
        id: 5,
        navigate: '/comparador-de-coisas',
        tag: "Clubes vs Mundo",
        title: "Além do Futebol (Comparação Geral)",
        description: (
        <>
            Compare o futebol brasileiro com referências além do futebol. <br />
            Veja como cada clube se posiciona frente a carros, imóveis e outros indicadores do mundo real.
        </>
        ),
        icon: (
        <>
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
        </>
        ),
        iconClass: "lucide-gem",
    },
    ];

    const stats = [
    {
        id: 1,
        value: "20+",
        title: "Clubes Analisados",
        subtitle: "Série A",
    },
    {
        id: 2,
        value: "100+",
        title: "Pontos de Dados",
        subtitle: "Métricas financeiras",
    },
    {
        id: 3,
        value: "2025",
        title: "Dados Atualizados",
        subtitle: "Balanços recentes",
    },
    {
        id: 4,
        value: "Plano",
        title: "Gratuito e Pago",
        subtitle: "Preços justos",
    },
    ];


    useEffect(() => {
        setTopicoAtivo('Produto');
        window.scrollTo({
            top: 0
        })
        setAbaEntretenimento(false);

    }, []);


    return (
        <div style={{ background: dark ? "linear-gradient(to bottom right, #0d1015, #080c14)" : "linear-gradient(to bottom right, #f7fbff, #fdfeff)"}} className="min-h-screen mt-15">
            <HeaderFixo />

            <div className="max-w-400 pt-4 mx-auto px-6 pb-18">
                <div className="opacity-100 transform-none">
                    <div className="text-center mb-16">
                    <h2 className={`text-[36px] md:text-[48px] font-bold mt-3 mb-5 tracking-[-0.015em] ${dark ? 'text-white' : 'text-zinc-900'}`}>
                        Cinco formas de explorar
                    </h2>
                    <p className={`text-lg max-w-2xl mx-auto leading-relaxed ${dark ? 'text-[rgb(218,218,218)]' : 'text-neutral-700'}`}>
                        Cada ferramenta oferece uma perspectiva única sobre as finanças do futebol.
                    </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 px-8">
                {cards.map((card) => (
                    <div
                    key={card.id}
                    onClick={() => card.id === 3 ? setMostrarClubes(true) : navigate(card.navigate)}
                    className="opacity-100 cursor-pointer transform-none"
                    >
                    <div className={`group border rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden h-full ${dark ? 'hover:border-[#DAFF01] active:border-[#DAFF01] border-white/10 bg-[rgb(26,28,30)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]' : 'hover:border-[#B8D600] active:border-[#B8D600] border-black/20 bg-white hover:shadow-[0_20px_40px_ffffff] hover:outline hover:outline-[#DAFF01]'}`}>
                        <div className={`absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${dark ? 'bg-[#DAFF01]' : 'bg-[#ddff20]'}`}></div>

                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${dark ? 'group-hover:bg-[#DAFF01]/20 bg-[#DAFF01]/10' : 'group-hover:bg-[#DAFF01]/60 bg-[#DAFF01]/40'}`}>
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
                            className={`lucide ${card.iconClass} w-6 h-6 ${dark ? 'text-[#DAFF01]' : 'text-[#9eb316]'}`}
                            aria-hidden="true"
                        >
                            {card.icon}
                        </svg>
                        </div>

                        <span className={`text-xs font-semibold uppercase tracking-wider ${dark ? 'text-[#DAFF01]' : 'text-[#95aa11]'}`}>
                        {card.tag}
                        </span>

                        <h3 className={`text-xl font-semibold mt-2 mb-3 ${dark ? 'text-white' : 'text-zinc-800'}`}>
                        {card.title}
                        </h3>

                        <p className={`text-sm leading-relaxed ${dark ? 'text-[rgb(161,161,170)]' : 'text-neutral-500'}`}>
                        {card.description}
                        </p>
                    </div>
                    </div>
                ))}
                </div>

            </div>
            
            {(mostrarClubes) &&
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div
                onClick={() => setMostrarClubes(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
                />

                <div className="min-h-80 min-w-[90%] sm:min-w-80">
                    <CardTodosClubes />
                </div>
            </div>
            }

            <FooterFixo />
        </div>
    )
}
