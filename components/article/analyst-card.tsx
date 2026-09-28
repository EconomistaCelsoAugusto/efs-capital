import { Analyst } from "@/lib/types";
import { NewsletterCapture } from "@/components/shared/newsletter-capture";

export function AnalystCard({ analyst }: { analyst: Analyst }) {
  return (
    <aside className="space-y-6 lg:sticky lg:top-28">
      <div className="border border-graphite-900/10 bg-white/60 p-6">
        <div className="h-14 w-14 rounded-full bg-navy-700" />
        <h3 className="mt-4 font-serif text-lg text-navy-900">{analyst.name}</h3>
        <p className="text-xs text-gold-600">{analyst.credential}</p>
        <p className="mt-3 text-sm leading-relaxed text-graphite-700">
          {analyst.bio}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {analyst.focus.map((f) => (
            <span
              key={f}
              className="border border-graphite-900/15 px-2 py-1 text-xs text-graphite-700"
            >
              {f}
            </span>
          ))}
        </div>
      </div>

      <NewsletterCapture variant="sidebar" />
    </aside>
  );
}
