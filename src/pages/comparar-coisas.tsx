import { buscaTodosClubes, buscaCoisas } from "../components/busca-clube";
import { useEffect, useState } from "react";
import type { Clube, Coisas } from "../components/busca-clube";
import '../styles/teste.css';
import HeaderFixo from "../components/header-fixo";
import { allContext } from "../context/all-context";
import { ClipLoader } from "react-spinners";


interface ClubeSelecionado {
    nome: string;
    imagem: string;
    faturamento: number;
    divida: number;
}

interface Porcentagem {
    porcentagem: number;
    nome: string;
}

export default function CompararCoisas() {
    const {setTopicoAtivo, setAbaEntretenimento} = allContext();
    const [clubes, setClubes] = useState<Clube[]>();
    const [loading, setLoading] = useState<boolean>(true);
    const [clubesSelecionados, setClubesSelecionados] = useState<ClubeSelecionado[]>([]);
    const [coisas, setCoisas] = useState<Coisas[]>();
    const [valorClubes, setValorClubes] = useState<string>('0');
    const [valorCoisas, setValorCoisas] = useState<string>('0');
    const [porcentageCoisas, setPorcentagemCoisas] = useState<Porcentagem[]>();
    const [porcentagemClubes, setPorcentagemClubes] = useState<Porcentagem[]>();

    useEffect(() => {
        setTopicoAtivo('Produto');
        setAbaEntretenimento(true);

        buscaTodosClubes()
            .then((clubes) => setClubes(clubes.data))
            .catch((error) => console.log('Houve um erro', error))
            .finally(() => setLoading(false));

        buscaCoisas()
            .then((todasCoisas) => setCoisas(todasCoisas.data))
            .catch((error) => console.log('Houve um erro', error))
            .finally(() => setLoading(false));
    }, []);

    const adicionaClube = (clubeEscolhido: Clube) => {
        const jaExiste = clubesSelecionados.some((clube) => clube.nome === clubeEscolhido.nome);
        if (jaExiste) {
            const clubesFiltrados = clubesSelecionados.filter((clube) => clube.nome !== clubeEscolhido.nome);
            setClubesSelecionados(clubesFiltrados);
        } else {
            setClubesSelecionados((prev) => [...prev, {
                nome: clubeEscolhido.nome,
                imagem: clubeEscolhido.imagem,
                faturamento: clubeEscolhido.faturamento,
                divida: clubeEscolhido.divida
            }]);
        }
    }

    const atualizaQuantidade = (index: number, novaQuantidade: number) => {
        if (!coisas) return;
        const novasCoisas = [...coisas];
        novasCoisas[index].quantidade = Math.max(0, novaQuantidade);
        setCoisas(novasCoisas);
    }

    useEffect(() => {
        if (coisas) {
            const coisasFiltrado = coisas.filter((coisa) => coisa.quantidade > 0);
            const coisasCusto = coisasFiltrado.map((coisa) => coisa.custo * coisa.quantidade);
            const somaCoisas = coisasCusto.reduce((acc, coisaCusto) => {
                return acc + coisaCusto;
            }, 0);
            const coisasPorcentagem = coisas.map((coisa) => ({
                porcentagem: ((coisa.custo * coisa.quantidade)/somaCoisas)*100,
                nome: coisa.nome
            }));
            setPorcentagemCoisas(coisasPorcentagem);

            const stringFormatada = 
                somaCoisas >= 1000000000000000000 ?
                `${somaCoisas/1000000000000000000 >= 2 ? `${(somaCoisas/1000000000000000000).toFixed(2)} quintilhões` : `${(somaCoisas/1000000000000000000).toFixed(2)} quintilhão`}`
                :
                somaCoisas >= 1000000000000000 ?
                `${somaCoisas/1000000000000000 >= 2 ? `${(somaCoisas/1000000000000000).toFixed(2)} quadrilhões` : `${(somaCoisas/1000000000000000).toFixed(2)} quadrilhão`}`
                :
                somaCoisas >= 1000000000000 ?
                `${somaCoisas/1000000000000 >= 2 ? `${(somaCoisas/1000000000000).toFixed(2)} trilhões` : `${(somaCoisas/1000000000000).toFixed(2)} trilhão`}`
                :
                somaCoisas >= 1000000000 ?
                `${somaCoisas/1000000000 >= 2 ? `${(somaCoisas/1000000000).toFixed(2)} bilhões` : `${(somaCoisas/1000000000).toFixed(2)} bilhão`}`
                :
                somaCoisas >= 1000000 ?
                `${somaCoisas/1000000 >= 2 ? `${(somaCoisas/1000000).toFixed(2)} milhões` : `${(somaCoisas/1000000).toFixed(2)} milhão`}`
                :
                somaCoisas > 1000 ?
                `${somaCoisas/1000 >= 2 ? `${(somaCoisas/1000).toFixed(2)} mil` : `${(somaCoisas/1000).toFixed(2)}`}`
                :
                `${somaCoisas}`
            
            setValorCoisas(stringFormatada
            );
        }
    }, [coisas]);

    useEffect(() => {
        if (clubesSelecionados) {
            const clubesCusto = clubesSelecionados.map((clube) => clube.faturamento);
            const somaClubes = clubesCusto.reduce((acc, clubeCusto) => {
                return acc + clubeCusto;
            }, 0);
            const clubePorcentagem = clubesSelecionados.map((clube) => ({
                porcentagem: (clube.faturamento/somaClubes)*100,
                nome: clube.nome
            }));
            setPorcentagemClubes(clubePorcentagem);

            const stringFormatada = 
                somaClubes > 1000 ?
                `${somaClubes/1000 >= 2 ? `${(somaClubes/1000).toFixed(2)} bilhões` : `${(somaClubes/1000).toFixed(2)} bilhão`}`
                :
                `${somaClubes} milhões`
            
            setValorClubes(stringFormatada
            );
        }
    }, [clubesSelecionados]);

    return (
        <div style={{ background: "linear-gradient(to bottom right, #1d2330, #3e495e)" }}>
            <HeaderFixo/>

            <div className="min-h-screen flex flex-col items-center pb-10">
            <div className="mt-36 rounded-lg rounded-t-none w-[90%] min-h-100 grid grid-rows-[1fr_15%]">

                <main id="main" className="row-1 grid grid-cols-[1fr_auto_1fr] bg-[#3e495e] relative mx-1 border border-slate-800/20 max-h-100">
                    <div className="absolute min-h-14 top-0 -translate-y-full min-w-full flex justify-between gap-0">
                        <div className="min-h-full min-w-1/2 bg-yellow-500 shadow-[4px_-4px_3px_#0000002a] border border-slate-800/20 rounded-t-xl rounded-br-none -translate-x-px flex items-center justify-center">
                            <h1 className="font-mono text-slate-50 text-shadow-[1px_1px_1px_#0000002a] text-lg">Clubes Brasileiros</h1>
                        </div>

                        <div className="min-h-full min-w-1/2 bg-cyan-500 border border-slate-800/20 rounded-t-xl rounded-bl-xs translate-x-px flex items-center justify-center">
                            <h1 className="font-mono text-slate-50 text-shadow-[1px_1px_1px_#0000002a] text-lg">Coisas do Mundo</h1>
                        </div>
                    </div>

                    <div id="clubes" className="pt-4 flex flex-col lg:flex-row lg:flex-wrap lg:justify-between lg:items-start lg:px-4 lg:content-start items-center gap-4 justify-start p-2 overflow-y-auto pb-4">
                        {clubesSelecionados.map((clube, index) => {

                            const clubeEscolhido = porcentagemClubes?.find((clubePorcentagem) => clube.nome === clubePorcentagem.nome);
                            if (!clubeEscolhido) return;
                            const porcentagemEscolhida = Math.round(clubeEscolhido?.porcentagem) > 100 ? 100 : Math.round(clubeEscolhido?.porcentagem) <= 0 ? 1 : Math.round(clubeEscolhido?.porcentagem);

                            return (
                            <div key={index} className="flex max-h-18 items-center relative px-1 justify-evenly py-2 rounded-md bg-[#32394a] min-w-[90%] max-w-[90%] lg:max-w-[47.5%] lg:min-w-[47.5%]">
                                <img className="max-h-10 max-w-10 sm:max-w-12 sm:max-h-12" src={clube.imagem} alt={clube.nome} />

                                <div className="flex flex-col gap-0.5 text-sm ml-2">
                                    <h1 className="text-slate-100 font-medium">{clube.nome}</h1>
                                    <h1 className="text-yellow-300 text-shadow-[1px_1px_1px_#0000002a]">R$ {clube.faturamento >= 2000 ? `${clube.faturamento/1000} bilhões` : clube.faturamento > 1000 ? `${clube.faturamento/1000} bilhão` : `${clube.faturamento} milhões`}</h1>
                                </div>

                                <span className="absolute bottom-0 left-0 bg-slate-800 min-w-full max-h-2 min-h-1.5 rounded-xl">
                                    <span style={{width: `${porcentagemEscolhida}%`}} className="absolute bottom-0 left-0 min-h-1.5 z-1 bg-amber-400 rounded-xl">
                                    </span>
                                </span>
                            </div>
                            )
                        })}
                    </div>

                    <div className="col-2 min-h-[90%] max-h-[90%] min-w-0.5 max-w-0.5 place-self-center bg-slate-500/20">

                    </div>

                    <div id="coisas" className="col-3 pt-4 flex flex-col lg:flex-row lg:flex-wrap lg:justify-between lg:items-start lg:px-4 lg:content-start items-center gap-4 justify-start p-2 relative overflow-y-auto pb-4">
                        {coisas?.map((coisa) => {

                            const coisaEscolhida = porcentageCoisas?.find((coisaPorcentagem) => coisa.nome === coisaPorcentagem.nome);
                            if (!coisaEscolhida) return;
                            const porcentagemEscolhida = Math.round(coisaEscolhida?.porcentagem) > 100 ? 100 : Math.round(coisaEscolhida?.porcentagem) <= 0 ? 1 : Math.round(coisaEscolhida?.porcentagem);
                            return (
                            coisa.quantidade > 0 &&
                            <div key={coisa.id} className="flex sm:flex-row max-h-20 min-h-20 pt-3 items-center relative pb-3 px-1 justify-between rounded-md bg-[#32394a] min-w-[90%] max-w-[90%] lg:max-w-[47.5%] lg:min-w-[47.5%]">
                                <img className="max-h-14 max-w-[40%] pl-1 sm:pl-4" src={coisa.imagem} alt={coisa.nome} />

                                <div className="flex flex-col gap-0.5 ml-2 min-w-[40%] max-w-[40%] text-center">
                                    <h1 className="text-slate-100 font-medium text-xs">{coisa.nome}</h1>
                                    <h1 className="text-sky-300 text-shadow-[1px_1px_1px_#0000002a] text-xs">R$ 
                                        {coisa.custo >= 1000000000000 ?
                                        `${Math.round(coisa.custo/1000000000000)} tri`
                                        :
                                        coisa.custo >= 1000000000 ?
                                        `${Math.round(coisa.custo/1000000000)} bi`
                                        :
                                        coisa.custo >= 1000000 ?
                                        `${Math.round(coisa.custo/1000000)} mi`
                                        :
                                        `${Math.round(coisa.custo/1000)} mil`
                                        }
                                    </h1>
                                </div>

                                <span className="absolute bottom-0 left-0 bg-slate-800 min-w-[75%] max-h-2 min-h-1.5 rounded-xl">
                                    <span style={{width: `${porcentagemEscolhida}%`}} className='absolute bottom-0 left-0 min-h-1.5 z-1 bg-sky-400 rounded-xl'>
                                    </span>
                                    <span className="absolute bottom-0 -right-[25%] text-sky-100  text-shadow-[1px_1px_1px_#000002a] text-[10px] translate-x-1/5">
                                        {coisa.quantidade}x
                                    </span>
                                </span>
                            </div>
                    )
                    })}
                    </div>

                    <div className="absolute z-1 bottom-0 translate-y-full left-0 min-h-6 min-w-[calc(100%+2px)] bg-[#3e495e] border border-slate-800/20 border-t-slate-800/90 -translate-x-px p-2 grid grid-cols-[1fr_auto_1fr] items-center">
                        <div className="flex flex-col items-center">
                            <h1 className="text-sm text-slate-200 text-shadow-[1px_1px_1px_#0000002a]">Total dos Clubes</h1>
                            <h2 className="text-sm text-amber-300 text-shadow-[1px_1px_1px_#0000002a]">R$ {valorClubes}</h2>
                        </div>

                        <span className="min-h-full min-w-px bg-slate-500/40">

                        </span>

                        <div className="col-3 flex flex-col items-center">
                            <h1 className="text-sm text-slate-200 text-shadow-[1px_1px_1px_#0000002a]">Total das Coisas</h1>
                            <h2 className="text-sm text-sky-300 text-shadow-[1px_1px_1px_#0000002a]">R$ {valorCoisas}</h2>
                        </div>
                    </div>

                </main>
            </div>
 
            <section className="max-w-full min-w-full mt-8 grid grid-cols-2 items-start relative">
                <article className="col-1">
                    <h1 className="font-medium text-lg text-slate-100 text-center">Clubes Brasileiros</h1>

                    <div className="w-full h-full mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center px-4">
                       {loading ? 
                        <div className="flex-1 flex items-center justify-center">
                            <ClipLoader size={30}color='#fff'/>
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

                <span className="min-h-[calc(100%-24px)] absolute top-8 left-1/2 -translate-x-1/2 min-w-0.5 bg-neutral-500">

                </span>

                <article id="article-coisas" className="col-2 overflow-hidden">
                    <h1 className="text-center font-medium text-lg text-slate-100">Coisas do Mundo</h1>

                    <div className="w-full h-full mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center px-4">
                       {loading ? 
                        <div className="flex-1 flex items-center justify-center">
                            <ClipLoader size={30} color='#fff'/>
                        </div>
                        :
                        coisas?.map((coisa, index) => (
                            <div key={index} style={{ rowGap: '6px' }} className="max-h-34 min-h-34 overflow-hidden pt-2 grid grid-rows-[70%_1fr] bg-stone-50 rounded-md shadow-[0px_0px_2px_#0000004a] justify-items-center scale-80">

                                <div className="row-1 max-h-full flex flex-col items-center justify-center pb-1">
                                    <img className="max-h-[90%] max-w-[90%] rounded-lg" src={coisa.imagem} alt="" />
                                    <h1 className="text-[14px] text-zinc-800">{coisa.nome}</h1>
                                </div>

                                <div className="row-2 pt-1 min-w-full max-w-full grid grid-cols-3 scale-x-[1.3] translate-x-[13%]">
                                    <span
                                        onClick={() =>
                                            atualizaQuantidade(index, coisa.quantidade - 1)
                                        }

                                        className="bg-white relative inline-flex items-center justify-center rounded-tr-xs rounded-xs [clip-path:polygon(0_0,100%_0,70%_100%,0_100%)] overflow-hidden max-h-full max-w-full min-w-full pr-[15%] cursor-pointer border border-slate-800/10">
                                        <i className="fa-solid fa-minus text-sm"></i>
                                    </span>

                                    <input className={`-ml-[30%] bg-slate-200/80 relative inline-flex items-center justify-center rounded-none [clip-path:polygon(30%_0,100%_0,70%_100%,0_100%)] overflow-hidden max-h-full max-w-full min-w-full ${Number(coisa.quantidade) >= 10000 ? 'text-[10px]' : 'text-xs'} font-medium text-center border border-slate-800/10 outline-none focus:outline-none focus:ring-0`} type="text" name="quant-item" id="quant-item" placeholder="0" inputMode="numeric" pattern="[0-9]*"
                                        maxLength={5}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            const valor = e.target.value.replace(/\D/g, '');
                                            atualizaQuantidade(index, valor ? Number(valor) : 0);
                                        }}
                                        value={coisa.quantidade} />

                                    <span
                                        onClick={() =>
                                            atualizaQuantidade(index, coisa.quantidade + 1)
                                        }
                                        className="-ml-[60%] bg-[#8f79d0] relative inline-flex items-center justify-center pl-[15%] rounded-xs [clip-path:polygon(30%_0,100%_0,100%_100%,0_100%)] overflow-hidden max-h-full max-w-full min-w-full text-white cursor-pointer border border-slate-800/10">
                                        <i className="fa-solid fa-plus text-sm"></i>
                                    </span>
                                </div>
                            </div>
                        ))}

                    </div>
                </article>
            </section>
            </div>
        </div>
    )
}
