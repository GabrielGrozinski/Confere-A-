import type { Clube, rankings, Medias } from "./busca-clube";
import { useEffect, useState } from "react";
import { AreaChart, Area } from "recharts";
import { allContext } from "../context/all-context";
import HeaderFixo from "./header-fixo";
import MenuAberto from "./menu-aberto";
import CardProduto from "./card-produtos";
import { ClipLoader } from "react-spinners";
import { calcularChanceTitulo } from "./busca-clube";



interface props {
    clubeEscolhido: Clube | undefined;
    rank_do_clube: rankings;
    media: Medias | undefined;
    corFundo: string;
}

interface InfoCardProps {
    titulo: string;
    subtitulo?: string;
    imagemSubtitulo?: string;
    imagemAlt?: string;
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
        imagemSubtitulo,
        imagemAlt,
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
        className={`cursor-pointer relative ${dark ? 'bg-[#1a1625]' : 'bg-slate-50'} shadow-[1px_1px_3px_#0000002a] rounded-2xl flex flex-col justify-center pl-4 pr-2 py-2 gap-1 ${largura > 768 ? 'min-h-32 max-h-32' : 'min-h-30 max-h-30'} lg: min-w-[calc(50%-24px)] overflow-hidden`}>
            <h2 className={`${dark ? 'text-slate-200' : 'text-slate-700'} font-mono`}>
                <i className={`${icon}`}></i>{" "}
                <span>{titulo}</span>
            </h2>
            {subtitulo &&
            <p className={`font-medium ${dark ? 'text-zinc-100' : 'text-zinc-800'} flex items-center`}>
                <img
                className="rounded-sm mr-2 w-8.5 h-6"
                src={imagemSubtitulo}
                alt={imagemAlt}/>   
                {subtitulo}
            </p>
            }

            <p className={`text-xl font-[manrope] font-semibold ${dark ? 'text-stone-50' : 'text-[#222222]'} flex items-center 
                ${!assinante && (titulo === 'Chance de Quitar a Dívida' || titulo === 'Nota do Clube') && 'blur-[6px]'}
                `}>
                {(() => {
                    const media = mediaData.find(m => m.titulo === titulo);

                    if (!media) return valor;

                    if (media.titulo === 'Lucro/Faturamento' || media.titulo === 'Faturamento/Dívida' || media.titulo === 'Chance de Quitar a Dívida' || media.titulo === 'Chance de Título (2026)') return `${valor}%`;

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
                                if (media.titulo === 'Chance de Título (2026)') return '#fb923c';

                                if (media.titulo === 'Dívida (2024)') return media.valor < 0 ? '#34D399' : '#F87171';

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
                                if (media.titulo === 'Chance de Título (2026)') return '#fb923c9a';

                                if (media.titulo === 'Dívida (2024)') return media.valor < 0 ? '#34D3998a' : '#F871718a';

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

                    if (media.titulo === 'Dívida Bruta' || media.titulo === 'Folha Salarial' || media.titulo === 'Custo por Vitória' || media.titulo === 'Custo por Gol' || media.titulo === 'Custo por Ponto' || media.titulo === 'Custo por Jogador' || media.titulo === 'Dívida (2024)') {
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

                        if (media.titulo === 'Dívida (2024)' || media.titulo === 'Faturamento (2024)') return media.valor < 0 ? 'de queda' : 'de aumento'

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
    const [chanceTitulo, setChanceTitulo] = useState<number>(0);
    const [mediaData, setMediaData] = useState<MediaCardData[]>();
    const { largura, menuAberto, setTopicoAtivo, dark, setMostrarCard, mostrarCard, setAbaEntretenimento } = allContext();


    useEffect(() => {
        setTopicoAtivo('Produto');
        setAbaEntretenimento(true);
    }, []);

    useEffect(() => {
        if (!media || !clubeEscolhido) return;

        const chance = calcularChanceTitulo(clubeEscolhido.folha_salarial, clubeEscolhido.valor_contratacoes, clubeEscolhido.pontos, clubeEscolhido.vitorias);

        const novaChance = Number((chance * clubeEscolhido.nota_clube/10).toFixed(2));
        setChanceTitulo(novaChance);

    }, [media, clubeEscolhido]);

    useEffect(() => {
        if (clubeEscolhido && media && chanceTitulo) {
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
                    ((clubeEscolhido.nota_clube / media.notaClube) * 100 - 100) * 100
                ) / 100,

                chanceQuitarDivida: Math.round(
                    ((clubeEscolhido.chance_quitar_divida / media.chanceQuitarDivida) * 100 - 100) * 100
                ) / 100,

                mediaTorcedores: Math.round(
                    ((clubeEscolhido.numero_torcedores / media.mediaTorcedores) * 100 - 100) * 100
                ) / 100,

                mediaChanceTitulo: Math.round(
                    chanceTitulo - (50 * media.notaClube/10)
                ),

                divida_2024: Number((clubeEscolhido.divida / clubeEscolhido.divida_2024
                ).toFixed(2)) * 100 - 100,

                faturamento_2024: Number((clubeEscolhido.faturamento / clubeEscolhido.faturamento_2024
                ).toFixed(2)) * 100 - 100,

                projetarFaturamento: 0,

                aumento_faturamento: 0,
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
                    { valor: mediaClubeEscolhido.chanceQuitarDivida, titulo: "Chance de Quitar a Dívida" },
                    { valor: mediaClubeEscolhido.notaClube, titulo: "Nota do Clube" },
                    { valor: mediaClubeEscolhido.mediaChanceTitulo ?? 0, titulo: "Chance de Título (2026)" },
                    { valor: mediaClubeEscolhido.divida_2024 ?? 0, titulo: "Dívida (2024)" },
                    { valor: mediaClubeEscolhido.faturamento_2024 ?? 0, titulo: "Faturamento (2024)" },

                ];

                setMediaData(mediaCardData);
            }
        }
        setLoading(false);

    }, [clubeEscolhido, media, chanceTitulo]);

    if (!clubeEscolhido || !mediaData) return;

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
            imagemSubtitulo: clubeEscolhido.maior_contratacao.split(' - ')[2],
            imagemAlt: clubeEscolhido.maior_contratacao.split(' - ')[3],
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
            valor: clubeEscolhido.nota_clube,
            valorNumero: clubeEscolhido.nota_clube,
            sufixo: clubeEscolhido.nota_clube > 7 ?
                <> <span className="inline">- <span className="font-medium">Íncrivel</span></span> </>
                :
                clubeEscolhido.nota_clube > 5 ? <> <span className="inline">- <span className="font-medium">Bom</span> </span> </>
                :
                clubeEscolhido.nota_clube > 3 ? <> <span className="inline">- <span className="font-medium">Ruim</span> </span> </>
                :
                <> <span className="inline">- <span className="font-medium">Horrível</span></span> </>
        },
        {
            titulo: "Chance de Quitar a Dívida",
            icon: `fa-solid fa-scale-balanced ${dark ? "text-purple-400" : "text-purple-700"}`,
            valor: clubeEscolhido.chance_quitar_divida,
            valorNumero: clubeEscolhido.chance_quitar_divida,
            sufixo: clubeEscolhido.chance_quitar_divida > 75 ?
                <> <span className="inline">- <span className="font-medium">Muito Alta</span></span> </>
                :
                clubeEscolhido.chance_quitar_divida > 60 ? <> <span className="inline">- <span className="font-medium">Alta</span></span> </>
                :
                clubeEscolhido.chance_quitar_divida > 30 ? <> <span className="inline">- <span className="font-medium">Moderada</span></span> </>
                :
                clubeEscolhido.chance_quitar_divida > 15 ? <> <span className="inline">- <span className="font-medium">Baixa</span></span> </>
                :
                <> <span className="inline">- <span className="font-medium">Quase Impossível</span></span> </>
        },
        {
            titulo: "Chance de Título (2026)",
            icon: `fa-solid fa-trophy ${dark ? "text-orange-400" : "text-orange-500"}`,
            valor: chanceTitulo,
            valorNumero: chanceTitulo,
            sufixo: chanceTitulo > 75 ?
                <> <span className="inline">- <span className="font-medium">Muito Alta</span></span> </>
                :
                chanceTitulo > 60 ? <> <span className="inline">- <span className="font-medium">Alta</span></span> </>
                :
                chanceTitulo > 30 ? <> <span className="inline">- <span className="font-medium">Moderada</span></span> </>
                :
                chanceTitulo > 15 ? <> <span className="inline">- <span className="font-medium">Baixa</span></span> </>
                :
                <> <span className="inline">- <span className="font-medium">Quase Impossível</span></span> </>
        },
        {
            titulo: "Faturamento (2024)",
            icon: `fa-solid fa-sack-dollar ${dark ? "text-sky-300" : "text-sky-900"}`,
            valor: `R$ ${clubeEscolhido.faturamento_2024}`,
            valorNumero: 860,
            sufixo: clubeEscolhido.faturamento_2024 < 1000 ? "mi" : "bi",
        },
        {
            titulo: "Dívida (2024)",
            icon: `fa-solid fa-sack-dollar ${dark ? "text-sky-300" : "text-sky-900"}`,
            valor: `R$ ${clubeEscolhido.divida_2024}`,
            valorNumero: 860,
            sufixo: clubeEscolhido.divida_2024 < 1000 ? "mi" : "bi",
        },

    ];


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
                    <section className={`row-2 ${largura > 768 ? 'flex flex-wrap' : 'flex flex-col'} gap-6 px-5 pb-10`}>
                        {loading ? 
                        <div className="flex-1 flex items-center justify-center">
                            <ClipLoader size={30} color={dark ? '#fff' : '#000'}/>
                        </div>
                        :
                        cards.map((card, index) => (
                            <InfoCard
                                key={index}
                                titulo={card.titulo}
                                subtitulo={card.subtitulo}
                                imagemSubtitulo={card.imagemSubtitulo}
                                imagemAlt={card.imagemAlt}
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
