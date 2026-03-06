import { allContext } from "../context/all-context";
import { useEffect, useState } from "react";
import axios from "axios";


export default function Preco() {
    const {setTopicoAtivo, dark, assinanteAtual, user} = allContext();
    const [planoAtivo, setPlanoAtivo] = useState<'Gratuíto' | 'Torcedor' | 'Sócio' | string>('Gratuito');

    useEffect(() => {
        setTopicoAtivo('Preço');
        window.scrollTo({
            top: 0
        });
    }, []);

    useEffect(() => {
        if (assinanteAtual === 'Sócio') {
            setPlanoAtivo('Sócio');
        } else if (assinanteAtual === 'Torcedor') {
            setPlanoAtivo('Torcedor');
        }
    }, [assinanteAtual]);

    const planos = [
    {
        id: 0,
        preco: "R$ 0,00",
        titulo: "Gratuíto",
        descricao:
        "O que o Confere Aê oferece.",
        icone: 'fa-solid fa-arrows-rotate text-shadow-[1px_1px_1px_#0000002a]',
        beneficios: [
        "Limite de 5 clubes por comparação",
        "Limite de 3 unidades de item por comparação",
        "Limite de 5 itens por comparação",
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
        "Acesse análises avançadas e compare seu clube com seus maiores rivais.",
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

    const handlePagamento = async (plano: string) => {
        if (!user) return;
        const userId = user.id;
        try {
            console.log('Iniciando', userId)
            const { data } = await axios.post(
                "/api/preference", 
                {plano: plano}, 
                {
                headers: {
                    "Authorization": `Bearer ${userId}`
                }
            });

            window.location.href = data.init_point;
        } catch (error) {
            console.error("Erro ao criar pagamento:", error);
        }
    };

    return (
        <div style={{background: dark ? "linear-gradient(to bottom right, #0d1015, #080c14)" : "linear-gradient(to bottom right, #f7fbff, #fdfeff)"}}>

            <div className="min-h-screen pt-3 flex flex-col items-center mb-22 overflow-x-hidden">

                <h2 className={`text-[36px] md:text-[48px] font-bold mt-3 mb-15 tracking-[-0.015em] ${dark ? 'text-white' : 'text-zinc-900'}`}>
                    Todos os Planos
                </h2>

                <div className="flex justify-center gap-6 flex-col lg:flex-row px-4 lg:px-0">
                    {planos.map((plano) => (
                        <div
                        key={plano.id}
                        className={`rounded-xl scale-95 grid max-h-192 min-h-192 lg:min-h-178 lg:max-h-178 lg:min-w-100 lg:max-w-100 grid-rows-[1fr_10%] bg-card text-card-foreground shadow relative border-2 hover:shadow-2xl transition-all duration-300 overflow-hidden group ${plano.id === 2 ? dark ? 'border-red-500 hover:border-red-600 bg-[rgb(26,28,30)]' : 'border-red-400 hover:border-red-500 bg-white' : dark ? 'border-amber-300 hover:border-amber-400 bg-[rgb(26,28,30)]' : 'border-yellow-200 hover:border-yellow-400 bg-white'}`}
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
                            
                            <div className="flex items-center p-6 pt-6">
                                <button disabled={assinanteAtual === "Sócio" || plano.id === 0 || (plano.id === 1 && assinanteAtual === 'Torcedor')} onClick={() => plano.id === 1 ? handlePagamento('torcedor') : handlePagamento('socio')} className={`inline-flex items-center justify-center gap-2 text-sm h-10 rounded-md px-8 w-full text-white font-semibold py-6 shadow-lg hover:shadow-xl transition-all group ${plano.id === 2 ? 'bg-red-500' : 'bg-yellow-500'} ${(planoAtivo === 'Sócio' || plano.titulo === planoAtivo || plano.id === 0) ? 'opacity-60 cursor-not-allowed' : plano.id === 2 ? 'hover:bg-red-500/90 cursor-pointer' : dark ? 'hover:bg-yellow-500/90 cursor-pointer' : 'hover:bg-yellow-600 cursor-pointer'}`}>
                                {(planoAtivo === 'Sócio' || plano.titulo === planoAtivo || plano.id === 0) ? 'Plano Atual' : plano.botao}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    )
}
