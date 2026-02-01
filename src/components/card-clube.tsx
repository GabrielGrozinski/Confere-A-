import type { Clube, rankings, Medias } from "./busca-clube";
import { useEffect, useState } from "react";
import { AreaChart, Area } from "recharts";
import { allContext } from "../context/all-context";


interface props {
    clubeEscolhido: Clube | undefined;
    rank_do_clube: rankings;
    media: Medias | undefined;
}

interface InfoCardProps {
    titulo: string;
    subtitulo?: string;
    valor: string | number;
    valorNumero: number;
    sufixo?: string;
    icon?: string;
    mediaData: MediaCardData[];
    largura: number;
}

interface MediaCardData {
    valor: number;
    titulo: string;
}

const chartsData = {
    /* ----------------------------------------------------------- UP ----------------------------------------------------------- */

    up_10: [
        { value: 0 },
        { value: 1 },
        { value: 3 },
        { value: 2 },
        { value: 4 },
        { value: 6 },
        { value: 5 },
        { value: 7 },
        { value: 6 },
        { value: 9 },
        { value: 8 },
        { value: 10 },
    ],

    up_25: [
        { value: 0 },
        { value: 4 },
        { value: 8 },
        { value: 6 },
        { value: 12 },
        { value: 18 },
        { value: 15 },
        { value: 22 },
        { value: 22 },
    ],

    up_50: [
        { value: 0 },
        { value: 8 },
        { value: 18 },
        { value: 14 },
        { value: 28 },
        { value: 40 },
        { value: 34 },
        { value: 46 },
        { value: 60 },
    ],

    /* ----------------------------------------------------------- DOWN ----------------------------------------------------------- */

    down_10: [
        { value: 10 },
        { value: 9 },
        { value: 8 },
        { value: 7 },
        { value: 6 },
        { value: 5 },
        { value: 4 },
        { value: 3 },
        { value: 2 },
        { value: 0 },
    ],

    down_25: [
        { value: 25 },
        { value: 22 },
        { value: 24 },
        { value: 18 },
        { value: 15 },
        { value: 12 },
        { value: 8 },
        { value: 4 },
        { value: 0 },
    ],

    down_50: [
        { value: 50 },
        { value: 46 },
        { value: 48 },
        { value: 40 },
        { value: 34 },
        { value: 26 },
        { value: 18 },
        { value: 8 },
        { value: 0 },
    ],

    /* ----------------------------------------------------------- NEUTRO ----------------------------------------------------------- */

    middle_0: [
        { value: 15 },
        { value: 16 },
        { value: 14 },
        { value: 15 },
        { value: 17 },
        { value: 15 },
        { value: 14 },
        { value: 16 },
        { value: 15 },
        { value: 16 },
        { value: 14 },
        { value: 15 },
    ]
};




export function InfoCard({ titulo, valor, valorNumero, subtitulo, sufixo, icon, mediaData, largura }: InfoCardProps) {
    return (
        <div className='cursor-pointer relative bg-slate-50 shadow-[1px_1px_3px_#0000002a] rounded-2xl flex flex-col justify-center pl-4 pr-2 py-2 gap-1 min-h-26 max-h-36 sm:min-h-32 sm:max-h-32 overflow-hidden'>
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

            <div className="absolute -right-0.5 -bottom-2 pointer-events-none max-w-1/3">
                <AreaChart
                    width={largura < 568 ? 150 : 100}
                    height={
                        (() => {
                        const media = mediaData.find(m => m.titulo === titulo);

                        if (!media) return 100;

                        if (media.valor > -10 && media.valor < 10) return 60;

                        return 100;
                    })()}
                    data={
                        (() => {
                            const media = mediaData.find(m => m.titulo === titulo);

                            if (!media) return chartsData.up_50;

                            if (media.valor <= -50) return chartsData.down_50;
                            if (media.valor <= -25) return chartsData.down_25;
                            if (media.valor <= -10) return chartsData.down_10;
                            if (media.valor < 10)  return chartsData.middle_0;
                            if (media.valor < 25)  return chartsData.up_10;
                            if (media.valor < 50)  return chartsData.up_25;

                            return chartsData.up_50;
                        })()
                    } 
                >
                    <defs>
                        <linearGradient id="greenWave" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#34D399" stopOpacity={0.6} />
                            <stop offset="100%" stopColor="#34D399" stopOpacity={0} />
                        </linearGradient>
                    </defs>


                    
                    {/*
            #FB923C, #60A5FA, #F87171
            */}

                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke={`
                            ${(() => {
                                const media = mediaData.find(m => m.titulo === titulo);

                                if (!media) return;

                                if (media.titulo === 'Folha Salarial') return '#60A5FA';
                                if (media.titulo === 'Dívida Bruta') return '#FB923C';
                                if (media.titulo === 'Custo por Gol') return '#FB923C';
                                if (media.titulo === 'Custo por Vitória') return '#60A5FA';
                                if (media.titulo === 'Custo por Ponto') return '#60A5FA';
                                if (media.titulo === 'Custo por Jogador') return '#FB923C';

                                if (media.valor < 0) return '#F87171'

                                return '#34D399'
                            })()}
                            `}
                        strokeWidth={2}
                        fill={`
                            ${(() => {
                                const media = mediaData.find(m => m.titulo === titulo);

                                if (!media) return;

                                if (media.titulo === 'Folha Salarial') return '#60A5FA8a';
                                if (media.titulo === 'Dívida Bruta') return '#FB923C8a';
                                if (media.titulo === 'Custo por Gol') return '#FB923C8a';
                                if (media.titulo === 'Custo por Vitória') return '#60A5FA8a';
                                if (media.titulo === 'Custo por Ponto') return '#60A5FA8a';
                                if (media.titulo === 'Custo por Jogador') return '#FB923C8a';

                                if (media.valor < 0) return '#F871718a'

                                return '#34D3998a'
                            })()}
                            `}
                        dot={false}
                        activeDot={false}
                    />
                </AreaChart>
            </div>

            <p className={
                `
                ${(() => {
                    const media = mediaData.find(m => m.titulo === titulo);

                    if (!media) return;

                    if (media.valor < 0) return 'text-red-600'

                    return 'text-green-600'
                })()}
                 text-[12px] font-semibold font-[manrope]
                `
            }>
                {(() => {
                    const media = mediaData.find(m => m.titulo === titulo);

                    if (!media) return;

                    if (media.valor < 0) return `-${Math.round(-media.valor)}% `

                    return `+${Math.round(media.valor)}% `
                })()}

                <span className=" text-slate-900 font-normal">
                    {(() => {
                        const media = mediaData.find(m => m.titulo === titulo);

                        if (!media) return;

                        if (media.valor < 0) return 'abaixo da média'

                        return 'acima da média'
                    })()}
                </span>
            </p>

            {/* 
      <i className="fa-solid fa-angle-right absolute right-2 bottom-0 -translate-y-1/2"></i>
*/}
        </div>
    );
}


export default function CardClube({ clubeEscolhido, rank_do_clube, media }: props) {
    const [loading, setLoading] = useState<boolean>(true);
    const [assinante, setAssinante] = useState<boolean>(false);
    const [ranking, setRanking] = useState<any>('');
    const [chanceQuitarDivida, setChanceQuitarDivida] = useState<number>();
    const [mediaData, setMediaData] = useState<MediaCardData[]>();
    const { largura } = allContext();


    useEffect(() => {
        if (clubeEscolhido) {
            const valorCompeticao =
                (
                    clubeEscolhido.competicao === 'libertadores' ?
                        1
                        :
                        clubeEscolhido.competicao === 'pre-libertadores' ?
                            0.5
                            :
                            clubeEscolhido.competicao === 'sul-americana' ?
                                0.5
                                :
                                clubeEscolhido.competicao === 'brasileirao' ?
                                    0
                                    :
                                    -1
                );

            const rankingAtual =
                (clubeEscolhido.faturamento / clubeEscolhido.divida / clubeEscolhido.numero_torcedores * clubeEscolhido.pontos) + valorCompeticao + (clubeEscolhido.lucro * 10 / clubeEscolhido.faturamento);

            setRanking(rankingAtual.toFixed(1));

            const chanceDivida = ChanceQuitarDivida_15_anos(
                clubeEscolhido.numero_torcedores,
                clubeEscolhido.faturamento,
                clubeEscolhido.divida,
                clubeEscolhido.lucro,
                15,
                0.3
            );

            setChanceQuitarDivida(chanceDivida);
        }

    }, [clubeEscolhido]);

    useEffect(() => {
        if (clubeEscolhido && media) {
            const lucFat = clubeEscolhido.lucro*100 / clubeEscolhido.faturamento;

            const mediaClubeEscolhido: Medias = {
                contratacoes: Math.round(
                    ((clubeEscolhido.valor_contratacoes / media.contratacoes) * 100 - 100) * 100
                ) / 100,

                custoGol: Math.round(
                    (
                        (
                            (clubeEscolhido.folha_salarial * 13 + clubeEscolhido.valor_contratacoes) /
                            clubeEscolhido.gols /
                            media.custoGol
                        ) * 100 - 100
                    ) * 100
                ) / 100,

                custoJogador: Math.round(
                    (
                        (
                            (clubeEscolhido.folha_salarial / clubeEscolhido.quant_jogadores) /
                            media.custoJogador
                        ) * 100 - 100
                    ) * 100
                ) / 100,

                custoPonto: Math.round(
                    (
                        (
                            (clubeEscolhido.folha_salarial * 13 + clubeEscolhido.valor_contratacoes) /
                            clubeEscolhido.pontos /
                            media.custoPonto
                        ) * 100 - 100
                    ) * 100
                ) / 100,

                folha_salarial: Math.round(
                    ((
                        clubeEscolhido.folha_salarial/media.folha_salarial
                    ) * 100 - 100
                    ) * 100
                ) / 100,

                custoVitoria: Math.round(
                    (
                        (
                            (clubeEscolhido.folha_salarial * 13 + clubeEscolhido.valor_contratacoes) /
                            clubeEscolhido.vitorias /
                            media.custoVitoria
                        ) * 100 - 100
                    ) * 100
                ) / 100,

                divida: Math.round(
                    ((clubeEscolhido.divida / media.divida) * 100 - 100) * 100
                ) / 100,

                fatDiv: Math.round(
                    (
                        (
                            (clubeEscolhido.faturamento / clubeEscolhido.divida) /
                            media.fatDiv
                        ) * 10 - 10
                    ) * 100
                ) / 100,

                faturamento: Math.round(
                    ((clubeEscolhido.faturamento / media.faturamento) * 100 - 100) * 100
                ) / 100,

                lucFat: Math.round(
                    (
                        lucFat <= -5.84
                            ? lucFat / 5
                            : lucFat < 0
                            ? (-1 / lucFat) * 5
                            : -media.lucFat + lucFat
                    ) * 100
                ) / 100,

                lucro: Math.round(
                    (
                        clubeEscolhido.lucro <= -12.75
                            ? -(-clubeEscolhido.lucro - 12.75)
                            : clubeEscolhido.lucro < 0
                            ? (-1 / clubeEscolhido.lucro) * 10
                            : -media.lucro + clubeEscolhido.lucro
                    ) * 100
                ) / 100,

                maiorContratacao: Math.round(
                    (
                        (
                            Number(clubeEscolhido.maior_contratacao.split(' - ')[1].split(' ')[0]) * 6 /
                            media.maiorContratacao
                        ) * 100 - 100
                    ) * 100
                ) / 100
            }

            const mediaCardData: MediaCardData[] = [
                { valor: mediaClubeEscolhido.faturamento, titulo: "Faturamento (2025)" },
                { valor: mediaClubeEscolhido.lucro, titulo: "Balanço (2025)" },
                { valor: mediaClubeEscolhido.divida, titulo: "Dívida Bruta" },
                { valor: mediaClubeEscolhido.folha_salarial, titulo: "Folha Salarial" },
                { valor: mediaClubeEscolhido.contratacoes, titulo: "Gastos com Contratações" },
                { valor: mediaClubeEscolhido.maiorContratacao, titulo: "Maior Contratação" },
                { valor: mediaClubeEscolhido.fatDiv, titulo: "Faturamento/Dívida" },
                { valor: mediaClubeEscolhido.lucFat, titulo: "Lucro/Faturamento" },
                { valor: mediaClubeEscolhido.custoVitoria, titulo: "Custo por Vitória" },
                { valor: mediaClubeEscolhido.custoGol, titulo: "Custo por Gol" },
                { valor: mediaClubeEscolhido.custoPonto, titulo: "Custo por Ponto" },
                { valor: mediaClubeEscolhido.custoJogador, titulo: "Custo por Jogador" }
            ];

            console.log('mediaCardData', mediaCardData);

            setMediaData(mediaCardData);
        }
    }, [media, clubeEscolhido]);

    if (!clubeEscolhido || !mediaData) return;

    const cards = [
        {
            titulo: "Faturamento (2025)",
            icon: "fa-solid fa-sack-dollar text-sky-900",
            valor: `R$ ${clubeEscolhido.faturamento}`,
            valorNumero: 860,
            sufixo: clubeEscolhido.faturamento < 1000 ? "mi" : "bi",
        },
        {
            titulo: "Balanço (2025)",
            icon: "fa-solid fa-chart-line text-slate-900",
            valor: `R$ ${clubeEscolhido.lucro}`,
            valorNumero: 40,
            sufixo: clubeEscolhido.lucro < 1000 ? "mi" : "bi",
        },
        {
            titulo: "Dívida Bruta",
            icon: "fa-solid fa-triangle-exclamation text-amber-500",
            valor: `R$ ${clubeEscolhido.divida}`,
            valorNumero: 912,
            sufixo: clubeEscolhido.divida < 1000 ? "mi" : "bi",
        },
        {
            titulo: "Folha Salarial",
            icon: "fa-solid fa-users text-blue-600",
            valor: `R$ ${clubeEscolhido.folha_salarial}`,
            valorNumero: 18,
            sufixo: clubeEscolhido.folha_salarial < 1000 ? "mi/mês" : "bi/mês",
        },
        {
            titulo: "Gastos com Contratações",
            icon: "fa-solid fa-money-bill-trend-up text-green-600",
            valor: `R$ ${clubeEscolhido.valor_contratacoes}`,
            valorNumero: 25,
            sufixo: clubeEscolhido.valor_contratacoes < 1000 ? "mi" : "bi",
        },
        {
            titulo: "Maior Contratação",
            subtitulo: clubeEscolhido.maior_contratacao.split(' - ')[0],
            valor: `R$ ${Number(clubeEscolhido.maior_contratacao.split(' - ')[1].split(' ')[0]) * 6}`,
            valorNumero: 12,
            sufixo: clubeEscolhido.valor_contratacoes < 1000 ? "mi" : "bi",
        },
        {
            titulo: "Faturamento/Dívida",
            icon: "fa-solid fa-money-bill-transfer text-gray-700",
            valor: (clubeEscolhido.faturamento / clubeEscolhido.divida).toFixed(1),
            valorNumero: 0.9,
            sufixo: "%",
        },
        {
            titulo: "Lucro/Faturamento",
            icon: "fa-solid fa-sack-dollar text-teal-600",
            valor: (clubeEscolhido.lucro / clubeEscolhido.faturamento * 100).toFixed(1),
            valorNumero: 0.9,
            sufixo: "%",
        },
        {
            titulo: "Custo por Vitória",
            icon: "fa-solid fa-hand-holding-dollar text-lime-600",
            valor: `R$ ${((clubeEscolhido.folha_salarial * 13 + clubeEscolhido.valor_contratacoes) / clubeEscolhido.vitorias).toFixed(1)}`,
            valorNumero: 9.6,
            sufixo: "mi/vitória",
        },
        {
            titulo: "Custo por Gol",
            icon: "fa-solid fa-bullseye text-orange-600",
            valor: `R$ ${((clubeEscolhido.folha_salarial * 13 + clubeEscolhido.valor_contratacoes) / clubeEscolhido.gols).toFixed(1)}`,
            valorNumero: 3.3,
            sufixo: "mi/gol",
        },
        {
            titulo: "Custo por Ponto",
            icon: "fa-solid fa-coins text-yellow-800",
            valor: `R$ ${((clubeEscolhido.folha_salarial * 13 + clubeEscolhido.valor_contratacoes) / clubeEscolhido.pontos).toFixed(1)}`,
            valorNumero: 3.3,
            sufixo: "mi/ponto",
        },
        {
            titulo: "Custo por Jogador",
            icon: "fa-solid fa-person-running text-red-700",
            valor: `R$ ${(clubeEscolhido.folha_salarial / clubeEscolhido.quant_jogadores).toFixed(1)}`,
            valorNumero: 3.3,
            sufixo: "mi/jogador",
        },
    ];

    function ChanceQuitarDivida_15_anos(
        torcedores: number,
        faturamento: number,
        divida: number,
        lucro: number,
        anos: number,
        estimativa: number
    ) {
        // Crescimento inicial (mais conservador)
        let G0 =
            estimativa *
            (0.03 * Math.log(torcedores + 1) + 0.00018 * faturamento);

        // Clamp inicial
        G0 = Math.min(Math.max(G0, 0.04), 0.14);

        let lucroTotal = 0;
        let lucroAno = lucro;
        let G = G0;

        // Crescimento desacelerando ano a ano
        for (let i = 1; i <= anos; i++) {
            lucroAno *= 1 + G;
            lucroTotal += lucroAno;
            G *= 0.92; // decay estrutural
        }

        const R = lucroTotal / divida;

        // Logística calibrada
        const Pbase = 1 / (1 + Math.exp(-2 * (R - 0.9)));

        return Number((Pbase * 100).toFixed(2));
    }

    return (
        <main className="min-h-screen bg-[#eee5f0] grid grid-rows-[auto_1fr]">
            <article style={{ background: 'linear-gradient(135deg, #c4161c, #ff2e2e)' }} className="col-span-full row-1 flex items-center justify-between mt-2 mb-10 p-4 rounded-lg border-2 border-slate-800/20">
                <div className="">
                    <img className="max-h-40 max-w-40" src={clubeEscolhido.imagem} alt="" />
                    <h1 className="text-4xl text-slate-50 text-shadow-[1px_1px_1px_#0000002a] font-[mono]">{clubeEscolhido.nome}</h1>
                </div>

                <div className="flex flex-col pl-2 gap-4">

                    <p
                        style={{ background: 'linear-gradient(135deg, #FFF1F2 0%, #F2F0FF 100%)' }} className="font-[manrope] rounded-md p-2 bg-red-600/80 border border-white text-start text-zinc-900 font-medium">
                        <i className="fa-solid fa-sack-dollar text-sky-900 mr-1"></i> {rank_do_clube.faturamento}° em faturamento
                    </p>

                    <h2></h2>

                    <p
                        style={{ background: 'linear-gradient(135deg, #FFF1F2 0%, #F2F0FF 100%)' }}
                        className="font-[manrope] rounded-md p-2 bg-red-600/80 border border-white text-start text-zinc-900 font-medium">
                        <i className="fa-solid fa-triangle-exclamation text-amber-500 mr-1"></i> {rank_do_clube.divida}° em dívida
                    </p>

                    <p
                        style={{ background: 'linear-gradient(135deg, #FFF1F2 0%, #F2F0FF 100%)' }}
                        className="font-[manrope] rounded-md p-2 bg-red-600/80 border border-white text-start text-zinc-900 font-medium">
                        <i className="fa-solid fa-users text-blue-600 mr-1"></i> {rank_do_clube.salario}° em folha salarial
                    </p>

                </div>
            </article>

            <section className="row-2 flex flex-col sm:grid sm:grid-cols-2 gap-6 px-5 pb-10">
                {cards.map((card, index) => (
                    <InfoCard
                        key={index}
                        titulo={card.titulo}
                        subtitulo={card.subtitulo}
                        icon={card.icon}
                        valor={card.valor}
                        valorNumero={card.valorNumero}
                        sufixo={card.sufixo}
                        mediaData={mediaData}
                        largura={largura}
                    />
                ))}
            </section>

            <div className="bg-white p-2 rounded-2xl flex flex-col">
                <h1 className="ml-4 text-xl">
                    <i className="fa-solid fa-lock mr-1"></i>
                    Conteúdo exclusivo para assinantes
                </h1>

                <ul className="mt-6 ml-10 flex flex-col gap-1">
                    <li>
                        <i className="fa-solid fa-circle text-slate-900 text-[5.5px] mr-2"></i>
                        Nota do clube
                    </li>

                    <li>
                        <i className="fa-solid fa-circle text-slate-900 text-[5.5px] mr-2"></i>
                        Chance de pagar a dívida
                    </li>

                    <li>
                        <i className="fa-solid fa-circle text-slate-900 text-[5.5px] mr-2"></i>
                        Números de 2024 e 2023
                    </li>

                </ul>

                <button className="mt-4">
                    <i className="fa-solid fa-lock"></i>
                    Desbloquear dados premium
                </button>
            </div>

        </main>
    )
}
