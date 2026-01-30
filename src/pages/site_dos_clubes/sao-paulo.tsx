import CardClube from "../../components/card-clube";
import { buscaClube } from "../../components/busca-clube";
import { useEffect, useState } from "react";
import type { Clube } from "../../components/busca-clube";


export default function SaoPaulo() {
    const [clubeEscolhido, setClubeEscolhido] = useState<Clube | undefined>(undefined);

    useEffect(() => {
        buscaClube('São Paulo')
        .then((clube) => setClubeEscolhido(clube))
        .catch((error) => console.error('Houve um erro', error));
    }, []);

    return (
            <CardClube clubeEscolhido={clubeEscolhido} />
    );
}
