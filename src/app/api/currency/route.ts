import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  const country =
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    null;
  try {
    const response = await fetch(
      "https://api.frankfurter.dev/v2/rates?base=GBP",
      { next: { revalidate: 21600 }, signal: AbortSignal.timeout(8000) },
    );
    if (!response.ok) throw new Error("Rates unavailable");
    const rows = (await response.json()) as {
      quote: string;
      rate: number;
      date: string;
    }[];
    const rates: Record<string, number> = { GBP: 1 };
    for (const row of rows) {
      if (
        ![
          "XAU",
          "XAG",
          "XPT",
          "XPD",
          "XDR",
          "CMD",
          "CNH",
          "MRO",
          "SVC",
        ].includes(row.quote) &&
        /^[A-Z]{3}$/.test(row.quote) &&
        Number.isFinite(row.rate) &&
        row.rate > 0
      )
        rates[row.quote] = row.rate;
    }
    return NextResponse.json({ country, rates, date: rows[0]?.date || null });
  } catch {
    return NextResponse.json({
      country,
      rates: { GBP: 1 },
      date: null,
      unavailable: true,
    });
  }
}
