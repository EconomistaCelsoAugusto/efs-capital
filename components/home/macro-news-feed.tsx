import { macroFeed } from "@/lib/mock-data";
import { SectionHeading } from "@/components/shared/section-heading";

export function MacroNewsFeed() {
  return (
    <div id="macro">
      <SectionHeading title="Macro em tempo real" />
      <ul className="divide-y divide-graphite-900/10">
        {macroFeed.map((item) => (
          <li key={item.id} className="py-4 first:pt-0">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-xs font-medium text-gold-600">
                  {item.category}
                </span>
                <span className="font-mono text-xs text-graphite-500">
                  {item.time}
                </span>
              </div>
              <p className="mt-1.5 text-sm leading-snug text-graphite-900 group-hover:text-navy-700">
                {item.headline}
              </p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
