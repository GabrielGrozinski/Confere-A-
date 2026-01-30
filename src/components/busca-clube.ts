import { supabase } from "../auth/supabase-client";

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
}

export async function buscaClube(nomeClube: string): Promise<Clube | undefined> {
    const { data, error } = await supabase
        .from('clubes_2025')
        .select('*')
        .eq('nome', nomeClube);
    
        if (error) {
            console.error(`Houve um erro ao buscar o clube ${nomeClube}`, error);
        }
        console.log('data', data);
        if (data) return data[0];
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
