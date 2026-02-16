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
}

export interface Coisas {
    id: number;
    nome: string;
    imagem: string;
    quantidade: number;
    custo: number;
}

interface Return {
    data?: Clube | undefined;
    error?: PostgrestError | null;
    success: boolean;
}

interface ReturnTodos {
    data?: Clube[] | undefined;
    error?: PostgrestError | null;
    success: boolean;
}

interface ReturnCoisas {
    data?: Coisas[] | undefined;
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
    divida_2023?: number;
    faturamento_2024?: number;
    faturamento_futuro?: number;
}

interface ReturnMedia {
    media: Medias;
    success: boolean;
    error?: PostgrestError | null;
}

interface ReturnClubeMedia {
    clube: Medias;
    success: boolean;
    error?: any | null;
}

export interface Faturamento {
    crescimentoPercentual: number;
    faturamentoProjetado: number;
}

export function projetarFaturamento(
  crescimentoAno1: number,
  crescimentoAno2: number,
  notaClube: number,
  anos: number,
  faturamentoAtual: number
): Faturamento {

  if (anos < 1 || anos > 15) {
    throw new Error("O número de anos deve estar entre 1 e 15.");
  }

  const g1 = crescimentoAno1 / 100;
  const g2 = crescimentoAno2 / 100;

  // 1️⃣ Base mais punitiva
  const G_base = (0.3 * g1 + 0.7 * g2) * 0.6;

  // 2️⃣ Tendência amplificada
  let T = 1 + 1.5 * (g2 - g1);
  T = Math.max(0.75, Math.min(1.25, T));

  let G_calculado = G_base * T;

  // 3️⃣ 🔥 Multiplicador final pela nota
  G_calculado = G_calculado * (notaClube / 10);

  // 4️⃣ Limite anual entre 1% e 20%
  const G_final = Math.max(0.01, Math.min(0.20, G_calculado));

  // 5️⃣ Crescimento linear acumulado
  const crescimentoTotal = G_final * anos;

  const faturamentoNovo =
    faturamentoAtual * (1 + crescimentoTotal);

  return {
    crescimentoPercentual: Number((crescimentoTotal * 100).toFixed(2)),
    faturamentoProjetado: Number((faturamentoNovo).toFixed(2))
  };
}


export async function buscaCoisas(): Promise<ReturnCoisas> {
    const { data, error } = await supabase
        .from('coisas_do_mundo')
        .select('*');

    if (error) {
        console.error('Houve um erro ao buscar os clubes', error);
        return { success: false, error };
    }
    return { success: true, data: data }
}

export async function buscaTodosClubes(): Promise<ReturnTodos> {
    const { data, error } = await supabase
        .from('clubes_2025')
        .select('*');

    if (error) {
        console.error('Houve um erro ao buscar os clubes', error);
        return { success: false, error };
    }
    return { success: true, data: data }
}

export async function buscaClube(nomeClube: string): Promise<Return> {
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

const somarValores = (arr: number[]) => {
    const somaFinal =
        arr.length === 0 ? 0
            :
            arr.reduce((acc, n) => acc + n, 0);

    return Number(somaFinal.toFixed(1));
}

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
        custoJogador: 0,
        notaClube: 0,
        mediaTorcedores: 0,
        chanceQuitarDivida: 0
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
        let mediaNota: number[] = [];
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

            const rankingAtual =
                (
                    (clube.faturamento / clube.divida*2)
                    +
                    (
                        clube.lucro > 0 ?
                            (clube.lucro*2 / clube.faturamento) * 15
                            :
                            (-clube.lucro / clube.faturamento) * 5
                    )

                );

            mediaNota.push(Number(rankingAtual.toFixed(1)));

            const chanceDivida =
                ChanceQuitarDivida_15_anos(
                    clube.numero_torcedores,
                    clube.faturamento,
                    clube.divida,
                    clube.lucro,
                    15,
                    0.3
                );
            mediaChanceQuitarDivida.push(Number(chanceDivida.toFixed(1)));
        });

        const scoreFaturamento = somarValores(mediaFaturamento);
        const scoreTorcida = somarValores(mediaTorcedores);
        const scoreDivida = somarValores(mediaDivida);
        const scoreFinal = Number(((scoreFaturamento / scoreTorcida) - (scoreDivida / scoreTorcida)).toFixed(1));

        clubes.forEach((clube, index) => {
            const scoreClube = Number(((clube.faturamento / clube.numero_torcedores*2) - (clube.divida / clube.numero_torcedores)).toFixed(1));

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
                    clube.competicao === 'libertadores' ?
                        2
                        :
                        clube.competicao === 'pre-libertadores' ?
                            1.5
                            :
                            clube.competicao === 'sul-americana' ?
                                1.5
                                :
                                clube.competicao === 'brasileirao' ?
                                    1
                                    :
                                    -3
                );

            mediaNota[index] = Number((mediaNota[index] + pontosFiltrados).toFixed(1));

            if (mediaNota[index] > 10) {
                mediaNota[index] = 10 + valorCompeticao > 10 ? 10 : 10 + valorCompeticao;
            } else if (mediaNota[index] < 0) {
                mediaNota[index] = 0 + valorCompeticao > 0 ? valorCompeticao : 0;
            } else {
                mediaNota[index] = 
                    (mediaNota[index] + valorCompeticao) > 10 ? 
                    10 
                    : 
                    (mediaNota[index] + valorCompeticao) < 0 ?
                    0
                    :
                    mediaNota[index] + valorCompeticao;  
            }

            mediaNota[index] = Number(mediaNota[index].toFixed(1));
        })

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
            chanceQuitarDivida: calcularMedia(mediaChanceQuitarDivida)
        }

        return { media, success: true };

    }

    if (error) {
        console.error('Houve um erro ao buscar os clubes', error);
        return { success: false, error, media };
    }

    return { success: false, media };

}

export async function CaclularMediaClube(clubeEscolhido: Clube): Promise<ReturnClubeMedia> {

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
        chanceQuitarDivida: 0
    }

    try {
        const media = (await buscarMedia('')).media;


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

            const chanceDivida = ChanceQuitarDivida_15_anos(
                clubeEscolhido.numero_torcedores,
                clubeEscolhido.faturamento,
                clubeEscolhido.divida,
                clubeEscolhido.lucro,
                15,
                0.3
            );


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

                notaClube: Number(rankingAtual.toFixed(2)),

                chanceQuitarDivida: Number(chanceDivida.toFixed(2)),

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
