export function SiteFooter() {
  return (
    <footer className="border-t border-graphite-900/10 bg-navy-950 text-graphite-300">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2">
            <span className="font-serif text-xl text-paper">EFS CAPITAL</span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed">
              Research e notícias de mercado para quem decide com dados.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-paper">Seções</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>Renda Variável</li>
              <li>Renda Fixa</li>
              <li>Macro</li>
              <li>Internacional</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium text-paper">Institucional</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>Sobre</li>
              <li>Metodologia de análise</li>
              <li>Contato</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-graphite-900/20 pt-6 text-xs leading-relaxed text-graphite-500">
          <p>
            O conteúdo publicado aqui tem finalidade informativa e educacional
            e não constitui recomendação de investimento. Rentabilidade
            passada não representa garantia de resultados futuros.
          </p>
          <p className="mt-2">© 2026 EFS CAPITAL. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
