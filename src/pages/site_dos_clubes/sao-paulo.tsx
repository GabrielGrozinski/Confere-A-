import CardClube from "../../components/card-clube";
import { buscaClube, buscarRankings, buscarMedia } from "../../components/busca-clube";
import { useEffect, useState } from "react";
import type { Clube, rankings, Medias } from "../../components/busca-clube";


export default function SaoPaulo() {
    const [clubeEscolhido, setClubeEscolhido] = useState<Clube | undefined>(undefined);
    const [rank_do_clube, setRank_do_clube] = useState<rankings>({
        faturamento: 0,
        salario: 0,
        divida: 0
    });
    const [media, setMedia] = useState<Medias>({
        faturamento: 0,
        divida: 0,
        lucro: 0,
        contratacoes: 0,
        folha_salarial: 0,
        maiorContratacao: 0,
        fatDiv: 0,
        lucFat: 0,
        custoVitoria: 0,
        custoGol: 0,
        custoPonto: 0,
        custoJogador: 0
    });

    useEffect(() => {
        buscaClube('São Paulo')
        .then((clube) => setClubeEscolhido(clube.data))
        .catch((error) => console.error('Houve um erro', error));

        buscarRankings('São Paulo')
        .then((ranking) => setRank_do_clube(ranking.rankings))
        .catch((error) => console.error('Houve um erro', error));

        buscarMedia('São Paulo')
        .then((media) => setMedia(media.media))
        .catch((error) => console.error('Houve um erro', error));
    }, []);

    return (
            <CardClube clubeEscolhido={clubeEscolhido} rank_do_clube={rank_do_clube} media={media} />
    );
}
