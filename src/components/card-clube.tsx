import type { Clube, rankings, Medias } from "./busca-clube";
import { useEffect, useState } from "react";
import { AreaChart, Area } from "recharts";
import { allContext } from "../context/all-context";
import HeaderFixo from "./header-fixo";
import CardProduto from "./card-produtos";
import { ClipLoader } from "react-spinners";
import { calcularChanceTitulo } from "./busca-clube";
import FooterFixo from "./footer-fixo";
import adsense from '/adsense.png';


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
    sufixo?: string | React.ReactNode;
    icon?: string;
    mediaData: MediaCardData[];
    largura: number;
    assinante: boolean | undefined;
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
        (assinante === undefined || assinante) &&

        <div
        onClick={() => setMostrarCard(true)} 
        className={`cursor-pointer relative ${dark ? 'bg-[#1a1625]' : 'bg-[#f3ebf5]'} shadow-[1px_1px_3px_#0000002a] rounded-2xl flex flex-col justify-center pl-4 pr-2 py-2 gap-1 ${largura > 768 ? 'min-h-32 max-h-32' : 'min-h-30 max-h-30'} lg: min-w-[calc(50%-24px)] overflow-hidden`}>
            <h2 className={`${dark ? 'text-slate-200' : 'text-slate-700'} font-mono`}>
                <i className={`${icon}`}></i>{" "}
                <span>{titulo}</span>
            </h2>
            {subtitulo &&
            <p className={`font-medium ${dark ? 'text-zinc-100' : 'text-zinc-800'} flex items-center`}>
                <img
                className="rounded-sm mr-2 w-6.5 h-4.75"
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
    const [assinante, setAssinante] = useState<boolean>(false);
    const [chanceTitulo, setChanceTitulo] = useState<number>(0);
    const [mediaData, setMediaData] = useState<MediaCardData[]>();
    const { largura, setTopicoAtivo, dark, setMostrarCard, mostrarCard, setAbaEntretenimento } = allContext();

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
                            ? lucFat / 1.5
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
            valor: `R$ ${clubeEscolhido.faturamento >= 1000 ? clubeEscolhido.faturamento/1000 : clubeEscolhido.faturamento}`,
            sufixo: clubeEscolhido.faturamento < 1000 ? "mi" : "bi",
        },
        {
            titulo: "Balanço (2025)",
            icon: `fa-solid fa-chart-line ${dark ? "text-slate-300" : "text-slate-900"}`,
            valor: `R$ ${clubeEscolhido.lucro}`,
            sufixo: clubeEscolhido.lucro < 1000 ? "mi" : "bi",
        },
        {
            titulo: "Dívida Bruta",
            icon: `fa-solid fa-triangle-exclamation ${dark ? "text-amber-300" : "text-amber-500"}`,
            valor: `R$ ${clubeEscolhido.divida >= 1000 ? clubeEscolhido.divida/1000 : clubeEscolhido.divida}`,
            sufixo: clubeEscolhido.divida < 1000 ? "mi" : "bi",
        },
        {
            titulo: "Folha Salarial",
            icon: `fa-solid fa-users ${dark ? "text-blue-400" : "text-blue-600"}`,
            valor: `R$ ${clubeEscolhido.folha_salarial}`,
            sufixo: clubeEscolhido.folha_salarial < 1000 ? "mi/mês" : "bi/mês",
        },
        {
            titulo: "Gastos com Contratações",
            icon: `fa-solid fa-money-bill-trend-up ${dark ? "text-green-400" : "text-green-600"}`,
            valor: `R$ ${clubeEscolhido.valor_contratacoes}`,
            sufixo: clubeEscolhido.valor_contratacoes < 1000 ? "mi" : "bi",
        },
        {
            titulo: "Maior Contratação",
            icon: `fa-solid fa-crown ${dark ? "text-zinc-300" : "text-zinc-900"}`,
            subtitulo: clubeEscolhido.maior_contratacao.split(' - ')[0],
            imagemSubtitulo: clubeEscolhido.maior_contratacao.split(' - ')[2],
            imagemAlt: clubeEscolhido.maior_contratacao.split(' - ')[3],
            valor: `R$ ${(Number(clubeEscolhido.maior_contratacao.split(' - ')[1].split(' ')[0]) * 6).toFixed(1)}`,
            sufixo: clubeEscolhido.valor_contratacoes < 1000 ? "mi" : "bi",
        },
        {
            titulo: "Faturamento/Dívida",
            icon: `fa-solid fa-money-bill-transfer ${dark ? "text-gray-300" : "text-gray-700"}`,
            valor: (clubeEscolhido.faturamento * 100 / clubeEscolhido.divida).toFixed(1),
            sufixo: "",
        },
        {
            titulo: "Lucro/Faturamento",
            icon: `fa-solid fa-sack-dollar ${dark ? "text-teal-400" : "text-teal-600"}`,
            valor: (clubeEscolhido.lucro / clubeEscolhido.faturamento * 100).toFixed(1),
            sufixo: "",
        },
        {
            titulo: "Custo por Vitória",
            icon: `fa-solid fa-hand-holding-dollar ${dark ? "text-lime-400" : "text-lime-600"}`,
            valor: `R$ ${((clubeEscolhido.folha_salarial * 13 + clubeEscolhido.valor_contratacoes) / clubeEscolhido.vitorias).toFixed(1)}`,
            sufixo: "mi/vitória",
        },
        {
            titulo: "Custo por Gol",
            icon: `fa-solid fa-bullseye ${dark ? "text-orange-400" : "text-orange-600"}`,
            valor: `R$ ${((clubeEscolhido.folha_salarial * 13 + clubeEscolhido.valor_contratacoes) / clubeEscolhido.gols).toFixed(1)}`,
            sufixo: "mi/gol",
        },
        {
            titulo: "Custo por Ponto",
            icon: `fa-solid fa-coins ${dark ? "text-yellow-400" : "text-yellow-800"}`,
            valor: `R$ ${((clubeEscolhido.folha_salarial * 13 + clubeEscolhido.valor_contratacoes) / clubeEscolhido.pontos).toFixed(1)}`,
            sufixo: "mi/ponto",
        },
        {
            titulo: "Custo por Jogador",
            icon: `fa-solid fa-person-running ${dark ? "text-red-400" : "text-red-700"}`,
            valor: `R$ ${(clubeEscolhido.folha_salarial / clubeEscolhido.quant_jogadores).toFixed(1)}`,
            sufixo: "mi/jogador",
        },
        {
            titulo: "Nota do Clube",
            assinante,
            icon: `fa-solid fa-star ${dark ? "text-yellow-400" : "text-yellow-500"}`,
            valor: clubeEscolhido.nota_clube,
            sufixo: clubeEscolhido.nota_clube > 7 ?
                <> <span className="inline ml-1"> - <span className="font-normal">Muito bom</span></span> </>
                :
                clubeEscolhido.nota_clube > 5 ? <> <span className="inline ml-1"> - <span className="font-normal">Bom</span> </span> </>
                :
                clubeEscolhido.nota_clube > 3 ? <> <span className="inline ml-1"> - <span className="font-normal">Fraco</span> </span> </>
                :
                <> <span className="inline ml-1"> - <span className="font-normal">Ruim</span></span> </>
        },
        {
            titulo: "Chance de Quitar a Dívida",
            assinante,
            icon: `fa-solid fa-scale-balanced ${dark ? "text-purple-400" : "text-purple-700"}`,
            valor: clubeEscolhido.chance_quitar_divida,
            sufixo: clubeEscolhido.chance_quitar_divida > 75 ?
                <> <span className="inline ml-1"> - <span className="font-normal">Muito Alta</span></span> </>
                :
                clubeEscolhido.chance_quitar_divida > 60 ? <> <span className="inline ml-1"> - <span className="font-normal">Alta</span></span> </>
                :
                clubeEscolhido.chance_quitar_divida > 30 ? <> <span className="inline ml-1"> - <span className="font-normal">Moderada</span></span> </>
                :
                clubeEscolhido.chance_quitar_divida > 15 ? <> <span className="inline ml-1"> - <span className="font-normal">Baixa</span></span> </>
                :
                <> <span className="inline ml-1"> - <span className="font-normal">Quase Impossível</span></span> </>
        },
        {
            titulo: "Chance de Título (2026)",
            assinante,
            icon: `fa-solid fa-trophy ${dark ? "text-orange-400" : "text-orange-500"}`,
            valor: chanceTitulo,
            sufixo: chanceTitulo > 75 ?
                <> <span className="inline ml-1"> - <span className="font-normal">Muito Alta</span></span> </>
                :
                chanceTitulo > 60 ? <> <span className="inline ml-1"> - <span className="font-normal">Alta</span></span> </>
                :
                chanceTitulo > 30 ? <> <span className="inline ml-1"> - <span className="font-normal">Moderada</span></span> </>
                :
                chanceTitulo > 15 ? <> <span className="inline ml-1"> - <span className="font-normal">Baixa</span></span> </>
                :
                <> <span className="inline ml-1"> - <span className="font-normal">Quase Impossível</span></span> </>
        },
        {
            titulo: "Faturamento (2024)",
            assinante,
            icon: `fa-solid fa-sack-dollar ${dark ? "text-sky-300" : "text-sky-900"}`,
            valor: `R$ ${clubeEscolhido.faturamento_2024 >= 1000 ? clubeEscolhido.faturamento_2024/1000 : clubeEscolhido.faturamento_2024}`,
            sufixo: clubeEscolhido.faturamento_2024 < 1000 ? "mi" : "bi",
        },
        {
            titulo: "Dívida (2024)",
            assinante,
            icon: `fa-solid fa-sack-dollar ${dark ? "text-sky-300" : "text-sky-900"}`,
            valor: `R$ ${clubeEscolhido.divida_2024 >= 1000 ? clubeEscolhido.divida_2024/1000 : clubeEscolhido.divida_2024}`,
            sufixo: clubeEscolhido.divida_2024 < 1000 ? "mi" : "bi",
        },

    ];

    type PremiumCard = {
    id: string
    title: string
    description: string
    previewText: string
    iconClass: string
    }

    const premiumCards: PremiumCard[] = [
    {
        id: "quitacao-divida",
        title: "Chance de Quitar Dívida",
        description:
        "Análise completa com projeções financeiras e cenários para quitação da dívida do clube",
        previewText: "Baseado em 12 indicadores econômicos...",
        iconClass: "fa-solid fa-scale-balanced",
    },
    {
        id: "nota-clube",
        title: "Nota do Clube",
        description:
        "Avaliação detalhada da saúde financeira com rating de investimento",
        previewText: "Score calculado por especialistas...",
        iconClass: "fa-solid fa-trophy",
    },
    {
        id: "faturamento",
        title: "Faturamento (2024)",
        description:
        "Avaliação detalhada da saúde financeira com rating de investimento",
        previewText: "Score calculado por especialistas...",
        iconClass: "fa-solid fa-sack-dollar",
    },
    {
        id: "divida",
        title: "Dívida (2024)",
        description:
        "Avaliação detalhada da saúde financeira com rating de investimento",
        previewText: "Score calculado por especialistas...",
        iconClass: "fa-solid fa-sack-dollar",
    },
    ]


    return (
        <>
            <HeaderFixo />
            
            <main style={{ background: dark ? "linear-gradient(to bottom right, #0d1015, #080c14)" : "linear-gradient(to bottom right, #f7fbff, #fdfeff)"}} className="min-h-screen mt-15 pb-4 grid grid-rows-[auto_1fr]">
                <article style={{ background: corFundo }} className="col-span-full row-1 flex items-center justify-between sm:justify-around rounded-t-none mb-10 p-4 rounded-lg border-2 border-slate-800/20">
                    <div className="flex flex-col">
                        <img className="max-h-40 max-w-40 self-center" src={clubeEscolhido.imagem} alt="" />
                        <h1 className={`text-4xl text-center ${clubeEscolhido.nome === 'Santos' ? 'text-zinc-800 text-shadow-[1px_1px_1px_#FFF0002a]' : 'text-slate-50 text-shadow-[1px_1px_1px_#0000002a]'} font-[mono]`}>{clubeEscolhido.nome}</h1>
                    </div>
                    <div className="flex flex-col pl-2 min-h-full max-h-full justify-evenly gap-1">
                        <p
                            style={{ background: clubeEscolhido.nome === 'Santos' ? 'linear-gradient(135deg, #27272a 0%, #222222 100%)' : 'linear-gradient(135deg, #f8fafc 0%, white 100%)' }} className={`font-manrope rounded-md p-2 text-sm sm:text-base scale-90 sm:scale-100 border ${clubeEscolhido.nome === 'Santos' ? 'border-slate-900 text-zinc-50 text-shadow-[1px_1px_1px_#0000002a] shadow-[2px_2px_2px_#0000002a]' : 'border-white text-zinc-900 shadow-[2px_2px_2px_#0000006a]'} text-start font-medium`}>
                            <i className={`fa-solid fa-sack-dollar ${clubeEscolhido.nome === 'Santos' ? 'text-sky-400' : 'text-sky-900'} mr-1`}></i> {rank_do_clube.faturamento}° em Faturamento
                        </p>
                        <p
                            style={{ background: clubeEscolhido.nome === 'Santos' ? 'linear-gradient(135deg, #27272a 0%, #222222 100%)' : 'linear-gradient(135deg, #f8fafc 0%, white 100%)' }}
                            className={`font-manrope rounded-md p-2 text-sm sm:text-base scale-90 sm:scale-100 border ${clubeEscolhido.nome === 'Santos' ? 'border-slate-900 text-zinc-50 text-shadow-[1px_1px_1px_#0000002a] shadow-[2px_2px_2px_#0000002a]' : 'border-white text-zinc-900 shadow-[2px_2px_2px_#0000006a]'} text-start font-medium`}>
                            <i className="fa-solid fa-triangle-exclamation text-amber-500 mr-1"></i> {rank_do_clube.divida}° em Dívida
                        </p>
                        <p
                            style={{ background: clubeEscolhido.nome === 'Santos' ? 'linear-gradient(135deg, #27272a 0%, #222222 100%)' : 'linear-gradient(135deg, #f8fafc 0%, white 100%)' }}
                            className={`font-manrope rounded-md p-2 text-sm sm:text-base scale-90 sm:scale-100 border ${clubeEscolhido.nome === 'Santos' ? 'border-slate-900 text-zinc-50 text-shadow-[1px_1px_1px_#0000002a] shadow-[2px_2px_2px_#0000002a]' : 'border-white text-zinc-900 shadow-[2px_2px_2px_#0000006a]'} text-start font-medium`}>
                            <i className="fa-solid fa-users text-blue-600 mr-1"></i> {rank_do_clube.salario}° em Salário
                        </p>
                    </div>
                </article>

                <main className="grid grid-cols-[auto_1fr_auto] lg:px-4 items-center row-2">

                    <div className="lg:flex justify-start hidden sticky left-0 top-20 self-start">
                        <img className="max-w-[90%]" src={adsense} alt="" />
                    </div>

                    <div className="col-2">
                        <section className={`flex ${largura >= 1444 ? 'flex-wrap' : largura >= 1024 ? 'flex-col' : largura > 768 ? 'flex flex-wrap' : ' flex-col'} gap-6 px-5 pb-10`}>
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
                                    sufixo={card.sufixo}
                                    mediaData={mediaData}
                                    largura={largura}
                                    assinante={card.assinante}
                                    dark={dark}
                                />
                            ))}
                        </section>

                        {!assinante &&
                            <div className="mt-12">

                                <div
                                className="text-center mb-16"
                                x-file-name="PremiumSection"
                                x-line-number="16"
                                x-component="div"
                                x-id="PremiumSection_16"
                                x-dynamic="false"
                                >
                                <div
                                    className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-800 mb-4"
                                    x-file-name="PremiumSection"
                                    x-line-number="17"
                                    x-component="div"
                                    x-id="PremiumSection_17"
                                    x-dynamic="false"
                                >
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    className="lucide lucide-sparkles h-4 w-4"
                                    aria-hidden="true"
                                    x-file-name="PremiumSection"
                                    x-line-number="18"
                                    x-component="Sparkles"
                                    x-id="PremiumSection_18"
                                    x-dynamic="false"
                                    >
                                    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
                                    <path d="M20 3v4"></path>
                                    <path d="M22 5h-4"></path>
                                    <path d="M4 17v2"></path>
                                    <path d="M5 18H3"></path>
                                    </svg>

                                    Conteúdo Exclusivo
                                </div>

                                <h2
                                    className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                                    x-file-name="PremiumSection"
                                    x-line-number="21"
                                    x-component="h2"
                                    x-id="PremiumSection_21"
                                    x-dynamic="false"
                                >
                                    Análises 
                                    <span
                                    className="text-yellow-600 ml-1.5"
                                    x-file-name="PremiumSection"
                                    x-line-number="22"
                                    x-component="span"
                                    x-id="PremiumSection_22"
                                    x-dynamic="false"
                                    >
                                    Premium
                                    </span>
                                </h2>

                                <p
                                    className="text-lg text-gray-600 max-w-2xl mx-auto"
                                    x-file-name="PremiumSection"
                                    x-line-number="24"
                                    x-component="p"
                                    x-id="PremiumSection_24"
                                    x-dynamic="false"
                                >
                                    Desbloqueie insights avançados e projeções exclusivas sobre o futuro do
                                    Corinthians.
                                </p>
                                </div>

                                <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">

                                <span className="contents">

                                    <div className="rounded-xl bg-card text-card-foreground shadow relative border-2 border-yellow-200 hover:border-yellow-400 hover:shadow-2xl transition-all duration-300 overflow-hidden group">

                                    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-100 rounded-bl-full opacity-50 group-hover:opacity-70 transition-opacity"></div>

                                    <div className="flex flex-col space-y-1.5 p-6 relative">

                                        <div className="flex items-start justify-between mb-3">

                                        <div className="p-4 rounded-2xl bg-yellow-500 text-white shadow-lg group-hover:scale-110 transition-transform">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 lucide lucide-lock" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                            </svg>
                                        </div>

                                        <div className="flex flex-col items-end">
                                            <span className="text-sm text-gray-600 font-medium">A partir de</span>
                                            <span className="text-2xl font-bold text-yellow-600">
                                            <span className="contents">R$ 5,00</span>
                                            </span>
                                            <span className="text-xs text-gray-500">uma vez</span>
                                        </div>

                                        </div>

                                        <div className="tracking-tight text-2xl font-bold text-gray-900 mb-2">
                                        Chance de Quitar Dívida
                                        </div>

                                        <div className="text-base text-gray-600">
                                        Análise detalhada com projeções financeiras, cenários otimistas e pessimistas.
                                        </div>

                                    </div>

                                    <div className="p-6 pt-0 relative">
                                        <div className="space-y-3">

                                        <p className="text-sm font-semibold text-gray-900 mb-3">
                                            O que está incluído:
                                        </p>

                                        <span className="contents">

                                            <div className="flex items-start gap-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5 lucide lucide-circle-check" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <path d="m9 12 2 2 4-4"></path>
                                            </svg>
                                            <span className="text-sm text-gray-700">Projeção de quitação em 3 cenários</span>
                                            </div>

                                            <div className="flex items-start gap-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5 lucide lucide-circle-check" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <path d="m9 12 2 2 4-4"></path>
                                            </svg>
                                            <span className="text-sm text-gray-700">Análise de fluxo de caixa</span>
                                            </div>

                                            <div className="flex items-start gap-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5 lucide lucide-circle-check" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <path d="m9 12 2 2 4-4"></path>
                                            </svg>
                                            <span className="text-sm text-gray-700">Impacto de novos patrocínios</span>
                                            </div>

                                            <div className="flex items-start gap-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5 lucide lucide-circle-check" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <path d="m9 12 2 2 4-4"></path>
                                            </svg>
                                            <span className="text-sm text-gray-700">Comparativo com outros clubes</span>
                                            </div>

                                        </span>

                                        </div>
                                    </div>

                                    <div className="flex items-center p-6 pt-6">
                                        <button className="inline-flex items-center justify-center gap-2 text-sm h-10 rounded-md px-8 w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-6 shadow-lg hover:shadow-xl transition-all group cursor-pointer">
                                        
                                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5 lucide lucide-lock group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                        </svg>

                                        Desbloquear Acesso
                                        </button>
                                    </div>

                                    </div>


                                    <div className="rounded-xl bg-card text-card-foreground shadow relative border-2 border-yellow-200 hover:border-yellow-400 hover:shadow-2xl transition-all duration-300 overflow-hidden group">

                                    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-100 rounded-bl-full opacity-50 group-hover:opacity-70 transition-opacity"></div>

                                    <div className="flex flex-col space-y-1.5 p-6 relative">

                                        <div className="flex items-start justify-between mb-3">

                                        <div className="p-4 rounded-2xl bg-yellow-500 text-white shadow-lg group-hover:scale-110 transition-transform">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 lucide lucide-lock" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                            </svg>
                                        </div>

                                        <div className="flex flex-col items-end">
                                            <span className="text-sm text-gray-600 font-medium">A partir de</span>
                                            <span className="text-2xl font-bold text-yellow-600">
                                            <span className="contents">R$ 9,90</span>
                                            </span>
                                            <span className="text-xs text-gray-500">uma vez</span>
                                        </div>

                                        </div>

                                        <div className="tracking-tight text-2xl font-bold text-gray-900 mb-2">
                                        Chance de Quitar Dívida
                                        </div>

                                        <div className="text-base text-gray-600">
                                        Análise detalhada com projeções financeiras, cenários otimistas e pessimistas.
                                        </div>

                                    </div>

                                    <div className="p-6 pt-0 relative">
                                        <div className="space-y-3">

                                        <p className="text-sm font-semibold text-gray-900 mb-3">
                                            O que está incluído:
                                        </p>

                                        <span className="contents">

                                            <div className="flex items-start gap-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5 lucide lucide-circle-check" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <path d="m9 12 2 2 4-4"></path>
                                            </svg>
                                            <span className="text-sm text-gray-700">Projeção de quitação em 3 cenários</span>
                                            </div>

                                            <div className="flex items-start gap-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5 lucide lucide-circle-check" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <path d="m9 12 2 2 4-4"></path>
                                            </svg>
                                            <span className="text-sm text-gray-700">Análise de fluxo de caixa</span>
                                            </div>

                                            <div className="flex items-start gap-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5 lucide lucide-circle-check" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <path d="m9 12 2 2 4-4"></path>
                                            </svg>
                                            <span className="text-sm text-gray-700">Impacto de novos patrocínios</span>
                                            </div>

                                            <div className="flex items-start gap-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5 lucide lucide-circle-check" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <path d="m9 12 2 2 4-4"></path>
                                            </svg>
                                            <span className="text-sm text-gray-700">Comparativo com outros clubes</span>
                                            </div>

                                        </span>

                                        </div>
                                    </div>

                                    <div className="flex items-center p-6 pt-6">
                                        <button className="inline-flex items-center justify-center gap-2 text-sm h-10 rounded-md px-8 w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-6 shadow-lg hover:shadow-xl transition-all group cursor-pointer">
                                        
                                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5 lucide lucide-lock group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                        </svg>

                                        Desbloquear Acesso
                                        </button>
                                    </div>

                                    </div>
                                </span>

                                </div>
                            </div>
                        }
                    </div>

                    <div className="lg:flex justify-end hidden sticky left-0 top-20 self-start">
                        <img className="max-w-[90%]" src={adsense} alt="" />
                    </div>

                </main>
            </main>

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

            <FooterFixo />
        </>
    )
}
