import Link from "next/link";
import { latestAnalyses } from "@/lib/mock-data";
import { SectionHeading } from "@/components/shared/section-heading";
import { CategoryTag } from "@/components/shared/category-tag";
import { PremiumBadge } from "@/components/shared/premium-badge";

export function LatestAnalyses() {
  return (
    <div>
      <SectionHeading title="Últimas análises" id="analises" />
      <div className="grid gap-8 sm:grid-cols-2">
        {latestAnalyses.map((item) => (
          <Link
            href={`/analises/${item.slug}`}
            key={item.slug}
            className="group border-t-2 border-gold-500 pt-4"
          >
            <div className="flex items-center justify-between">
              <CategoryTag label={item.category} />
              {item.tier === "premium" && <PremiumBadge />}
            </div>
            <h3 className="mt-2 font-serif text-xl leading-snug text-navy-900 group-hover:text-navy-700">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-graphite-700">
              {item.dek}
            </p>
            <p className="mt-3 text-xs text-graphite-500">
              {item.analyst} · {item.date} · {item.readTime}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
