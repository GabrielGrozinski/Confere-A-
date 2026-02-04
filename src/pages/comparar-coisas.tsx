import { buscaTodosClubes } from "../components/busca-clube";
import { useEffect, useState } from "react";
import type { Clube } from "../components/busca-clube";
import '../styles/teste.css';


interface valorCoisas {
    valor: number;
}

interface Coisas {
    nome: string;
    imagem: string;
    quantidade: number;
}

interface ClubeSelecionado {
    nome: string;
    imagem: string;
    faturamento: number;
    divida: number;
}

export default function CompararCoisas() {
    const [clubes, setClubes] = useState<Clube[]>();
    const [loading, setLoading] = useState<boolean>(true);
    const [valor, setValor] = useState<any>('0');
    const [isClubeSelecionado, setIsClubeSelecionado] = useState<boolean>(false);
    const [clubesSelecionados, setClubesSelecionados] = useState<ClubeSelecionado[]>([]);
    const [coisas, setCoisas] = useState<Coisas[]>([
        {
            nome: 'Aeroporto',
            imagem: '/aeroporto.png',
            quantidade: 0,
        },
        {
            nome: 'Bitcoin',
            imagem: '/bitcoin.png',
            quantidade: 0,
        },
        {
            nome: 'Bomba Nuclear',
            imagem: '/bomba.png',
            quantidade: 0,
        },
        {
            nome: 'Carro',
            imagem: '/carro.png',
            quantidade: 0,
        },
        {
            nome: 'Filme de Hollywood',
            imagem: '/cinema.png',
            quantidade: 0,
        },
        {
            nome: 'Coca',
            imagem: '/coca.png',
            quantidade: 0,
        },
        {
            nome: 'Parque da Disney',
            imagem: '/disney.png',
            quantidade: 0,
        },
        {
            nome: 'Hotel 5 estrelas',
            imagem: '/hotel.png',
            quantidade: 0,
        },
        {
            nome: 'Iate',
            imagem: '/iate.png',
            quantidade: 0,
        },
        {
            nome: 'Ilha',
            imagem: '/ilha.png',
            quantidade: 0,
        },
        {
            nome: 'Jato',
            imagem: '/jato.png',
            quantidade: 0,
        },
        {
            nome: 'Mansão',
            imagem: '/mansao.png',
            quantidade: 0,
        },
        {
            nome: 'Viagem à Marte',
            imagem: '/marte.png',
            quantidade: 0,
        },
        {
            nome: 'Monalisa',
            imagem: '/monalisa.png',
            quantidade: 0,
        },
        {
            nome: 'Ouro',
            imagem: '/ouro.png',
            quantidade: 0,
        },
        {
            nome: 'Playstation',
            imagem: '/playstation.png',
            quantidade: 0,
        },
        {
            nome: 'Tanque de Guerra',
            imagem: '/tanque.png',
            quantidade: 0,
        },
        {
            nome: 'Real Madrid',
            imagem: '/real.png',
            quantidade: 0,
        },

    ])

    useEffect(() => {
        buscaTodosClubes()
            .then((clubes) => setClubes(clubes.data))
            .catch((error) => console.log('Houve um erro', error));
        setLoading(false);
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
        const novasCoisas = [...coisas];
        novasCoisas[index].quantidade = Math.max(0, novaQuantidade);
        setCoisas(novasCoisas);
    }

    useEffect(() => {

    }, []);

    return (
        <div style={{ background: "linear-gradient(to bottom right, #f0f9ff, #fdfeff)" }} className="min-h-screen flex flex-col items-center">
            <div className="mt-16 border border-slate-800/20 rounded-lg w-[90%] min-h-100 max-h-100 grid grid-rows-[1fr_15%]">
                <main className="grid grid-cols-2 bg-blue-100">
                    <div>
                        {clubesSelecionados.map((clube, index) => (
                            <>
                            <img className="max-h-20 max-w-20" src={clube.imagem} alt={clube.nome} />
                            <h1>{clube.nome}</h1>
                            </>
                        ))}
                    </div>

                    <div>
                        {coisas.map((coisa, index) => (
                            coisa.quantidade > 0 &&
                            <div className="flex">
                                <img className="max-h-20 max-w-20" src={coisa.imagem} alt="" />
                                <h1>{coisa.quantidade}</h1>
                            </div>
                        ))}
                    </div>
                </main>

                <article className="bg-red-400 flex justify-between px-4 py-2 items-center">
                    <div className="text-center">
                        Valor dos clubes
                        <br />
                        R$ 1440
                    </div>

                    <div className="text-center">
                        Valor das coisas
                        <br />
                        R$ 871
                    </div>
                </article>
            </div>

            <section className="min-h-100 max-h-100 max-w-full min-w-full mt-8 grid grid-cols-2 items-start">
                <article className="col-1">
                    <h1 className="font-medium text-lg text-slate-800 text-center">Clubes Brasileiros</h1>

                    <div className="w-full h-full mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center px-4">
                        {clubes?.map((clube) => (
                            <div onClick={() => adicionaClube(clube)} className="bg-stone-50 rounded-md shadow-[0px_1px_2px_#0000003a] flex flex-col items-center justify-center max-h-34 min-h-34 w-full cursor-pointer relative">

                                <div className={`absolute top-1 right-1 flex items-center justify-center p-0.75 rounded-sm shadow-[0px_0px_2px_#0000003a] ${clubesSelecionados.some((c) => c.nome === clube.nome) && 'bg-[#8f79d0] text-white text-shadow-[1px_1px_1px_#0000002a]'}`}>
                                    <i className="fa-solid fa-check text-[10px]"></i>
                                </div>

                                <img className="max-h-22" src={clube.imagem} alt={clube.nome} />
                                <h1 className="text-center text-sky-950">{clube.nome}</h1>
                            </div>
                        ))}
                    </div>
                </article>

                <article id="article-coisas" className="col-2 overflow-hidden">
                    <h1 className="text-center font-medium text-lg text-slate-800">Coisas do Mundo</h1>

                    <div className="w-full h-full mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center px-2">

                        {coisas.map((coisa, index) => (
                        <div key={index} style={{rowGap: '6px'}} className="max-h-34 min-h-34 overflow-hidden pt-2 grid grid-rows-[70%_1fr] bg-stone-50 rounded-md shadow-[0px_0px_2px_#0000004a] justify-items-center">

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
    )
}
