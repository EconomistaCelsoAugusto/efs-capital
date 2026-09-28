import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { marketIndices } from "@/lib/mock-data";

/**
 * GET /api/market-indices
 *
 * Reads data/market-indices.json, which python-services/market-data/
 * fetch_indices.py regenerates from a real quote source. Run that script on
 * a schedule (cron, GitHub Actions) to keep this endpoint live; until then
 * — or if the file is ever missing/corrupt — it serves the static mock so
 * the ticker never breaks.
 *
 * Swap point: once you're on a paid market-data provider, replace the file
 * read below with a direct call to that provider (or have the provider's
 * webhook write to this same JSON shape).
 */
export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data", "market-indices.json");
    const raw = await readFile(filePath, "utf-8");
    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed.indices) || parsed.indices.length === 0) {
      throw new Error("empty or malformed market-indices.json");
    }

    return NextResponse.json({
      source: "file",
      updatedAt: parsed.updatedAt,
      indices: parsed.indices,
    });
  } catch {
    return NextResponse.json({
      source: "mock",
      updatedAt: null,
      indices: marketIndices,
    });
  }
}
