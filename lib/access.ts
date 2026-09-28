import { AnalysisSummary } from "./types";

/**
 * Whether the current viewer can read the full article.
 *
 * Today there is no login and no paid tier, so every "premium" analysis is
 * gated for everyone — this function is the single place that will change
 * when real subscriptions launch. At that point:
 *
 *   1. Read the viewer's session (e.g. `auth()` from NextAuth, or your
 *      chosen auth provider) instead of the hardcoded `false` below.
 *   2. Look up their subscription status (Stripe customer/subscription
 *      object, or a `subscriptions` table keyed by user id).
 *   3. Return `true` for active subscribers, `false` otherwise.
 *
 * Nothing else in the app needs to change — every call site already reads
 * through this function instead of checking `tier` directly.
 */
export function canReadFullArticle(article: Pick<AnalysisSummary, "tier">): boolean {
  if (article.tier === "free") return true;

  const viewerIsActiveSubscriber = false; // TODO: replace with real session/subscription check
  return viewerIsActiveSubscriber;
}
