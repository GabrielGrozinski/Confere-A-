import "../styles/pagina-inicial.css";
import { useState, useEffect } from "react"
import { allContext } from "../context/all-context";
import fundo from '../assets/imagens/fundo.png';

interface Clube {
    id: number;
    valor: string;
    nome: string;
    imagem: string;
    variacao: string;
}

interface Topico {
    id: string;
    titulo: string;
    icone: string;
    imagemdeFundo: string;
    cor: string;
    pergunta: string;
    clubes: Clube[];
}

export default function PaginaInicial() {
    const [menuAberto, setMenuAberto] = useState<boolean>(false);
    const [valorCuriosidade, setValorCuriosidade] = useState<number>(0);
    const { largura } = allContext();

    const curiosidadesFinanceiras = [
    "Se você pagasse R$1 milhão da dívida do Corinthians por dia, levaria quase 3.000 dias para quitá-la!",
    "O Palmeiras arrecadou mais de R$700 milhões com venda de jogadores em um único ano.",
    "A dívida total do futebol brasileiro ultrapassa R$10 bilhões.",
    "O Flamengo já fatura mais de R$1 bilhão por ano — mais que muitas empresas médias do Brasil.",
    "O Santos já teve folha salarial menor que o valor de uma única venda do Palmeiras.",
    "Mesmo campeão, muitos clubes gastam mais de 80% da receita só com salários.",
    "Há clubes na Série A que gastam mais com juros de dívida do que com contratações.",
    "Uma venda de jogador pode pagar a folha salarial de um clube médio por um ano inteiro."
    ];

    useEffect(() => {
        const intervalo = setInterval(() => {
            setValorCuriosidade((prev) => (prev > 6 ? 0 : prev + 1));
        }, 5000);

        return () => clearInterval(intervalo);
    }, []);


    const topicos: Topico[] = [
        {
            id: "faturamento",
            titulo: "Maiores faturamentos",
            icone: "fa-money-bill-trend-up",
            imagemdeFundo: "/faturamento.png",
            cor: "#56ce90",
            pergunta: "Quem fatura mais, leva mais títulos?",
            clubes: [
                {
                    id: 1,
                    valor: "R$ 850 milhões",
                    nome: "São Paulo",
                    imagem: "/sp.png",
                    variacao: "+25,4%"
                },
                {
                    id: 2,
                    valor: "R$ 650 milhões",
                    nome: "Santos",
                    imagem: "/santos.png",
                    variacao: "+12,0%"
                },
                {
                    id: 3,
                    valor: "R$ 600 milhões",
                    nome: "Grêmio",
                    imagem: "/gremio.png",
                    variacao: "+14,1%"
                },
                {
                    id: 4,
                    valor: "R$ 350 milhões",
                    nome: "Palmeiras",
                    imagem: "/palmeiras.png",
                    variacao: "-4,2%"
                }
            ]
        },
        {
            id: "dividas",
            titulo: "Maiores dívidas",
            icone: "fa-money-bill-trend-down",
            imagemdeFundo: "/divida.png",
            cor: "#ef4444",
            pergunta: "Quem está mais endividado?",
            clubes: [
                {
                    id: 1,
                    valor: "R$ 450 milhões",
                    nome: "Flamengo",
                    imagem: "/sp.png",
                    variacao: "+8,3%"
                },
                {
                    id: 2,
                    valor: "R$ 380 milhões",
                    nome: "Corinthians",
                    imagem: "/santos.png",
                    variacao: "+15,2%"
                },
                {
                    id: 3,
                    valor: "R$ 320 milhões",
                    nome: "Vasco",
                    imagem: "/gremio.png",
                    variacao: "+5,8%"
                },
                {
                    id: 4,
                    valor: "R$ 280 milhões",
                    nome: "Botafogo",
                    imagem: "/palmeiras.png",
                    variacao: "-2,1%"
                }
            ]
        },
        {
            id: "folhas-salariais",
            titulo: "Maiores folhas salariais",
            icone: "fa-money-bill-wave",
            imagemdeFundo: "/salario.png",
            cor: "#3b82f6",
            pergunta: "Quem gasta mais com salários?",
            clubes: [
                {
                    id: 1,
                    valor: "R$ 250 milhões/ano",
                    nome: "PSG",
                    imagem: "/sp.png",
                    variacao: "+18,5%"
                },
                {
                    id: 2,
                    valor: "R$ 220 milhões/ano",
                    nome: "Manchester City",
                    imagem: "/santos.png",
                    variacao: "+12,3%"
                },
                {
                    id: 3,
                    valor: "R$ 200 milhões/ano",
                    nome: "Barcelona",
                    imagem: "/gremio.png",
                    variacao: "+9,7%"
                },
                {
                    id: 4,
                    valor: "R$ 180 milhões/ano",
                    nome: "Real Madrid",
                    imagem: "/palmeiras.png",
                    variacao: "+7,4%"
                }
            ]
        },
        {
            id: "superavits",
            titulo: "Maiores superávits",
            icone: "fa-chart-line",
            imagemdeFundo: "/lucro.png",
            cor: "#10b981",
            pergunta: "Quem tem os melhores números?",
            clubes: [
                {
                    id: 1,
                    valor: "R$ 125 milhões",
                    nome: "Atlético Mineiro",
                    imagem: "/sp.png",
                    variacao: "+22,1%"
                },
                {
                    id: 2,
                    valor: "R$ 98 milhões",
                    nome: "Fortaleza",
                    imagem: "/santos.png",
                    variacao: "+19,4%"
                },
                {
                    id: 3,
                    valor: "R$ 85 milhões",
                    nome: "Cebolinha",
                    imagem: "/gremio.png",
                    variacao: "+16,8%"
                },
                {
                    id: 4,
                    valor: "R$ 72 milhões",
                    nome: "Internacional",
                    imagem: "/palmeiras.png",
                    variacao: "+13,2%"
                }
            ]
        }
    ];

    return (
        <body style={{background: "linear-gradient(to bottom right, #f0f9ff, #f0fdfa)"}}>
            <header className="relative flex flex-col border-b border-b-slate-400/10">
                
                {largura < 1024 && (
                    <div className="flex justify-between border-b border-b-neutral-800/20 px-4 pt-4 pb-2">
                        <h1 className="font-[MONELOS] text-3xl">Confere Aê</h1>
                        <div>
                            <button className="mr-4 cursor-pointer bg-blue-500 py-1 px-2 rounded-xl text-slate-100 shadow-[1px_1px_2px_#0000002a]">Baixar aplicativo</button>
                            <i onClick={() => setMenuAberto(!menuAberto)} className={`fa-solid ${menuAberto ? "fa-xmark" : "fa-bars"} cursor-pointer text-xl text-zinc-900`}></i>
                        </div>
                    </div>
                )}

                <div className="flex flex-col items-center mt-4 px-12 mb-10 text-center gap-2">
                    <h1 className="text-4xl">O raio-X financeiro <br /> do futebol brasileiro</h1>
                    <p className="text-neutral-500 text-center">Descubra quem ganha muito, quem gasta mal e quem tá devendo!</p>
                    <p key={valorCuriosidade} id="curiosidade-texto">{curiosidadesFinanceiras[valorCuriosidade]}</p>
                </div>
            </header>

            <main className="bg-white pt-4">
                {!menuAberto ? (
                    <section id="container-topicos" className="">
                        {topicos.map((topico) => (
                            <div key={topico.id} className="flex flex-wrap mb-20 justify-center">
                                <div className="relative z-1 shadow-[1px_0px_1px_#0000004a] mb-4 col-span-full">
                                    <img className="rounded-md h-full w-full" src={topico.imagemdeFundo} alt={topico.titulo} />

                                </div>

                                {topico.clubes.map((clube) => (
                                    <article key={clube.id} className="flex flex-col mb-6 mx-6 max-w-[40%] p-2 col-2 gap-1 cursor-pointer rounded-xl items-center border border-slate-900/40 transition-colors duration-300 hover:bg-amber-50">
                                        <img className="max-h-18 max-w-18" src={clube.imagem} alt={clube.nome} />
                                        <div className="p-2 px-6 rounded-md flex flex-col justify-center items-center">
                                            <h2 className=""><strong>{clube.nome}</strong> - SP</h2>
                                            <h1 className="">{clube.valor}</h1>
                                            <h2 className="">{clube.variacao}</h2>
                                        </div>

                                        <div className="absolute opacity-0 flex flex-col mr-1 justify-between items-end">
                                            <i className="fa-solid fa-angle-right cursor-pointer"></i>
                                            
                                        </div>
                                    </article>
                                ))}
                            </div>
                        ))}
                    </section>
                ) : (
                    <section>
                        <article></article>
                    </section>
                )}
            </main>
        </body>
    )
}