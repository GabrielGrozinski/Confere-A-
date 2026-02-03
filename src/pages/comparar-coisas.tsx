import { buscaTodosClubes } from "../components/busca-clube";
import { useEffect, useState } from "react";
import type { Clube } from "../components/busca-clube";



export default function CompararCoisas() {
    const [clubes, setClubes] = useState<Clube[]>();
    const [loading, setLoading] = useState<boolean>(true);
    const [valor, setValor] = useState<any>('0');
    const [isClubeSelecionado, setIsClubeSelecionado] = useState<boolean>(false);

    useEffect(() => {
        buscaTodosClubes()
            .then((clubes) => setClubes(clubes.data))
            .catch((error) => console.log('Houve um erro', error));
        setLoading(false);
    }, []);

    return (
        <div style={{ background: "linear-gradient(to bottom right, #f0f9ff, #fdfeff)" }} className="min-h-screen flex flex-col items-center">
            <div className="mt-16 border border-slate-800/20 rounded-lg w-[90%] min-h-100 max-h-100 grid grid-rows-[1fr_15%]">
                <main>

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

            <section className="min-h-100 max-h-100 max-w-full min-w-full mt-8 grid grid-cols-2">
                <article className="col-1">
                    <div className={`flex ${!isClubeSelecionado ? 'justify-between' : 'justify-center'} px-4 mb-4`}>
                        <h1 className="font-medium text-lg text-slate-800">Clubes Brasileiros</h1>
                        {!isClubeSelecionado &&
                        <button className={`bg-linear-to-br to-blue-400 from-[#3f7fe9] px-4 rounded-md text-slate-50 text-shadow-[1px_1px_1px_#0000002a] ${isClubeSelecionado ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`}>Adicionar</button>
                        }
                    </div>

                    <div style={{ rowGap: '6px' }} className="w-full h-full mt-2 grid grid-cols-2 gap-4 justify-items-center px-4">
                        {clubes?.map((clube) => (
                            <div className="bg-stone-50 rounded-xl shadow-[0px_1px_2px_#0000003a] flex flex-col items-center max-h-34 min-h-34 w-full cursor-pointer pt-2 relative">
                                <div className={`absolute top-1 right-1 flex items-center justify-center p-0.75 rounded-sm shadow-[0px_0px_2px_#0000003a] ${!isClubeSelecionado && 'bg-[#8f79d0] text-white text-shadow-[1px_1px_1px_#0000002a]'}`}>
                                    <i className="fa-solid fa-check text-[10px]"></i>
                                </div>
                                <img onClick={() => setIsClubeSelecionado(!isClubeSelecionado)} className="max-h-18" src={clube.imagem} alt={clube.nome} />
                                <h1 className="text-center text-sky-950">{clube.nome}</h1>
                            </div>
                        ))}
                    </div>
                </article>

                <article className="col-2">
                    <h1 className="text-center">Outras Coisas</h1>

                    <div style={{ rowGap: '6px' }} className="w-full h-full mt-2 grid grid-cols-2 justify-items-center px-2">
                        <div className="max-h-28 p-2 grid grid-rows-[75%_1fr]">
                            <img className="row-1 max-h-full" src="/jato.png" alt="" />
                            <div className="row-2 min-h-full min-w-full relative flex">
                                <input className="max-h-full max-w-2/3 text-center active:border-none" placeholder="0" type="text" value={valor} />
                                <div className="flex flex-col items-center justify-center max-h-20 text-lg">
                                    <span onClick={() => {
                                        setValor((Number(valor) + 1).toString())
                                    }} className="border-b border-b-slate-900 cursor-pointer pb-0.5">+</span>
                                    <span onClick={() => {
                                        setValor((Number(valor) - 1).toString())
                                    }} className="cursor-pointer">-</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="max-h-28 p-2 grid grid-rows-[75%_1fr]">
                            <img className="row-1 max-h-full" src="/mc.png" alt="" />
                            <div className="row-2 min-h-full min-w-full relative flex">
                                <input className="max-h-full max-w-2/3 text-center active:border-none" placeholder="0" type="text" value={valor} />
                                <div className="flex flex-col items-center justify-center max-h-20 text-lg">
                                    <span onClick={() => {
                                        setValor((Number(valor) + 1).toString())
                                    }} className="border-b border-b-slate-900 cursor-pointer pb-0.5">+</span>
                                    <span onClick={() => {
                                        setValor((Number(valor) - 1).toString())
                                    }} className="cursor-pointer">-</span>
                                </div>
                            </div>
                        </div>

                        <div className="max-h-28 p-2 grid grid-rows-[75%_1fr]">
                            <img className="row-1 max-h-full" src="/carro.png" alt="" />
                            <div className="row-2 min-h-full min-w-full relative flex">
                                <input className="max-h-full max-w-2/3 text-center active:border-none" placeholder="0" type="text" value={valor} />
                                <div className="flex flex-col items-center justify-center max-h-20 text-lg">
                                    <span onClick={() => {
                                        setValor((Number(valor) + 1).toString())
                                    }} className="border-b border-b-slate-900 cursor-pointer pb-0.5">+</span>
                                    <span onClick={() => {
                                        setValor((Number(valor) - 1).toString())
                                    }} className="cursor-pointer">-</span>
                                </div>
                            </div>
                        </div>


                    </div>
                </article>
            </section>
        </div>
    )
}
