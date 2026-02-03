import "../styles/pagina-inicial.css";
import { useState, useEffect } from "react"
import { allContext } from "../context/all-context";
import { ClipLoader } from "react-spinners";
import { supabase } from "../auth/supabase-client";
import { relacaoClubes, type Clube } from "../components/busca-clube";
import { useNavigate } from "react-router-dom";
import HeaderFixo from "../components/header-fixo";
import MenuAberto from "../components/menu-aberto";


export default function PaginaInicial() {
    const navigate = useNavigate();
    const [valorCuriosidade, setValorCuriosidade] = useState<number>(0);
    const [busca, setBusca] = useState<string>('');
    const [clubes, setClubes] = useState<Clube[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { menuAberto, setTopicoAtivo } = allContext();

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
        setTopicoAtivo('Explorar Dados');

        const intervalo = setInterval(() => {
            setValorCuriosidade((prev) => (prev > 6 ? 0 : prev + 1));
        }, 5000);

        return () => clearInterval(intervalo);
    }, []);

    async function buscaClube(textoDigitado: string) {
        setLoading(true);
        if (textoDigitado === '') {
            setLoading(false);
            setBusca('')
            setClubes(null);
            return;
        }
        const nome_dos_clubes = [
            'Flamengo',
            'São Paulo',
            'Santos',
            'Fortaleza',
            'Palmeiras',
            'Corinthians',
            'Vasco',
            'Fluminense',
            'Botafogo',
            'Grêmio',
            'Internacional',
            'Atlético Mineiro',
            'Cruzeiro',
            'Sport',
            'Ceará',
            'Bahia',
            'Vitória',
            'Mirassol',
            'Bragantino',
            'Juventude'
        ]

        const clubesFiltrados = nome_dos_clubes.filter((nome_clube) => formatarString(nome_clube).includes((formatarString(textoDigitado))));

        const { data, error } = await supabase
            .from('clubes_2025')
            .select('*')
            .in('nome', clubesFiltrados);

        if (error) {
            console.error('Houve um erro ao buscar os clubes', error);
        }
        setLoading(false);
        setClubes(data);

    }

    function formatarString(texto: string) {
        return texto
        .toLocaleLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, "");
    }

    function navegar(nomeClube: string) {
        const nomeRota = relacaoClubes(nomeClube);
        navigate(`/${nomeRota}`);
    }

    return (
        <div>
            <header style={{background: "linear-gradient(to bottom right, #f0f9ff, #fdfeff)"}} className="relative flex flex-col border-b border-b-slate-400/10 min-h-screen">
                     
                <HeaderFixo />

                {!menuAberto ? (
                    <>
                        <div className='flex flex-col items-center px-12 mb-10 mt-20 text-center gap-2'>
                            <h1 className="text-4xl">O raio-X financeiro <br /> do futebol brasileiro</h1>
                            <p className="text-neutral-500 text-center">Descubra quem ganha muito, quem gasta mal e quem tá devendo!</p>
                            <p key={valorCuriosidade} className="animacao-entrada">{curiosidadesFinanceiras[valorCuriosidade]}</p>
                        </div>

                        <div className="relative max-w-3/4 translate-x-1/5 sm:max-w-1/2 sm:translate-x-1/2 lg:max-w-1/3 lg:translate-x-full">
                            <input 
                            className="
                            w-full py-2 pr-4 pl-9 border border-slate-800/20 rounded-full
                            placeholder:text-neutral-500
                            " 
                            placeholder="Buscar clube" 
                            type="search"
                            value={busca}
                            onChange={(e) => {
                                setBusca(e.currentTarget.value);
                                buscaClube(e.currentTarget.value);
                            }}
                            name="buscar-topico" 
                            id="buscar-topico" />

                            <i className="fa-solid fa-magnifying-glass absolute left-0 top-1/2 -translate-y-[40.4%] translate-x-1/2 text-neutral-600"></i>

                            <i onClick={() => setBusca('')} className={`fa-regular fa-circle-xmark absolute top-1/2 -translate-y-[45%] right-0 -translate-x-[66%] cursor-pointer text-lg text-sky-950 ${!busca && 'opacity-0'}`}></i>

                        </div>

                        {loading ? 
                            <ClipLoader color="#000" size={34} className="self-center mt-4" />
                        : 
                            (clubes && clubes.length > 0) ? (
                                <div 
                                className='max-w-3/4 translate-x-1/5 sm:max-w-1/2 sm:translate-x-1/2 lg:max-w-1/3 lg:translate-x-full min-h-20 mt-1 rounded-xl  p-4 pb-0 flex flex-wrap justify-center gap-2'>
                                    {clubes.map((clube, index) => (
                                        <article onClick={() => navegar(clube.nome)} className="max-w-[40%] min-w-[40%] p-2 cursor-pointer mb-2 flex flex-col items-center" key={index}>
                                            <img className="max-h-20 max-w-20 sm:max-w-24 sm:max-h-24 lg:max-w-30 lg:max-h-30" src={clube.imagem} alt="" />
                                            <div className="mt-1 text-stone-700 text-lg">
                                                <h1 className="text-center">{clube.nome}<span className="mx-1">-</span>{clube.estado}</h1>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            ) : !busca ? (
                                <>
                                    <h2 className="max-w-3/4 translate-x-1/5 sm:max-w-1/2 sm:translate-x-1/2 lg:max-w-1/3 lg:translate-x-full ml-2 text-slate-700 font-medium flex items-center mb-8 mt-1 text-[14px]">
                                    <i className="fa-solid fa-circle text-green-500 text-shadow-[1px_1px_1px_#0000001a] text-[8.5px] mr-2 translate-y-[15%]"></i>
                                    Dados atualizados 
                                    <i className="fa-solid fa-circle text-slate-600 text-[3px] mx-1.5 translate-y-[50%]"></i>
                                    <span className="font-normal">Temporada 2026</span>
                                    </h2>

                                    <i className="fa-solid fa-chevron-down self-center text-slate-500 text-lg mb-4"></i>
                                </>
                            ) : (
                                <h1 className="text-center text-xl text-slate-900 mt-4">Nenhum clube encontrado</h1>
                            )
                        }

                    </>
                ) : (
                    <MenuAberto />
                )}
            </header>
        </div>
    )
}
