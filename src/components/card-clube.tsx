import type { Clube } from "./busca-clube";
import { useEffect, useState } from "react";


interface props {
    clubeEscolhido: Clube | undefined;
}

interface InfoCardProps {
  titulo: string;
  subtitulo?: string;
  valor: string | number;
  valorNumero: number;
  sufixo?: string;
  icon?: string;
}

export function InfoCard({ titulo, valor, valorNumero, subtitulo, sufixo, icon }: InfoCardProps) {
  return (
    <div className='max-w-[45%] min-w-[45%] cursor-pointer relative bg-white shadow-[1px_1px_3px_#0000002a] rounded-2xl flex flex-col justify-center pl-4 pr-2 gap-1 max-h-26'>
      <h2 className="text-slate-700 font-mono">
        <i className={`${icon}`}></i>{" "}
        <span>{titulo}</span>
      </h2>

      <p className="font-medium text-zinc-800">
        {subtitulo}
      </p>

      <p className='text-xl font-[manrope] font-semibold text-[#222222]'>
        {valor} {sufixo}
      </p>

      <i className="fa-solid fa-angle-right absolute bottom-0 right-0 -translate-x-1/2 -translate-y-[75%]"></i>
    </div>
  );
}


export default function CardClube({ clubeEscolhido }: props) {
    const [loading, setLoading] = useState<boolean>(true);

    if (!clubeEscolhido) return;

    const cards = [
        {
            titulo: "Faturamento (2025)",
            icon: "fa-solid fa-sack-dollar text-sky-900",
            valor: clubeEscolhido.faturamento,
            sufixo: clubeEscolhido.faturamento < 1000 ? "mi" : "bi",
        },
        {
            titulo: "Balanço (2025)",
            icon: "fa-solid fa-chart-line text-slate-900",
            valor: clubeEscolhido.lucro,
            sufixo: clubeEscolhido.lucro < 1000 ? "mi" : "bi",
        },
        {
            titulo: "Dívida",
            icon: "fa-solid fa-triangle-exclamation text-amber-500",
            valor: clubeEscolhido.divida,
            sufixo: clubeEscolhido.divida < 1000 ? "mi" : "bi",
        },
        {
            titulo: "Folha Salarial",
            icon: "fa-solid fa-users text-blue-600",
            valor: clubeEscolhido.folha_salarial,
            sufixo: clubeEscolhido.folha_salarial < 1000 ? "mi" : "bi",
        },
        {
            titulo: "Gastos com Contratações",
            icon: "fa-solid fa-money-bill-transfer text-green-600",
            valor: clubeEscolhido.valor_contratacoes,
            sufixo: clubeEscolhido.valor_contratacoes < 1000 ? "mi" : "bi",
        },
        {
            titulo: "Maior Contratação",
            subtitulo: clubeEscolhido.maior_contratacao.split(' - ')[0],
            valor: Number(clubeEscolhido.maior_contratacao.split(' - ')[1].split(' ')[0])*6,
            sufixo: clubeEscolhido.valor_contratacoes < 1000 ? "mi" : "bi",
        },
    ];


    return (
        <main className="h-screen p-4 bg-[#eeedf1] flex flex-col">
            <div className="col-span-full row-1 flex flex-col items-center mt-2 max-h-50 mb-10">
                <img className="max-h-40 max-w-40" src={clubeEscolhido.imagem} alt="" />
                <h1 className="text-3xl">{clubeEscolhido.nome}</h1>
            </div>
            <div className="flex flex-wrap justify-between px-1 min-h-100">
                {cards.map((card, index) => (
                    <InfoCard
                    key={index}
                    titulo={card.titulo}
                    subtitulo={card.subtitulo}
                    icon={card.icon}
                    valor={`R$ ${card.valor}`}
                    valorNumero={card.valor}
                    sufixo={card.sufixo}
                    />
                ))}
            </div>

        </main>
    )
}
