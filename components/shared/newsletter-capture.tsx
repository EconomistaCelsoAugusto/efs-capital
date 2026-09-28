"use client";

import { FormEvent, useState } from "react";
import { ArrowRight } from "lucide-react";

interface NewsletterCaptureProps {
  variant?: "banner" | "sidebar";
}

type Status = "idle" | "loading" | "done" | "error";

/**
 * Captures an email address via POST /api/newsletter (see
 * app/api/newsletter/route.ts for where that request ends up). There is no
 * paid product yet, so this only registers interest ahead of launch.
 */
export function NewsletterCapture({ variant = "banner" }: NewsletterCaptureProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  const errorMessage = status === "error" && (
    <p role="alert" className="mt-2 text-xs text-market-down">
      Não deu pra salvar seu e-mail agora — tenta de novo em instantes.
    </p>
  );

  if (variant === "sidebar") {
    return (
      <div className="border border-gold-500/30 bg-navy-900 p-6 text-paper">
        <h3 className="font-serif text-lg">Receba as análises por e-mail</h3>
        <p className="mt-2 text-sm text-graphite-300">
          Um resumo semanal do que importa em renda variável e macro.
        </p>
        {status === "done" ? (
          <p className="mt-4 text-sm text-gold-300">
            Cadastro recebido — em breve você recebe o primeiro resumo.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-2">
            <label htmlFor="newsletter-sidebar-email" className="sr-only">
              Endereço de e-mail
            </label>
            <input
              id="newsletter-sidebar-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full rounded-sm border border-graphite-700 bg-navy-950 px-3 py-2 text-sm text-paper placeholder:text-graphite-500 focus:border-gold-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-sm bg-gold-500 py-2 text-sm font-medium text-navy-950 transition-colors hover:bg-gold-300 disabled:opacity-60"
            >
              {status === "loading" ? "Enviando…" : "Quero receber"}
            </button>
            {errorMessage}
          </form>
        )}
      </div>
    );
  }

  return (
    <div className="border-y border-gold-500/40 bg-navy-900">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-6 py-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="font-serif text-xl text-paper">
            As assinaturas ainda não abriram — mas as análises já saem toda semana.
          </h3>
          <p className="mt-1 text-sm text-graphite-300">
            Deixe seu e-mail e seja avisado assim que o clube de research for lançado.
          </p>
        </div>

        {status === "done" ? (
          <p className="text-sm text-gold-300">Recebido — você está na lista.</p>
        ) : (
          <form onSubmit={handleSubmit} className="w-full max-w-sm md:w-auto">
            <div className="flex gap-2">
              <label htmlFor="newsletter-banner-email" className="sr-only">
                Endereço de e-mail
              </label>
              <input
                id="newsletter-banner-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full rounded-sm border border-graphite-700 bg-navy-950 px-3 py-2 text-sm text-paper placeholder:text-graphite-500 focus:border-gold-500 focus:outline-none md:w-64"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                aria-label="Cadastrar e-mail"
                className="flex shrink-0 items-center justify-center rounded-sm bg-gold-500 px-3 text-navy-950 transition-colors hover:bg-gold-300 disabled:opacity-60"
              >
                <ArrowRight size={18} />
              </button>
            </div>
            {errorMessage}
          </form>
        )}
      </div>
    </div>
  );
}
