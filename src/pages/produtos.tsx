import HeaderFixo from "../components/header-fixo"
import { useNavigate } from "react-router-dom";
import { allContext } from "../context/all-context";
import { useEffect, useState } from "react";
import type { Clube } from "../components/busca-clube";
import { buscaTodosClubes, relacaoClubes } from "../components/busca-clube";
import { ClipLoader } from "react-spinners";
import FooterFixo from "../components/footer-fixo";


export default function Produtos() {
    const navigate = useNavigate();
    const {dark, setTopicoAtivo, setAbaEntretenimento} = allContext();
    const [loading, setLoading] = useState<boolean>(true);
    const [clubes, setClubes] = useState<Clube[]>();

    const cards = [
    {
        id: 1,
        tag: "Flamengo vs Palmeiras",
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
        title: "Gratuito",
        subtitle: "Preços justos",
    },
    ];


    useEffect(() => {
        setTopicoAtivo('Produto');
        window.scrollTo({
            top: 0
        })
        setAbaEntretenimento(false);
        buscaTodosClubes()
            .then((data) => setClubes(data.data))
            .catch((error) => console.error('Houve um erro', error))
            .finally(() => setLoading(false));

    }, []);


    function navegar(nomeClube: string) {
        const nomeRota = relacaoClubes(nomeClube);
        navigate(`/${nomeRota}`);
    }


    return (
        <div style={{ background: dark ? "linear-gradient(to bottom right, #0d1015, #080c14)" : "linear-gradient(to bottom right, #f7fbff, #fdfeff)"}} className="min-h-screen">
            <HeaderFixo />

            <div className="max-w-400 mt-16 pt-4 mx-auto px-6">
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
                    className="opacity-100 cursor-pointer transform-none"
                    >
                    <div className={`group border rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden h-full ${dark ? 'hover:border-[#DAFF01] border-white/10 bg-[rgb(26,28,30)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]' : 'hover:border-[#B8D600] border-black/20 bg-white hover:shadow-[0_20px_40px_ffffff] hover:outline hover:outline-[#DAFF01]'}`}>
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

                <section className="py-24 my-10 mt-36">
                    <div className="max-w-400 mx-auto px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((item) => (
                            <div
                            key={item.id}
                            className="opacity-100 transform-none"
                            >
                            <div className={`text-center py-8 px-4 border rounded-2xl transition-all duration-300 ${dark ? 'hover:border-[#DAFF01]/30 bg-[rgb(26,28,30)] border-white/10' : 'hover:border-amber-400 bg-stone-50 border-black/20'}`}>
                                <p className={`text-[36px] md:text-[48px] font-bold tracking-tight ${dark ? 'text-[#DAFF01]' : 'text-amber-300 text-shadow-[0px_1px_1px_#0000001a]'}`}>
                                {item.value}
                                </p>
                                <p className={`text-sm font-semibold mt-1 ${dark ? 'text-white' : 'text-zinc-800'}`}>
                                {item.title}
                                </p>
                                <p className={`text-xs mt-1 ${dark ? 'text-[rgb(161,161,170)]' : 'text-neutral-500'}`}>
                                {item.subtitle}
                                </p>
                            </div>
                            </div>
                        ))}
                        </div>
                    </div>
                </section>

                <section className="py-24">
                    <div className="max-w-400 mx-auto px-6">

                        <div className="opacity-100 transform-none">
                            <div className="text-center mb-16">
                                <span className={`text-lg font- uppercase tracking-wider ${dark ? 'text-[#DAFF01]' : 'text-amber-300'}`}>
                                    Depoimentos
                                </span>
                                <h2 className={`text-[32px] md:text-[40px] font-bold mt-3 tracking-[-0.015em] ${dark ? 'text-white' : 'text-zinc-800/95'}`}>
                                    O que dizem nossos usuários
                                </h2>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">

                            <div className="opacity-100 transform-none">
                                <div className={`border rounded-2xl p-7 h-full flex flex-col ${dark ? 'bg-[rgb(26,28,30)] border-white/10' : 'bg-zinc-50 border-slate-800/20'}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={`lucide lucide-quote w-8 h- mb-4 ${dark ? 'text-[#DAFF01]/30' : 'text-[#DAFF01]'}`} aria-hidden="true">
                                        <path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"></path>
                                        <path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"></path>
                                    </svg>

                                    <p className={`text-base leading-relaxed flex-1 ${dark ? 'text-[rgb(218,218,218)]' : 'text-zinc-800'}`}>
                                        "Descobri, de uma vez por todas, se meu clube era bem administrado."
                                    </p>

                                    <div className={`mt-6 pt-5 border-t ${dark ? 'border-white/5' : 'border-black/10'}`}>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-[rgb(38,40,42)] flex items-center justify-center text-sm font-bold text-[#DAFF01]">
                                                G
                                            </div>
                                            <div>
                                                <p className={`text-sm font-semibold ${dark ? 'text-white' : 'text-zinc-800'}`}>
                                                    Gabriel G.
                                                </p>
                                                <p className={`text-xs ${dark ? 'text-[rgb(161,161,170)]' : 'text-neutral-500'}`}>
                                                    Torcedor do São Paulo
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>


                        </div>
                    </div>
                </section>
            </div>

            <FooterFixo />
        </div>
    )
}
