import type { Clube, rankings, Medias } from "./busca-clube";
import { useEffect, useState } from "react";
import { AreaChart, Area } from "recharts";
import { allContext } from "../context/all-context";
import HeaderFixo from "./header-fixo";
import MenuAberto from "./menu-aberto";
import CardProduto from "./card-produtos";
import TelaLoading from "./tela-loading";


interface props {
    clubeEscolhido: Clube | undefined;
    rank_do_clube: rankings;
    media: Medias | undefined;
    corFundo: string;
}

interface InfoCardProps {
    titulo: string;
    subtitulo?: string;
    valor: string | number;
    valorNumero: number;
    sufixo?: string | React.ReactNode;
    icon?: string;
    mediaData: MediaCardData[];
    largura: number;
    assinante: boolean;
    dark: boolean;
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
        { value: 25 },
        { value: 24 },
        { value: 22 },
        { value: 24 },
        { value: 18 },
        { value: 14 },
        { value: 14 },
        { value: 13 },
        { value: 8 },
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
        { value: 25 },
        { value: 20 },
        { value: 24 },
        { value: 18 },
        { value: 15 },
        { value: 20 },
        { value: 12 },
        { value: 4 },
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


export function InfoCard(
    { 
        titulo, 
        valor, 
        valorNumero, 
        subtitulo, 
        sufixo, 
        icon, 
        mediaData, 
        largura, 
        assinante, 
        dark 
    }: InfoCardProps) {
    const {setMostrarCard} = allContext();
    
    return (
        <div
        onClick={() => setMostrarCard(true)} 
        className={`cursor-pointer relative ${dark ? 'bg-[#1a1625]' : 'bg-slate-50'} shadow-[1px_1px_3px_#0000002a] rounded-2xl flex flex-col justify-center pl-4 pr-2 py-2 gap-1 ${largura > 768 ? 'min-h-32 max-h-32' : 'min-h-30 max-h-30'} overflow-hidden`}>
            <h2 className={`${dark ? 'text-slate-200' : 'text-slate-700'} font-mono`}>
                <i className={`${icon}`}></i>{" "}
                <span>{titulo}</span>
            </h2>

            <p className={`font-medium ${dark ? 'text-zinc-100' : 'text-zinc-800'} inline`}>
                    {subtitulo}
            </p>

            <p className={`text-xl font-[manrope] font-semibold ${dark ? 'text-stone-50' : 'text-[#222222]'} flex items-center 
                ${!assinante && (titulo === 'Chance de Quitar a Dívida' || titulo === 'Nota do Clube') && 'blur-[6px]'}
                `}>
                {(() => {
                    const media = mediaData.find(m => m.titulo === titulo);

                    if (!media) return valor;

                    if (media.titulo === 'Lucro/Faturamento' || media.titulo === 'Faturamento/Dívida' || media.titulo === 'Chance de Quitar a Dívida') return `${valor}%`;

                    return valor;
                })()} {sufixo} <i className="fa-solid fa-angle-right text-sm translate-y-[10%]"></i>
            </p>

            <div className={`absolute -right-1.5 -bottom-2 pointer-events-none max-w-1/3 ${!assinante && (titulo === 'Chance de Quitar a Dívida' || titulo === 'Nota do Clube') && 'blur-[6px]'}`}>
                <AreaChart
                    width={largura < 768 ? 150 : largura > 1024 ? 150 : 100}
                    height={
                        (() => {
                        const media = mediaData.find(m => m.titulo === titulo);

                        if (!media) return 100;

                        if (media.valor > -10 && media.valor < 10) return 60;

                        return largura > 768 ? 32*5 : 30*5;
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
                        <linearGradient id="yellowWave" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#FDE047" stopOpacity={0.8} />
                            <stop offset="60%" stopColor="#FACC15" stopOpacity={0.4} />
                            <stop offset="100%" stopColor="#FEF9C3" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke={`
                            ${(() => {
                                const media = mediaData.find(m => m.titulo === titulo);

                                if (!media) return;

                                if (media.titulo === 'Nota do Clube') return '#fbbf24';

                                if (media.titulo === 'Chance de Quitar a Dívida') return '#8b5cf6';

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

                                
                                if (media.titulo === 'Nota do Clube') return '#fbbf248a';

                                if (media.titulo === 'Chance de Quitar a Dívida') return '#8b5cf68a';

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

                    if (media.titulo === 'Dívida Bruta' || media.titulo === 'Folha Salarial' || media.titulo === 'Custo por Vitória' || media.titulo === 'Custo por Gol' || media.titulo === 'Custo por Ponto' || media.titulo === 'Custo por Jogador') {
                        if (media.valor < 0) return dark ? 'text-green-400' : 'text-green-600';
                        return dark ? 'text-red-400' : 'text-red-600';
                    }

                    if (!assinante && (titulo === 'Chance de Quitar a Dívida' || titulo === 'Nota do Clube')) return 'text-[#222222]';

                    if (media.valor < 0) return dark ? 'text-red-400' : 'text-red-600';

                    return dark ? 'text-green-400' : 'text-green-600';
                })()}
                 text-[12px] font-semibold font-[manrope]
                 ${!assinante && (titulo === 'Chance de Quitar a Dívida' || titulo === 'Nota do Clube') && 'blur-[6px]'}
                `
            }>
                {(() => {
                    const media = mediaData.find(m => m.titulo === titulo);

                    if (!media) return;

                    if (media.valor < 0) return `-${Math.round(-media.valor)}% `;

                    return `+${Math.round(media.valor)}% `;
                })()}

                <span className={`font-normal ${dark ? 'text-slate-100' : 'text-slate-900'}`}>
                    {(() => {
                        const media = mediaData.find(m => m.titulo === titulo);

                        if (!media) return;

                        if (media.valor < 0) return 'abaixo da média';

                        return 'acima da média';
                    })()}
                </span>
            </p>
        </div>
    );
}


export default function CardClube({ clubeEscolhido, rank_do_clube, media, corFundo }: props) {
    const [loading, setLoading] = useState<boolean>(true);
    const [assinante, setAssinante] = useState<boolean>(true);
    const [ranking, setRanking] = useState<number>(0);
    const [chanceQuitarDivida, setChanceQuitarDivida] = useState<number>(0);
    const [mediaData, setMediaData] = useState<MediaCardData[]>();
    const { largura, menuAberto, setTopicoAtivo, dark, setMostrarCard, mostrarCard } = allContext();


    useEffect(() => {
        setTopicoAtivo('Produto');
    }, []);

    useEffect(() => {
        if (clubeEscolhido && media) {
            const scoreFaturamento = media?.faturamento;
            const scoreTorcida = media.mediaTorcedores;
            const scoreDivida = media.divida;
            const scoreFinal = Number(((scoreFaturamento / scoreTorcida) - (scoreDivida / scoreTorcida)).toFixed(1));

            const scoreClube = Number(((clubeEscolhido.faturamento / clubeEscolhido.numero_torcedores*2) - (clubeEscolhido.divida / clubeEscolhido.numero_torcedores)).toFixed(1));

            const pontosAdicionais =
                scoreFinal > 0 ?
                    Number(((scoreClube - scoreFinal)).toFixed(1))
                    :
                    Number(((scoreClube + scoreFinal)).toFixed(1));

            const pontosFiltrados =
                (
                pontosAdicionais > 100 ?
                    2
                    :
                pontosAdicionais > 50 ?
                    1
                    :
                pontosAdicionais > 0 ?
                    0.5
                    :
                pontosAdicionais < 100 ?
                    -2
                    :
                pontosAdicionais < 50 ?
                    -1
                    :
                pontosAdicionais < 0 ?
                    -0.5
                    :
                    0
                );

            const valorCompeticao =
                (
                    clubeEscolhido.competicao === 'libertadores' ?
                        2
                        :
                        clubeEscolhido.competicao === 'pre-libertadores' ?
                            1.5
                            :
                            clubeEscolhido.competicao === 'sul-americana' ?
                                1.5
                                :
                                clubeEscolhido.competicao === 'brasileirao' ?
                                    1
                                    :
                                    -3
                );

            let rankingAtual =
                Number (
                    (
                    (clubeEscolhido.faturamento / clubeEscolhido.divida*2)
                    +
                    (
                        clubeEscolhido.lucro > 0 ?
                            (clubeEscolhido.lucro*2 / clubeEscolhido.faturamento) * 15
                            :
                            (-clubeEscolhido.lucro / clubeEscolhido.faturamento) * 5
                    )
                    ).toFixed(1)
                );

            rankingAtual = Number((rankingAtual + pontosFiltrados).toFixed(1));

            if (rankingAtual > 10) {
                rankingAtual = 10 + valorCompeticao > 10 ? 10 : 10 + valorCompeticao;
            } else if (rankingAtual < 0) {
                rankingAtual = 0 + valorCompeticao > 0 ? valorCompeticao : 0;
            } else {
                rankingAtual = 
                    (rankingAtual + valorCompeticao) > 10 ? 
                    10 
                    : 
                    (rankingAtual + valorCompeticao) < 0 ?
                    0
                    :
                    rankingAtual + valorCompeticao;  
            }

            rankingAtual = Number(rankingAtual.toFixed(1));

            setRanking(Number(rankingAtual.toFixed(1)));

            const chanceDivida = ChanceQuitarDivida_15_anos(
                clubeEscolhido.numero_torcedores,
                clubeEscolhido.faturamento,
                clubeEscolhido.divida,
                clubeEscolhido.lucro,
                15,
                0.3
            );

            setChanceQuitarDivida(chanceDivida >= 100 ? 100 : chanceDivida);

        if (clubeEscolhido && media && rankingAtual && chanceDivida) {
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
                            (clubeEscolhido.faturamento*100 / clubeEscolhido.divida) /
                            media.fatDiv
                        )
                    ) * 100
                ),

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
                ) / 100,

                notaClube: Math.round(
                    ((ranking / media.notaClube) * 100 - 100) * 100
                ) / 100,

                chanceQuitarDivida: Math.round(
                    ((chanceQuitarDivida / media.chanceQuitarDivida) * 100 - 100) * 100
                ) / 100,

                mediaTorcedores: Math.round(
                    ((clubeEscolhido.numero_torcedores / media.mediaTorcedores) * 100 - 100) * 100
                ) / 100
            }

            if (mediaClubeEscolhido.notaClube && mediaClubeEscolhido.chanceQuitarDivida) {

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
                    { valor: mediaClubeEscolhido.custoJogador, titulo: "Custo por Jogador" },
                    { valor: mediaClubeEscolhido.notaClube, titulo: "Nota do Clube" },
                    { valor: mediaClubeEscolhido.chanceQuitarDivida, titulo: "Chance de Quitar a Dívida" }
                ];

                setMediaData(mediaCardData);
            }
        }
        setLoading(false);

        }

    }, [clubeEscolhido, media]);


    if (!clubeEscolhido || !mediaData || loading) return (<TelaLoading/>)

    const cards = [
        {
            titulo: "Faturamento (2025)",
            icon: `fa-solid fa-sack-dollar ${dark ? "text-sky-300" : "text-sky-900"}`,
            valor: `R$ ${clubeEscolhido.faturamento}`,
            valorNumero: 860,
            sufixo: clubeEscolhido.faturamento < 1000 ? "mi" : "bi",
        },
        {
            titulo: "Balanço (2025)",
            icon: `fa-solid fa-chart-line ${dark ? "text-slate-300" : "text-slate-900"}`,
            valor: `R$ ${clubeEscolhido.lucro}`,
            valorNumero: 40,
            sufixo: clubeEscolhido.lucro < 1000 ? "mi" : "bi",
        },
        {
            titulo: "Dívida Bruta",
            icon: `fa-solid fa-triangle-exclamation ${dark ? "text-amber-300" : "text-amber-500"}`,
            valor: `R$ ${clubeEscolhido.divida}`,
            valorNumero: 912,
            sufixo: clubeEscolhido.divida < 1000 ? "mi" : "bi",
        },
        {
            titulo: "Folha Salarial",
            icon: `fa-solid fa-users ${dark ? "text-blue-400" : "text-blue-600"}`,
            valor: `R$ ${clubeEscolhido.folha_salarial}`,
            valorNumero: 18,
            sufixo: clubeEscolhido.folha_salarial < 1000 ? "mi/mês" : "bi/mês",
        },
        {
            titulo: "Gastos com Contratações",
            icon: `fa-solid fa-money-bill-trend-up ${dark ? "text-green-400" : "text-green-600"}`,
            valor: `R$ ${clubeEscolhido.valor_contratacoes}`,
            valorNumero: 25,
            sufixo: clubeEscolhido.valor_contratacoes < 1000 ? "mi" : "bi",
        },
        {
            titulo: "Maior Contratação",
            icon: `fa-solid fa-crown ${dark ? "text-zinc-300" : "text-zinc-900"}`,
            subtitulo: clubeEscolhido.maior_contratacao.split(' - ')[0],
            valor: `R$ ${(Number(clubeEscolhido.maior_contratacao.split(' - ')[1].split(' ')[0]) * 6).toFixed(1)}`,
            valorNumero: 12,
            sufixo: clubeEscolhido.valor_contratacoes < 1000 ? "mi" : "bi",
        },
        {
            titulo: "Faturamento/Dívida",
            icon: `fa-solid fa-money-bill-transfer ${dark ? "text-gray-300" : "text-gray-700"}`,
            valor: (clubeEscolhido.faturamento * 100 / clubeEscolhido.divida).toFixed(1),
            valorNumero: 0.9,
            sufixo: "",
        },
        {
            titulo: "Lucro/Faturamento",
            icon: `fa-solid fa-sack-dollar ${dark ? "text-teal-400" : "text-teal-600"}`,
            valor: (clubeEscolhido.lucro / clubeEscolhido.faturamento * 100).toFixed(1),
            valorNumero: 0.9,
            sufixo: "",
        },
        {
            titulo: "Custo por Vitória",
            icon: `fa-solid fa-hand-holding-dollar ${dark ? "text-lime-400" : "text-lime-600"}`,
            valor: `R$ ${((clubeEscolhido.folha_salarial * 13 + clubeEscolhido.valor_contratacoes) / clubeEscolhido.vitorias).toFixed(1)}`,
            valorNumero: 9.6,
            sufixo: "mi/vitória",
        },
        {
            titulo: "Custo por Gol",
            icon: `fa-solid fa-bullseye ${dark ? "text-orange-400" : "text-orange-600"}`,
            valor: `R$ ${((clubeEscolhido.folha_salarial * 13 + clubeEscolhido.valor_contratacoes) / clubeEscolhido.gols).toFixed(1)}`,
            valorNumero: 3.3,
            sufixo: "mi/gol",
        },
        {
            titulo: "Custo por Ponto",
            icon: `fa-solid fa-coins ${dark ? "text-yellow-400" : "text-yellow-800"}`,
            valor: `R$ ${((clubeEscolhido.folha_salarial * 13 + clubeEscolhido.valor_contratacoes) / clubeEscolhido.pontos).toFixed(1)}`,
            valorNumero: 3.3,
            sufixo: "mi/ponto",
        },
        {
            titulo: "Custo por Jogador",
            icon: `fa-solid fa-person-running ${dark ? "text-red-400" : "text-red-700"}`,
            valor: `R$ ${(clubeEscolhido.folha_salarial / clubeEscolhido.quant_jogadores).toFixed(1)}`,
            valorNumero: 3.3,
            sufixo: "mi/jogador",
        },
        {
            titulo: "Nota do Clube",
            icon: `fa-solid fa-star ${dark ? "text-yellow-400" : "text-yellow-500"}`,
            valor: ranking,
            valorNumero: ranking,
            sufixo: ranking > 7 ?
                <> <span className="inline">- <span className="font-medium">Íncrivel</span></span> </>
                :
                ranking > 5 ? <> <span className="inline">- <span className="font-medium">Bom</span> </span> </>
                :
                ranking > 3 ? <> <span className="inline">- <span className="font-medium">Ruim</span> </span> </>
                :
                <> <span className="inline">- <span className="font-medium">Horrível</span></span> </>
        },
        {
            titulo: "Chance de Quitar a Dívida",
            icon: `fa-solid fa-scale-balanced ${dark ? "text-purple-400" : "text-purple-700"}`,
            valor: chanceQuitarDivida,
            valorNumero: chanceQuitarDivida,
            sufixo: chanceQuitarDivida > 75 ?
                <> <span className="inline">- <span className="font-medium">Muito Alta</span></span> </>
                :
                chanceQuitarDivida > 60 ? <> <span className="inline">- <span className="font-medium">Alta</span></span> </>
                :
                chanceQuitarDivida > 30 ? <> <span className="inline">- <span className="font-medium">Moderada</span></span> </>
                :
                chanceQuitarDivida > 15 ? <> <span className="inline">- <span className="font-medium">Baixa</span></span> </>
                :
                <> <span className="inline">- <span className="font-medium">Quase Impossível</span></span> </>
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
        if (divida <= 0) return 100;
        if (anos <= 0) return 0;

        let G0 =
            estimativa *
            (0.03 * Math.log(torcedores + 1) + 0.00018 * faturamento);

        G0 = Math.min(Math.max(G0, 0.04), 0.14);

        const rigidez = Math.min(Math.max(divida / faturamento, 0.5), 3);

        let lucroTotal = 0;
        let lucroAno = lucro;
        let G = G0;

        for (let i = 1; i <= anos; i++) {

            const capacidade = faturamento / divida;
            const margemLucro = lucroAno / faturamento;

            let anoRuim = false;

            // 🟡 clube frágil
            if (lucroAno > 0 && margemLucro < 0.05 && capacidade <= 1.5) {
                const volatilidade =
                    0.15 + (1.5 - capacidade) * 0.2;

                lucroAno *= 1 + (Math.random() * 2 - 1) * volatilidade;
            }

            // 🔴 clube estruturalmente quebrado
            if (divida / faturamento >= 2.2) {
                let probAnoRuim =
                    0.45 +
                    (divida / faturamento - 2.2) * 0.2 +
                    (1 - estimativa) * 0.35;

                probAnoRuim = Math.min(Math.max(probAnoRuim, 0.45), 0.9);

                if (Math.random() < probAnoRuim) {
                    anoRuim = true;

                    // força prejuízo
                    const choque =
                        0.3 + Math.random() * 0.4; // 30% a 70% do faturamento

                    lucroAno = -faturamento * choque;
                }
            }

            // 🔁 dinâmica normal só se NÃO foi ano ruim estrutural
            if (!anoRuim) {
                if (lucroAno < 0) {
                    lucroAno *= 1 - G / rigidez;
                } else {
                    lucroAno *= 1 + G;
                }
            }

            lucroTotal += lucroAno;
            G *= 0.92;
        }

        let R: number;

        if (lucro < 0) {
            const capacidade = faturamento / divida;
            const pesoPrejuizo = Math.abs(lucro) / faturamento;

            const scoreEstrutural = Math.log(1 + capacidade);
            const penalizacao =
                1 - Math.min((pesoPrejuizo * rigidez) / 0.35, 1);

            R = scoreEstrutural * penalizacao;
        } else {
            R = (lucroTotal / divida) / rigidez;
        }

        const threshold = 0.9 * rigidez;
        const slope = 2 / rigidez;

        let Pbase = 1 / (1 + Math.exp(-slope * (R - threshold)));

        Pbase = (divida/faturamento) > 2.5 ? Pbase/4 : (divida/faturamento) > 2 ? Pbase/2 : (divida/faturamento) > 1 ? Pbase/1.2 : (divida/faturamento) > 0.8 ? Pbase/1.2 : (lucro*100/divida) < 10 ? Pbase/1.2 : Pbase;

        return Math.max(0.01, Number((Pbase * 100).toFixed(2)));
    }

    return (
        <>
            <HeaderFixo />
            {!menuAberto ? 
                <main className={`min-h-screen mt-16 ${dark ? 'bg-[#0b1f33]' : 'bg-[#eee5f0]'} grid grid-rows-[auto_1fr]`}>
                    <article style={{ background: corFundo }} className="col-span-full row-1 flex items-center justify-between sm:justify-around rounded-t-none mb-10 p-4 rounded-lg border-2 border-slate-800/20">
                        <div className="flex flex-col">
                            <img className="max-h-40 max-w-40 self-center" src={clubeEscolhido.imagem} alt="" />
                            <h1 className={`text-4xl text-center ${clubeEscolhido.nome === 'Santos' ? 'text-zinc-800 text-shadow-[1px_1px_1px_#FFF0002a]' : 'text-slate-50 text-shadow-[1px_1px_1px_#0000002a]'} font-[mono]`}>{clubeEscolhido.nome}</h1>
                        </div>
                        <div className="flex flex-col pl-2 min-h-full max-h-full justify-evenly gap-1">
                            <p
                                style={{ background: clubeEscolhido.nome === 'Santos' ? 'linear-gradient(135deg, #27272a 0%, #222222 100%)' : 'linear-gradient(135deg, #f8fafc 0%, white 100%)' }} className={`font-manrope rounded-md p-2 border ${clubeEscolhido.nome === 'Santos' ? 'border-slate-900 text-zinc-50 text-shadow-[1px_1px_1px_#0000002a] shadow-[2px_2px_2px_#0000002a]' : 'border-white text-zinc-900 shadow-[2px_2px_2px_#0000006a]'} text-start font-medium`}>
                                <i className={`fa-solid fa-sack-dollar ${clubeEscolhido.nome === 'Santos' ? 'text-sky-400' : 'text-sky-900'} mr-1`}></i> {rank_do_clube.faturamento}° em faturamento
                            </p>
                            <p
                                style={{ background: clubeEscolhido.nome === 'Santos' ? 'linear-gradient(135deg, #27272a 0%, #222222 100%)' : 'linear-gradient(135deg, #f8fafc 0%, white 100%)' }}
                                className={`font-manrope rounded-md p-2 border ${clubeEscolhido.nome === 'Santos' ? 'border-slate-900 text-zinc-50 text-shadow-[1px_1px_1px_#0000002a] shadow-[2px_2px_2px_#0000002a]' : 'border-white text-zinc-900 shadow-[2px_2px_2px_#0000006a]'} text-start font-medium`}>
                                <i className="fa-solid fa-triangle-exclamation text-amber-500 mr-1"></i> {rank_do_clube.divida}° em dívida
                            </p>
                            <p
                                style={{ background: clubeEscolhido.nome === 'Santos' ? 'linear-gradient(135deg, #27272a 0%, #222222 100%)' : 'linear-gradient(135deg, #f8fafc 0%, white 100%)' }}
                                className={`font-manrope rounded-md p-2 border ${clubeEscolhido.nome === 'Santos' ? 'border-slate-900 text-zinc-50 text-shadow-[1px_1px_1px_#0000002a] shadow-[2px_2px_2px_#0000002a]' : 'border-white text-zinc-900 shadow-[2px_2px_2px_#0000006a]'} text-start font-medium`}>
                                <i className="fa-solid fa-users text-blue-600 mr-1"></i> {rank_do_clube.salario}° em folha salarial
                            </p>
                        </div>
                    </article>
                    
                    <section className={`row-2 ${largura > 768 ? 'grid grid-cols-2' : 'flex flex-col'} gap-6 px-5 pb-10`}>
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
                                assinante={assinante}
                                dark={dark}
                            />
                        ))}
                    </section>

                    <div className="flex justify-center">
                        <div className="bg-white p-2 rounded-2xl flex flex-col max-w-3/4">
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
                    </div>
                </main>
            : 
            <MenuAberto />
            }
            {mostrarCard &&
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div 
                    className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" 
                    onClick={() => setMostrarCard(false)}
                    />

                    <div className="relative z-10 min-w-full">
                        <CardProduto />
                    </div>
                </div>
            }
        </>
    )
}
