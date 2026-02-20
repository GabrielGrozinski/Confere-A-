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
        nome: 'Gratuito',
        preco: 0,
        descricao: 'O que o Confere Aê oferece',
        bgLight: 'bg-white shadow-[0px_0px_2px_#0000002a] border border-slate-800/20 text-slate-800',
        bgDark: 'bg-slate-900 text-slate-100 border border-slate-300/20',
        buttonClass: (dark: boolean) =>
            dark
            ? 'bg-slate-900 border-slate-300/20'
            : 'bg-white border-slate-800/30',
        features: [
        { texto: 'Ferramentas gratuítas', icone: 'fa-check fa-solid' },
        { texto: 'Análise de cada clube', icone: 'fa-check fa-solid' },
        { texto: 'Comparador de Clubes', icone: 'fa-check fa-solid' },
        { texto: 'Comparador de Coisas', icone: 'fa-check fa-solid' }
        ],
        getButtonText: (planoAtivo: string) =>
        planoAtivo === 'Gratuito'
            ? 'Seu Plano Atual'
            : 'Plano Gratuito'
    },
    {
        nome: 'Torcedor',
        preco: 5,
        descricao: 'Analise melhor seu Clube',
        bgLight: 'bg-sky-100 shadow-[0px_0px_2px_#0000002a] border border-slate-800/20 text-slate-900',
        bgDark: 'bg-blue-950 text-slate-100 border border-slate-300/20',
        buttonClass: (dark: boolean, planoAtivo: string) =>
        dark
            ? `border border-slate-200/30 ${
                planoAtivo === 'Torcedor' || planoAtivo === 'Sócio'
                ? 'bg-blue-950'
                : 'bg-blue-700 cursor-pointer'
            }`
            : `border ${
                planoAtivo === 'Torcedor' || planoAtivo === 'Sócio'
                ? 'bg-sky-100 border-slate-800/40'
                : 'bg-sky-400/80 text-slate-100 text-shadow-[1px_1px_1px_#0000002a] cursor-pointer border-slate-400/40'
            }`,
        features: [
        { texto: 'Sem anúncios', icone: 'fa-check fa-solid' },
        { texto: 'Potencial de Crescimento', icone: 'fa-check fa-solid' },
        { texto: 'Comparação com 2024', icone: 'fa-check fa-solid' },
        { texto: 'Comparação com 2023', icone: 'fa-check fa-solid' },
        { texto: 'Chance de Título', icone: 'fa-check fa-solid' }
        ],
        getButtonText: (planoAtivo: string) => {
        if (planoAtivo === 'Torcedor') return 'Seu Plano Atual'
        if (planoAtivo === 'Sócio') return 'Plano Torcedor'
        return 'Fazer upgrade para o Torcedor'
        }
    },
    {
        nome: 'Sócio',
        preco: 10,
        descricao: 'Analista Supremo',
        bgLight: 'bg-violet-200/80 shadow-[0px_0px_2px_#0000002a] border border-slate-800/20 text-slate-900',
        bgDark: 'bg-violet-800/40 text-slate-100 border border-slate-300/20',
        buttonClass: (dark: boolean, planoAtivo: string) =>
        dark
            ? `border-slate-300/40 ${
                planoAtivo === 'Sócio'
                ? 'bg-violet-800/40'
                : 'bg-violet-600 cursor-pointer'
            }`
            : `border ${
                planoAtivo === 'Sócio'
                ? 'bg-violet-200/80 border-slate-800/40'
                : 'bg-violet-500 text-white text-shadow-[1px_1px_1px_#0000002a] cursor-pointer border-slate-400/40'
            }`,
        features: [
        { texto: 'Ferramentas em Desenvolvimento', icone: 'fa-check fa-solid' },
        { texto: 'Nota do Clube', icone: 'fa-check fa-solid' },
        { texto: 'Chance de Quitar a Dívida', icone: 'fa-check fa-solid' },
        { texto: 'Potencial de Crescimento', icone: 'fa-check fa-solid' },
        { texto: 'Comparação com 2024', icone: 'fa-check fa-solid' },
        { texto: 'Comparação com 2023', icone: 'fa-check fa-solid' },
        { texto: 'Sem anúncios', icone: 'fa-check fa-solid' }
        ],
        getButtonText: (planoAtivo: string) =>
        planoAtivo === 'Sócio'
            ? 'Seu Plano Atual'
            : 'Fazer upgrade para o Sócio'
    }
    ]

    return (
        <div>
            <HeaderFixo />

            <div style={{background: dark ? "linear-gradient(to bottom right, #0d1015, #080c14)" : "linear-gradient(to bottom right, #f7fbff, #fdfeff)"}} className="min-h-screen pt-18 flex flex-col items-center mb-22">

                <h2 className={`text-[36px] md:text-[48px] font-bold mt-3 mb-15 tracking-[-0.015em] ${dark ? 'text-white' : 'text-zinc-900'}`}>
                    Todos os Planos
                </h2>

                <div className="flex justify-center gap-8">
                {planos.map((plano) => (
                    <div
                    key={plano.nome}
                    onClick={() => setPlanoAtivo(plano.nome)}
                    className={`min-h-140 min-w-80 rounded-xl flex flex-col p-8 gap-4 text-3xl relative ${
                        !dark ? plano.bgLight : plano.bgDark
                    }`}
                    >
                    {plano.nome === 'Torcedor' &&
                        <div className={`absolute text-sm p-2 px-4 pb-2.25 top-0 right-0 -translate-y-1/2 -translate-x-1/8 rounded-full border ${dark ? 'bg-blue-700 border-slate-800/40' : 'bg-sky-400 text-white text-shadow-[1px_1px_1px_#0000002a] border-slate-400/40'}`}>
                            Mais Popular
                        </div>
                    }
                    <h1>{plano.nome}</h1>

                    <h2 className="flex text-2xl">
                        <span className={`mr-1 ${dark ? 'text-neutral-300' : 'text-neutral-600'}`}>
                        R$
                        </span>

                        <span className="text-5xl ml-2 flex items-center font-medium">
                        {plano.preco}
                        <span className="text-xs translate-y-[12.5%] ml-2 font-thin">
                            Pague apenas <br /> uma vez
                        </span>
                        </span>
                    </h2>

                    <p className="text-lg">{plano.descricao}</p>

                    <button
                        className={`w-full rounded-full border mt-4 p-2 pb-2.25 font-medium text-sm ${plano.buttonClass(dark, planoAtivo)}`}
                    >
                        {plano.getButtonText(planoAtivo)}
                    </button>

                    <ul className="flex flex-col gap-4 mt-2">
                        {plano.features.map((feature) => (
                        <li key={feature.texto} className="flex text-sm place-items-center gap-2">
                            <i className={feature.icone}></i>
                            {feature.texto}
                        </li>
                        ))}
                    </ul>
                    </div>
                ))}
                </div>

            </div>

            <FooterFixo />
        </div>
    )
}
