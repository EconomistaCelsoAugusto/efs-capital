import { notFound } from "next/navigation";
import { latestAnalyses, sampleAnalyst } from "@/lib/mock-data";
import { canReadFullArticle } from "@/lib/access";
import { ArticleHeader } from "@/components/article/article-header";
import { ArticleBody } from "@/components/article/article-body";
import { AnalystCard } from "@/components/article/analyst-card";

export function generateStaticParams() {
  return latestAnalyses.map((a) => ({ slug: a.slug }));
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  // In production, replace this lookup with a CMS/DB fetch by slug.
  const article = latestAnalyses.find((a) => a.slug === params.slug);
  if (!article) notFound();

  const locked = !canReadFullArticle(article);

  return (
    <article className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid gap-12 lg:grid-cols-[1fr_300px]">
        <div>
          <ArticleHeader article={article} />
          <ArticleBody locked={locked} />
        </div>
        <AnalystCard analyst={sampleAnalyst} />
      </div>
    </article>
  );
}
