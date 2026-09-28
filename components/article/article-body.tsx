import { Lock } from "lucide-react";
import { articleTable } from "@/lib/mock-data";
import { NewsletterCapture } from "@/components/shared/newsletter-capture";

export function ArticleBody({ locked = false }: { locked?: boolean }) {
  return (
    <div className="mx-auto max-w-prose">
      <div className="prose-article mt-8">
        <p>
          Com o Brent negociando abaixo de US$ 70 pela primeira vez em dois
          anos, a pergunta que domina as mesas de operação é direta: a
          Petrobras ainda consegue sustentar o nível de distribuição que
          justificou boa parte da valorização do papel em 2025? A resposta
          curta é sim — mas com uma margem de segurança menor do que o
          mercado parece precificar.
        </p>
        <p>
          O ponto de partida é o fluxo de caixa operacional, não o lucro
          contábil. Mesmo com a queda no preço realizado do petróleo, a
          companhia manteve disciplina de capex e reduziu o custo de
          extração por barril em dois trimestres consecutivos — o que
          preserva a geração de caixa livre acima do necessário para cobrir
          a política de dividendos.
        </p>
      </div>

      {locked ? (
        <PaywallGate />
      ) : (
        <>
          <div className="prose-article">
            <h2>O que a tabela abaixo mostra</h2>
            <p>
              Comparamos os últimos três trimestres em quatro métricas que,
              na nossa leitura, importam mais do que o lucro líquido para
              avaliar a sustentabilidade do dividendo: yield sobre os
              últimos doze meses, payout sobre o fluxo de caixa livre (não
              sobre o lucro), o próprio FCF em reais e a alavancagem
              líquida.
            </p>
          </div>

          <div className="my-10 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-navy-900 text-left">
                  <th className="py-2 pr-4 font-medium text-graphite-700">
                    Métrica
                  </th>
                  <th className="py-2 pr-4 font-mono font-medium text-graphite-700">
                    3T26
                  </th>
                  <th className="py-2 pr-4 font-mono font-medium text-graphite-700">
                    2T26
                  </th>
                  <th className="py-2 font-mono font-medium text-graphite-700">
                    1T26
                  </th>
                </tr>
              </thead>
              <tbody>
                {articleTable.map((row) => (
                  <tr key={row.label} className="border-b border-graphite-900/10">
                    <td className="py-2.5 pr-4 text-graphite-900">{row.label}</td>
                    {row.values.map((v, i) => (
                      <td key={i} className="py-2.5 pr-4 font-mono text-graphite-900">
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-2 text-xs text-graphite-500">
              Fonte: demonstrações financeiras da companhia. Elaboração própria.
            </p>
          </div>

          {/* Chart slot — swap this block for a real chart (e.g. Recharts) fed
              by the same data source as the table above. */}
          <div className="my-10 flex aspect-[16/9] w-full items-center justify-center border border-dashed border-graphite-300 bg-paper-dim">
            <span className="font-mono text-xs text-graphite-500">
              espaço reservado — gráfico de FCF vs. dividendo pago (8 trimestres)
            </span>
          </div>

          <div className="prose-article">
            <blockquote>
              Ao preço atual, o mercado está pagando pela Petrobras como se
              o dividendo dependesse do preço do petróleo se manter acima
              de US$ 80 — os números dos últimos três trimestres sugerem
              uma margem de segurança maior do que essa.
            </blockquote>
            <p>
              O risco relevante não é o Brent no curto prazo, e sim uma
              eventual revisão da política de investimentos que reduza a
              disciplina de capex mantida até aqui. É esse indicador — não
              o preço do petróleo isoladamente — que acompanhamos a cada
              divulgação trimestral.
            </p>
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Shown in place of the rest of the article when `tier === "premium"` and
 * `canReadFullArticle` (lib/access.ts) returns false. Once real checkout
 * exists, point the form here at the subscription flow instead of the
 * "notify me" capture.
 */
function PaywallGate() {
  return (
    <div className="mt-2 border-t-2 border-gold-500 bg-navy-950 px-6 py-10 text-center text-paper sm:px-10">
      <Lock className="mx-auto text-gold-300" size={20} aria-hidden="true" />
      <h3 className="mt-4 font-serif text-xl">Conteúdo para assinantes</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-graphite-300">
        A tabela completa, o gráfico e a leitura de risco desta análise
        ficam disponíveis para assinantes quando o clube de research for
        lançado.
      </p>
      <div className="mx-auto mt-6 max-w-xs text-left">
        <NewsletterCapture variant="sidebar" />
      </div>
    </div>
  );
}
