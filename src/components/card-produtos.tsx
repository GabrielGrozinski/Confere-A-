import { useEffect, useState } from "react";
import { allContext } from "../context/all-context";
import { useNavigate } from "react-router-dom";


export default function CardProduto() {
    const { setMostrarCard, dark } = allContext();
    const navigate = useNavigate();
    const [altura, setAltura] = useState(window.innerHeight);
    const cards = [
        {
            id: 1,
            navigate: '/clube-vs-clube',
            tag: "Clube vs Clube",
            title: "Comparação Direta",
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
            navigate: '/comparador-de-clubes',
            tag: "Comparação Geral",
            title: "Comparar Vários Clubes",
            icon: (
                <>
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                    <polyline points="16 7 22 7 22 13" />
                </>
            ),
            iconClass: "lucide-git-compare-arrows",
        },
        {
            id: 4,
            navigate: '/comparador-de-coisas',
            tag: "Clubes vs Mundo",
            title: "Além do Futebol (Comparação Geral)",
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

    useEffect(() => {
        const handleAltura = () => setAltura(window.innerHeight);

        window.addEventListener('resize', handleAltura);

        return () => window.removeEventListener('resize', handleAltura);
    }, []);

    return (
        <div className={`absolute z-999 top-1/2 left-1/2 -translate-1/2 ${altura < 750 ? '-translate-y-[45%] scale-80 sm:scale-100 sm:-translate-y-1/2' : 'scale-100'} p-8 min-w-4/5 max-w-4/5 px-2 h-auto rounded-2xl sm:min-w-120 sm:max-w-120 lg:min-w-160 lg:max-w-160 overflow-y-auto ${dark ? 'bg-[#222222]' : 'bg-white'}`}>
            <i onClick={() => setMostrarCard(false)} className={`fa-solid fa-xmark absolute top-0 right-0 translate-y-1/2 -translate-x-1/2 cursor-pointer ${dark ? 'text-slate-100' : 'text-slate-900'}`}></i>
            <h1 className={`text-center font-medium text-xl mb-1 ${dark ? 'text-zinc-100' : 'text-[#222222]'}`}>Confere Aê!</h1>
            <p className={`text-[15px] font-mono text-center tracking-tighter ${dark ? 'text-zinc-300' : 'text-zinc-600'}`}>Veja como seu clube se posiciona dentro e fora do futebol</p>

            <div className="grid md:grid-cols-2 gap-6 px-2 mt-6">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        onClick={() => navigate(card.navigate)}
                        className="opacity-100 cursor-pointer transform-none"
                    >
                        <div className={`group border rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden max-h-40 ${dark ? 'hover:border-[#DAFF01] active:border-[#DAFF01] border-white/10 bg-[rgb(26,28,30)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]' : 'hover:border-[#B8D600] active:border-[#B8D600] border-black/20 bg-white hover:shadow-[0_20px_40px_ffffff] hover:outline hover:outline-[#DAFF01]'}`}>
                            <div className={`absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${dark ? 'bg-[#DAFF01]' : 'bg-[#ddff20]'}`}></div>

                            <div className="flex flex-col items-center justify-center gap-2">
                                <div className={`w-14 h-14 justify-self-end rounded-2xl flex items-center justify-center transition-colors ${dark ? 'group-hover:bg-[#DAFF01]/20 bg-[#DAFF01]/10' : 'group-hover:bg-[#DAFF01]/60 bg-[#DAFF01]/40'}`}>
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
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}