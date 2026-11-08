#!/usr/bin/env python3
"""Regenera src/data/news.ts a partir da API pública do WordPress (wp.hmdcc.com.br).

Paridade total com o portal original: 393 notícias (ago/2016 → out/2026).
- Mantém as imagens locais já existentes (match por título)
- Baixa e otimiza (640×290, cover) as imagens dos posts novos
- Decodifica entidades HTML de título e resumo
"""
import html
import json
import os
import re
import urllib.parse
import urllib.request

ROOT = '/home/z/my-project'
IMG_DIR = os.path.join(ROOT, 'public/images/noticias')
API_FILE = '/tmp/wp-posts-all.json'
NEWS_TS = os.path.join(ROOT, 'src/data/news.ts')

MESES = {1: 'jan', 2: 'fev', 3: 'mar', 4: 'abr', 5: 'mai', 6: 'jun',
         7: 'jul', 8: 'ago', 9: 'set', 10: 'out', 11: 'nov', 12: 'dez'}


def decode(s: str) -> str:
    return html.unescape(s).replace('\u00a0', ' ').strip()


def clean_excerpt(raw: str) -> str:
    txt = re.sub(r'<[^>]+>', '', raw or '')
    txt = decode(txt)
    txt = re.sub(r'\s+', ' ', txt).strip()
    if not txt.endswith('…') and not txt.endswith('...'):
        txt = txt + ' […]'
    return txt


def title_key(t: str) -> str:
    return re.sub(r'\s+', ' ', t).strip().lower()


# 1) mapa título→imagem do news.ts atual
with open(NEWS_TS, encoding='utf-8') as f:
    src = f.read()
current = {}
for m in re.finditer(r"image: '([^']*)', title: '((?:[^'\\]|\\.)*)'", src):
    img, title = m.group(1), m.group(2).replace("\\'", "'")
    current[title_key(title)] = img
print('entries no news.ts atual:', len(current))

# 2) posts da API (já em ordem decrescente de data)
with open(API_FILE, encoding='utf-8') as f:
    posts = json.load(f)
posts.sort(key=lambda p: p['date'], reverse=True)
print('posts na API:', len(posts))

# 3) para cada post decide a imagem
os.makedirs(IMG_DIR, exist_ok=True)
existing_files = {f[:-4] for f in os.listdir(IMG_DIR) if f.endswith('.jpg')}

from PIL import Image

def slug_filename(slug: str) -> str:
    return slug[:48].rstrip('-')

rows = []
baixadas = 0
reusadas = 0
sem_img = []
for p in posts:
    title = decode(p['title']['rendered'])
    excerpt = clean_excerpt(p['excerpt']['rendered'] if isinstance(p['excerpt'], dict) else str(p['excerpt']))
    d = p['date'][:10]
    yyyy, mm, dd = d.split('-')
    media = (p.get('_embedded') or {}).get('wp:featuredmedia') or []
    m0 = media[0] if media else None

    key = title_key(title)
    img = current.get(key)
    if img and os.path.exists(os.path.join(ROOT, 'public', img.lstrip('/'))):
        reusadas += 1
    else:
        # tenta nome local derivado do slug
        cand = slug_filename(p['slug'])
        if cand in existing_files:
            img = f'/images/noticias/{cand}.jpg'
            reusadas += 1
        elif m0 and m0.get('source_url'):
            # baixa e otimiza em 640×290 (mesmo pipeline das demais)
            url = m0['source_url']
            tmp = f'/tmp/newsimg_{baixadas}.bin'
            try:
                # percent-encode o path (URLs contêm acentos: PRÊMIO, Seminário…)
                u = urllib.parse.urlsplit(url)
                url_enc = urllib.parse.urlunsplit((
                    u.scheme, u.netloc,
                    urllib.parse.quote(urllib.parse.unquote(u.path), safe='/'),
                    u.query, u.fragment))
                req = urllib.request.Request(url_enc, headers={'User-Agent': 'Mozilla/5.0'})
                with urllib.request.urlopen(req, timeout=30) as r, open(tmp, 'wb') as out:
                    out.write(r.read())
                im = Image.open(tmp).convert('RGB')
                tw, th = 640, 290
                ratio = max(tw / im.width, th / im.height)
                im = im.resize((round(im.width * ratio), round(im.height * ratio)), Image.LANCZOS)
                left = (im.width - tw) // 2
                top = (im.height - th) // 2
                im = im.crop((left, top, left + tw, top + th))
                name = cand if cand not in existing_files else f'{cand}-{dd}{mm}'
                # garante uniqueness
                base, n = name, 2
                while name + '.jpg' in existing_files:
                    name = f'{base}-{n}'
                    n += 1
                im.save(os.path.join(IMG_DIR, name + '.jpg'), 'JPEG', quality=82, optimize=True)
                existing_files.add(name)
                img = f'/images/noticias/{name}.jpg'
                baixadas += 1
            except Exception as e:
                print('  falha ao baixar', url[:70], e)
                img = None
        else:
            img = None
    if img is None:
        sem_img.append(title[:60])

    rows.append({
        'day': dd, 'month': MESES[int(mm)], 'year': int(yyyy),
        'image': img, 'title': title, 'excerpt': excerpt,
    })

print('imagens reutilizadas:', reusadas, '| baixadas:', baixadas, '| sem imagem:', len(sem_img))
for t in sem_img:
    print('  SEM IMG:', t)

# 4) escreve news.ts
def esc(s: str) -> str:
    return s.replace('\\', '\\\\').replace("'", "\\'")


out = ['// Gerado a partir da API pública do WordPress do portal hmdcc.com.br',
       f'// (wp.hmdcc.com.br/wp-json) — {len(rows)} notícias, ago/2016 a out/2026,',
       '// em paridade total com a página Notícias do site original.',
       '// Regenerar via scripts/gen_news.py',
       '',
       'export interface NewsItem {',
       '  day: string',
       '  month: string',
       '  year: number',
       '  image: string',
       '  title: string',
       '  excerpt: string',
       '}',
       '',
       'export const allNews: NewsItem[] = [']
for r in rows:
    img = r['image'] or '/images/noticias/boletim-medico.jpg'
    out.append(
        "  { day: '%s', month: '%s', year: %d, image: '%s', title: '%s', excerpt: '%s' },"
        % (r['day'], r['month'], r['year'], img, esc(r['title']), esc(r['excerpt']))
    )
out.append(']')
out.append('')

with open(NEWS_TS, 'w', encoding='utf-8') as f:
    f.write('\n'.join(out))
print('news.ts regenerado com', len(rows), 'entradas')
