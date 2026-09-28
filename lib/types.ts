export interface MarketIndex {
  symbol: string;
  name: string;
  value: string;
  changePct: number; // positive = up, negative = down
}

export interface MacroNewsItem {
  id: string;
  time: string; // "há 12 min"
  category: string;
  headline: string;
  url: string; // link to the source article
}

export interface AnalysisSummary {
  slug: string;
  category: string;
  title: string;
  dek: string;
  analyst: string;
  date: string;
  readTime: string;
  // Drives the paywall gate on the article page. Everything is "free"
  // today — flip individual analyses to "premium" as a preview of the
  // subscriber tier launching later; see lib/access.ts.
  tier: "free" | "premium";
}

export interface Subscriber {
  email: string;
  subscribedAt: string;
}

export interface Analyst {
  name: string;
  credential: string;
  bio: string;
  focus: string[];
}

export interface TableRow {
  label: string;
  values: string[];
}
