"use client";

import { useEffect, useState } from "react";
import { marketIndices as fallbackIndices } from "@/lib/mock-data";
import { MarketIndex } from "@/lib/types";

/**
 * Simulated world-markets ticker. Renders the static mock immediately (so
 * there's never an empty/loading flash) and swaps in data/market-indices.json
 * — via GET /api/market-indices — once it resolves. That file is what
 * python-services/market-data/fetch_indices.py regenerates on a schedule;
 * point the route at a real paid quote provider when you have one.
 */
export function MarketTicker() {
  const [indices, setIndices] = useState<MarketIndex[]>(fallbackIndices);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/market-indices")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && Array.isArray(data?.indices) && data.indices.length > 0) {
          setIndices(data.indices);
        }
      })
      .catch(() => {
        /* keep the fallback mock on any network error */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const items = [...indices, ...indices];

  return (
    <div
      className="w-full overflow-hidden border-b border-navy-700/60 bg-navy-950"
      aria-label="Cotações de mercado"
    >
      <div className="flex w-max animate-marquee py-2.5">
        {items.map((idx, i) => (
          <div
            key={`${idx.symbol}-${i}`}
            aria-hidden={i >= indices.length}
            className="flex items-center gap-2 px-6 font-mono text-[13px] whitespace-nowrap"
          >
            <span className="text-graphite-300">{idx.symbol}</span>
            <span className="text-paper">{idx.value}</span>
            <span
              className={idx.changePct >= 0 ? "text-market-up" : "text-market-down"}
            >
              {idx.changePct >= 0 ? "▲" : "▼"} {Math.abs(idx.changePct).toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
