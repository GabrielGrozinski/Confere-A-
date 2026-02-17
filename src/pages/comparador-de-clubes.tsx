import { buscaTodosClubes, CaclularMediaClube } from "../components/busca-clube";
import { useEffect, useState } from "react";
import type { Clube, Medias } from "../components/busca-clube";
import '../styles/teste.css';
import HeaderFixo from "../components/header-fixo";
import { allContext } from "../context/all-context";
import MenuAberto from "../components/menu-aberto";
import GraficoComparativo from "../components/grafico-comparativo";
import * as Popover from '@radix-ui/react-popover';
import { ClipLoader } from "react-spinners";


type TopicoComparacao = {
  label: 'Faturamento' | 'Dívida' | 'Lucro' | 'Folha Salarial' | 'Contratações' | 'Maior Contratação' | 'Custo por Gol' | 'Custo por Ponto' | 'Custo por Vitória' | 'Custo por Jogador' | 'Faturamento/Dívida' | 'Lucro/Faturamento' | 'Nota do Clube' | 'Chance de Quitar a Dívida' | 'Projetar Faturamento';
  categoria: 'Financeiro' | 'Eficiência' | 'Mercado' | 'Indicadores'
}

export type Topico =
  | 'Faturamento'
  | 'Dívida'
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
  | 'Chance de Quitar a Dívida';

export type DadosClube = {
  faturamento: number;
  divida: number;
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
};



export default function ComparadorDeClubes() {
    const {menuAberto, setTopicoAtivo, setAbaEntretenimento} = allContext();
    const [clubes, setClubes] = useState<Clube[]>();
    const [loading, setLoading] = useState<boolean>(true);
    const [clubesSelecionados, setClubesSelecionados] = useState<Medias[]>([]);
    const [valorClubes, setValorClubes] = useState<string>('0');
    const [popoverAberto, setPopoverAberto] = useState(false);
    const topicosComparacao: TopicoComparacao[] = [
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
        { label: 'Nota do Clube', categoria: 'Indicadores' },
        { label: 'Chance de Quitar a Dívida', categoria: 'Indicadores' },
        { label: 'Projetar Faturamento', categoria: 'Indicadores' },
    ];
    const [topico, setTopico] = useState<Topico>('Faturamento');
    const correlacaoTopicoCampo: Record<Topico, keyof DadosClube> = {
    'Faturamento': 'faturamento',
    'Dívida': 'divida',
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
    };

    useEffect(() => {
        setTopicoAtivo('Produto');
        setAbaEntretenimento(true);

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
        } else {
            const clubeNovo = await CaclularMediaClube(clubeEscolhido);
            setClubesSelecionados((prev) => [...prev, clubeNovo.clube]);
        }
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


    return (
        <div style={{ background: "linear-gradient(to bottom right, #1d2330, #3e495e)" }}>
            <HeaderFixo/>

            {!menuAberto ?
            <div className="min-h-screen flex flex-col items-center pb-10 mt-16">
                <div className="min-h-10 w-full flex justify-center">
                    <div className="mt-8 min-h-10 bg-slate-300 w-[70%] max-w-100 rounded-xl py-1 px-3 flex items-center">
                    <Popover.Root open={popoverAberto} onOpenChange={setPopoverAberto}>
                    <Popover.Trigger asChild>
                        <button className="text-stone-800 font-medium flex items-center w-full justify-center">
                        Comparar por: <strong><span className="bg-slate-800 p-0.5 px-2.5 ml-2 flex rounded-md text-yellow-300 text-shadow-[1px_1px_1px_#0000002a] font-medium cursor-pointer items-center">{topico} <i className="fa-solid fa-angle-down ml-1 translate-y-[10%]"></i></span></strong>
                        </button>
                    </Popover.Trigger>

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
                                            setTopico(item.label);
                                            setPopoverAberto(false);
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
                <main id="main" className="row-1 w-[90%] grid grid-rows-[56px_400px_64px] relative mx-1 max-h-120 pt-2 mb-16">
                    <div className="row-1 h-full min-w-full flex gap-0 bg-yellow-500 shadow-[4px_-4px_3px_#0000002a] rounded-t-xl rounded-br-none items-center justify-center border-b border-b-slate-800/50">
                            <h1 className="font-mono text-slate-50 text-shadow-[1px_1px_1px_#0000002a] text-lg">Clubes Brasileiros</h1>
                    </div>

                    <GraficoComparativo clubesSelecionados={clubesSelecionados} topico={topico} />


                    <div className="row-3 rounded-b-xs border-t border-t-slate-800/50 h-full min-w-full bg-[#3e495e] p-2 flex items-center flex-col">
                            <h1 className="text-sm text-slate-200 text-shadow-[1px_1px_1px_#0000002a]">
                                {
                                    (correlacaoTopicoCampo[topico] === 'chanceQuitarDivida' || correlacaoTopicoCampo[topico] === 'fatDiv' || correlacaoTopicoCampo[topico] === 'lucFat' || correlacaoTopicoCampo[topico] === 'notaClube' || correlacaoTopicoCampo[topico] === 'custoGol' || correlacaoTopicoCampo[topico] === 'custoJogador' || correlacaoTopicoCampo[topico] === 'custoPonto' || correlacaoTopicoCampo[topico] === 'folha_salarial' || correlacaoTopicoCampo[topico] === 'custoVitoria') ? 'Média dos Clubes'
                                    :
                                    'Total dos Clubes'
                                }
                            </h1>
                            <h2 className="text-sm text-amber-300 text-shadow-[1px_1px_1px_#0000002a]">{valorClubes}</h2>
                    </div>
                </main>
 
            <section className="max-w-full min-w-full mt-8 flex flex-col relative">
                <article className="col-1">
                    <h1 className="font-medium text-lg text-slate-100 text-center">Clubes Brasileiros</h1>

                    <div className="w-full h-full mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center px-4">
                       {loading ? 
                        <div className="flex-1 flex items-center justify-center">
                            <ClipLoader size={30} color='#fff'/>
                        </div>
                        :
                        clubes?.map((clube) => (
                            <div onClick={() => adicionaClube(clube)} className="bg-stone-50 rounded-md shadow-[0px_1px_2px_#0000003a] flex flex-col items-center justify-center max-h-34 min-h-34 w-full cursor-pointer relative scale-80">

                                <div className={`absolute top-1 right-1 flex items-center justify-center p-0.75 rounded-sm shadow-[0px_0px_2px_#0000003a] ${clubesSelecionados.some((c) => c.nome === clube.nome) && 'bg-[#8f79d0] text-white text-shadow-[1px_1px_1px_#0000002a]'}`}>
                                    <i className="fa-solid fa-check text-[10px]"></i>
                                </div>

                                <img className="max-h-22" src={clube.imagem} alt={clube.nome} />
                                <h1 className="text-center text-sky-950">{clube.nome}</h1>
                            </div>
                        ))}
                    </div>
                </article>

            </section>
            </div>
            :
            <MenuAberto />
            }
        </div>
    )
}
