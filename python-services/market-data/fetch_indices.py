"""
Fetches the same world indices shown in the site's ticker and writes them to
../../data/market-indices.json, in the shape the Next.js app already expects
(see lib/types.ts -> MarketIndex, and app/api/market-indices/route.ts).

This is the "easy part" of the ticker: a small, single-purpose script that
does one job (fetch → format → write a JSON file) rather than a full backend
service. The Next.js side never needs to know how the numbers got there.

Setup:
    pip install -r requirements.txt

Run manually:
    python fetch_indices.py

Run on a schedule (recommended so the ticker doesn't go stale):
    - Simplest: a cron job on any machine that has this repo checked out.
    - No server to manage: a GitHub Actions workflow on a schedule (e.g.
      every 15 min) that runs this script and commits the updated JSON, or
      pushes it wherever your deployed site reads data/ from.

Swap point: once EFS CAPITAL has a paid market-data contract, replace
fetch_quote()'s use of yfinance with a call to that provider — the JSON
shape, the Next.js API route, and the ticker component all stay unchanged.
"""

from __future__ import annotations

import json
from dataclasses import asdict, dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional

import yfinance as yf

# display symbol -> (Yahoo Finance ticker, display name)
TRACKED_INDICES: dict[str, tuple[str, str]] = {
    "IBOV": ("^BVSP", "Ibovespa"),
    "S&P 500": ("^GSPC", "S&P 500"),
    "NASDAQ": ("^IXIC", "Nasdaq Composite"),
    "DOW": ("^DJI", "Dow Jones"),
    "DAX": ("^GDAXI", "DAX"),
    "FTSE 100": ("^FTSE", "FTSE 100"),
    "NIKKEI": ("^N225", "Nikkei 225"),
    "USD/BRL": ("BRL=X", "Dólar"),
}

OUTPUT_PATH = Path(__file__).resolve().parents[2] / "data" / "market-indices.json"


@dataclass
class Quote:
    symbol: str
    name: str
    value: str
    changePct: float


def format_value(symbol: str, price: float) -> str:
    """pt-BR number formatting (comma as decimal separator, dot as thousands
    separator), matching the style already used across the site."""
    decimals = 2 if symbol == "USD/BRL" else 1
    grouped = f"{price:,.{decimals}f}"  # e.g. "6,812.4" (US style)
    return grouped.replace(",", "_").replace(".", ",").replace("_", ".")


def fetch_quote(display_symbol: str, yahoo_ticker: str, name: str) -> Optional[Quote]:
    """Fetches one quote. Returns None on any failure so a single bad
    symbol (or a network hiccup) doesn't take down the whole run."""
    try:
        info = yf.Ticker(yahoo_ticker).fast_info
        price = float(info["last_price"])
        previous_close = float(info["previous_close"])
        change_pct = ((price - previous_close) / previous_close) * 100
        return Quote(
            symbol=display_symbol,
            name=name,
            value=format_value(display_symbol, price),
            changePct=round(change_pct, 2),
        )
    except Exception as exc:  # one bad ticker shouldn't stop the whole run
        print(f"[fetch_indices] failed to fetch {display_symbol} ({yahoo_ticker}): {exc}")
        return None


def main() -> None:
    quotes = [
        asdict(quote)
        for display_symbol, (yahoo_ticker, name) in TRACKED_INDICES.items()
        if (quote := fetch_quote(display_symbol, yahoo_ticker, name)) is not None
    ]

    if not quotes:
        print("[fetch_indices] no quotes fetched this run — leaving existing file untouched")
        return

    payload = {
        "updatedAt": datetime.now(timezone.utc).isoformat(),
        "indices": quotes,
    }

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(f"[fetch_indices] wrote {len(quotes)}/{len(TRACKED_INDICES)} quotes to {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
