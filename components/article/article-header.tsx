import { CategoryTag } from "@/components/shared/category-tag";
import { PremiumBadge } from "@/components/shared/premium-badge";
import { AnalysisSummary } from "@/lib/types";

export function ArticleHeader({ article }: { article: AnalysisSummary }) {
  return (
    <header className="mx-auto max-w-prose">
      <div className="flex items-center justify-between">
        <CategoryTag label={article.category} />
        {article.tier === "premium" && <PremiumBadge />}
      </div>
      <h1 className="mt-3 font-serif text-3xl leading-tight text-navy-900 md:text-[2.25rem]">
        {article.title}
      </h1>
      <p className="mt-4 font-serif text-lg leading-relaxed text-graphite-700">
        {article.dek}
      </p>
      <p className="mt-5 border-t border-graphite-900/10 pt-4 text-sm text-graphite-500">
        Por {article.analyst} · {article.date} · {article.readTime} de leitura
      </p>
    </header>
  );
}
