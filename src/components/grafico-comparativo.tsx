import "../styles/grafico-comparativo.css";
import type { Medias } from "../functions/busca-clube";
import { allContext } from "../context/all-context";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import type { Topico, DadosClube } from "../pages/comparador-de-clubes";

interface Props {
  clubesSelecionados: Medias[];
  topico: 'Faturamento' | 'Dívida' | 'Faturamento (2024)' | 'Dívida (2024)' | 'Lucro' | 'Folha Salarial' | 'Contratações' | 'Maior Contratação' | 'Custo por Gol' | 'Custo por Ponto' | 'Custo por Vitória' | 'Custo por Jogador' | 'Faturamento/Dívida' | 'Lucro/Faturamento' | 'Nota do Clube' | 'Chance de Quitar a Dívida' | 'Projetar Faturamento' | 'Valor Estimado';
}

type DadoGrafico = {
  nome: string;
  valor: number;
  img: string;
  fill: string;
};

export default function GraficoComparativo({ clubesSelecionados, topico }: Props) {
    const {largura, dark} = allContext();
    const correlacaoTopicoCampo: Record<Topico, keyof DadosClube> = {
    'Faturamento': 'faturamento',
    'Dívida': 'divida',
    'Faturamento (2024)':'faturamento_2024',
    'Dívida (2024)':'divida_2024',
    'Lucro': 'lucro',
    'Folha Salarial': 'folha_salarial',
    'Contratações': 'contratacoes',
    'Maior Contratação': 'maiorContratacao',
    'Custo por Gol': 'custoGol',
    'Custo por Ponto': 'custoPonto',
    'Custo por Vitória': 'custoVitoria',
    'Custo por Jogador': 'custoJogador',
    'Faturamento/Dívida': 'fatDiv',
    'Lucro/Faturamento': 'lucFat',
    'Nota do Clube': 'notaClube',
    'Projetar Faturamento' : 'projetarFaturamento',
    'Chance de Quitar a Dívida': 'chanceQuitarDivida',
    'Valor Estimado':'valor_estimado'
    };

  const dadosOrdenados: DadoGrafico[] = clubesSelecionados
    .map((clube, index) => ({
      nome: clube.nome ?? '',
      valor: (topico === 'Faturamento' || topico === 'Dívida' || topico === 'Faturamento/Dívida' || topico === 'Lucro/Faturamento') ? Math.round(clube[correlacaoTopicoCampo[topico]]) : Number(clube[correlacaoTopicoCampo[topico]].toFixed(2)),
      img: clube.imagem ?? '',
      fill: index % 2 === 0 ? "#facc15" : "#eab308",
    }))
    .sort((a, b) => b.valor - a.valor);

  return (
    <div className={`row-2 w-full overflow-x-auto overflow-y-hidden min-h-100 pl-6 relative pt-3 ${dark ? 'bg-slate-900' : 'bg-slate-100'}`}>

    {clubesSelecionados.length > 0 ? 
    <>

    <div
      className="h-full min-w-40 pr-2"
      style={{ width: largura < 1024 ? dadosOrdenados.length * 40 : dadosOrdenados.length * 64 }}
    >
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
            data={dadosOrdenados}
            margin={{ top: 24, right: 16, left: 16, bottom: 64 }}
            >
            {/* EIXO X COM LOGOS ALINHADOS */}
            <XAxis
                dataKey="nome"
                interval={0}
                height={10}
                tick={({ x, y, payload }) => {
                const item = dadosOrdenados.find(
                    (d) => d.nome === payload.value
                );

                if (!item) return null;

                return (
                    <g transform={`translate(${x},${y})`}>
                    <image
                        className="xl:scale-200 lg:scale-150"
                        href={item.img}
                        x={-10}
                        y={largura < 1280 ? 12 : 6}
                        width={20}
                        height={20}
                    />
                    </g>
                );
                }}
            />

            <YAxis width={30} 
            domain={[
                (dataMin: number) => Math.min(0, dataMin),
                (dataMax: number) => Math.max(0, dataMax),
            ]} 
            tickFormatter={(v) => v.toString()} />

            <Tooltip />

            <Bar
                dataKey="valor"
                maxBarSize={30}
                shape={(props: any) => {
                    const { x, y, width, height, value, index } = props;

                    const isNegative = value < 0;

                    return (
                    <rect
                        x={x}
                        y={isNegative ? y + height : y}
                        width={width}
                        height={Math.abs(height)}
                        rx={6}
                        ry={6}
                        fill={value < 0 ? "#ef4444" : index % 2 === 0 ? "#facc15" : "#eab308"}
                    />
                    );
                }}
                />
            </BarChart>
        </ResponsiveContainer>

    </div>

    </>
    :
    <>
    <h1 className={`absolute left-0 top-1/2 w-full text-center font-semibold text-sm ${dark ? 'text-white' : 'text-zinc-800'}`}>
        Selecione ao menos um clube.
    </h1>
    
    </>
    }

    </div>
  );
}
