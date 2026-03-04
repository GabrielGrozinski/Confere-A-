import { buscaTodosClubes, CalcularMediaClube } from "../components/busca-clube";
import { useEffect, useState, useRef } from "react";
import type { Clube, Medias } from "../components/busca-clube";
import '../styles/comparacao-geral.css';
import HeaderFixo from "../components/header-fixo";
import { allContext } from "../context/all-context";
import GraficoComparativo from "../components/grafico-comparativo";
import * as Popover from '@radix-ui/react-popover';
import { ClipLoader } from "react-spinners";
import AdsenseLeft from "../components/adsense-left";
import AdsenseRight from "../components/adsense-right";
import FooterFixo from "../components/footer-fixo";
import CardsPremium from "../components/cards-premium";


type TopicoComparacao = {
  label: 'Faturamento' | 'Dívida' | 'Faturamento (2024)' | 'Dívida (2024)' | 'Lucro' | 'Folha Salarial' | 'Contratações' | 'Maior Contratação' | 'Custo por Gol' | 'Custo por Ponto' | 'Custo por Vitória' | 'Custo por Jogador' | 'Faturamento/Dívida' | 'Lucro/Faturamento' | 'Nota do Clube' | 'Chance de Quitar a Dívida' | 'Projetar Faturamento' | 'Valor Estimado';
  categoria: 'Financeiro' | 'Eficiência' | 'Mercado' | 'Indicadores' | 'Premium';
}

export type Topico =
  | 'Faturamento'
  | 'Dívida'
  | 'Faturamento (2024)'
  | 'Dívida (2024)'
  | 'Lucro'
  | 'Folha Salarial'
  | 'Contratações'
  | 'Maior Contratação'
  | 'Custo por Gol'
  | 'Custo por Ponto'
  | 'Custo por Vitória'
  | 'Custo por Jogador'
  | 'Faturamento/Dívida'
  | 'Lucro/Faturamento'
  | 'Nota do Clube'
  | 'Projetar Faturamento'
  | 'Chance de Quitar a Dívida'
  | 'Valor Estimado';

export type DadosClube = {
  faturamento: number;
  divida: number;
  faturamento_2024: number;
  divida_2024: number;
  lucro: number;
  contratacoes: number;
  folha_salarial: number;
  maiorContratacao: number;
  fatDiv: number;
  lucFat: number;
  custoVitoria: number;
  custoGol: number;
  custoPonto: number;
  custoJogador: number;
  notaClube: number;
  mediaTorcedores: number;
  projetarFaturamento: number;
  chanceQuitarDivida: number;
  valor_estimado: number;
};



export default function ComparadorDeClubes() {
    const {setTopicoAtivo, setAbaEntretenimento, largura, dark, assinanteAtual} = allContext();
    const [clubes, setClubes] = useState<Clube[]>();
    const [assinante, setAssinante] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [anoEscolhido, setAnoEscolhido] = useState<number>(1);
    const [clubesSelecionados, setClubesSelecionados] = useState<Medias[]>([]);
    const [clubesSelecionadosOriginal, setClubesSelecionadosOriginal] = useState<Medias[]>([]);
    const [valorClubes, setValorClubes] = useState<string>('0');
    const [popoverAberto, setPopoverAberto] = useState(false);
    const topicosComparacao: TopicoComparacao[] = [
        // ---------------- Premium ----------------
        { label: 'Faturamento (2024)', categoria: 'Premium' },
        { label: 'Dívida (2024)', categoria: 'Premium' },
        { label: 'Valor Estimado', categoria: 'Premium' },
        { label: 'Projetar Faturamento', categoria: 'Premium' },
        { label: 'Chance de Quitar a Dívida', categoria: 'Premium' },
        { label: 'Nota do Clube', categoria: 'Premium' },

        // ---------------- FINANCEIRO ----------------
        { label: 'Faturamento', categoria: 'Financeiro' },
        { label: 'Dívida', categoria: 'Financeiro' },
        { label: 'Lucro', categoria: 'Financeiro' },
        { label: 'Folha Salarial', categoria: 'Financeiro' },

        // ---------------- MERCADO ----------------
        { label: 'Contratações', categoria: 'Mercado' },
        { label: 'Maior Contratação', categoria: 'Mercado' },

        // ---------------- EFICIÊNCIA ----------------
        { label: 'Custo por Gol', categoria: 'Eficiência' },
        { label: 'Custo por Ponto', categoria: 'Eficiência' },
        { label: 'Custo por Vitória', categoria: 'Eficiência' },
        { label: 'Custo por Jogador', categoria: 'Eficiência' },

        // ---------------- INDICADORES ----------------
        { label: 'Faturamento/Dívida', categoria: 'Indicadores' },
        { label: 'Lucro/Faturamento', categoria: 'Indicadores' },

    ];
    const [topico, setTopico] = useState<Topico>('Faturamento');
    const correlacaoTopicoCampo: Record<Topico, keyof DadosClube> = {
    'Faturamento': 'faturamento',
    'Dívida': 'divida',
    'Faturamento (2024)':'faturamento_2024',
    'Dívida (2024)':'divida_2024',
    'Lucro': 'lucro',
    'Folha Salarial': 'folha_salarial',
    'Contratações': 'contratacoes',
    'Maior Contratação': 'maiorContratacao',
    'Custo por Gol': 'custoGol',
    'Custo por Ponto': 'custoPonto',
    'Custo por Vitória': 'custoVitoria',
    'Custo por Jogador': 'custoJogador',
    'Faturamento/Dívida': 'fatDiv',
    'Lucro/Faturamento': 'lucFat',
    'Nota do Clube': 'notaClube',
    'Projetar Faturamento' : 'projetarFaturamento',
    'Chance de Quitar a Dívida': 'chanceQuitarDivida',
    'Valor Estimado':'valor_estimado'
    };
    const intervalRef = useRef<number | undefined>(undefined);
    const premiumRef = useRef<HTMLDivElement | null>(null);

    const startPress = () => {
        if (anoEscolhido === 50) return;
        if (intervalRef.current) return;

        intervalRef.current = setInterval(() => {
            setAnoEscolhido((prev) => prev === 50 ? 50 : prev + 1);
        }, 50);
    };

    const downPress = () => {
        if (anoEscolhido === 0) return;
        if (intervalRef.current) return;

        intervalRef.current = setInterval(() => {
            setAnoEscolhido((prev) => prev === 0 ? 0 : prev - 1);
        }, 50);
    };

    const stopPress = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = undefined;
    };

    useEffect(() => {
        setTopicoAtivo('Produto');
        setAbaEntretenimento(true);
        window.scrollTo({
            top: 0
        });

        buscaTodosClubes()
            .then((clubes) => setClubes(clubes.data))
            .catch((error) => console.log('Houve um erro', error))
            .finally(() => setLoading(false));
    }, []);

    const adicionaClube = async (clubeEscolhido: Clube) => {
        const jaExiste = clubesSelecionados.some((clube) => clube.nome === clubeEscolhido.nome);
        if (jaExiste) {
            const clubesFiltrados = clubesSelecionados.filter((clube) => clube.nome !== clubeEscolhido.nome);
            setClubesSelecionados(clubesFiltrados);
            setClubesSelecionadosOriginal(clubesFiltrados);
        } else {
            if (!assinante && clubesSelecionados.length === 5) {
                return fazerScroll();
            }
            const clubeNovo = await CalcularMediaClube(clubeEscolhido, anoEscolhido);
            setClubesSelecionados((prev) => [...prev, clubeNovo.clube]);
            const clubeOriginal = await CalcularMediaClube(clubeEscolhido, 15);
            setClubesSelecionadosOriginal((prev) => [...prev, clubeOriginal.clube]);
        }
    }

    useEffect(() => {
        atualizaAnoEscolhido();
    }, [anoEscolhido])

    const atualizaAnoEscolhido = () => {
        const novosClubes = clubesSelecionadosOriginal.map((clube, index) => {

            if (anoEscolhido === 0) return {...clube, chanceQuitarDivida: clubesSelecionadosOriginal[index].chanceQuitarDivida, projetarFaturamento: clubesSelecionadosOriginal[index].faturamento};

            const chanceDivida = (
                clube.chanceQuitarDivida === 100 ? 
                    clube.nome === 'Palmeiras' ? 
                        anoEscolhido * (clube.chanceQuitarDivida/7.5) >= 100 ? 
                        100 
                        : 
                        anoEscolhido * (clube.chanceQuitarDivida/7.5) 
                    : 
                    anoEscolhido * (clube.chanceQuitarDivida/2) >= 100 ? 100 
                    : 
                    anoEscolhido * (clube.chanceQuitarDivida/2) 
                :
                    anoEscolhido >= 30 ?
                    100
                    : 
                    anoEscolhido > 15 ?
                        anoEscolhido * (clube.chanceQuitarDivida/(15 - (anoEscolhido - 15)))
                    :  
                    anoEscolhido === 15 ?
                        clube.chanceQuitarDivida
                    :
                    anoEscolhido > 10 ?
                        anoEscolhido * (clube.chanceQuitarDivida/15)
                    :  
                    anoEscolhido * (clube.chanceQuitarDivida/15) >= 100 ? 
                        100 
                    : 
                anoEscolhido * (clube.chanceQuitarDivida/15)
            );

            const novaChance = 
                chanceDivida < 100 ? 
                    Number(chanceDivida.toFixed(2)) 
                : chanceDivida > 100 ? 
                    100 
                : Math.round(chanceDivida);
            const proximoFaturamento =
                clube.faturamento + (anoEscolhido * clube.aumento_faturamento/1.8) +
                ((anoEscolhido * clube.mediaTorcedores/50) * clube.aumento_faturamento);

            return {
                ...clube, // copia todas as propriedades
                chanceQuitarDivida: novaChance,
                projetarFaturamento: Math.round(proximoFaturamento)
            };
        });

        setClubesSelecionados(novosClubes);
    }

    useEffect(() => {
        if (clubesSelecionados) {

            const clubesCusto = clubesSelecionados.map((clube) => clube[correlacaoTopicoCampo[topico]]);
            const somaClubes = clubesCusto.reduce((acc, clubeCusto) => {
                return acc + clubeCusto;
            }, 0);

            const stringFormatada =
                (correlacaoTopicoCampo[topico] === 'chanceQuitarDivida' || correlacaoTopicoCampo[topico] === 'fatDiv' || correlacaoTopicoCampo[topico] === 'lucFat') ? `${(somaClubes/clubesSelecionados.length).toFixed(2)}%`
                :
                (correlacaoTopicoCampo[topico] === 'folha_salarial') ?
                `R$ ${(somaClubes/clubesSelecionados.length).toFixed(2)} milhões/mês`
                :
                (correlacaoTopicoCampo[topico] === 'notaClube') ? 
                `${(somaClubes/clubesSelecionados.length).toFixed(2)}`
                :
                (correlacaoTopicoCampo[topico] === 'custoGol') ?
                `R$ ${(somaClubes/clubesSelecionados.length).toFixed(2)} milhões/gol`
                :
                (correlacaoTopicoCampo[topico] === 'custoJogador') ?
                `R$ ${(somaClubes/clubesSelecionados.length).toFixed(2)} milhões/jogador`
                :
                (correlacaoTopicoCampo[topico] === 'custoPonto') ?
                `R$ ${(somaClubes/clubesSelecionados.length).toFixed(2)} milhões/ponto`
                :
                (correlacaoTopicoCampo[topico] === 'custoVitoria') ?
                `R$ ${(somaClubes/clubesSelecionados.length).toFixed(2)} milhões/vitória`
                :
                somaClubes > 1000 ?
                `${somaClubes/1000 >= 2 ? `R$ ${(somaClubes/1000).toFixed(2)} bilhões` : `R$ ${(somaClubes/1000).toFixed(2)} bilhão`}`
                :
                `R$ ${somaClubes} milhões`;
            
            setValorClubes(stringFormatada);
        }
    }, [clubesSelecionados, topico]);

    const agrupadosPorCategoria = topicosComparacao.reduce((acc, topico) => {
        if (!acc[topico.categoria]) {
            acc[topico.categoria] = [];
        }
        acc[topico.categoria].push(topico);
        return acc;
    }, {} as Record<string, TopicoComparacao[]>);


    function fazerScroll() {
        if (!premiumRef.current) return;

        premiumRef.current.scrollIntoView({
            behavior: 'smooth',
        })
    }


    return (
        <div style={{ background: dark ? "linear-gradient(to bottom right, #0d1015, #080c14)" : "linear-gradient(to bottom right, #f7fbff, #fdfeff)"}} className="mt-15">

            <HeaderFixo/>

            <div className="min-h-screen grid grid-cols-[auto_1fr_auto] lg:px-4 items-center pt-2 pb-10 relative">

                {(assinanteAtual !== 'Sócio' && assinanteAtual !== 'Torcedor') &&
                    <AdsenseLeft />
                }

                <main className={`col-span-full lg:col-2 w-full flex flex-col relative pt-2 ${(assinanteAtual !== 'Sócio' && assinanteAtual !== 'Torcedor') ? 'lg:max-w-250 lg:min-w-250' : 'lg:min-w-[80%] lg:max-w-[80%]'}`}>
                    <div className="min-h-10 w-full flex justify-center">
                        <div className={`mt-8 min-h-10 bg-slate-300 w-[70%] rounded-xl py-1 px-3 flex items-center ${(topico === 'Projetar Faturamento' || topico === 'Chance de Quitar a Dívida') ? 'max-w-120' : 'max-w-100'}`}>
                        <Popover.Root open={popoverAberto} onOpenChange={setPopoverAberto}>

                            <Popover.Trigger asChild>
                                <button className="text-stone-800 font-medium flex items-center w-full justify-center">
                                    Comparar por: 
                                        <strong>
                                                <span className="bg-slate-800 p-0.5 px-2.5 ml-2 flex rounded-md text-yellow-300 text-shadow-[1px_1px_1px_#0000002a] font-medium cursor-pointer items-center">{topico} 
                                                    <i className="fa-solid fa-angle-down ml-1 translate-y-[10%]">
                                                    
                                                    </i>
                                                </span>
                                            </strong>
                                </button>
                            </Popover.Trigger>

                            {(topico === 'Projetar Faturamento' || topico === 'Chance de Quitar a Dívida') &&
                                <button
                                className="min-w-22 max-w-22 min-h-full max-h-full border border-slate-800/40 rounded-lg text-center flex items-center justify-center pl-1 my-1"
                                >
                                    <span>{2025 + anoEscolhido}</span>
                                    <span className="flex flex-col text-[12px] py-px ml-2 scale-90">
                                        <i
                                        onTouchStart={() => startPress}
                                        className="fa-solid fa-sort-up cursor-pointer"
                                        onTouchEnd={() => stopPress}
                                        onMouseDown={startPress}
                                        onMouseUp={stopPress}
                                        onMouseLeave={stopPress}
                                        >
                                        </i>
                                        <i
                                        onTouchStart={() => downPress}
                                        className="fa-solid fa-sort-down cursor-pointer"
                                        onTouchEnd={() => stopPress}
                                        onMouseDown={downPress}
                                        onMouseUp={stopPress}
                                        onMouseLeave={stopPress}
                                        >
                                        </i>
                                    </span>
                                </button>
                            }

                            <Popover.Portal>
                                <Popover.Content
                                sideOffset={8}
                                className="w-96 max-h-96 overflow-y-auto rounded-xl bg-slate-900 border border-gray-700/70 p-4 shadow-xl z-10"
                                >
                                <div className="space-y-6">
                                    {Object.entries(agrupadosPorCategoria).map(
                                    ([categoria, topicos]) => (
                                        <div key={categoria} className="space-y-2">
                                        <h4 className="text-xs font-semibold uppercase text-slate-400">
                                            {categoria}
                                        </h4>
                                        <div className="space-y-1">
                                            {topicos.map((item: TopicoComparacao) => (
                                            <button
                                                key={item.label}
                                                onClick={() => {
                                                    setPopoverAberto(false);
                                                    assinante ?
                                                        setTopico(item.label)
                                                    :
                                                    (item.categoria === 'Premium')
                                                    ?
                                                        fazerScroll()
                                                    :
                                                        setTopico(item.label);
                                                    
                                                }}
                                                className={`
                                                w-full text-left px-3 py-2 rounded-md
                                                transition
                                                ${
                                                    topico === item.label
                                                    ? 'bg-sky-500/20 text-sky-300'
                                                    : 'hover:bg-slate-800 text-slate-200'
                                                }
                                                `}
                                            >
                                                {item.label}
                                                {(item.categoria === 'Premium') &&
                                                <div className="inline relative">
                                                    <div onClick={() => fazerScroll()} className={`ml-2 absolute flex top-1/2 -translate-y-[45%] right-0 translate-x-[125%] items-center justify-center min-h-6 min-w-6 cursor-pointer rounded-md ${(item.label === 'Nota do Clube' || item.label === 'Chance de Quitar a Dívida') ? 'bg-red-600' : 'bg-yellow-500'}`}>
                                                        <i className={`${(item.label === 'Nota do Clube' || item.label === 'Chance de Quitar a Dívida') ? 'fa-brands fa-web-awesome' : 'fa-solid fa-trophy'} text-slate-100 text-[10px] -translate-x-[0.63px] translate-y-px text-shadow-[0px_2px_1px_#0000002a]`}></i>
                                                    </div>
                                                </div>
                                                }
                                            </button>
                                            ))}
                                        </div>
                                        </div>
                                    )
                                    )}
                                </div>
                                </Popover.Content>
                            </Popover.Portal>
                        </Popover.Root>
                        </div>
                    </div>

                    <main id="main" className="grid grid-rows-[56px_400px_64px] relative mx-1 max-h-120 pt-2 mb-16">
                        <h1 className={`absolute top-0 right-0 translate-y-20 font-mono font-semibold -translate-x-[10%] z-1 text-xs ${dark ? 'text-neutral-400' : 'text-neutral-700'}`}>
                            {(topico === 'Chance de Quitar a Dívida' || topico === 'Faturamento/Dívida' || topico === 'Lucro/Faturamento') ? 'Valor em Porcentagem' : topico === 'Nota do Clube' ? 'Valor em unidades' : 'Valor em milhões de Reais'}
                        </h1>
                        <div className={`row-1 h-full min-w-full flex gap-0 bg-yellow-500 shadow-sm rounded-t-xl rounded-br-none items-center justify-center border-b ${dark ? 'border-b-slate-800/50' : 'border-b-slate-200/50'}`}>

                            <h1 className="font-mono text-slate-50 text-shadow-[1px_1px_1px_#0000002a] text-lg">
                                Clubes Brasileiros
                            </h1>

                        </div>
                        <GraficoComparativo clubesSelecionados={clubesSelecionados} topico={topico} />
                        <div className={`row-3 rounded-b-xs border-t h-full min-w-full p-2 flex items-center flex-col ${dark ? 'bg-[#3e495e] border-t-slate-800/50 text-slate-200 text-shadow-[1px_1px_1px_#0000002a]' : 'bg-[#e1e8f7] border-t-slate-300/50 text-zinc-800'}`}>
                                <h1 className="text-sm">
                                    {
                                        (correlacaoTopicoCampo[topico] === 'chanceQuitarDivida' || correlacaoTopicoCampo[topico] === 'fatDiv' || correlacaoTopicoCampo[topico] === 'lucFat' || correlacaoTopicoCampo[topico] === 'notaClube' || correlacaoTopicoCampo[topico] === 'custoGol' || correlacaoTopicoCampo[topico] === 'custoJogador' || correlacaoTopicoCampo[topico] === 'custoPonto' || correlacaoTopicoCampo[topico] === 'folha_salarial' || correlacaoTopicoCampo[topico] === 'custoVitoria') ? 'Média dos Clubes'
                                        :
                                        'Total dos Clubes'
                                    }
                                </h1>
                                <h2 className={`text-sm ${dark ? 'text-amber-300 text-shadow-[1px_1px_1px_#0000002a]' : 'text-amber-600 font-medium'}`}>{valorClubes}</h2>
                        </div>
                    </main>

                    <section className="max-w-full min-w-full mt-8 flex flex-col relative">
                        <article className="col-1">
                            <h1 className={`font-medium text-lg text-center ${dark ? 'text-slate-100' : 'text-slate-800'}`}>Clubes Brasileiros</h1>
                            <div className="w-full h-full mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center px-4">
                            {loading ?
                                <div className="flex-1 flex items-center justify-center">
                                    <ClipLoader size={30} color={dark ? '#fff' : '#000'}/>
                                </div>
                                :
                                clubes?.map((clube, index) => (
                                    <>
                                        <div onClick={() => adicionaClube(clube)} className="rounded-md shadow-[0px_1px_2px_#0000003a] flex flex-col items-center justify-center max-h-34 min-h-34 w-full cursor-pointer relative scale-80 bg-stone-50">
                                            <div className={`absolute top-1 right-1 flex items-center justify-center p-0.75 rounded-sm shadow-[0px_0px_2px_#0000003a] ${clubesSelecionados.some((c) => c.nome === clube.nome) && 'bg-[#8f79d0] text-white text-shadow-[1px_1px_1px_#0000002a]'}`}>
                                                <i className="fa-solid fa-check text-[10px]"></i>
                                            </div>
                                            <img className="max-h-22" src={clube.imagem} alt={clube.nome} />
                                            <h1 className="text-center text-sky-950">{clube.nome}</h1>
                                        </div>

                                        {
                                            largura >= 1280 ?
                                                (index - 5 === -1 || index - 5 === 4 || index - 5 === 9 || index - 5 === 14) &&
                                                    <div className="min-h-34 col-span-full min-w-full px-4">
                                                        <div className="min-w-full min-h-34">

                                                        </div>
                                                    </div>
                                            :
                                            largura >= 1024 &&
                                                (index - 4 === -1 || index - 4 === 3 || index - 4 === 7 || index - 4 === 11 || index - 4 === 15) &&
                                                    <div className="cols-span-full bg-red-400">

                                                    </div>
                                            
                                        }
                                    </>
                                ))}
                            </div>
                        </article>
                    </section>

                    <div ref={premiumRef} className="scroll-mt-10">
                        <CardsPremium />
                    </div>
                </main>

                {(assinanteAtual !== 'Sócio' && assinanteAtual !== 'Torcedor') &&
                    <AdsenseRight />
                }

            </div>

            <FooterFixo />
        </div>
    )
}
