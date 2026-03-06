import { allContext } from "../context/all-context";
import { useState } from "react";



export default function Metodologia() {
    const {dark} = allContext();
    const [topicoAtivo, setTopicoAtivo] = useState<string>('');

    const topicos = [
    {
        id: "dados",
        titulo: "Como os dados são coletados?",
        descricao: "Os dados são coletados por balanços oficiais e veículos da imprensa confiáveis.",
        linhas: 1
    },
    {
        id: "ferramentas",
        titulo: "Quantas ferramentas têm?",
        descricao: "Ao todo existem cinco ferramentas de análise e comparação. Cada uma tendo diversos tópicos disponíveis.",
        linhas: 2
    },
    {
        id: "exclusivas",
        titulo: "Existem ferramentas exclusivas?",
        descricao: 'Sim, o Confere Aê possui ferramentas exclusivas, como "Chance de Título", que calcula a chance de ganhar um título em 2026, "Chance de Quitar a Dívida", que calcula a chance de quitar a dívida e muitas outras.',
        linhas: 3
    },
    {
        id: "possibilidade",
        titulo: "O que posso fazer no site?",
        descricao: "Analisar seu clube do coração, comparar ele com seu rival, comparar seu clube com coisas do mundo e muito mais.",
        linhas: 2
    },
    {
        id: "analista",
        titulo: "Preciso ser um analista pra entender o site?",
        descricao: "Não! O Confere Aê foi feito para que todos os públicos entendam as finanças dos clubes.",
        linhas: 2
    },
    {
        id: "clubes",
        titulo: "Posso analisar qualquer clube da Série A?",
        descricao: "Sim.",
        linhas: 1
    },
    {
        id: "preco",
        titulo: "O site é gratuíto?",
        descricao: "Sim, o Confere Aê oferece um plano gratuito, mas também oferece planos pagos para uma experiência mais aprofundada.",
        linhas: 2
    },
    {
        id: "planos",
        titulo: "Os planos são mensais?",
        descricao: 'Não, os planos "Torcedor" e "Sócio" são pagos uma única vez.',
        linhas: 1
    },
    {
        id: "torcedor",
        titulo: "O que inclui o plano Torcedor?",
        descricao: 'Acesso a todos os clubes para comparação, Itens ilimitados por comparação, Faturamento e Dívida de 2024, Chance de Título em 2026, Valor Estimado do Clube e sem anúncios.',
        linhas: 3
    },
    {
        id: "socio",
        titulo: "O que inclui o plano Sócio?",
        descricao: 'Acesso a todas as ferramentas do plano Torcedor, Nota Geral do Clube, Chance de Quitar a Dívida, Potencial de Crescimento, Ranking Completo dos Clubes e ferramentas em desenvolvimento.',
        linhas: 3
    },
    {
        id: "pagamento",
        titulo: "Posso pagar no pix?",
        descricao: 'Sim.',
        linhas: 1
    },
    {
        id: "login",
        titulo: "Preciso estar logado para usar o site?",
        descricao: 'Não, apenas para efetuar pagamentos.',
        linhas: 1
    },
    {
        id: "atualizacoes",
        titulo: "Com que frequência o site atualiza?",
        descricao: 'Todos os meses o Confere Aê é atualizado, trazendo uma ferramenta nova ou um tópico novo.',
        linhas: 2
    },
    {
        id: "numeros",
        titulo: "Os números são de qual temporada?",
        descricao: 'Os números são referentes ao ano de 2025, e os planos Torcedor e Sócio permitem analisar tópicos de 2024.',
        linhas: 2
    },
    {
        id: "temporada",
        titulo: "No final do ano, os dados serão atualizados?",
        descricao: 'Sim, sempre no final do ano os dados serão atualizados conforme o fim da temporada, mas os números de 2025 continuarão acessíveis.',
        linhas: 2
    },
    {
        id: "contato",
        titulo: "Como faço para entrar em contato?",
        descricao: 'Por nossas redes sociais ou pelo e-mail: contato@confereae.com',
        linhas: 1
    },
    ];


    return (
        <div style={{ background: dark ? "linear-gradient(to bottom right, #0d1015, #080c14)" : "linear-gradient(to bottom right, #f7fbff, #fdfeff)"}}>

            <main className="mt-1 min-h-screen pb-10 flex flex-col items-center pt-12">
                <h1 className={`font-medium text-4xl leading-tight mb-1.5 ${dark ? 'text-white' : 'text-zinc-900'}`}>
                    Perguntas Frequentes
                </h1>
                <p className={`text-xl mb-10 ${dark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    Tire suas dúvidas sobre nossos dados e serviços.
                </p>

                <section className="space-y-4">
                {topicos.map((topico) => (
                    <button
                    key={topico.id}
                    onClick={() => {
                        setTopicoAtivo(topicoAtivo === topico.id ? "" : topico.id);
                    }}
                    className={`border cursor-pointer flex flex-col relative lg:min-w-160 max-w-160 p-3 px-8 rounded-lg transition-all duration-300 overflow-hidden 
                        ${topicoAtivo === topico.id ? topico.linhas === 1 ? 'lg:min-h-26' : topico.linhas === 2 ? 'lg:min-h-32 max-h-32' : 'lg:min-h-38 max-h-38' : "min-h-14 max-h-14"} 
                        ${dark ? "bg-slate-600 border-slate-400/20" : "bg-slate-500 border-slate-800/20"}`}
                    >
                    <h1
                        className={`absolute top-7 font-medium -translate-y-1/2 text-start 
                        ${dark ? "text-zinc-100" : "text-white"}`}
                    >
                        {topico.titulo}
                    </h1>

                    <i
                        className={`fa-solid fa-angle-down transition-all duration-200 absolute top-7 -translate-y-1/2 right-0 -translate-x-2/3 
                        ${topicoAtivo === topico.id ? "rotate-180" : ""} 
                        ${dark ? "text-zinc-100" : "text-white"}`}
                    />

                    <h2
                        className={`translate-y-14 font- text-start 
                        ${dark ? "text-neutral-300" : "text-slate-200"}`}
                    >
                        {topico.descricao}
                    </h2>
                    </button>
                ))}
                </section>
            </main>

        </div>
    )
}

{ /* 
    
className={`${dark ? '' : ''}`}
    
*/}