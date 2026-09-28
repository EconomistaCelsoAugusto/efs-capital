import Link from "next/link";
import { CategoryTag } from "@/components/shared/category-tag";

// Troque cada "url" pelo link de verdade da notícia quando publicar.
const SECONDARY_HEADLINES = [
  {
    category: "Internacional",
    headline: "OPEP+ mantém corte de produção; analistas veem piso para o Brent no curto prazo",
    url: "#",
  },
  {
    category: "Renda Fixa",
    headline: "Curva de juros embute três cenários distintos para o Copom de novembro",
    url: "#",
  },
  {
    category: "Empresas",
    headline: "Magazine Luiza reduz estoque em 8% no trimestre e reacende debate sobre capital de giro",
    url: "#",
  },
  {
    category: "Commodities",
    headline: "Soja recua com safra recorde nos EUA; Brasil ganha competitividade em exportação",
    url: "#",
  },
];

export function HeroSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-10">
      <div className="grid gap-10 md:grid-cols-3">
        <Link href="/analises/selic-copom-trajetoria-2027" className="group md:col-span-2">
          {/* Coloque o arquivo em public/images/destaque-principal.jpg —
              até lá, aparece só o fundo azul-marinho no lugar da foto. */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-navy-900">
            <img
              src="/images/destaque-principal.jpg"
              alt="Imagem da matéria em destaque"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="mt-5">
            <CategoryTag label="Destaque · Macro" />
            <h1 className="mt-2 font-serif text-3xl leading-tight text-navy-900 group-hover:text-navy-700 md:text-[2.5rem]">
              Copom e a trajetória da Selic: o que a ata revela sobre o
              balanço de riscos para 2027
            </h1>
            <p className="mt-3 max-w-xl text-graphite-700">
              A decisão dividida do comitê expõe divergências sobre o hiato
              do produto. Traduzimos a ata em três cenários possíveis para
              renda fixa e câmbio.
            </p>
            <p className="mt-3 text-sm text-graphite-500">
              Rafael Monteiro · 23 set 2026 · 9 min de leitura
            </p>
          </div>
        </Link>

        <div className="flex flex-col divide-y divide-graphite-900/10">
          {SECONDARY_HEADLINES.map((item) => (
            <a
              key={item.headline}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group py-4 first:pt-0"
            >
              <CategoryTag label={item.category} />
              <h2 className="mt-1.5 text-[1.05rem] leading-snug text-graphite-900 group-hover:text-navy-700">
                {item.headline}
              </h2>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
