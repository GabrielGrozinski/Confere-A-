import HeaderFixo from "../components/header-fixo";
import { allContext } from "../context/all-context";
import { useEffect, useState } from "react";
import FooterFixo from "../components/footer-fixo";


export default function Preco() {
    const {setTopicoAtivo, dark} = allContext();
    const [planoAtivo, setPlanoAtivo] = useState<'Gratuito' | 'Torcedor' | 'Sócio' | string>('Gratuito');

    useEffect(() => {
        setTopicoAtivo('Preço');
        window.scrollTo({
            top: 0
        })
    }, []);

    const planos = [
    {
        id: 0,
        preco: "R$ 0,00",
        titulo: "Gratuíto",
        descricao:
        "O que o Confere Aê oferece.",
        icone: 'fa-solid fa-arrows-rotate text-shadow-[1px_1px_1px_#0000002a]',
        beneficios: [
        "Ferramentas gratuítas",
        "Análise de cada clube",
        "Comparador de Clubes",
        "Comparador de Coisas",
        ],
        botao: "Desbloquear Acesso",
    },
    {
        id: 1,
        preco: "R$ 5,00",
        titulo: "Torcedor",
        descricao:
        "Acesse análises avançadas e compare a evolução do seu clube com dados históricos e projeções exclusivas.",
        icone: 'fa-solid fa-trophy text-shadow-[1px_1px_1px_#0000002a]',
        beneficios: [
        "Faturamento de 2024",
        "Dívida de 2024",
        "Potencial de Crescimento",
        "Chance de Título",
        "Valor estimado do clube",
        "Sem anúncios",
        ],
        botao: "Desbloquear Acesso",
    },
    {
        id: 2,
        preco: "R$ 9,90",
        titulo: "Sócio",
        descricao:
        "A experiência mais completa para quem quer entender o clube como um verdadeiro analista.",
        icone: 'fa-brands fa-web-awesome text-shadow-[1px_1px_1px_#0000002a]',
        beneficios: [
        "Chance de Título",
        "Valor estimado do clube",
        "Faturamento de 2024",
        "Dívida de 2024",
        "Nota geral do Clube",
        "Chance de Quitar a Dívida",
        "Potencial de Crescimento",
        "Todas as ferramentas em desenvolvimento",
        "Sem anúncios",

        ],
        botao: "Desbloquear Acesso",
    },
    ];

    return (
        <div style={{background: dark ? "linear-gradient(to bottom right, #0d1015, #080c14)" : "linear-gradient(to bottom right, #f7fbff, #fdfeff)"}}>
            <HeaderFixo />

            <div className="min-h-screen pt-18 flex flex-col items-center mb-22">

                <h2 className={`text-[36px] md:text-[48px] font-bold mt-3 mb-15 tracking-[-0.015em] ${dark ? 'text-white' : 'text-zinc-900'}`}>
                    Todos os Planos
                </h2>

                <div className="flex justify-center gap-8 flex-col lg:flex-row">
                    {planos.map((plano) => (
                        <div
                        key={plano.id}
                        className={`rounded-xl grid max-h-180 min-h-180 min-w-100 max-w-100 grid-rows-[1fr_10%] bg-card text-card-foreground shadow relative border-2 hover:shadow-2xl transition-all duration-300 overflow-hidden group ${plano.id === 2 ? dark ? 'border-red-500 hover:border-red-600 bg-[rgb(26,28,30)]' : 'border-red-400 hover:border-red-500 bg-white' : dark ? 'border-amber-300 hover:border-amber-400 bg-[rgb(26,28,30)]' : 'border-yellow-200 hover:border-yellow-400 bg-white'}`}
                        >
                            <div>
                                <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full transition-opacity ${plano.id === 2 ? dark ? 'bg-red-200 opacity-90 group-hover:opacity-100' : 'bg-red-200 opacity-90 group-hover:opacity-100' : dark ? ' bg-amber-100 opacity-90 group-hover:opacity-100' : 'bg-yellow-100  opacity-50 group-hover:opacity-70'}`}></div>
                                <div className="flex flex-col space-y-1.5 p-6 relative">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className={`p-4 rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform ${plano.id === 2 ? 'bg-red-500' : 'bg-yellow-500'}`}>
                                            <i className={plano.icone}></i>
                                        </div>
                                        <div className="flex flex-col items-end translate-x-2">
                                            <span className="text-sm text-gray-700 font-medium">
                                            A partir de
                                            </span>
                                            <span className={`text-2xl font-bold ${plano.id === 2 ? 'text-red-700' : 'text-yellow-600'}`}>
                                            {plano.preco}
                                            </span>
                                            <span className="text-xs text-gray-500">uma vez</span>
                                        </div>
                                    </div>
                                    <div className={`tracking-tight text-2xl font-bold mb-2 ${dark ? 'text-gray-100' : 'text-gray-900'}`}>
                                    {plano.titulo}
                                    </div>
                                    <div className={`text-base ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {plano.descricao}
                                    </div>
                                </div>
                                <div className="p-6 pt-0 relative">
                                    <div className="space-y-3">
                                    <p className={`text-sm font-semibold mb-3 ${dark ? 'text-gray-100' : 'text-gray-900'}`}>
                                        O que está incluído:
                                    </p>
                                    {plano.beneficios.map((beneficio, index) => (
                                        <div key={index} className="flex items-start gap-3">
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
                                            className={`lucide lucide-circle-check h-5 w-5 shrink-0 mt-0.5 ${plano.id === 2 ? 'text-red-600' : 'text-yellow-600'}`}
                                            aria-hidden="true"
                                        >
                                            <circle
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            ></circle>
                                            <path
                                            d="m9 12 2 2 4-4"
                                            ></path>
                                        </svg>
                                        <span className={`text-sm font-medium relative ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                                            {beneficio}
                                            {plano.id === 2 && (beneficio === 'Chance de Título' || beneficio === 'Valor estimado do clube' || beneficio === 'Faturamento de 2024' || beneficio === 'Dívida de 2024' || beneficio === 'Nota geral do Clube' || beneficio === 'Chance de Quitar a Dívida' || beneficio === 'Potencial de Crescimento') &&
                                                <i className={`fa-solid fa-bolt ml-1 ${plano.id === 2 ? 'text-red-400' : dark ? 'text-amber-200' : 'text-amber-400'}`}></i>
                                            }
                                        </span>
                                        </div>
                                    ))}
                                    </div>
                                        {plano.id === 2 &&
                                        <p className={`mt-6 ${dark ? 'text-white' : 'text-zinc-900'}`}>
                                                <i className={`fa-solid fa-bolt ml-1 ${plano.id === 2 ? 'text-red-400' : dark ? 'text-amber-200' : 'text-amber-400'}`}></i>
                                                : Possibilidade de comparar com outros clubes. 
                                        </p>
                                    }
                                </div>
                            </div>
                            
                            <div className="flex items-center p-6 pt-6">
                                <button className={`inline-flex items-center justify-center gap-2 text-sm h-10 rounded-md px-8 w-full text-white font-semibold py-6 shadow-lg hover:shadow-xl transition-all group ${plano.id === 2 ? 'bg-red-500' : 'bg-yellow-500'} ${plano.id === 0 ? 'opacity-60 cursor-not-allowed' : plano.id === 2 ? 'hover:bg-red-500/90 cursor-pointer' : dark ? 'hover:bg-yellow-500/90 cursor-pointer' : 'hover:bg-yellow-600 cursor-pointer'}`}>
                                {plano.botao}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            <FooterFixo />
        </div>
    )
}
