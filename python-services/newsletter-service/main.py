"""
Minimal subscriber-capture service for EFS CAPITAL's newsletter, meant to
sit behind app/api/newsletter/route.ts — set NEWSLETTER_SERVICE_URL to this
service's base URL once it's deployed and that route proxies straight here.

This is the "easy part" of the stack done in Python: two endpoints and a
SQLite table. It's deliberately small — swap it for a full ESP (Resend,
Mailchimp, etc.) whenever that's less work than maintaining this yourself.
Until then, every captured email lives in one SQLite file you own.

Run locally:
    pip install -r requirements.txt
    uvicorn main:app --reload --port 8000

Then, in the Next.js app's .env.local:
    NEWSLETTER_SERVICE_URL=http://localhost:8000

Deploy: this needs a host that runs a long-lived Python process (Render,
Railway and Fly.io all have a free tier that works). Vercel — where the
Next.js app most likely lives — does NOT run long-lived Python processes,
which is exactly why this is a separate service instead of a Next.js API
route.
"""

from __future__ import annotations

import sqlite3
from contextlib import contextmanager
from datetime import datetime, timezone
from pathlib import Path
from typing import Iterator, List

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr

DB_PATH = Path(__file__).resolve().parent / "subscribers.db"

app = FastAPI(title="EFS Capital — Newsletter Service")

# Loosen only as far as you need to: in production this should be your
# site's real domain, not "*".
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


@contextmanager
def get_db() -> Iterator[sqlite3.Connection]:
    conn = sqlite3.connect(DB_PATH)
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS subscribers (
            email TEXT PRIMARY KEY,
            subscribed_at TEXT NOT NULL
        )
        """
    )
    try:
        yield conn
        conn.commit()
    finally:
        conn.close()


class SubscribeRequest(BaseModel):
    email: EmailStr


class Subscriber(BaseModel):
    email: str
    subscribed_at: str


@app.post("/subscribers", status_code=201)
def subscribe(payload: SubscribeRequest) -> dict:
    with get_db() as db:
        try:
            db.execute(
                "INSERT INTO subscribers (email, subscribed_at) VALUES (?, ?)",
                (payload.email, datetime.now(timezone.utc).isoformat()),
            )
        except sqlite3.IntegrityError:
            pass  # already on the list — treat as success, not an error
    return {"ok": True}


@app.get("/subscribers", response_model=List[Subscriber])
def list_subscribers() -> List[Subscriber]:
    # TODO before this is ever exposed publicly: protect this with an API
    # key or admin auth check. Right now it returns every captured email to
    # anyone who calls it.
    with get_db() as db:
        rows = db.execute(
            "SELECT email, subscribed_at FROM subscribers ORDER BY subscribed_at DESC"
        ).fetchall()
    return [Subscriber(email=r[0], subscribed_at=r[1]) for r in rows]


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}
