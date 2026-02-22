import { allContext } from "../context/all-context";
import { useNavigate } from "react-router-dom";
import { relacaoClubes, buscaTodosClubes } from "./busca-clube";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import type { Clube } from "./busca-clube";


interface Props {
    setMostrarClubes: (value: boolean) => void;
}

export default function CardTodosClubes({setMostrarClubes}: Props) {
    const { dark } = allContext();
    const [loading, setLoading] = useState<boolean>(true);
    const [clubes, setClubes] = useState<Clube[] | undefined>(undefined);
    const navigate = useNavigate();

    function navegar(nomeClube: string) {
        const nomeRota = relacaoClubes(nomeClube);
        navigate(`/${nomeRota}`);
    }

    useEffect(() => {

        buscaTodosClubes()
            .then((clubes) => setClubes(clubes.data))
            .catch((error) => console.log('Houve um erro', error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className={`z-999 relative p-8 min-h-[50vh] min-w-[90vw] max-h-[70vh] max-w-[90vw] rounded-2xl flex flex-col items-center ${dark ? 'bg-[#222222]' : 'bg-white'}`}>
            <i onClick={() => setMostrarClubes(false)} className={`fa-solid fa-xmark absolute top-0 right-0 translate-y-1/2 -translate-x-1/2 cursor-pointer ${dark ? 'text-slate-50' : 'text-slate-900'}`}></i>
            
            <h1 className={`text-xl text-center font-bold leading-[1.1] tracking-tight mb-6 ${dark ? 'text-white' : 'text-[#222222]'}`}>
                Escolha um clube para analisar
            </h1>

            {loading ? 
            <div className="flex-1 flex items-center justify-center">
                <ClipLoader size={30} color='#fff'/>
            </div>
            :
            <div className="flex-wrap flex justify-center overflow-y-auto">
            {clubes?.map((clube) => (
                <div onClick={() => navegar(clube.nome)} className={`max-w-28 rounded-md shadow-[0px_1px_2px_#0000003a] flex flex-col items-center gap-1 justify-center max-h-29 min-h-29 w-full cursor-pointer relative scale-80 border ${dark ? 'bg-zinc-900 border-slate-500/20 hover:bg-amber-400' : 'bg-zinc-200 border-slate-800/20 hover:bg-amber-400'}`}>
                    <img className="max-h-14 max-w-14" src={clube.imagem} alt={clube.nome} />
                    <h1 className={`text-center font-medium ${dark ? 'text-sky-50 text-shadow-[1px_1px_1px_#0000001a]' : 'text-slate-950 text-shadow-[0px_1px_1px_#0000002a]'}`}>{clube.nome}</h1>
                </div>
            ))}
            </div>
            }
        </div>
    )
}