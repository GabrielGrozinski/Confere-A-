import { buscaTodosClubes } from "../components/busca-clube";
import { useEffect, useState, useMemo } from "react";
import type { Clube } from "../components/busca-clube";
import '../styles/comparacao-unica.css';
import { allContext } from "../context/all-context";
import {
  Clapperboard,
  Store,
  Coins,
  Swords,
  Goal,
  Car, 
  House, 
  Plane, 
  Ship
} from "lucide-react";
import * as Popover from '@radix-ui/react-popover';
import AdsenseLeft from "../components/adsense-left";
import AdsenseRight from "../components/adsense-right";
import CardsPremium from "../components/cards-premium";


type TopicoComparacao = {
  label: Topico;
  categoria: 'SP' | 'RJ' | 'RS' | 'MG' | 'CE' | 'BA' | 'PE'
}

type ClubeNome =
'Corinthians' | 'São Paulo' | 'Palmeiras' | 'Mirassol' | 'Bragantino' | 'Santos' | 'Flamengo' | 'Vasco' | 'Fluminense' | 'Botafogo' | 'Internacional' | 'Grêmio' | 'Atlético Mineiro' | 'Juventude' | 'Cruzeiro' | 'Ceará' | 'Fortaleza' | 'Bahia' | 'Vitória' | 'Sport' | string;

type Topico =
'Faturamento' | 'Dívida' | string;

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


export default function ClubeVsMundo() {
    const {setTopicoAtivo, setAbaEntretenimento, dark, largura, assinanteAtual} = allContext();
    const [popoverAberto1, setPopoverAberto1] = useState(false);
    const [popoverAberto2, setPopoverAberto2] = useState(false);
    const [clubes, setClubes] = useState<Clube[]>();
    const [clubeA, setClubeA] = useState<Clube | undefined>();
    const [clubeANome, setClubeANome] = useState<ClubeNome>('Corinthians');
    const [topicoEscolhido, setTopicoEscolhido] = useState<Topico>('Faturamento');
    const [valorTopico, setValorTopico] = useState<number>(0);

    const topicosComparacao: TopicoComparacao[] = [
        // ---------------- SP ----------------
        { label: 'Corinthians', categoria: 'SP' },
        { label: 'São Paulo', categoria: 'SP' },
        { label: 'Palmeiras', categoria: 'SP' },
        { label: 'Mirassol', categoria: 'SP' },
        { label: 'Santos', categoria: 'SP' },
        { label: 'Bragantino', categoria: 'SP' },

        // ---------------- RJ ----------------
        { label: 'Flamengo', categoria: 'RJ' },
        { label: 'Fluminense', categoria: 'RJ' },
        { label: 'Vasco', categoria: 'RJ' },
        { label: 'Botafogo', categoria: 'RJ' },

        // ---------------- RS ----------------
        { label: 'Internacional', categoria: 'RS' },
        { label: 'Grêmio', categoria: 'RS' },
        { label: 'Juventude', categoria: 'RS' },

        // ---------------- MG ----------------
        { label: 'Cruzeiro', categoria: 'MG' },
        { label: 'Atlético Mineiro', categoria: 'MG' },

        // ---------------- CE ----------------
        { label: 'Ceará', categoria: 'CE' },
        { label: 'Fortaleza', categoria: 'CE' },

        // ---------------- BA ----------------
        { label: 'Bahia', categoria: 'BA' },
        { label: 'Vitória', categoria: 'BA' },

        // ---------------- PE ----------------
        { label: 'Sport', categoria: 'PE' },
    ];

    type FinancialSection = {
    category: string;
    title: string;
    icon: string;
    price: string;
    quantity: number;
    };

    function distribuirComDistancia<T extends { category: string }>(
        items: T[]
    ): T[] {
        const embaralhado: T[] = [...items].sort(() => Math.random() - 0.5)

        const resultado: T[] = []

        while (embaralhado.length > 0) {
            let indexValido = embaralhado.findIndex((item) => {
                if (resultado.length === 0) return true

                const ultimo = resultado[resultado.length - 1]
                return item.category !== ultimo.category
            })

            // fallback caso só sobrem categorias iguais
            if (indexValido === -1) indexValido = 0

            const [itemSelecionado] = embaralhado.splice(indexValido, 1)
            resultado.push(itemSelecionado)
        }

        return resultado
    }

    const financialData: FinancialSection[] = useMemo(() => {
        if (!clubeA || !valorTopico) return [];
        const lista = [
            {
                category: "Carro de Luxo",
                title: "Ferrari SF90 Stradale",
                price: "R$ 4.5M cada",
                quantity: Math.floor(valorTopico/4.5),
                icon: "car"
            },
            {
                category: "Imóvel",
                title: "Mansão em Alphaville",
                price: "R$ 25M cada",
                quantity: Math.floor(valorTopico/25),
                icon: "house"
            },
            {
                category: "Aeronave",
                title: "Jato Executivo G650",
                price: "R$ 380M cada",
                quantity: Math.floor(valorTopico/380),
                icon: "plane"
            },
            {
                category: "Embarcação",
                title: "Iate de 50 metros",
                price: "R$ 150M cada",
                quantity: Math.floor(valorTopico/150),
                icon: "ship"
            },
            {
                category: "Imóvel",
                title: "Cobertura em Ipanema",
                price: "R$ 42M cada",
                quantity: Math.floor(valorTopico/42),
                icon: "house"
            },
            {
                category: "Carro de Luxo",
                title: "Bugatti Chiron",
                price: "R$ 15M cada",
                quantity: Math.floor(valorTopico/15),
                icon: "car"
            },      
            {
                category: "Cultura Pop",
                title: "Filme de Hollywood",
                price: "R$ 1.1B cada",
                quantity: Math.floor(valorTopico/1100),
                icon: "clapperboard"
            },
            {
                category: "Cultura Pop",
                title: "1 ano de Netflix",
                price: "R$ 600 cada",
                quantity: Math.floor(valorTopico/(600/1000/1000)),
                icon: "clapperboard"
            },
            {
                category: "Empresa",
                title: "McDonald's",
                price: "R$ 40M cada",
                quantity: Math.floor(valorTopico/40),
                icon: "store"
            },
            {
                category: "Financeiro",
                title: "Bitcoin",
                price: "R$ 0.35M cada",
                quantity: Math.floor(valorTopico/0.35),
                icon: "coins"
            },
            {
                category: "Produto Militar",
                title: "Tanque de Guerra",
                price: "R$ 50M cada",
                quantity: Math.floor(valorTopico/50),
                icon: "swords"
            },
            {
                category: "Imóvel",
                title: "Hotel 5 Estrelas",
                price: "R$ 650M cada",
                quantity: Math.floor(valorTopico/650),
                icon: "house"
            },
            {
                category: "Financeiro",
                title: "Barra de Ouro",
                price: "R$ 3.5M cada",
                quantity: Math.floor(valorTopico/3.5),
                icon: "coins"
            },
            {
                category: "Futebol",
                title: "Estádio",
                price: "R$ 835M cada",
                quantity: Math.floor(valorTopico/835),
                icon: "goal"
            },
            {
                category: "Futebol",
                title: "Kyllian Mbappé",
                price: "R$ 1.4B cada",
                quantity: Math.floor(valorTopico/1400),
                icon: "goal"
            },
            {
                category: "Embarcação",
                title: "Iate Seven Seas",
                price: "R$ 960M cada",
                quantity: Math.floor(valorTopico/960),
                icon: "ship"
            },
            {
                category: "Imóvel",
                title: "Ilha Particular",
                price: "R$ 200M cada",
                quantity: Math.floor(valorTopico/200),
                icon: "house"
            }
        ];
        return distribuirComDistancia(lista);

    }, [clubeA, valorTopico]);

    useEffect(() => {
        if (!clubes || !topicoEscolhido) return;
        const clubeAEscolhido: Clube[] = clubes?.filter((clube) => clube.nome === clubeANome);
        const topicoAtual = 
            topicoEscolhido === 'Faturamento' ? 
            {   
                topico: 'Faturamento',
                valor: clubeAEscolhido[0]?.faturamento
            } 
            : 
            {   
                topico: 'Dívida',
                valor: clubeAEscolhido[0]?.divida
            } 

        if (clubeAEscolhido) {

            setClubeA(clubeAEscolhido[0]);
            setTopicoEscolhido(topicoAtual.topico);
            setValorTopico(topicoAtual.valor);
        }

    }, [clubeANome, clubes, topicoEscolhido]);

    useEffect(() => {
        setTopicoAtivo('Produto');
        setAbaEntretenimento(true);
        window.scrollTo({
            top: 0
        });
        
        buscaTodosClubes()
            .then((clubes) => {
                setClubes(clubes.data);
                const todosClubes = clubes.data;
                const corinthians = todosClubes?.filter((clube) => clube.nome === 'Corinthians');
                if (corinthians) {
                    setClubeA(corinthians[0]);
                }
            })
            .catch((error) => console.log('Houve um erro', error));
    }, []);

    const agrupadosPorCategoria = topicosComparacao.reduce((acc, topico) => {
        if (!acc[topico.categoria]) {
            acc[topico.categoria] = [];
        }
        acc[topico.categoria].push(topico);
        return acc;
    }, {} as Record<string, TopicoComparacao[]>);
    


    return (
        <div style={{ background: dark ? "linear-gradient(to bottom right, #0d1015, #080c14)" : "linear-gradient(to bottom right, #f7fbff, #fdfeff)"}}>

            <div className="min-h-screen grid grid-cols-[auto_1fr_auto] lg:px-4 items-center pt-2 pb-4">

                {(assinanteAtual !== 'Sócio' && assinanteAtual !== 'Torcedor') &&
                    <AdsenseLeft />
                }

                <main id="main-clube-vs-clube" className={`col-2 ${(assinanteAtual !== 'Sócio' && assinanteAtual !== 'Torcedor') ? 'lg:max-w-250 lg:min-w-250' : 'lg:min-w-[80%] lg:max-w-[80%] lg:translate-x-[10vw]'} scale-90 lg:scale-100`}>
                    <h2 className={`text-[32px] text-center md:text-[40px] font-bold mt-2 tracking-[-0.015em] ${dark ? 'text-white' : 'text-[#222222]'}`}>
                    Além do Futebol
                    </h2>
                    <p className={`text-base text-center mt-2 ${dark ? 'text-[rgb(218,218,218)]' : 'text-zinc-700'}`}>
                    A dívida do seu clube compra quantas Ferraris? Descubra comparações surpreendentes.
                    </p>


                    <div className="w-full mx-auto flex items-center justify-center">

                        <div className="opacity-100 transform-none min-w-full mt-4 mb-20">
                            <div className={`border rounded-2xl p-6 md:p-10 lg:pl-4 lg:pr-2 max-h-160 overflow-y-hidden ${dark ? 'bg-[rgb(26,28,30)] border-white/10' : 'bg-slate-200 border-slate-800/20'}`}>
                            
                                <div className="grid grid-cols-2 gap-6 mb-10 lg:pl-6 lg:pr-8">
                                    
                                    <div>
                                        <label className={`text-xs font-medium mb-2 block uppercase tracking-wider ${dark ? 'text-[rgb(161,161,170)]' : 'text-neutral-900'}`}>
                                            Clube Escolhido
                                        </label>
                                        <div className={`border-2 rounded-xl pl-1 pr-3 text-sm font-medium appearance-none max-h-13 min-h-13 focus:shadow-[0_0_0_4px_rgba(218,255,1,0.1)] transition-all flex items-center cursor-pointer ${dark ? 'bg-[rgb(38,40,42)] border-[rgb(63,63,63)]' : 'bg-white border-slate-700/30'}`}>
                                        <Popover.Root open={popoverAberto1} onOpenChange={setPopoverAberto1}>
                                        <Popover.Trigger asChild>
                                            <button className="font-medium flex items-center w-full justify-between cursor-pointer pl-1 sm:pl-4.5 lg:pl-2.5 min-h-13 max-h-full">
                                                <strong>
                                                    <span className={`p-0.5 flex rounded-md font-medium cursor-pointer ${largura >= 400 ? 'text-base' : 'text-xs'} items-center ${dark ? 'text-[#DAFF01] text-shadow-[1px_1px_1px_#0000002a]' : 'text-zinc-800'}`}>{clubeANome}
                                                    </span>
                                                </strong>
                                                <i className={`fa-solid fa-angle-down ml-1 translate-y-[10%] text-shadow-[1px_1px_1px_#0000002a] ${dark ? 'text-[#DAFF01]' : 'text-zinc-800'}`}></i>
                                            </button>
                                        </Popover.Trigger>

                                        <Popover.Portal>
                                            <Popover.Content
                                            sideOffset={8}
                                            className="w-96 max-h-96 overflow-y-auto rounded-xl bg-[rgb(38,40,42)] mt-2 border border-gray-200/70 p-4 shadow-xl z-10 scale-90 lg:scale-100"
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
                                                                setClubeANome(item.label);
                                                                setPopoverAberto1(false);
                                                            }}
                                                            className={`
                                                            w-full text-left px-3 py-2 rounded-md
                                                            transition
                                                            ${
                                                                clubeANome === item.label
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
                                    
                                    <div>
                                        <label className={`text-xs font-medium mb-2 block uppercase tracking-wider ${dark ? 'text-[rgb(161,161,170)]' : 'text-neutral-900'}`}>
                                            Tópico Escolhido
                                        </label>
                                        <div className={`border-2 rounded-xl pl-1 pr-3 text-sm font-medium appearance-none max-h-13 min-h-13 focus:shadow-[0_0_0_4px_rgba(218,255,1,0.1)] transition-all flex items-center cursor-pointer ${dark ? 'bg-[rgb(38,40,42)] border-[rgb(63,63,63)]' : 'bg-white border-slate-700/30'}`}>
                                        <Popover.Root open={popoverAberto2} onOpenChange={setPopoverAberto2}>
                                        <Popover.Trigger asChild>
                                            <button className="font-medium flex items-center w-full justify-between cursor-pointer pl-1 sm:pl-4.5 lg:pl-2.5 min-h-13 max-h-full">
                                                <strong>
                                                    <span className={`p-0.5 flex rounded-md font-medium cursor-pointer ${largura >= 400 ? 'text-base' : 'text-xs'} items-center ${dark ? 'text-[#DAFF01] sm:text-base text-shadow-[1px_1px_1px_#0000002a]' : 'text-zinc-800'}`}>{topicoEscolhido}
                                                    </span>
                                                </strong>
                                                <i className={`fa-solid fa-angle-down ml-1 translate-y-[10%] text-shadow-[1px_1px_1px_#0000002a] ${dark ? 'text-[#DAFF01]' : 'text-zinc-800'}`}></i>
                                            </button>
                                        </Popover.Trigger>

                                        <Popover.Portal>
                                            <Popover.Content
                                            sideOffset={8}
                                            className="w-96 max-h-96 overflow-y-auto rounded-xl bg-[rgb(38,40,42)] mt-2 border border-gray-200/70 p-4 shadow-xl z-10"
                                            >
                                            <div className="space-y-2">
                                                <button
                                                    onClick={() => {
                                                        setTopicoEscolhido('Faturamento');
                                                        setPopoverAberto2(false);
                                                    }}
                                                    className={`
                                                    w-full text-left px-3 py-2 rounded-md
                                                    transition
                                                    ${
                                                        topicoEscolhido === 'Faturamento'
                                                        ? 'bg-sky-500/20 text-sky-300'
                                                        : 'hover:bg-slate-800 text-slate-200'
                                                    }
                                                    `}
                                                >
                                                    Faturamento
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        setTopicoEscolhido('Dívida');
                                                        setPopoverAberto2(false);
                                                    }}
                                                    className={`
                                                    w-full text-left px-3 py-2 rounded-md
                                                    transition
                                                    ${
                                                        topicoEscolhido === 'Dívida'
                                                        ? 'bg-sky-500/20 text-sky-300'
                                                        : 'hover:bg-slate-800 text-slate-200'
                                                    }
                                                    `}
                                                >
                                                    Dívida
                                                </button>
                                            </div>
                                            </Popover.Content>
                                        </Popover.Portal>
                                        </Popover.Root>

                                        </div>
                                    </div>


                                </div>

                                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-h-100 overflow-y-auto px-2 pt-4">
                                {financialData.map((card, index) => (
                                    <div key={index} className="opacity-100 transform-none">
                                    <div className={`group border-2 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden ${dark ? 'bg-[rgb(26,28,30)] border-white/10 hover:border-[#DAFF01]/80 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]' : 'bg-slate-50 border-zinc-950/20 hover:border-orange-400'}`}>

                                        <div className={`absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${dark ? 'bg-[#DAFF01]' : 'bg-orange-400'}`}></div>

                                        <div className="flex items-center gap-3 mb-4">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${dark ? 'bg-[rgb(38,40,42)]' : 'bg-slate-200'}`}>

                                            {card.icon === "car" && (
                                            <Car className={`w-5 h-5 ${dark ? 'text-[#DAFF01]' : 'text-orange-400'}`} />
                                            )}
                                            {card.icon === "house" && (
                                            <House className={`w-5 h-5 ${dark ? 'text-[#DAFF01]' : 'text-orange-400'}`} />
                                            )}
                                            {card.icon === "plane" && (
                                            <Plane className={`w-5 h-5 ${dark ? 'text-[#DAFF01]' : 'text-orange-400'}`} />
                                            )}
                                            {card.icon === "ship" && (
                                            <Ship className={`w-5 h-5 ${dark ? 'text-[#DAFF01]' : 'text-orange-400'}`} />
                                            )}
                                            {card.icon === "clapperboard" && (
                                            <Clapperboard className={`w-5 h-5 ${dark ? 'text-[#DAFF01]' : 'text-orange-400'}`} />
                                            )}
                                            {card.icon === "store" && (
                                            <Store className={`w-5 h-5 ${dark ? 'text-[#DAFF01]' : 'text-orange-400'}`} />
                                            )}
                                            {card.icon === "coins" && (
                                            <Coins className={`w-5 h-5 ${dark ? 'text-[#DAFF01]' : 'text-orange-400'}`} />
                                            )}
                                            {card.icon === "swords" && (
                                            <Swords className={`w-5 h-5 ${dark ? 'text-[#DAFF01]' : 'text-orange-400'}`} />
                                            )}
                                            {card.icon === "goal" && (
                                            <Goal className={`w-5 h-5 ${dark ? 'text-[#DAFF01]' : 'text-orange-400'}`} />
                                            )}

                                        </div>

                                        <span className={`text-xs font- uppercase tracking-wider ${dark ? 'text-[rgb(161,161,170)]' : 'text-neutral-600'}`}>
                                            {card.category}
                                        </span>
                                        </div>

                                        <h4 className={`text-sm font-semibold mb-1 ${dark ? 'text-white' : 'text-[#222222]'}`}>
                                        {card.title}
                                        </h4>

                                        <p className={`text-xs mb-4 ${dark ? 'text-[rgb(161,161,170)]' : 'text-neutral-600'}`}>
                                        {card.price}
                                        </p>

                                        <div className={`border-t pt-4 ${dark ? 'border-white/5' : 'border-black/15'}`}>
                                        <p className={`text-xs ${dark ? 'text-[rgb(161,161,170)]' : 'text-neutral-500'}`}>
                                            {topicoEscolhido === 'Faturamento' ? 'O' : 'A'} {topicoEscolhido} do {clubeANome} compra
                                        </p>

                                        <p className={`text-3xl font-bold mt-1 ${dark ? 'text-[#DAFF01]' : 'text-orange-400'}`}>
                                            {card.quantity}
                                            <span className={`text-base font-medium ml-1 ${dark ? 'text-[rgb(218,218,218)]' : 'text-[#222222]'}`}>
                                            {card.title === '1 ano de Netflix' ? 'anos' :(card.quantity === 0 || card.quantity > 1) ? 'unidades' : 'unidade'}
                                            </span>
                                        </p>
                                        </div>

                                    </div>
                                    </div>
                                ))}
                                </div>
                            </div>

                        </div>

                    </div>

                    <CardsPremium />
                </main>

                {(assinanteAtual !== 'Sócio' && assinanteAtual !== 'Torcedor') &&
                    <AdsenseRight />
                }
            </div>

        </div>
    )
}
