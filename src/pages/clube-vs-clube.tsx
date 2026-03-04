import { buscaTodosClubes } from "../components/busca-clube";
import React, { useEffect, useState, useMemo, useCallback, useRef } from "react";
import type { Clube } from "../components/busca-clube";
import '../styles/comparacao-unica.css';
import HeaderFixo from "../components/header-fixo";
import { allContext } from "../context/all-context";
import {
  DollarSign,
  TrendingDown,
  Shield,
  Trophy,
  Users,
  Banknote,
  Landmark,
  Percent,
  UserPlus,
  Target,
  Award,
  Calculator,
  Star,
  Gauge,
  HandCoins,
  Coins,
  BadgeDollarSign,
  TrendingUpDown,
  TrendingUp
} from "lucide-react";
import * as Popover from '@radix-ui/react-popover';
import FooterFixo from "../components/footer-fixo";
import CardsPremium from "../components/cards-premium";
import { calcularChanceTitulo } from "../components/busca-clube";
import AdsenseLeft from "../components/adsense-left";
import AdsenseRight from "../components/adsense-right";


type TopicoComparacao = {
  label: Topico;
  categoria: 'SP' | 'RJ' | 'RS' | 'MG' | 'CE' | 'BA' | 'PE'
}

export type Topico =
'Corinthians' | 'São Paulo' | 'Palmeiras' | 'Mirassol' | 'Bragantino' | 'Santos' | 'Flamengo' | 'Vasco' | 'Fluminense' | 'Botafogo' | 'Internacional' | 'Grêmio' | 'Atlético Mineiro' | 'Juventude' | 'Cruzeiro' | 'Ceará' | 'Fortaleza' | 'Bahia' | 'Vitória' | 'Sport';

export type DadosClube = {
  faturamento: number;
  divida: number;
  lucro: number;
  contratacoes: number;
  folha_salarial: number;
  maiorContratacao: number;
  fatDiv: number;
  lucFat: number;
  custoVitoria: number;
  custoGol: number;
  custoPonto: number;
  custoJogador: number;
  notaClube: number;
  mediaTorcedores: number;
  projetarFaturamento: number;
  chanceQuitarDivida: number;
};


export default function ClubeVsClube() {
    const {setTopicoAtivo, setAbaEntretenimento, dark, assinanteAtual} = allContext();
    const [popoverAberto1, setPopoverAberto1] = useState(false);
    const [popoverAberto2, setPopoverAberto2] = useState(false);
    const [chanceTituloA, setChanceTituloA] = useState<number>(0);
    const [chanceTituloB, setChanceTituloB] = useState<number>(0);
    const [clubes, setClubes] = useState<Clube[]>();
    const [clubeA, setClubeA] = useState<Clube | undefined>();
    const [clubeANome, setClubeANome] = useState<Topico>('Flamengo');
    const [clubeB, setClubeB] = useState<Clube | undefined>();
    const [clubeBNome, setClubeBNome] = useState<Topico>('Palmeiras');
    const premiumRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!clubeA || !clubeB) return;

        const chanceA = calcularChanceTitulo(clubeA.folha_salarial, clubeA.valor_contratacoes, clubeA.pontos, clubeA.vitorias);

        const novaChanceA = Number((chanceA * clubeA.nota_clube/10).toFixed(2));
        setChanceTituloA(novaChanceA);

        const chanceB = calcularChanceTitulo(clubeB.folha_salarial, clubeB.valor_contratacoes, clubeB.pontos, clubeB.vitorias);

        const novaChanceB = Number((chanceB * clubeB.nota_clube/10).toFixed(2));
        setChanceTituloB(novaChanceB);

    }, [clubeA, clubeB]);

    const topicosComparacao: TopicoComparacao[] = [
        // ---------------- SP ----------------
        { label: 'Corinthians', categoria: 'SP' },
        { label: 'São Paulo', categoria: 'SP' },
        { label: 'Palmeiras', categoria: 'SP' },
        { label: 'Mirassol', categoria: 'SP' },
        { label: 'Santos', categoria: 'SP' },
        { label: 'Bragantino', categoria: 'SP' },

        // ---------------- RJ ----------------
        { label: 'Flamengo', categoria: 'RJ' },
        { label: 'Fluminense', categoria: 'RJ' },
        { label: 'Vasco', categoria: 'RJ' },
        { label: 'Botafogo', categoria: 'RJ' },

        // ---------------- RS ----------------
        { label: 'Internacional', categoria: 'RS' },
        { label: 'Grêmio', categoria: 'RS' },
        { label: 'Juventude', categoria: 'RS' },

        // ---------------- MG ----------------
        { label: 'Cruzeiro', categoria: 'MG' },
        { label: 'Atlético Mineiro', categoria: 'MG' },

        // ---------------- CE ----------------
        { label: 'Ceará', categoria: 'CE' },
        { label: 'Fortaleza', categoria: 'CE' },

        // ---------------- BA ----------------
        { label: 'Bahia', categoria: 'BA' },
        { label: 'Vitória', categoria: 'BA' },

        // ---------------- PE ----------------
        { label: 'Sport', categoria: 'PE' },
    ];

    const iconMap = {
    faturamento: DollarSign,
    divida: TrendingDown,
    lucro: Shield,
    vitoria: Trophy,
    salario: Users,
    luc_fat: Banknote,
    fat_div: Landmark,
    lucroFaturamento: Percent,
    contratacoes: UserPlus,
    gols: Target,
    custoVitoria: Award,
    custoGols: Coins,
    custoPontos: Calculator,
    custoJogador: HandCoins,
    notaClube: Star,
    chanceQuitarDivida: Gauge,
    chanceTitulo: TrendingUpDown,
    valor_estimado: BadgeDollarSign,
    } as const;

    type IconName = keyof typeof iconMap;

    type FinancialItem = {
    club: string;
    value: number;
    formatted: string | React.ReactNode;
    highlight?: boolean;
    };

    type FinancialSection = {
    title: string | React.ReactNode;
    icon: IconName;
    items: FinancialItem[];
    };

    function fazerScroll() {
        if (!premiumRef.current) return;

        premiumRef.current.scrollIntoView({
            behavior: 'smooth',
        })
    }

    function criaTag(titulo: string, socio: string) {
        return (
                <> 
                    <div className="inline relative">
                        {titulo}
                        <div onClick={() => fazerScroll()} className={`ml-2 absolute flex top-1/2 -translate-y-[45%] right-0 translate-x-[125%] items-center justify-center min-h-6 min-w-6 cursor-pointer rounded-md ${socio === 'sócio' ? 'bg-red-600' : 'bg-yellow-500'}`}>
                            <i className={`${socio === 'sócio' ? 'fa-brands fa-web-awesome' : 'fa-solid fa-trophy'} text-slate-100 text-[10px] -translate-x-[0.63px] translate-y-px text-shadow-[0px_2px_1px_#0000002a]`}></i>
                        </div>
                    </div>

                </>
        )
    }

    const verificaAssinanteValue = useCallback((topico: number) => {
        return (
            (assinanteAtual === 'Torcedor' || assinanteAtual === 'Sócio') ? topico : 0
        )
    }, [assinanteAtual]);

    const verificaAssinanteFormatted = useCallback((value: number, formato: string) => {
        return (
            (assinanteAtual === 'Torcedor' || assinanteAtual === 'Sócio') ?
                `${value}${formato}`
            :
                <>
                    <i className="fa-solid fa-lock"></i>
                </>
        )
    }, [assinanteAtual]);

    const verificaAssinanteHigh = useCallback((topicoA: number, topicoB: number, direcaoClube: string, direcao: boolean) => {
        return (
            (assinanteAtual === 'Torcedor' || assinanteAtual === 'Sócio') ?
                direcaoClube === 'A' ?
                    direcao ?
                        topicoA >= topicoB
                    :
                        topicoA <= topicoB
                :
                    direcao ?
                        topicoA <= topicoB
                    :
                        topicoA >= topicoB
            :
            false
        )
    }, [assinanteAtual]);

    const verificaAssinanteValueSocio = useCallback((topico: number) => {
        return (
            (assinanteAtual === 'Sócio') ? topico : 0
        )
    }, [assinanteAtual]);

    const verificaAssinanteFormattedSocio = useCallback((value: number, formato: string) => {
        return (
            (assinanteAtual === 'Sócio') ?
                `${value}${formato}`
            :
                <>
                    <i className="fa-solid fa-lock"></i>
                </>
        )
    }, [assinanteAtual]);

    const verificaAssinanteHighSocio = useCallback((topicoA: number, topicoB: number, direcaoClube: string, direcao: boolean) => {
        return (
            (assinanteAtual === 'Sócio') ?
                direcaoClube === 'A' ?
                    direcao ?
                        topicoA >= topicoB
                    :
                        topicoA <= topicoB
                :
                    direcao ?
                        topicoA <= topicoB
                    :
                        topicoA >= topicoB
            :
            false
        )
    }, [assinanteAtual]);

    const financialData: FinancialSection[] = useMemo(() => {
        if (!clubeA || !clubeB) return [];

        return [
            {
                title: "Receita",
                icon: "faturamento",
                items: [
                {
                    club: clubeA.nome.slice(0, 3).toUpperCase(),
                    value: clubeA.faturamento,
                    formatted: `R$ ${clubeA.faturamento >= 1000 ? `${clubeA.faturamento/1000} BI` : `${clubeA.faturamento} MI`}`,
                    highlight: clubeA.faturamento >= clubeB.faturamento,
                },
                {
                    club: clubeB.nome.slice(0, 3).toUpperCase(),
                    value: clubeB.faturamento,
                    formatted: `R$ ${clubeB.faturamento >= 1000 ? `${clubeB.faturamento/1000} BI` : `${clubeB.faturamento} MI`}`,
                    highlight: clubeA.faturamento <= clubeB.faturamento
                },
                ],
            },
            {
                title: "Dívida",
                icon: "divida",
                items: [
                {
                    club: clubeA.nome.slice(0, 3).toUpperCase(),
                    value: clubeA.divida,
                    formatted: `R$ ${clubeA.divida >= 1000 ? `${clubeA.divida/1000} BI` : `${clubeA.divida} MI`}`,
                    highlight: clubeA.divida <= clubeB.divida,
                },
                {
                    club: clubeB.nome.slice(0, 3).toUpperCase(),
                    value: clubeB.divida,
                    formatted: `R$ ${clubeB.divida >= 1000 ? `${clubeB.divida/1000} BI` : `${clubeB.divida} MI`}`,
                    highlight: clubeA.divida >= clubeB.divida
                },
                ],
            },
            {
                title: "Lucro",
                icon: "lucro",
                items: [
                {
                    club: clubeA.nome.slice(0, 3).toUpperCase(),
                    value: clubeA.lucro,
                    formatted: `R$ ${clubeA.lucro >= 1000 ? `${clubeA.lucro/1000} BI` : `${clubeA.lucro} MI`}`,
                    highlight: clubeA.lucro >= clubeB.lucro,
                },
                {
                    club: clubeB.nome.slice(0, 3).toUpperCase(),
                    value: clubeB.lucro,
                    formatted: `R$ ${clubeB.lucro >= 1000 ? `${clubeB.lucro/1000} BI` : `${clubeB.lucro} MI`}`,
                    highlight: clubeA.lucro <= clubeB.lucro
                },
                ],
            },
            {
                title: "Faturamento/Dívida",
                icon: "fat_div",
                items: [
                {
                    club: clubeA.nome.slice(0, 3).toUpperCase(),
                    value: Number(((clubeA.faturamento / clubeA.divida)*100).toFixed(1)),
                    formatted: `${Number(((clubeA.faturamento / clubeA.divida)*100).toFixed(1))}%`,
                    highlight: Number(((clubeA.faturamento / clubeA.divida)*100).toFixed(1)) >= Number(((clubeB.faturamento / clubeB.divida)*100).toFixed(1)),
                },
                {
                    club: clubeB.nome.slice(0, 3).toUpperCase(),
                    value: Number(((clubeB.faturamento / clubeB.divida)*100).toFixed(1)),
                    formatted: `${Number(((clubeB.faturamento / clubeB.divida)*100).toFixed(1))}%`,
                    highlight: Number(((clubeA.faturamento / clubeA.divida)*100).toFixed(1)) <= Number(((clubeB.faturamento / clubeB.divida)*100).toFixed(1)),
                },
                ],
            },
            {
                title: "Lucro/Faturamento",
                icon: "luc_fat",
                items: [
                {
                    club: clubeA.nome.slice(0, 3).toUpperCase(),
                    value: Number(((clubeA.lucro / clubeA.faturamento)*100).toFixed(1)),
                    formatted: `${Number(((clubeA.lucro / clubeA.faturamento)*100).toFixed(1))}%`,
                    highlight: Number(((clubeA.lucro / clubeA.faturamento)*100).toFixed(1)) >= Number(((clubeB.lucro / clubeB.faturamento)*100).toFixed(1)),
                },
                {
                    club: clubeB.nome.slice(0, 3).toUpperCase(),
                    value: Number(((clubeB.lucro / clubeB.faturamento)*100).toFixed(1)),
                    formatted: `${Number(((clubeB.lucro / clubeB.faturamento)*100).toFixed(1))}%`,
                    highlight: Number(((clubeA.lucro / clubeA.faturamento)*100).toFixed(1)) <= Number(((clubeB.lucro / clubeB.faturamento)*100).toFixed(1)),
                },
                ],
            },
            {
                title: "Folha Salarial",
                icon: "salario",
                items: [
                {
                    club: clubeA.nome.slice(0, 3).toUpperCase(),
                    value: clubeA.folha_salarial,
                    formatted: `R$ ${clubeA.folha_salarial >= 1000 ? `${clubeA.folha_salarial/1000} bi/mês` : `${clubeA.folha_salarial} mi/mês`}`,
                    highlight: clubeA.folha_salarial >= clubeB.folha_salarial,
                },
                {
                    club: clubeB.nome.slice(0, 3).toUpperCase(),
                    value: clubeB.folha_salarial,
                    formatted: `R$ ${clubeB.folha_salarial >= 1000 ? `${clubeB.folha_salarial/1000} bi/mês` : `${clubeB.folha_salarial} mi/mês`}`,
                    highlight: clubeA.folha_salarial <= clubeB.folha_salarial
                },
                ],
            },
            {
                title: "Contratações",
                icon: "contratacoes",
                items: [
                {
                    club: clubeA.nome.slice(0, 3).toUpperCase(),
                    value: clubeA.valor_contratacoes,
                    formatted: `R$ ${clubeA.valor_contratacoes >= 1000 ? `${clubeA.valor_contratacoes} BI` : `${clubeA.valor_contratacoes} MI`}`,
                    highlight: clubeA.valor_contratacoes >= clubeB.valor_contratacoes,
                },
                {
                    club: clubeB.nome.slice(0, 3).toUpperCase(),
                    value: clubeB.valor_contratacoes,
                    formatted: `R$ ${clubeB.valor_contratacoes >= 1000 ? `${clubeB.valor_contratacoes} BI` : `${clubeB.valor_contratacoes} MI`}`,
                    highlight: clubeA.valor_contratacoes <= clubeB.valor_contratacoes,
                },
                ],
            },
            {
                title: "Vitórias",
                icon: "vitoria",
                items: [
                {
                    club: clubeA.nome.slice(0, 3).toUpperCase(),
                    value: clubeA.vitorias,
                    formatted: `${clubeA.vitorias} vitórias`,
                    highlight: clubeA.vitorias >= clubeB.vitorias,
                },
                {
                    club: clubeB.nome.slice(0, 3).toUpperCase(),
                    value: clubeB.vitorias,
                    formatted: `${clubeB.vitorias} vitórias`,
                    highlight: clubeA.vitorias <= clubeB.vitorias,
                },
                ],
            },
            {
                title: "Gols",
                icon: "gols",
                items: [
                {
                    club: clubeA.nome.slice(0, 3).toUpperCase(),
                    value: clubeA.gols,
                    formatted: `${clubeA.gols} gols`,
                    highlight: clubeA.gols >= clubeB.gols,
                },
                {
                    club: clubeB.nome.slice(0, 3).toUpperCase(),
                    value: clubeB.gols,
                    formatted: `${clubeB.gols} gols`,
                    highlight: clubeA.gols <= clubeB.gols,
                },
                ],
            },
            {
                title: "Custo/Vitória",
                icon: "custoVitoria",
                items: [
                {
                    club: clubeA.nome.slice(0, 3).toUpperCase(),
                    value: ((clubeA.folha_salarial * 13 + clubeA.valor_contratacoes) / clubeA.vitorias),
                    formatted: `R$ ${((clubeA.folha_salarial * 13 + clubeA.valor_contratacoes) / clubeA.vitorias).toFixed(1)} mi/vitória`,
                    highlight: ((clubeA.folha_salarial * 13 + clubeA.valor_contratacoes) / clubeA.vitorias) <= ((clubeB.folha_salarial * 13 + clubeB.valor_contratacoes) / clubeB.vitorias),
                },
                {
                    club: clubeB.nome.slice(0, 3).toUpperCase(),
                    value: ((clubeB.folha_salarial * 13 + clubeB.valor_contratacoes) / clubeB.vitorias),
                    formatted: `R$ ${((clubeB.folha_salarial * 13 + clubeB.valor_contratacoes) / clubeB.vitorias).toFixed(1)} mi/vitória`,
                    highlight: ((clubeA.folha_salarial * 13 + clubeA.valor_contratacoes) / clubeA.vitorias) >= ((clubeB.folha_salarial * 13 + clubeB.valor_contratacoes) / clubeB.vitorias)
                },
                ],
            },
            {
                title: "Custo/Gols",
                icon: "custoGols",
                items: [
                {
                    club: clubeA.nome.slice(0, 3).toUpperCase(),
                    value: ((clubeA.folha_salarial * 13 + clubeA.valor_contratacoes) / clubeA.gols),
                    formatted: `R$ ${((clubeA.folha_salarial * 13 + clubeA.valor_contratacoes) / clubeA.gols).toFixed(1)} mi/gol`,
                    highlight: ((clubeA.folha_salarial * 13 + clubeA.valor_contratacoes) / clubeA.gols) <= ((clubeB.folha_salarial * 13 + clubeB.valor_contratacoes) / clubeB.gols),
                },
                {
                    club: clubeB.nome.slice(0, 3).toUpperCase(),
                    value: ((clubeB.folha_salarial * 13 + clubeB.valor_contratacoes) / clubeB.gols),
                    formatted: `R$ ${((clubeB.folha_salarial * 13 + clubeB.valor_contratacoes) / clubeB.gols).toFixed(1)} mi/gol`,
                    highlight: ((clubeA.folha_salarial * 13 + clubeA.valor_contratacoes) / clubeA.gols) >= ((clubeB.folha_salarial * 13 + clubeB.valor_contratacoes) / clubeB.gols)
                },
                ],
            },
            {
                title: "Custo/Jogador",
                icon: "custoJogador",
                items: [
                {
                    club: clubeA.nome.slice(0, 3).toUpperCase(),
                    value: (clubeA.folha_salarial / clubeA.quant_jogadores),
                    formatted: `R$ ${(clubeA.folha_salarial / clubeA.quant_jogadores).toFixed(1)} mi/jogador`,
                    highlight: (clubeA.folha_salarial / clubeA.quant_jogadores) <= (clubeB.folha_salarial / clubeB.quant_jogadores),
                },
                {
                    club: clubeB.nome.slice(0, 3).toUpperCase(),
                    value: (clubeB.folha_salarial / clubeB.quant_jogadores),
                    formatted: `R$ ${(clubeB.folha_salarial / clubeB.quant_jogadores).toFixed(1)} mi/jogador`,
                    highlight: (clubeA.folha_salarial / clubeA.quant_jogadores) >= (clubeB.folha_salarial / clubeB.quant_jogadores)
                },
                ],
            },
            {
                title: "Custo/Pontos",
                icon: "custoPontos",
                items: [
                {
                    club: clubeA.nome.slice(0, 3).toUpperCase(),
                    value: ((clubeA.folha_salarial * 13 + clubeA.valor_contratacoes) / clubeA.pontos),
                    formatted: `R$ ${((clubeA.folha_salarial * 13 + clubeA.valor_contratacoes) / clubeA.pontos).toFixed(1)} mi/ponto`,
                    highlight: ((clubeA.folha_salarial * 13 + clubeA.valor_contratacoes) / clubeA.pontos) <= ((clubeB.folha_salarial * 13 + clubeB.valor_contratacoes) / clubeB.pontos),
                },
                {
                    club: clubeB.nome.slice(0, 3).toUpperCase(),
                    value: ((clubeB.folha_salarial * 13 + clubeB.valor_contratacoes) / clubeB.pontos),
                    formatted: `R$ ${((clubeB.folha_salarial * 13 + clubeB.valor_contratacoes) / clubeB.pontos).toFixed(1)} mi/ponto`,
                    highlight: ((clubeA.folha_salarial * 13 + clubeA.valor_contratacoes) / clubeA.pontos) >= ((clubeB.folha_salarial * 13 + clubeB.valor_contratacoes) / clubeB.pontos)
                },
                ],
            },
            {
                title: criaTag('Chance de Título (2026)', 'torcedor'),  
                icon: "chanceTitulo",
                items: [
                {
                    club: clubeA.nome.slice(0, 3).toUpperCase(),
                    value: verificaAssinanteValue(chanceTituloA),
                    formatted: verificaAssinanteFormatted(chanceTituloA, '%'),
                    highlight: verificaAssinanteHigh(chanceTituloA, chanceTituloB, 'A', true),
                },
                {
                    club: clubeB.nome.slice(0, 3).toUpperCase(),
                    value: verificaAssinanteValue(chanceTituloB),
                    formatted: verificaAssinanteFormatted(chanceTituloB, '%'),
                    highlight: verificaAssinanteHigh(chanceTituloA, chanceTituloB, 'B', true),
                },
                ],
            },
            {
                title: criaTag('Valor Estimado', 'torcedor'),        
                icon: "valor_estimado",
                items: [
                {
                    club: clubeA.nome.slice(0, 3).toUpperCase(),
                    value: verificaAssinanteValue(clubeA.valor_estimado),
                    formatted: verificaAssinanteFormatted(clubeA.valor_estimado, clubeA.valor_estimado >= 1000 ? ' MI' : ' BI'),
                    highlight: verificaAssinanteHigh(clubeA.valor_estimado, clubeB.valor_estimado, 'A', true),
                },
                {
                    club: clubeB.nome.slice(0, 3).toUpperCase(),
                    value: verificaAssinanteValue(clubeB.valor_estimado),
                    formatted: verificaAssinanteFormatted(clubeB.valor_estimado, clubeB.valor_estimado >= 1000 ? ' MI' : ' BI'),
                    highlight: verificaAssinanteHigh(clubeA.valor_estimado, clubeB.valor_estimado, 'B', true),
                },
                ],
            },
            {
                title: criaTag('Receita (2024)', 'torcedor'),
                icon: "faturamento",
                items: [
                {
                    club: clubeA.nome.slice(0, 3).toUpperCase(),
                    value: verificaAssinanteValue(clubeA.faturamento_2024),
                    formatted: verificaAssinanteFormatted(clubeA.faturamento_2024, clubeA.faturamento_2024 >= 1000 ? ' MI' : ' BI'),
                    highlight: verificaAssinanteHigh(clubeA.faturamento_2024, clubeB.faturamento_2024, 'A', true),
                },
                {
                    club: clubeB.nome.slice(0, 3).toUpperCase(),
                    value: verificaAssinanteValue(clubeB.faturamento_2024),
                    formatted: verificaAssinanteFormatted(clubeB.faturamento_2024, clubeB.faturamento_2024 >= 1000 ? ' MI' : ' BI'),
                    highlight: verificaAssinanteHigh(clubeA.faturamento_2024, clubeB.faturamento_2024, 'B', true),
                },
                ],
            },
            {
                title: criaTag('Dívida (2024)', 'torcedor'),
                icon: "divida",
                items: [
                {
                    club: clubeA.nome.slice(0, 3).toUpperCase(),
                    value: verificaAssinanteValue(clubeA.divida_2024),
                    formatted: verificaAssinanteFormatted(clubeA.divida_2024, clubeA.divida_2024 >= 1000 ? ' MI' : ' BI'),
                    highlight: verificaAssinanteHigh(clubeA.divida_2024, clubeB.divida_2024, 'A', false),
                },
                {
                    club: clubeB.nome.slice(0, 3).toUpperCase(),
                    value: verificaAssinanteValue(clubeB.divida_2024),
                    formatted: verificaAssinanteFormatted(clubeB.divida_2024, clubeB.divida_2024 >= 1000 ? ' MI' : ' BI'),
                    highlight: verificaAssinanteHigh(clubeA.divida_2024, clubeB.divida_2024, 'B', false),
                },
                ],
            },
            {
                title: criaTag('Nota do Clube', 'sócio'),
                icon: "notaClube",
                items: [
                {
                    club: clubeA.nome.slice(0, 3).toUpperCase(),
                    value: verificaAssinanteValueSocio(clubeA.nota_clube),
                    formatted: verificaAssinanteFormattedSocio(clubeA.nota_clube, '/10'),
                    highlight: verificaAssinanteHighSocio(clubeA.nota_clube, clubeB.nota_clube, 'A', true),
                },
                {
                    club: clubeB.nome.slice(0, 3).toUpperCase(),
                    value: verificaAssinanteValueSocio(clubeB.nota_clube),
                    formatted: verificaAssinanteFormattedSocio(clubeB.nota_clube, '/10'),
                    highlight: verificaAssinanteHighSocio(clubeA.nota_clube, clubeB.nota_clube, 'B', true),
                },
                ],
            },
            {
                title: criaTag('Chance de Quitar a Dívida (15 anos)', 'sócio'),  
                icon: "chanceQuitarDivida",
                items: [
                {
                    club: clubeA.nome.slice(0, 3).toUpperCase(),
                    value: verificaAssinanteValueSocio(clubeA.chance_quitar_divida),
                    formatted: verificaAssinanteFormattedSocio(clubeA.chance_quitar_divida, '%'),
                    highlight: verificaAssinanteHighSocio(clubeA.chance_quitar_divida, clubeB.chance_quitar_divida, 'A', true),
                },
                {
                    club: clubeB.nome.slice(0, 3).toUpperCase(),
                    value: verificaAssinanteValueSocio(clubeB.chance_quitar_divida),
                    formatted: verificaAssinanteFormattedSocio(clubeB.chance_quitar_divida, '%'),
                    highlight: verificaAssinanteHighSocio(clubeA.chance_quitar_divida, clubeB.chance_quitar_divida, 'B', true),
                },
                ],
            },
            {
                title: criaTag('Projetar Receita (2026)', 'sócio'),  
                icon: "faturamento",
                items: [
                {
                    club: clubeA.nome.slice(0, 3).toUpperCase(),
                    value: verificaAssinanteValueSocio((clubeA.faturamento + clubeA.aumento_faturamento)),
                    formatted: verificaAssinanteFormattedSocio((clubeA.faturamento + clubeA.aumento_faturamento), (clubeA.faturamento + clubeA.aumento_faturamento) > 1000 ? ' BI' : ' MI'),
                    highlight: verificaAssinanteHighSocio((clubeA.faturamento + clubeA.aumento_faturamento), (clubeB.faturamento + clubeB.aumento_faturamento), 'A', true),
                },
                {
                    club: clubeB.nome.slice(0, 3).toUpperCase(),
                    value: verificaAssinanteValueSocio((clubeB.faturamento + clubeB.aumento_faturamento)),
                    formatted: verificaAssinanteFormattedSocio((clubeB.faturamento + clubeB.aumento_faturamento), (clubeB.faturamento + clubeB.aumento_faturamento) > 1000 ? ' BI' : ' MI'),
                    highlight: verificaAssinanteHighSocio((clubeA.faturamento + clubeA.aumento_faturamento), (clubeB.faturamento + clubeB.aumento_faturamento), 'B', true),
                },
                ],
            },
        ];

    }, [clubeA, clubeB, chanceTituloA, chanceTituloB]);

    useEffect(() => {
        if (!clubes) return;
        const clubeAEscolhido = clubes?.filter((clube) => clube.nome === clubeANome);
        const clubeBEscolhido = clubes?.filter((clube) => clube.nome === clubeBNome);

        if (clubeAEscolhido && clubeBEscolhido) {
            setClubeA(clubeAEscolhido[0]);
            setClubeB(clubeBEscolhido[0]);
        }

    }, [clubeANome, clubeBNome]);

    useEffect(() => {
        setTopicoAtivo('Produto');
        setAbaEntretenimento(true);
        window.scrollTo({
            top: 0
        });

        buscaTodosClubes()
            .then((clubes) => {
                setClubes(clubes.data);
                const todosClubes = clubes.data;
                const flamengo = todosClubes?.filter((clube) => clube.nome === 'Flamengo');
                const palmeiras = todosClubes?.filter((clube) => clube.nome === 'Palmeiras');
                if (flamengo && palmeiras) {
                    setClubeA(flamengo[0])
                    setClubeB(palmeiras[0])
                }
            })
            .catch((error) => console.log('Houve um erro', error));
    }, []);

    const agrupadosPorCategoria = topicosComparacao.reduce((acc, topico) => {
        if (!acc[topico.categoria]) {
            acc[topico.categoria] = [];
        }
        acc[topico.categoria].push(topico);
        return acc;
    }, {} as Record<string, TopicoComparacao[]>);
    


    return (
        <div style={{ background: dark ? "linear-gradient(to bottom right, #0d1015, #080c14)" : "linear-gradient(to bottom right, #f7fbff, #fdfeff)"}} className="mt-15">
            <HeaderFixo/>

            <div className="grid grid-cols-[auto_1fr_auto] lg:px-4 items-center pt-2 pb-4">

                {(assinanteAtual !== 'Sócio' && assinanteAtual !== 'Torcedor') &&
                    <AdsenseLeft />
                }

                <main id="main-clube-vs-clube" className={`col-2 ${(assinanteAtual !== 'Sócio' && assinanteAtual !== 'Torcedor') ? 'lg:max-w-250 lg:min-w-250' : 'lg:min-w-[80%] lg:max-w-[80%] translate-x-[12.5vw]'}`}>
                    <h2 className={`text-[32px] text-center md:text-[40px] font-bold mt-2 tracking-[-0.015em] ${dark ? 'text-white' : 'text-[#222222]'}`}>
                    Compare Clubes
                    </h2>
                    <p className={`text-base text-center mt-2 ${dark ? 'text-[rgb(218,218,218)]' : 'text-zinc-700'}`}>
                    Selecione dois clubes e veja a batalha financeira lado a lado.
                    </p>


                    <div className="w-full mx-auto flex items-center justify-center mb-12">

                        <div className="opacity-100 transform-none mt-4 min-w-full">
                            <div className={`border rounded-2xl p-6 md:p-10 lg:pl-4 lg:pr-2 max-h-160 overflow-y-hidden ${dark ? 'bg-[rgb(26,28,30)] border-white/10' : 'bg-slate-200 border-slate-800/20'}`}>
                            
                                <div className="grid grid-cols-2 gap-6 mb-10 lg:pl-6 lg:pr-8">
                                    
                                    <div>
                                        <label className={`text-xs font-medium mb-2 block uppercase tracking-wider ${dark ? 'text-[rgb(161,161,170)]' : 'text-neutral-900'}`}>
                                            Clube A
                                        </label>
                                        <div className={`border-2 rounded-xl pl-1 pr-3 text-sm font-medium appearance-none max-h-13 min-h-13 focus:shadow-[0_0_0_4px_rgba(218,255,1,0.1)] transition-all flex items-center cursor-pointer ${dark ? 'bg-[rgb(38,40,42)] border-[rgb(63,63,63)]' : 'bg-white border-slate-700/30'}`}>
                                        <Popover.Root open={popoverAberto1} onOpenChange={setPopoverAberto1}>
                                        <Popover.Trigger asChild>
                                            <button className="font-medium flex items-center w-full justify-between cursor-pointer pl-1 sm:pl-4.5 lg:pl-2.5 min-h-13 max-h-full">
                                                <strong>
                                                    <span className={`p-0.5 flex rounded-md font-medium cursor-pointer items-center ${dark ? 'text-[#DAFF01] text-shadow-[1px_1px_1px_#0000002a]' : 'text-zinc-800'}`}>{clubeANome}
                                                    </span>
                                                </strong>
                                                <i className={`fa-solid fa-angle-down ml-1 translate-y-[10%] text-shadow-[1px_1px_1px_#0000002a] ${dark ? 'text-[#DAFF01]' : 'text-zinc-800'}`}></i>
                                            </button>
                                        </Popover.Trigger>

                                        <Popover.Portal>
                                            <Popover.Content
                                            sideOffset={8}
                                            className="w-96 max-h-96 overflow-y-auto rounded-xl bg-[rgb(38,40,42)] mt-2 border border-gray-200/70 p-4 shadow-xl z-10"
                                            >
                                            <div className="space-y-6">
                                                {Object.entries(agrupadosPorCategoria).map(
                                                ([categoria, topicos]) => (
                                                    <div key={categoria} className="space-y-2">
                                                    <h4 className="text-xs font-semibold uppercase text-slate-400">
                                                        {categoria}
                                                    </h4>

                                                    <div className="space-y-1">
                                                        {topicos.map((item: TopicoComparacao) => (
                                                        <button
                                                            key={item.label}
                                                            onClick={() => {
                                                                setClubeANome(item.label);
                                                                setPopoverAberto1(false);
                                                            }}
                                                            className={`
                                                            w-full text-left px-3 py-2 rounded-md
                                                            transition
                                                            ${
                                                                clubeANome === item.label
                                                                ? 'bg-sky-500/20 text-sky-300'
                                                                : 'hover:bg-slate-800 text-slate-200'
                                                            }
                                                            `}
                                                        >
                                                            {item.label}
                                                        </button>
                                                        ))}
                                                    </div>
                                                    </div>
                                                )
                                                )}
                                            </div>
                                            </Popover.Content>
                                        </Popover.Portal>
                                        </Popover.Root>

                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className={`text-xs font-medium mb-2 block uppercase tracking-wider ${dark ? 'text-[rgb(161,161,170)]' : 'text-neutral-900'}`}>
                                            Clube B
                                        </label>
                                        <div className={`border-2 rounded-xl pl-1 pr-3 text-sm font-medium appearance-none max-h-13 min-h-13 focus:shadow-[0_0_0_4px_rgba(218,255,1,0.1)] transition-all flex items-center cursor-pointer ${dark ? 'bg-[rgb(38,40,42)] border-[rgb(63,63,63)]' : 'bg-white border-slate-700/30'}`}>
                                        <Popover.Root open={popoverAberto2} onOpenChange={setPopoverAberto2}>
                                        <Popover.Trigger asChild>
                                            <button className="font-medium flex items-center w-full justify-between cursor-pointer pl-1 sm:pl-4.5 lg:pl-2.5 min-h-13 max-h-full">
                                                <strong>
                                                    <span className={`p-0.5 flex rounded-md font-medium cursor-pointer items-center ${dark ? 'text-[#DAFF01] text-shadow-[1px_1px_1px_#0000002a]' : 'text-zinc-800'}`}>{clubeBNome}
                                                    </span>
                                                </strong>
                                                <i className={`fa-solid fa-angle-down ml-1 translate-y-[10%] text-shadow-[1px_1px_1px_#0000002a] ${dark ? 'text-[#DAFF01]' : 'text-zinc-800'}`}></i>
                                            </button>
                                        </Popover.Trigger>

                                        <Popover.Portal>
                                            <Popover.Content
                                            sideOffset={8}
                                            className="w-96 max-h-96 overflow-y-auto rounded-xl bg-[rgb(38,40,42)] mt-2 border border-gray-200/70 p-4 shadow-xl z-10"
                                            >
                                            <div className="space-y-6">
                                                {Object.entries(agrupadosPorCategoria).map(
                                                ([categoria, topicos]) => (
                                                    <div key={categoria} className="space-y-2">
                                                    <h4 className="text-xs font-semibold uppercase text-slate-400">
                                                        {categoria}
                                                    </h4>

                                                    <div className="space-y-1">
                                                        {topicos.map((item: TopicoComparacao) => (
                                                        <button
                                                            key={item.label}
                                                            onClick={() => {
                                                                setClubeBNome(item.label);
                                                                setPopoverAberto2(false);
                                                            }}
                                                            className={`
                                                            w-full text-left px-3 py-2 rounded-md
                                                            transition
                                                            ${
                                                                clubeBNome === item.label
                                                                ? 'bg-sky-500/20 text-sky-300'
                                                                : 'hover:bg-slate-800 text-slate-200'
                                                            }
                                                            `}
                                                        >
                                                            {item.label}
                                                        </button>
                                                        ))}
                                                    </div>
                                                    </div>
                                                )
                                                )}
                                            </div>
                                            </Popover.Content>
                                        </Popover.Portal>
                                        </Popover.Root>

                                        </div>
                                    </div>


                                </div>

                                <div className="space-y-6 overflow-y-auto max-h-80 pb-6 lg:pl-6 lg:pr-8">
                                {financialData.map((section, index) => {
                                    const Icon = iconMap[section.icon];
                                    const maxValue = Math.max(...section.items.map(i => i.value));

                                    return (
                                    <div key={index}>
                                        <div className={`flex items-center gap-2 mb-2 ${dark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                            <Icon className="w-4 h-4" />
                                            <span className="text-sm font-medium">
                                                {section.title}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-6">
                                        {section.items.map((item) => {
                                            const percentage = (item.value / maxValue) * 100;

                                            return (
                                            <div key={item.club}>
                                                <div className="flex flex-col sm:flex-row items-center justify-between mb-1">
                                                <span className={`text-xs font-medium ${dark ? 'text-white' : 'text-stone-900'}`}>
                                                    {item.club}
                                                </span>

                                                <span
                                                    className={`text-xs font-semibold ${
                                                    item.highlight
                                                        ?
                                                        dark
                                                        ?
                                                        "text-[#DAFF01]"
                                                        :
                                                        'text-orange-500'
                                                        :
                                                        dark ?
                                                        "text-zinc-400"
                                                        :
                                                        'text-zinc-700'
                                                    }`}
                                                >
                                                    {item.formatted}
                                                </span>
                                                </div>

                                                <div className={`w-full h-3 rounded-full overflow-hidden ${dark ? 'bg-zinc-900' : 'bg-slate-300'}`}>
                                                <div
                                                    className={`h-full rounded-full transition-all duration-700 ${
                                                    item.highlight
                                                        ? 
                                                        dark
                                                        ?
                                                        "bg-[#DAFF01]"
                                                        :
                                                        'bg-orange-500'
                                                        :
                                                        dark
                                                        ?
                                                        "bg-zinc-700"
                                                        :
                                                        'bg-zinc-600'
                                                    }`}
                                                    style={{ width: `${percentage}%` }}
                                                />
                                                </div>
                                            </div>
                                            );
                                        })}
                                        </div>
                                    </div>
                                    );
                                })}
                                </div>
                            </div>

                        </div>

                    </div>

                    <div ref={premiumRef} className="scroll-mt-20">
                        <CardsPremium />
                    </div>
                </main>

                {(assinanteAtual !== 'Sócio' && assinanteAtual !== 'Torcedor') &&
                    <AdsenseRight />
                }

            </div>

            <FooterFixo />
        </div>
    )
}
