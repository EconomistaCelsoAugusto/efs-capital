import { AnalysisSummary, Analyst, MacroNewsItem, MarketIndex, TableRow } from "./types";

export const marketIndices: MarketIndex[] = [
  { symbol: "IBOV", name: "Ibovespa", value: "138.240", changePct: 0.62 },
  { symbol: "S&P 500", name: "S&P 500", value: "6.812,4", changePct: 0.24 },
  { symbol: "NASDAQ", name: "Nasdaq Composite", value: "22.910,1", changePct: -0.18 },
  { symbol: "DOW", name: "Dow Jones", value: "44.512,8", changePct: 0.11 },
  { symbol: "DAX", name: "DAX", value: "19.884,3", changePct: 0.35 },
  { symbol: "FTSE 100", name: "FTSE 100", value: "8.442,6", changePct: -0.09 },
  { symbol: "NIKKEI", name: "Nikkei 225", value: "40.117,9", changePct: 0.87 },
  { symbol: "USD/BRL", name: "Dólar", value: "5,32", changePct: -0.21 },
];

// Troque cada "url" pelo link de verdade da notícia quando publicar.
export const macroFeed: MacroNewsItem[] = [
  {
    id: "n1",
    time: "há 12 min",
    category: "Brasil",
    headline: "IPCA de agosto vem acima do esperado; mercado revê curva de juros para 2027",
    url: "#",
  },
  {
    id: "n2",
    time: "há 47 min",
    category: "EUA",
    headline: "Fed sinaliza corte em dezembro após leitura mais fraca do payroll",
    url: "#",
  },
  {
    id: "n3",
    time: "há 1 h",
    category: "China",
    headline: "Banco central chinês amplia pacote de estímulo ao setor imobiliário",
    url: "#",
  },
  {
    id: "n4",
    time: "há 2 h",
    category: "Brasil",
    headline: "Balança comercial registra superávit recorde no mês; câmbio reage",
    url: "#",
  },
  {
    id: "n5",
    time: "há 3 h",
    category: "Commodities",
    headline: "Minério de ferro sobe 1,8% em Dalian com nova rodada de estímulo",
    url: "#",
  },
  {
    id: "n6",
    time: "há 4 h",
    category: "Europa",
    headline: "BCE mantém juros e reforça tom cauteloso sobre inflação de serviços",
    url: "#",
  },
];

export const latestAnalyses: AnalysisSummary[] = [
  {
    slug: "petrobras-petr4-tese-de-dividendos",
    category: "Renda Variável",
    title: "Petrobras (PETR4): fluxo de caixa sustenta a tese de dividendos mesmo com Brent pressionado",
    dek: "Mesmo com o petróleo abaixo de US$ 70, a geração de caixa operacional ainda cobre o compromisso de distribuição — o que muda o cálculo do investidor.",
    analyst: "Fernanda Duarte, CNPI",
    date: "26 set 2026",
    readTime: "7 min",
    tier: "premium",
  },
  {
    slug: "vale-vale3-minerio-china",
    category: "Renda Variável",
    title: "Vale (VALE3): minério em novo patamar após estímulo chinês — o que muda na tese",
    dek: "O terceiro pacote fiscal de Pequim em seis meses reacende a demanda por aço. Avaliamos até onde o preço do minério sustenta a reprecificação.",
    analyst: "Rafael Monteiro",
    date: "25 set 2026",
    readTime: "6 min",
    tier: "free",
  },
  {
    slug: "weg-wege3-premio-de-multiplo",
    category: "Renda Variável",
    title: "Weg (WEGE3): margens resilientes justificam o prêmio de múltiplo?",
    dek: "A companhia negocia a mais de 30x lucro. Decompomos a margem operacional dos últimos oito trimestres para testar se o prêmio é sustentável.",
    analyst: "Fernanda Duarte, CNPI",
    date: "24 set 2026",
    readTime: "8 min",
    tier: "premium",
  },
  {
    slug: "selic-copom-trajetoria-2027",
    category: "Macro",
    title: "Copom e a trajetória da Selic: o que a ata revela sobre o balanço de riscos para 2027",
    dek: "A decisão dividida do comitê expõe divergências sobre o hiato do produto. Traduzimos a ata em cenários para renda fixa.",
    analyst: "Rafael Monteiro",
    date: "23 set 2026",
    readTime: "9 min",
    tier: "free",
  },
];

export const sampleAnalyst: Analyst = {
  name: "Fernanda Duarte, CNPI",
  credential: "Analista de Investimentos Certificada (CNPI-P)",
  bio: "Cobre óleo & gás e utilities há seis anos, com passagem por research sell-side. Formada em Ciências Econômicas, escreve sobre alocação de capital e geração de caixa.",
  focus: ["Óleo & Gás", "Utilities", "Dividendos"],
};

export const articleTable: TableRow[] = [
  { label: "Dividend yield (12m)", values: ["14,2%", "11,8%", "9,3%"] },
  { label: "Payout sobre FCF", values: ["61%", "58%", "70%"] },
  { label: "Fluxo de caixa livre (R$ bi)", values: ["98,4", "112,1", "87,6"] },
  { label: "Alavancagem líquida/EBITDA", values: ["1,1x", "0,9x", "1,3x"] },
];
