# Hospital Metropolitano Dr. Célio de Castro — Website Institucional

> **O melhor lugar para receber cuidado.** Redesign premium do portal institucional do Hospital Metropolitano Dr. Célio de Castro (HMDCC) — hospital 100% SUS de Belo Horizonte, referência nacional em modelo de gestão e pioneiro no tratamento de AVC pelo SUS-BH.

![Next.js](https://img.shields.io/badge/Next.js%2016-000?style=flat-square&logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript%205-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS%204-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/deploy-GitHub%20Pages-121013?style=flat-square&logo=githubpages&logoColor=white)
![License](https://img.shields.io/badge/Licen%C3%A7a-MIT-00AB97?style=flat-square)

---

## 📋 Sobre o projeto

Reconstrução completa do portal [hmdcc.com.br](https://www.hmdcc.com.br) com identidade visual elevada a padrão **premium internacional**: tipografia editorial (Fraunces + Inter), paleta institucional azul-petróleo e turquesa, animações de scroll, contadores animados, galeria interativa com lightbox e experiência 100% responsiva.

Todo o conteúdo institucional do portal original foi preservado — números, história, modelo de atendimento, estrutura, NEPE, vagas, compras, transparência, ouvidoria e notícias — agora apresentado em um layout moderno e sofisticado.

## ✨ Seções implementadas

| Seção | Conteúdo |
|---|---|
| **Hero** | Fachada real do hospital, slogan institucional e fatos-destaque |
| **Em Números** | 7 indicadores com contadores animados (internações, cirurgias, AVC, CTI, exames) |
| **Notícias** | 8 últimas notícias com capas reais e datas |
| **O HMDCC** | História (timeline 2015–hoje), 460 leitos, linhas de cuidado e modelo PPP |
| **Estrutura** | Galeria interativa com 17 ambientes reais + lightbox com navegação |
| **Certificações** | Selos HIMSS, Angels Awards e Prêmio Dr. Décio Gomes |
| **Modelo de Atendimento** | Especialidades de alta complexidade, capacidades mensais e via de acesso |
| **CDI** | 12 exames de diagnóstico por imagem e humanização (cromoterapia) |
| **NEPE** | Núcleo de Ensino e Pesquisa — 4 pilares de atuação |
| **Carreiras** | Banco de currículos, etapas do processo seletivo, residência médica e editais |
| **Compras** | Modalidades CR/CG/CP/PC e tabela de processos com status |
| **Sou Paciente** | Boletim médico e visitas por unidade (CTI, AVC, andares, UDC, SRAG) |
| **FAQ** | 6 perguntas frequentes em acordeão acessível |
| **Ouvidoria** | Canais, horários e modalidades de contato (identificado/anônimo) |
| **Transparência** | 9 relatórios de gestão (2017–2025) |
| **Contato** | Formulário com validação client-side, captcha matemático e mapa |
| **LGPD** | Banner de cookies com consentimento persistente |

## 🛠️ Stack tecnológica

- **[Next.js 16](https://nextjs.org)** — framework React com App Router
- **[TypeScript 5](https://www.typescriptlang.org)** — tipagem estática rigorosa
- **[Tailwind CSS 4](https://tailwindcss.com)** — estilização utilitária com design tokens customizados
- **[shadcn/ui](https://ui.shadcn.com)** + **Radix UI** — componentes acessíveis (New York style)
- **[Framer Motion](https://www.framer.app/motion/)** — animações e microinterações
- **[Lucide React](https://lucide.dev)** — iconografia
- **GitHub Pages** — hospedagem estática com deploy automático via GitHub Actions

O site é gerado como **export 100% estático** (`next build` com `output: "export"`), sem dependência de servidor Node — o formulário de contato valida os dados no cliente (compatível com hospedagem estática).

## 🎨 Design system

| Token | Valor | Uso |
|---|---|---|
| `petrol-900` | `#0F4654` | Seções escuras, tipografia de destaque |
| `petrol-950` | `#082E38` | Fundos profundos, rodapé |
| `teal-600` | `#00AB97` | Cor de ação, links, destaques |
| `ivory` | `#FAF9F6` | Fundo claro principal |
| `hairline` | `#E6E2D8` | Bordas finas, divisórias |
| **Display** | Fraunces (serif, itálicos) | Títulos editoriais |
| **Body** | Inter | Texto corrido, UI |

## 🚀 Como executar

```bash
# Instalar dependências
bun install        # ou npm install

# Servidor de desenvolvimento
bun run dev        # ou npm run dev
# → http://localhost:3000

# Verificação de qualidade
bun run lint       # ESLint

# Build estático (mesmo output do deploy do GitHub Pages)
STATIC_EXPORT=true NEXT_PUBLIC_BASE_PATH=/hmdcc-site-premium bun run build:static
# → site 100% estático em ./out
```

## 🌐 Deploy — GitHub Pages

**URL de produção:** <https://lebot007.github.io/hmdcc-site-premium/>

O deploy é **automático** a cada push na branch `main`, via [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml):

1. `bun install --frozen-lockfile` — instala as dependências
2. `next build` com `STATIC_EXPORT=true` e `NEXT_PUBLIC_BASE_PATH=/hmdcc-site-premium` — gera o site estático em `./out`
3. O artefato é publicado no GitHub Pages (`actions/deploy-pages`)

Como o Pages atende o site em `/hmdcc-site-premium/` (e não na raiz do domínio), o `basePath` injeta o prefixo em todos os assets; para as imagens do `next/image` isso é feito pelo loader customizado `image-loader.mjs`, já que o modo de export estático não aplica o `basePath` automaticamente.

> Para publicar em um **domínio próprio** (ex.: `hmdcc.com.br`), remova a variável `NEXT_PUBLIC_BASE_PATH` e aponte um `CNAME` para o Pages — nenhuma outra alteração é necessária.

## 📁 Estrutura do projeto

```
.github/workflows/
└── deploy.yml                 # CI/CD — build estático + deploy no GitHub Pages
src/
├── app/
│   ├── globals.css            # Design tokens e tema HMDCC
│   ├── icon.png               # Favicon oficial do hospital (hmdcc_verde.ico)
│   ├── layout.tsx             # Fontes (Fraunces + Inter) e metadados
│   └── page.tsx               # Montagem da página única
├── components/
│   ├── site/                  # Componentes do portal
│   │   ├── bits.tsx           # Primitivas: Reveal, Counter, SectionHeader
│   │   ├── header.tsx         # Barra de utilidades + navegação + menu mobile
│   │   ├── hero.tsx           # Hero com fachada real
│   │   ├── stats-news.tsx     # Em Números + Notícias
│   │   ├── institutional.tsx  # História, cuidado e PPP
│   │   ├── structure.tsx      # Galeria de estrutura + lightbox + prêmios
│   │   ├── services.tsx       # Atendimento, CDI e NEPE
│   │   ├── careers.tsx        # Carreiras, editais e compras
│   │   ├── patient.tsx        # Boletim/visitas, FAQ e ouvidoria
│   │   ├── transparency.tsx   # Relatórios de gestão
│   │   ├── contact.tsx        # Formulário e informações
│   │   └── footer.tsx         # Rodapé + banner de cookies
│   └── ui/                    # shadcn/ui (Radix)
└── lib/                       # Utilitários
image-loader.mjs               # Loader de imagens com basePath (export estático)
next.config.ts                 # Switch standalone ↔ export estático via env
public/images/
├── hero-fachada.jpg           # Fachada real do hospital
├── estrutura/                 # 17 fotos reais dos ambientes
├── noticias/                  # Capas reais das notícias
├── premios/                   # Selos HIMSS, Angels e PDH21
└── logo-hmdcc-branca.png      # Logotipo oficial
scripts/
└── optimize_images.py         # Pipeline de otimização de imagens
```

## ♿ Acessibilidade

- HTML semântico (`main`, `section`, `nav`, `article`, `figure`)
- `aria-label` em todos os controles icônicos
- Foco visível e navegação por teclado em galeria e menu
- Alvos de toque ≥ 44px
- Contraste AA nas combinações de cor

## 📄 Licença

Distribuído sob a licença **MIT** — veja [LICENSE](./LICENSE).

---

**HMDCC** · Hospital Metropolitano Dr. Célio de Castro · Belo Horizonte — MG · [hmdcc.com.br](https://www.hmdcc.com.br)
