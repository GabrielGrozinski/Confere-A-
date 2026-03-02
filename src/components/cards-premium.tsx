import { allContext } from "../context/all-context";
import axios from 'axios';

export default function CardsPremium() {
    const { dark } = allContext();


    interface Plano {
        id: number;
        titulo: string;
        preco: string;
        descricao: string;
        icone: string;
        beneficios: string[];
        botao: string;
    }

    const planos: Plano[] = [
    {
        id: 1,
        preco: "R$ 5,00",
        titulo: "Torcedor",
        descricao:
        "Acesse análises avançadas e compare a evolução do seu clube com dados históricos e projeções exclusivas.",
        icone: 'fa-solid fa-trophy text-shadow-[1px_1px_1px_#0000002a]',
        beneficios: [
        "20+ clubes por comparação",
        "Itens ilimitados por comparação",
        "Faturamento de 2024",
        "Dívida de 2024",
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
        "Nota geral do Clube",
        "Chance de Quitar a Dívida",
        "Potencial de Crescimento",
        "Chance de Título",
        "Valor estimado do clube",
        "Faturamento de 2024",
        "Dívida de 2024",
        "Todas as ferramentas em desenvolvimento",
        "Sem anúncios",

        ],
        botao: "Desbloquear Acesso",
    },
    ];

    const handlePagamento = async (amount: number) => {
    try {
        const { data } = await axios.post("/api/preference");

        window.location.href = data.init_point;
    } catch (error) {
        console.error("Erro ao criar pagamento:", error);
    }
    };


    return (
        <div className="mt-12">

            <div
            className="text-center mb-16"
            x-file-name="PremiumSection"
            x-line-number="16"
            x-component="div"
            x-id="PremiumSection_16"
            x-dynamic="false"
            >
            <div
                className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-800 mb-4"
                x-file-name="PremiumSection"
                x-line-number="17"
                x-component="div"
                x-id="PremiumSection_17"
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
                className="lucide lucide-sparkles h-4 w-4"
                aria-hidden="true"
                x-file-name="PremiumSection"
                x-line-number="18"
                x-component="Sparkles"
                x-id="PremiumSection_18"
                x-dynamic="false"
                >
                <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
                <path d="M20 3v4"></path>
                <path d="M22 5h-4"></path>
                <path d="M4 17v2"></path>
                <path d="M5 18H3"></path>
                </svg>

                Conteúdo Exclusivo
            </div>

            <h2
                className={`text-3xl md:text-4xl font-bold mb-4 ${dark ? 'text-slate-100' : 'text-gray-900'}`}
                x-file-name="PremiumSection"
                x-line-number="21"
                x-component="h2"
                x-id="PremiumSection_21"
                x-dynamic="false"
            >
                Análises Premium
            </h2>

            <p
                className={`text-lg max-w-2xl mx-auto ${dark ? 'text-gray-400' : 'text-gray-600'}`}
                x-file-name="PremiumSection"
                x-line-number="24"
                x-component="p"
                x-id="PremiumSection_24"
                x-dynamic="false"
            >
                Desbloqueie insights avançados e projeções exclusivas sobre o futuro do
                seu clube.
            </p>
            </div>

            <div className="grid gap-0 sm:gap-2 xl:grid-cols-2 max-w-5xl mx-auto">
                <span className="contents">
                    {planos.map((plano: Plano) => (
                        <div
                        key={plano.id}
                        className={`rounded-xl sm:scale-95 scale-90 grid max-h-186 min-h-186 lg:min-h-172 lg:max-h-172 grid-rows-[1fr_10%] bg-card text-card-foreground shadow relative border-2 hover:shadow-2xl transition-all duration-300 overflow-hidden group ${plano.id === 2 ? dark ? 'border-red-500 hover:border-red-600 bg-[rgb(26,28,30)]' : 'border-red-400 hover:border-red-500 bg-white' : dark ? 'border-amber-300 hover:border-amber-400 bg-[rgb(26,28,30)]' : 'border-yellow-200 hover:border-yellow-400 bg-white'}`}
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
                                            Pague
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
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
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
                                            {plano.id === 2 && (beneficio === 'Chance de Título' || beneficio === 'Nota geral do Clube' || beneficio === 'Chance de Quitar a Dívida' || beneficio === 'Potencial de Crescimento') &&
                                                <i className={`fa-solid fa-bolt ml-1 ${plano.id === 2 ? 'text-red-400' : dark ? 'text-amber-200' : 'text-amber-400'}`}></i>
                                            }
                                        </span>
                                        </div>
                                    ))}
                                    </div>
                                        {plano.id === 2 &&
                                        <p className={`mt-6 ${dark ? 'text-slate-100' : 'text-zinc-900'}`}>
                                                <i className={`fa-solid fa-bolt ml-1 ${plano.id === 2 ? 'text-red-400' : dark ? 'text-amber-200' : 'text-amber-400'}`}></i>
                                                : Ferramentas exclusivas do Confere Aê. 
                                        </p>
                                    }
                                </div>
                            </div>
                            
                            <div onClick={() => handlePagamento(5)} className="flex items-center p-6 pt-4">
                                <button className={`inline-flex items-center justify-center gap-2 text-sm h-10 rounded-md px-8 w-full text-white font-semibold py-6 shadow-lg hover:shadow-xl transition-all group ${plano.id === 2 ? 'bg-red-500' : 'bg-yellow-500'} ${plano.id === 0 ? 'opacity-60 cursor-not-allowed' : plano.id === 2 ? 'hover:bg-red-500/90 cursor-pointer' : dark ? 'hover:bg-yellow-500/90 cursor-pointer' : 'hover:bg-yellow-600 cursor-pointer'}`}>
                                {plano.botao}
                                </button>
                            </div>
                        </div>
                    ))}
                </span>
            </div>

            <h1 className="bg-red-400 min-h-20 min-w-20">TESTE2</h1>
            
        </div>
    )
}