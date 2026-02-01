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
}

interface Return {
    data?: Clube | undefined;
    error?: PostgrestError | null;
    success: boolean;
}

export interface rankings {
    faturamento: number;
    divida: number;
    salario: number;
}

interface ReturnRanking {
    rankings: rankings;
    success: boolean;
    error?: PostgrestError | null;
}

export interface Medias {
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
}

interface ReturnMedia {
    media: Medias;
    success: boolean;
    error?: PostgrestError | null;
}


export async function buscaClube(nomeClube: string): Promise<Return> {
    const { data, error } = await supabase
        .from('clubes_2025')
        .select('*')
        .eq('nome', nomeClube);
    
        if (error) {
            console.error(`Houve um erro ao buscar o clube ${nomeClube}`, error);
            return {success: false, error};
        }
        return {success: true, data: data[0]}
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
            console.log('data', data);
            const clubes: Clube[] = data;
            const clubesFaturamento = [...clubes].sort((a, b) => b.faturamento - a.faturamento);
            const clubesDivida = [...clubes].sort((a, b) => b.divida - a.divida);
            const clubesSalario = [...clubes].sort((a, b) => b.folha_salarial - a.folha_salarial);

            console.log('Faturamento', clubesFaturamento);

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

            return {success: true, rankings};
        }
    
        if (error) {
            console.error('Houve um erro ao buscar os clubes', error);
            return {success: false, error, rankings};
        }

        return {success: true, rankings};

}

const calcularMedia = (arr: number[]) => {
    const somaFinal = 
    arr.length === 0 ? 0
    : 
    arr.reduce((acc, n) => acc + n, 0) / arr.length

    return Number(somaFinal.toFixed(2));
}

export async function buscarMedia(nomeClube: string): Promise<ReturnMedia> {
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
        custoJogador: 0
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

        const clubes: Clube[] = data;
        clubes.forEach((clube) => {
            mediaFaturamento.push(clube.faturamento);
            mediaDivida.push(clube.divida);
            mediaLucro.push(clube.lucro);
            mediaContratacoes.push(clube.valor_contratacoes);
            mediaMaiorContratacao.push(Number((clube.maior_contratacao).split(' - ')[1].split(' ')[0])*6);
            mediaFolhaSalarial.push(clube.folha_salarial);
            mediaFatDiv.push(clube.faturamento/clube.divida);
            mediaLucFat.push(clube.lucro/clube.faturamento*100);
            custoVitoria.push((clube.folha_salarial*13 + clube.valor_contratacoes)/clube.vitorias);
            custoGol.push((clube.folha_salarial*13 + clube.valor_contratacoes)/clube.gols);
            custoPonto.push((clube.folha_salarial*13 + clube.valor_contratacoes)/clube.pontos);
            custoJogador.push(clube.folha_salarial/clube.quant_jogadores);
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
        }

        return {media, success: true};
        
    }
    
    if (error) {
        console.error('Houve um erro ao buscar os clubes', error);
        return {success: false, error, media};
    }

    return {success: false, media};

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
