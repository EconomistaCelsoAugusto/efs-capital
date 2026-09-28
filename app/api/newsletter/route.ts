import { NextRequest, NextResponse } from "next/server";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * POST /api/newsletter  { email: string }
 *
 * Today this just captures interest ahead of paid subscriptions — there is
 * no list provider wired up yet. Two paths:
 *
 *   1. Set NEWSLETTER_SERVICE_URL (see python-services/newsletter-service)
 *      and this route proxies straight to that FastAPI service, which
 *      persists to SQLite.
 *   2. Without it, requests are appended to data/subscribers.local.json for
 *      local development only — that file does NOT persist on serverless
 *      hosts like Vercel (each invocation can get a fresh filesystem), so
 *      don't rely on it once this is live. Before launch, point this at a
 *      real store: the Python service above, a Postgres table (Supabase/
 *      Neon), or an ESP's API (Resend Audiences, Mailchimp, etc).
 */
export async function POST(req: NextRequest) {
  let email: unknown;
  try {
    ({ email } = await req.json());
  } catch {
    return NextResponse.json({ error: "corpo inválido" }, { status: 400 });
  }

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "e-mail inválido" }, { status: 400 });
  }

  const serviceUrl = process.env.NEWSLETTER_SERVICE_URL;

  if (serviceUrl) {
    try {
      const upstream = await fetch(`${serviceUrl}/subscribers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!upstream.ok) throw new Error(`upstream status ${upstream.status}`);
      return NextResponse.json({ ok: true });
    } catch (err) {
      console.error("newsletter service unreachable:", err);
      return NextResponse.json({ error: "serviço indisponível" }, { status: 502 });
    }
  }

  // Local-development fallback only — see the docstring above.
  try {
    const dir = path.join(process.cwd(), "data");
    const filePath = path.join(dir, "subscribers.local.json");
    await mkdir(dir, { recursive: true });

    let existing: { email: string; subscribedAt: string }[] = [];
    try {
      existing = JSON.parse(await readFile(filePath, "utf-8"));
    } catch {
      // file doesn't exist yet — start fresh
    }

    if (!existing.some((s) => s.email === email)) {
      existing.push({ email, subscribedAt: new Date().toISOString() });
      await writeFile(filePath, JSON.stringify(existing, null, 2));
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("failed to record subscriber locally:", err);
    return NextResponse.json({ error: "falha ao salvar" }, { status: 500 });
  }
}
