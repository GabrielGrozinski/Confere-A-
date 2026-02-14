import HeaderFixo from "../components/header-fixo"
import { useNavigate } from "react-router-dom";
import { allContext } from "../context/all-context";
import { useEffect, useState } from "react";
import type { Clube } from "../components/busca-clube";
import { buscaTodosClubes, relacaoClubes } from "../components/busca-clube";
import { ClipLoader } from "react-spinners";
import MenuAberto from "../components/menu-aberto";


export default function Produtos() {
    const navigate = useNavigate();
    const {dark, setTopicoAtivo, setAbaEntretenimento, menuAberto} = allContext();
    const [loading, setLoading] = useState<boolean>(true);
    const [clubes, setClubes] = useState<Clube[]>();


    useEffect(() => {
        setTopicoAtivo('Produto');
        setAbaEntretenimento(false);
        buscaTodosClubes()
            .then((data) => setClubes(data.data))
            .catch((error) => console.error('Houve um erro', error))
            .finally(() => setLoading(false));

    }, []);


    function navegar(nomeClube: string) {
        const nomeRota = relacaoClubes(nomeClube);
        navigate(`/${nomeRota}`);
    }


    return (
        <div>
            <HeaderFixo />

            {menuAberto ?
            <MenuAberto />
            :
            <main style={{background: dark ? "linear-gradient(to bottom right, #0b1f33, #0e243d)" : "linear-gradient(to bottom right, #f0f9ff, #fdfeff)"}} className="pt-22 lg:pt-4 min-h-screen pb-4">
                <section className="flex flex-col gap-12 lg:flex-row lg:gap-8 items-center min-h-100 min-w-full px-4">
                    <article className={`flex flex-col gap-4 h-1/2 min-w-[90%] lg:min-w-[40%] p-4 rounded-md ${dark ? 'bg-[#0b1f33] shadow-[0px_0px_2px_#ffffff4a]' : 'bg-[#fdfeff] shadow-[0px_0px_2px_#0000004a]'}`}>
                        <div className="flex lg:flex-row flex-col justify-between">
                            <img className="max-w-55 max-h-55 self-center" src="/comparacao-topico.png" alt="" />
                            <div className="flex flex-col items-center justify-center">
                                <h1 className={`mb-2 font-medium font-mono text-2xl sm:text-3xl lg:text-2xl ${dark && 'text-slate-50'}`}>Compare Clubes</h1>
                                <p className={`text-center mx-4 sm:text-lg lg:text-[16px] ${dark ? 'text-stone-300' : 'text-slate-800'}`}>Explore e compare todos os clubes da Série A. Veja quem mais fatura, quem mais deve e quais são os mais eficientes financeiramente.</p>
                                <button onClick={() => navigate('/comparador-de-clubes')} className="bg-linear-to-br to-[#245cc0] from-[#3f7fe9] rounded-md py-0.5 min-h-10 max-h-10 w-[70%] sm:w-60 lg:w-full xl:w-80 mt-4 text-slate-50 font-medium shadow-[1px_1px_1px_#0000002a] cursor-pointer flex items-center justify-center text-sm">
                                <i className="fa-solid fa-up-right-from-square mr-2"></i> 
                                <span className="">Comparar clubes da Série A</span>
                                </button>
                            </div>
                        </div>

                    </article>

                    <article className={`flex flex-col gap-4 h-1/2 min-w-[90%] lg:min-w-[40%] p-4 rounded-md ${dark ? 'bg-[#0b1f33] shadow-[0px_0px_2px_#ffffff4a]' : 'bg-[#fdfeff] shadow-[0px_0px_2px_#0000004a]'}`}>
                        <div className="flex lg:flex-row flex-col justify-between">
                            <img className="max-w-55 max-h-55 self-center" src="/coisa.png" alt="" />
                            <div className="flex flex-col items-center justify-center">
                                <h1 className={`mb-2 font-medium font-mono text-2xl sm:text-3xl lg:text-2xl ${dark && 'text-slate-50'}`}>Futebol vs Mundo Real</h1>
                                <p className={`text-center mx-4 sm:text-lg lg:text-[16px] ${dark ? 'text-stone-300' : 'text-slate-800'}`}>Descubra o que o faturamento de um clube pode comprar. Um iate? Uma ilha? Uma rede de fast food? Compare com qualquer coisa.</p>
                                <button onClick={() => navigate('/comparador-de-coisas')} className={`rounded-md font-medium border cursor-pointer flex items-center justify-center text-xs mt-4 py-0.5 min-h-10.5 max-h-10.5 w-[70%] ${dark ? 'border-zinc-300/30 text-slate-100' : 'border-zinc-800/30 text-[#222222]'}`}>
                                    <i className="fa-solid fa-computer mr-2 text-lg"></i>
                                    <span className="text-start">
                                        Comparar com outras coisas
                                        <br />
                                        <span className="text-gray-500 text-xs">(Ex: MacDonald's, Iate, Bomba Nuclear)</span> 
                                    </span>
                                </button>
                            </div>
                        </div>

                    </article>

                </section>

                <article className={`flex flex-col mt-12 lg:mt-0 gap-4 h-1/2 min-w-[90%] mx-[2%] lg:mx-0 lg:translate-x-[5%] lg:max-w-[90%] max-w-full p-4 rounded-md ${dark ? 'bg-[#0b1f33] shadow-[0px_0px_2px_#ffffff4a]' : 'bg-[#fdfeff] shadow-[0px_0px_2px_#0000004a]'}`}>
                    <div className="flex lg:flex-row flex-col justify-between">
                        <img className="max-w-55 max-h-55 self-center" src="/faturamento-topico.png" alt="" />
                        <div className="flex flex-col items-center justify-start">
                            <h1 className={`mb-2 font-medium font-mono text-center text-2xl sm:text-3xl lg:text-2xl ${dark && 'text-slate-50'}`}>Como está o seu clube?</h1>
                            <p className={`text-center mx-4 sm:text-lg lg:text-[16px] ${dark ? 'text-stone-300' : 'text-slate-800'}`}>Veja todos os dados financeiros detalhados de um clube: faturamento, lucro, dívida e a probabilidade de quitar seus débitos.</p>

                            <article style={{rowGap: '4px'}} className="w-full flex flex-wrap flex-1 p-4">
                                {loading ? 
                                <div className="flex-1 flex items-center justify-center">
                                    <ClipLoader size={30} color={dark ? '#fff' : '#000'}/>
                                </div>
                                :
                                    clubes &&
                                        clubes.map((clube, index) => (
                                            <article onClick={() => navegar(clube.nome)} className="min-w-[20%] max-w-[20%] h-[14vw] lg:min-w-[10%] lg:max-w-[10%] lg:h-[6vw] max-h-24 p-2 cursor-pointer mb-2 flex flex-col items-center" key={index}>
                                                <img className="max-h-full max-w-full" src={clube.imagem} alt="" />
                                            </article>
                                        ))
                                }
                            </article>
                        </div>
                    </div>

                </article>
            </main>
            }
        </div>
    )
}
