import HeaderFixo from "../components/header-fixo";
import { allContext } from "../context/all-context";
import { useEffect } from "react";


export default function Preco() {
    const {setTopicoAtivo, dark} = allContext();

    useEffect(() => {
        setTopicoAtivo('Preço');
    }, []);

    return (
        <div>
            <HeaderFixo />

            <div style={{background: dark ? "linear-gradient(to bottom right, #0b1f33, #0e243d)" : "linear-gradient(to bottom right, #f7fbff, #fdfeff)"}} className="min-h-screen pt-18 flex flex-col items-center">

                <h1 className="text-white text-center text-4xl mt-20 mb-14">Todos os planos</h1>

                <div className="bg-[#222222] min-h-140 min-w-80 rounded-xl flex flex-col p-8">
                    <h1>Gratuito</h1>

                    <h2 className="flex">
                        R$
                        <span>
                            0
                            <span>
                                Pague apenas uma vez
                            </span>
                        </span>
                    </h2>

                    <p>
                        Confira o Confere Aê oferece
                    </p>
                </div>

            </div>
        </div>
    )
}
