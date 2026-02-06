import { allContext } from "../context/all-context";
import { useNavigate } from "react-router-dom";

export default function CardProduto() {
    const { setMostrarCard } = allContext();
    const navigate = useNavigate();

    return (
        <div className="absolute z-1 bg-white top-1/2 left-1/2 -translate-1/2 p-8 max-w-4/5 min-w-4/5 min-h-70 max-h-70 rounded-2xl sm:min-w-120 sm:max-w-120">
            <i onClick={() => setMostrarCard(false)} className="fa-solid fa-xmark absolute top-0 right-0 translate-y-1/2 -translate-x-1/2 cursor-pointer"></i>
            <h1 className="text-center text-[#222222] font-medium text-xl mb-1">Confere Aê!</h1>
            <p className="text-zinc-600 text-[15px] font-mono text-center tracking-tighter">Veja como seu clube se posiciona dentro e fora do futebol</p>

            <div className="mt-6 rounded-sm p-2 flex flex-col justify-between gap-3">
                <button className="bg-linear-to-br to-[#245cc0] from-[#3f7fe9] rounded-md py-1 min-h-11 max-h-11 text-slate-50 font-medium shadow-[1px_1px_1px_#0000002a] cursor-pointer flex items-center justify-center text-sm">
                 <i className="fa-solid fa-up-right-from-square mr-2"></i> 
                 <span className="">Comparar clubes da Série A</span>
                </button>

                <button onClick={() => navigate('/comparador-de-coisas')} className="bg-linear-to-br rounded-md text-[#222222] font-medium border border-zinc-800/30 cursor-pointer flex items-center justify-center text-xs py-1 max-h-11 min-h-11">
                    <i className="fa-solid fa-computer mr-2 text-sm"></i>
                    <span className="text-start">
                        Comparar com outras coisas
                        <br />
                        <span className="text-gray-500 text-xs">(Ex: MacDonald's, Iate, Bomba Nuclear)</span> 
                    </span>
                </button>
            </div>
        </div>
    )
}