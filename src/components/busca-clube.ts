import { supabase } from "../auth/supabase-client";
import type { PostgrestError } from "@supabase/supabase-js";


export interface Clube {
    id: string;
    nome: string;
    estado: string;
    numero_torcedores: number;
    faturamento: number;
    lucro: number;
    divida: number;
    valor_contratacoes: number;
    maior_contratacao: string;
    folha_salarial: number;
    imagem: string;
    vitorias: number;
    gols: number;
    pontos: number;
    quant_jogadores: number;
    competicao: string;
    faturamento_2024: number;
    divida_2024: number;
    faturamento_2023: number;
    chance_quitar_divida: number;
    aumento_faturamento: number;
    nota_clube: number;
}

export interface Coisas {
    id: number;
    nome: string;
    imagem: string;
    quantidade: number;
    custo: number;
}

export interface rankings {
    faturamento: number;
    divida: number;
    salario: number;
}

export interface Medias {
    nome?: string;
    imagem?: string;
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
    chanceQuitarDivida: number;
    mediaChanceTitulo?: number;
    divida_2024?: number;
    faturamento_2024?: number;
    projetarFaturamento: number;
    aumento_faturamento: number;
}
// Tipagem de variaveis.

interface ReturnbuscaClube {
    data?: Clube | undefined;
    error?: PostgrestError | null;
    success: boolean;
}

interface ReturnbuscaTodosClubes {
    data?: Clube[] | undefined;
    error?: PostgrestError | null;
    success: boolean;
}

interface ReturnbuscaCoisas {
    data?: Coisas[] | undefined;
    error?: PostgrestError | null;
    success: boolean;
}

interface ReturnRanking {
    rankings: rankings;
    success: boolean;
    error?: PostgrestError | null;
}

interface ReturnbuscarMedia {
    media: Medias;
    success: boolean;
    error?: PostgrestError | null;
}

interface ReturnCalcularMediaClube {
    clube: Medias;
    success: boolean;
    error?: any | null;
}
// Tipagem de Return


export async function buscaCoisas(): Promise<ReturnbuscaCoisas> {
    const { data, error } = await supabase
        .from('coisas_do_mundo')
        .select('*');

    if (error) {
        console.error('Houve um erro ao buscar os clubes', error);
        return { success: false, error };
    }
    return { success: true, data: data }
}

export async function buscaTodosClubes(): Promise<ReturnbuscaTodosClubes> {
    const { data, error } = await supabase
        .from('clubes_2025')
        .select('*');

    if (error) {
        console.error('Houve um erro ao buscar os clubes', error);
        return { success: false, error };
    }
    return { success: true, data: data }
}

export async function buscaClube(nomeClube: string): Promise<ReturnbuscaClube> {
    const { data, error } = await supabase
        .from('clubes_2025')
        .select('*')
        .eq('nome', nomeClube);

    if (error) {
        console.error(`Houve um erro ao buscar o clube ${nomeClube}`, error);
        return { success: false, error };
    }
    return { success: true, data: data[0] }
}

export async function buscarRankings(nomeClube: string): Promise<ReturnRanking> {
    const { data, error } = await supabase
        .from('clubes_2025')
        .select('*');

    let rankings: rankings =
    {
        faturamento: 0,
        divida: 0,
        salario: 0
    }

    if (data) {
        const clubes: Clube[] = data;
        const clubesFaturamento = [...clubes].sort((a, b) => b.faturamento - a.faturamento);
        const clubesDivida = [...clubes].sort((a, b) => b.divida - a.divida);
        const clubesSalario = [...clubes].sort((a, b) => b.folha_salarial - a.folha_salarial);


        clubesFaturamento.forEach((clube, index) => {
            if (clube.nome === nomeClube) {
                rankings.faturamento = index + 1
            }
        });

        clubesDivida.forEach((clube, index) => {
            if (clube.nome === nomeClube) {
                rankings.divida = index + 1
            }
        });

        clubesSalario.forEach((clube, index) => {
            if (clube.nome === nomeClube) {
                rankings.salario = index + 1
            }
        });

        return { success: true, rankings };
    }

    if (error) {
        console.error('Houve um erro ao buscar os clubes', error);
        return { success: false, error, rankings };
    }

    return { success: true, rankings };

}

const calcularMedia = (arr: number[]) => {
    const somaFinal =
        arr.length === 0 ? 0
            :
            arr.reduce((acc, n) => acc + n, 0) / arr.length

    return Number(somaFinal.toFixed(2));
}

export function calcularChanceTitulo(
  folhaSalarial: number,
  gastoContratacoes: number,
  pontos: number,
  vitorias: number
): number {

  // Médias base
  const MEDIA_FOLHA = 18.9
  const MEDIA_CONTRATACOES = 166
  const MEDIA_PONTOS = 52
  const MEDIA_VITORIAS = 28

  // Normalização relativa à média
  const indiceFolha = folhaSalarial / MEDIA_FOLHA
  const indiceContratacoes = gastoContratacoes / MEDIA_CONTRATACOES
  const indicePontos = pontos / MEDIA_PONTOS
  const indiceVitorias = vitorias / MEDIA_VITORIAS

  // Pesos (desempenho pesa mais que investimento)
  const pesoFolha = 0.2
  const pesoContratacoes = 0.2
  const pesoPontos = 0.35
  const pesoVitorias = 0.25

  // Score centralizado (subtraindo 1 para média virar 0)
  const score =
    (indiceFolha - 1) * pesoFolha +
    (indiceContratacoes - 1) * pesoContratacoes +
    (indicePontos - 1) * pesoPontos +
    (indiceVitorias - 1) * pesoVitorias

  // Função logística (controla crescimento)
  const probabilidade = 1 / (1 + Math.exp(-5 * score))

  // Converter para porcentagem
  const porcentagem = probabilidade * 99.9

  // Garantir limites
  return Math.max(0, Math.min(99.9, Number(porcentagem.toFixed(1))))
}

export async function buscarMedia(): Promise<ReturnbuscarMedia> {
    const { data, error } = await supabase
        .from('clubes_2025')
        .select('*');

    let media: Medias = {
        faturamento: 0,
        divida: 0,
        lucro: 0,
        folha_salarial: 0,
        contratacoes: 0,
        maiorContratacao: 0,
        fatDiv: 0,
        lucFat: 0,
        custoVitoria: 0,
        custoGol: 0,
        custoPonto: 0,
        custoJogador: 0,
        notaClube: 0,
        mediaTorcedores: 0,
        chanceQuitarDivida: 0,
        projetarFaturamento: 0,
        aumento_faturamento: 0
    }

    if (data) {
        const mediaFaturamento: number[] = [];
        const mediaDivida: number[] = [];
        const mediaLucro: number[] = [];
        const mediaContratacoes: number[] = [];
        const mediaFolhaSalarial: number[] = [];
        const mediaMaiorContratacao: number[] = [];
        const mediaFatDiv: number[] = [];
        const mediaLucFat: number[] = [];
        const custoVitoria: number[] = [];
        const custoGol: number[] = [];
        const custoPonto: number[] = [];
        const custoJogador: number[] = [];
        const mediaTorcedores: number[] = [];
        const mediaNota: number[] = [];
        const mediaChanceQuitarDivida: number[] = [];
        const mediaPontos: number[] = [];
        const mediaVitórias: number[] = [];

        const clubes: Clube[] = data;
        clubes.forEach((clube) => {
            mediaFaturamento.push(clube.faturamento);
            mediaDivida.push(clube.divida);
            mediaLucro.push(clube.lucro);
            mediaContratacoes.push(clube.valor_contratacoes);
            mediaMaiorContratacao.push(Number((clube.maior_contratacao).split(' - ')[1].split(' ')[0]) * 6);
            mediaFolhaSalarial.push(clube.folha_salarial);
            mediaFatDiv.push(clube.faturamento*100 / clube.divida);
            mediaLucFat.push((clube.lucro / clube.faturamento) * 100);
            custoVitoria.push((clube.folha_salarial * 13 + clube.valor_contratacoes) / clube.vitorias);
            custoGol.push((clube.folha_salarial * 13 + clube.valor_contratacoes) / clube.gols);
            custoPonto.push((clube.folha_salarial * 13 + clube.valor_contratacoes) / clube.pontos);
            custoJogador.push(clube.folha_salarial / clube.quant_jogadores);
            mediaTorcedores.push(clube.numero_torcedores);
            mediaPontos.push(clube.pontos);
            mediaVitórias.push(clube.vitorias);
            mediaNota.push(clube.nota_clube);
            mediaChanceQuitarDivida.push(clube.chance_quitar_divida);

        });

        media = {
            faturamento: calcularMedia(mediaFaturamento),
            divida: calcularMedia(mediaDivida),
            lucro: calcularMedia(mediaLucro),
            contratacoes: calcularMedia(mediaContratacoes),
            folha_salarial: calcularMedia(mediaFolhaSalarial),
            maiorContratacao: calcularMedia(mediaMaiorContratacao),
            fatDiv: calcularMedia(mediaFatDiv),
            lucFat: calcularMedia(mediaLucFat),
            custoVitoria: calcularMedia(custoVitoria),
            custoGol: calcularMedia(custoGol),
            custoPonto: calcularMedia(custoPonto),
            custoJogador: calcularMedia(custoJogador),
            notaClube: calcularMedia(mediaNota),
            mediaTorcedores: calcularMedia(mediaTorcedores),
            chanceQuitarDivida: calcularMedia(mediaChanceQuitarDivida),
            projetarFaturamento: 0,
            aumento_faturamento: 0,
        }

        return { media, success: true };

    }

    if (error) {
        console.error('Houve um erro ao buscar os clubes', error);
        return { success: false, error, media };
    }

    return { success: false, media };

}

export async function CalcularMediaClube(clubeEscolhido: Clube, anoEscolhido?: number): Promise<ReturnCalcularMediaClube> {

    let mediaClubeEscolhido: Medias = {
        nome: '',
        imagem: '',
        faturamento: 0,
        divida: 0,
        lucro: 0,
        folha_salarial: 0,
        contratacoes: 0,
        maiorContratacao: 0,
        fatDiv: 0,
        lucFat: 0,
        custoVitoria: 0,
        custoGol: 0,
        custoPonto: 0,
        custoJogador: 0,
        notaClube: 0,
        mediaTorcedores: 0,
        chanceQuitarDivida: 0,
        projetarFaturamento: 0,
        aumento_faturamento: 0,
    }

    const anoRecebido = anoEscolhido ?? 1;

    const chanceDivida = (
        clubeEscolhido.chance_quitar_divida === 100 ? 
            clubeEscolhido.nome === 'Palmeiras' ? 
                anoRecebido * (clubeEscolhido.chance_quitar_divida/7.5) >= 100 ? 
                100 
                : 
                anoRecebido * (clubeEscolhido.chance_quitar_divida/7.5) 
            : 
            anoRecebido * (clubeEscolhido.chance_quitar_divida/2) >= 100 ? 100 
            : 
            anoRecebido * (clubeEscolhido.chance_quitar_divida/2) 
        : 
            anoRecebido > 30 ? 
                anoRecebido * (clubeEscolhido.chance_quitar_divida) 
            :
            anoRecebido > 25 ?
                anoRecebido * (clubeEscolhido.chance_quitar_divida/2.5)
            :
            anoRecebido > 20 ?
                anoRecebido * (clubeEscolhido.chance_quitar_divida/5)
            :
            anoRecebido > 15 ?
                clubeEscolhido.chance_quitar_divida
            :
            anoRecebido > 10 ?
                anoRecebido * (clubeEscolhido.chance_quitar_divida/15)
            :  
            anoRecebido * (clubeEscolhido.chance_quitar_divida/15) >= 100 ? 
                100 
            : 
        anoRecebido * (clubeEscolhido.chance_quitar_divida/15));

    try {

        if (clubeEscolhido) {

            mediaClubeEscolhido = {
                nome: clubeEscolhido.nome,

                imagem: clubeEscolhido.imagem,

                contratacoes: Number(clubeEscolhido.valor_contratacoes.toFixed(2)),

                custoGol: Number(
                (
                    (clubeEscolhido.folha_salarial * 13 + clubeEscolhido.valor_contratacoes) /
                    clubeEscolhido.gols
                ).toFixed(2)
                ),

                custoJogador: Number(
                (
                    clubeEscolhido.folha_salarial / clubeEscolhido.quant_jogadores
                ).toFixed(2)
                ),

                custoPonto: Number(
                (
                    (clubeEscolhido.folha_salarial * 13 + clubeEscolhido.valor_contratacoes) /
                    clubeEscolhido.pontos
                ).toFixed(2)
                ),

                folha_salarial: Number(clubeEscolhido.folha_salarial.toFixed(2)),

                custoVitoria: Number(
                (
                    (clubeEscolhido.folha_salarial * 13 + clubeEscolhido.valor_contratacoes) /
                    clubeEscolhido.vitorias
                ).toFixed(2)
                ),

                divida: Number(clubeEscolhido.divida.toFixed(2)),

                fatDiv: Number(
                (
                    (clubeEscolhido.faturamento * 100) /
                    clubeEscolhido.divida
                ).toFixed(2)
                ),

                faturamento: Number(clubeEscolhido.faturamento.toFixed(2)),

                lucFat: Number(
                (
                    (clubeEscolhido.lucro * 100) /
                    clubeEscolhido.faturamento
                ).toFixed(2)
                ),

                lucro: Number(clubeEscolhido.lucro.toFixed(2)),

                maiorContratacao: Number(
                (
                    Number(
                    clubeEscolhido.maior_contratacao.split(' - ')[1].split(' ')[0]
                    ) * 6
                ).toFixed(2)
                ),

                notaClube: clubeEscolhido.nota_clube,

                chanceQuitarDivida:
                (anoEscolhido === 0 || anoEscolhido === undefined) ?
                clubeEscolhido.chance_quitar_divida
                :
                chanceDivida < 100 ? 
                Number(chanceDivida.toFixed(2)) 
                : 
                chanceDivida > 100 ?
                100
                :
                Math.round(chanceDivida),

                projetarFaturamento: 
                (anoEscolhido === 0 || anoEscolhido === undefined) ?
                clubeEscolhido.faturamento
                :
                clubeEscolhido.faturamento + (anoRecebido * clubeEscolhido.aumento_faturamento),

                aumento_faturamento: clubeEscolhido.aumento_faturamento,

                mediaTorcedores: Number(clubeEscolhido.numero_torcedores.toFixed(2)),
            }

            return {clube: mediaClubeEscolhido, success: true};
        }

        return {success: false, clube:mediaClubeEscolhido}

    } catch (error) {
        return {success: false, error: error, clube:mediaClubeEscolhido}   
    }
}

export function relacaoClubes(nome: string) {
    const nomeEscolhido = (
        nome === 'São Paulo' ? 'sao-paulo'
            :
            nome === 'Flamengo' ? 'flamengo'
                :
                nome === 'Palmeiras' ? 'palmeiras'
                    :
                    nome === 'Corinthians' ? 'corinthians'
                        :
                        nome === 'Santos' ? 'santos'
                            :
                            nome === 'Vasco' ? 'vasco'
                                :
                                nome === 'Mirassol' ? 'mirassol'
                                    :
                                    nome === 'Fluminense' ? 'fluminense'
                                        :
                                        nome === 'Bragantino' ? 'bragantino'
                                            :
                                            nome === 'Atlético Mineiro' ? 'atletico-mineiro'
                                                :
                                                nome === 'Cruzeiro' ? 'cruzeiro'
                                                    :
                                                    nome === 'Botafogo' ? 'botafogo'
                                                        :
                                                        nome === 'Sport' ? 'sport'
                                                            :
                                                            nome === 'Ceará' ? 'ceara'
                                                                :
                                                                nome === 'Vitória' ? 'vitoria'
                                                                    :
                                                                    nome === 'Grêmio' ? 'gremio'
                                                                        :
                                                                        nome === 'Bahia' ? 'bahia'
                                                                            :
                                                                            nome === 'Fortaleza' ? 'fortaleza'
                                                                                :
                                                                                nome === 'Juventude' ? 'juventude'
                                                                                    :
                                                                                    'internacional'
    );
    return nomeEscolhido;
}
