import { HeroSection } from "@/components/home/hero-section";
import { LatestAnalyses } from "@/components/home/latest-analyses";
import { MacroNewsFeed } from "@/components/home/macro-news-feed";
import { NewsletterCapture } from "@/components/shared/newsletter-capture";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <div className="mt-14">
        <NewsletterCapture />
      </div>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-14 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <LatestAnalyses />
          </div>
          <div>
            <MacroNewsFeed />
          </div>
        </div>
      </section>
    </>
  );
}
