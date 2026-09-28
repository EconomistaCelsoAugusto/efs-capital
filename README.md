# EFS CAPITAL

Site de research e notícias de mercado financeiro. Frontend em Next.js
(App Router) + Tailwind CSS/TypeScript; duas automações simples em Python
por trás do ticker e da captura de newsletter.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Estrutura

```
app/
  layout.tsx                  # fontes, skip-link, header/footer, metadata
  globals.css                 # tokens base + tipografia de leitura (.prose-article)
  page.tsx                    # Home
  analises/[slug]/page.tsx    # Página de Artigo/Análise (rota dinâmica)
  api/
    market-indices/route.ts   # serve o ticker; lê data/market-indices.json
    newsletter/route.ts       # recebe cadastros de e-mail

components/
  layout/
    site-header.tsx           # logo, navegação, embute o ticker
    site-footer.tsx           # links institucionais + aviso legal
    market-ticker.tsx         # ticker (client) — busca /api/market-indices
  home/
    hero-section.tsx          # notícia principal + manchetes secundárias
    latest-analyses.tsx       # grid "Últimas Análises" (com selo de premium)
    macro-news-feed.tsx       # feed de notícias rápidas de macro
  article/
    article-header.tsx        # título, dek, byline, selo de premium
    article-body.tsx          # corpo do texto + paywall para conteúdo premium
    analyst-card.tsx          # card lateral do analista
  shared/
    newsletter-capture.tsx    # captura de e-mail (variant="banner" | "sidebar")
    premium-badge.tsx         # selo "Assinantes"
    section-heading.tsx
    category-tag.tsx

lib/
  types.ts                    # tipos de domínio (MarketIndex, AnalysisSummary, etc.)
  mock-data.ts                # conteúdo de exemplo (cada análise tem um `tier`)
  access.ts                   # ponto único de decisão do paywall

data/
  market-indices.json         # cache que o ticker lê; o script Python regenera

python-services/
  market-data/fetch_indices.py       # busca cotações reais e escreve o JSON acima
  newsletter-service/main.py         # microsserviço FastAPI de assinantes (SQLite)
```

## Identidade visual

Definida em `tailwind.config.ts`:

- `navy` — fundo institucional (header, ticker, hero, paywall)
- `graphite` — texto e estrutura, nunca preto puro
- `paper` — fundo de leitura, nunca branco puro
- `gold` — único acento de destaque (categorias, links, marcadores de seção)
- `market.up` / `market.down` — cores funcionais para variação de preço,
  propositalmente separadas do dourado de marca

Tipografia: **Source Serif 4** para manchetes e corpo de artigo, **IBM Plex
Sans** para UI, **IBM Plex Mono** para dados numéricos (ticker e tabelas) —
carregadas via `next/font/google` em `app/layout.tsx`.

## Assinaturas pagas (preparado, ainda não ativo)

Não existe login nem cobrança hoje — mas a estrutura já separa conteúdo
"free" de "premium" para quando isso mudar:

- `lib/types.ts` → `AnalysisSummary.tier: "free" | "premium"`.
- `lib/mock-data.ts` → cada análise já vem marcada (duas premium, duas
  gratuitas, só como exemplo).
- `lib/access.ts` → `canReadFullArticle()` é o **único** lugar que decide
  se alguém pode ler o conteúdo completo. Hoje sempre retorna `false` para
  conteúdo premium. Quando o login e o Stripe (ou outro meio de pagamento)
  existirem, essa função passa a checar a sessão do usuário e o status da
  assinatura — nenhum outro arquivo precisa mudar.
- `components/article/article-body.tsx` → quando `locked` é `true`, mostra
  só o início do texto e troca o resto por um paywall (`PaywallGate`) com
  captura de e-mail. É o ponto certo pra depois trocar por um link real de
  checkout.
- `components/shared/premium-badge.tsx` → selo "Assinantes" nos cards da
  Home e no cabeçalho do artigo.

## As duas rotas de API (o gancho para dados reais)

- **`GET /api/market-indices`** — lê `data/market-indices.json`. Se o
  arquivo não existir ou vier vazio, cai de volta pro mock estático em
  `lib/mock-data.ts`, então o ticker nunca quebra. Troque a leitura do
  arquivo por uma chamada direta a um provedor pago de cotações quando
  fizer sentido.
- **`POST /api/newsletter`** `{ email }` — se a variável de ambiente
  `NEWSLETTER_SERVICE_URL` estiver definida (veja `.env.example`), repassa
  o cadastro pro microsserviço Python abaixo. Sem ela, grava num arquivo
  local (`data/subscribers.local.json`) só pra testar em desenvolvimento —
  **isso não persiste em produção/serverless** (Vercel, por exemplo), então
  configure o serviço Python (ou um provedor de e-mail) antes do
  lançamento de verdade.

## Os dois scripts em Python

A ideia: a parte fácil e repetitiva (buscar cotações, guardar e-mails) fica
em Python, que é rápido de escrever e manter; a parte difícil — a
experiência de leitura, o paywall, performance, SEO — fica no Next.js, que
é a ferramenta certa pra isso.

### `python-services/market-data/fetch_indices.py`

Busca as cotações dos índices do ticker (via `yfinance`) e escreve
`data/market-indices.json`.

```bash
cd python-services/market-data
pip install -r requirements.txt
python fetch_indices.py
```

Pra manter o ticker sempre atualizado, agende esse script (cron local, ou
um workflow do GitHub Actions rodando a cada 15 min).

### `python-services/newsletter-service/main.py`

Microsserviço FastAPI com dois endpoints (`POST /subscribers`,
`GET /subscribers`) que guarda os e-mails num SQLite local.

```bash
cd python-services/newsletter-service
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Depois, no `.env.local` do site: `NEWSLETTER_SERVICE_URL=http://localhost:8000`.

Esse serviço precisa de um host que rode processo Python contínuo (Render,
Railway ou Fly.io têm plano gratuito) — a Vercel não roda esse tipo de
processo, por isso ele é separado do resto do site.

## Acessibilidade

- Link "Pular para o conteúdo" no topo de toda página (visível ao navegar
  por teclado).
- Campos de e-mail com `<label>` associado (oculto visualmente, lido por
  leitor de tela).
- Ticker marcado com `aria-label`; a cópia duplicada usada só pra rolagem
  contínua fica `aria-hidden`.
- Mensagens de erro de formulário com `role="alert"`.

## Publicando pra todo mundo acessar

O jeito mais simples é a Vercel (mesma equipe do Next.js):

```bash
npm install -g vercel
vercel
```

Isso já publica o site sozinho, com `/api/market-indices` e
`/api/newsletter` funcionando (o newsletter cai no modo arquivo local até
você configurar `NEWSLETTER_SERVICE_URL` nas variáveis de ambiente do
projeto na Vercel). Os dois serviços Python são opcionais no começo — o
site funciona sem eles, só com os dados de exemplo.
