type QuoteRequest = { symbol?: string }

type VercelRequest = { method?: string; query?: QuoteRequest }
type VercelResponse = { status: (code: number) => VercelResponse; json: (body: unknown) => void }

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  const apiKey = (globalThis as typeof globalThis & { process?: { env?: Record<string, string | undefined> } }).process?.env?.TWELVE_DATA_API_KEY
  const symbols = String(req.query?.symbol ?? '').split(',').map(symbol => symbol.trim().toUpperCase()).filter(Boolean)
  if (!apiKey) return res.status(503).json({ error: 'Twelve Data API key is not configured' })
  if (!symbols.length || symbols.length > 25) return res.status(400).json({ error: 'Provide 1–25 comma-separated symbols' })

  const url = new URL('https://api.twelvedata.com/quote')
  url.searchParams.set('symbol', symbols.join(','))
  url.searchParams.set('apikey', apiKey)

  try {
    const response = await fetch(url)
    const data = await response.json() as Record<string, unknown>
    if (!response.ok || data.status === 'error') return res.status(response.status || 502).json({ error: data.message ?? 'Quote provider error' })
    const quotes = Object.values(data).filter((quote): quote is Record<string, unknown> => Boolean(quote && typeof quote === 'object' && 'symbol' in quote && 'close' in quote))
    const single = quotes.length ? quotes : [data]
    return res.status(200).json({ quotes: single.map(quote => ({ symbol: String(quote.symbol), price: Number(quote.close), change: Number(quote.change), percentChange: Number(quote.percent_change), timestamp: quote.timestamp })) , fetchedAt: new Date().toISOString() })
  } catch {
    return res.status(502).json({ error: 'Unable to reach Twelve Data' })
  }
}
