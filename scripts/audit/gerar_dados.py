#!/usr/bin/env python3
"""Gera os data files do site a partir dos dados extraídos do site original.

- Baixa e otimiza as imagens das notícias (máx 640px, JPEG q62)
- Gera src/data/news.ts (280 notícias, abril/2020 → outubro/2026)
- Gera src/data/editais.ts (47 editais, 2017 → 2026)
- Gera src/data/compras.ts (493 processos de compra)
"""
import json
import os
import re
import unicodedata
import hashlib
from concurrent.futures import ThreadPoolExecutor
from urllib.parse import urlparse, unquote

import requests
from PIL import Image

ROOT = '/home/z/my-project'
AUDIT = f'{ROOT}/scripts/audit'
IMG_DIR = f'{ROOT}/public/images/noticias'

# --------------------------------------------------------------------------- #
# Notícias já curadas no site (mantêm imagem local, alt e resumo premium).
# Mapeadas pela data (dd/mm/yyyy) — as demais 272 vêm da extração.
# --------------------------------------------------------------------------- #
CURATED = {
    '30/10/2026': '/images/noticias/seminario-realizado.jpg',
    '09/10/2026': '/images/noticias/premio-ser-humano.jpg',
    '06/10/2026': '/images/noticias/trombectomia.jpg',
    '01/10/2026': '/images/noticias/seminario-inscricoes.jpg',
    '28/09/2026': '/images/noticias/residencia-medica.jpg',
    '19/09/2026': '/images/noticias/video-institucional.jpg',
    '21/08/2026': '/images/noticias/brasil-sem-varizes.jpg',
    '13/08/2026': '/images/noticias/nota-100.jpg',
}

MESES = {
    '01': 'jan', '02': 'fev', '03': 'mar', '04': 'abr', '05': 'mai', '06': 'jun',
    '07': 'jul', '08': 'ago', '09': 'set', '10': 'out', '11': 'nov', '12': 'dez',
}


def slugify(text: str, maxlen: int = 48) -> str:
    norm = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode()
    norm = re.sub(r'[^a-zA-Z0-9]+', '-', norm).strip('-').lower()
    return norm[:maxlen].strip('-') or 'noticia'


def fetch_image(url: str, dest: str) -> bool:
    """Baixa e otimiza uma imagem; retorna True se o arquivo local existe."""
    if os.path.exists(dest):
        return True
    try:
        r = requests.get(url, timeout=25, headers={'User-Agent': 'Mozilla/5.0'})
        r.raise_for_status()
        tmp = dest + '.tmp'
        with open(tmp, 'wb') as f:
            f.write(r.content)
        img = Image.open(tmp).convert('RGB')
        if img.width > 640:
            img = img.resize((640, round(img.height * 640 / img.width)), Image.LANCZOS)
        img.save(dest, 'JPEG', quality=62, optimize=True, progressive=True)
        os.remove(tmp)
        return True
    except Exception as e:
        print(f'  ✗ falha {url[:70]} → {e}')
        try:
            os.remove(dest + '.tmp')
        except OSError:
            pass
        return False


def build_news():
    news = json.load(open(f'{AUDIT}/noticias-final.json'))
    print(f'notícias extraídas: {len(news)}')

    os.makedirs(IMG_DIR, exist_ok=True)
    jobs = []
    for i, n in enumerate(news):
        date = n['data']
        if date in CURATED:
            n['local'] = CURATED[date]
            continue
        url = n.get('img', '')
        if not url:
            n['local'] = None
            continue
        name = slugify(n['titulo']) + '.jpg'
        dest = f'{IMG_DIR}/{name}'
        n['local'] = f'/images/noticias/{name}'
        jobs.append((url, dest))

    print(f'imagens a baixar: {len(jobs)}')
    with ThreadPoolExecutor(max_workers=10) as ex:
        results = list(ex.map(lambda j: fetch_image(*j), jobs))
    ok = sum(results)
    print(f'imagens ok: {ok}/{len(jobs)}')

    # fallback para quem falhou → usa fachada
    for n in news:
        if n.get('local') and not os.path.exists(ROOT + '/public' + n['local']):
            n['local'] = '/images/hero-fachada.jpg'

    lines = []
    for n in news:
        d, m, y = n['data'].split('/')
        resumo = (n.get('resumo') or '').strip()
        resumo = re.sub(r'\s*\[\.\.\.\]\s*$', '', resumo).strip()
        if not resumo:
            resumo = n['titulo']
        titulo = n['titulo'].replace("'", "\\'")
        resumo = resumo.replace("'", "\\'")
        lines.append(
            f"  {{ day: '{d}', month: '{MESES[m]}', year: {y}, "
            f"image: '{n['local']}', title: '{titulo}', excerpt: '{resumo}' }},"
        )

    out = (
        '// Gerado a partir do arquivo público de notícias do portal hmdcc.com.br\n'
        '// 280 notícias — abril/2020 a outubro/2026 — mantido em paridade com o original.\n'
        '// Regenerar via scripts/audit → gerar_dados.py\n\n'
        'export interface NewsItem {\n'
        '  day: string\n'
        '  month: string\n'
        '  year: number\n'
        '  image: string\n'
        '  title: string\n'
        '  excerpt: string\n'
        '}\n\n'
        'export const allNews: NewsItem[] = [\n' + '\n'.join(lines) + '\n]\n'
    )
    with open(f'{ROOT}/src/data/news.ts', 'w') as f:
        f.write(out)
    print(f'src/data/news.ts → {len(news)} notícias')


def build_editais():
    rows = json.loads(open(f'{AUDIT}/original-editais.json').read())
    if isinstance(rows, str):
        rows = json.loads(rows)
    print(f'editais extraídos: {len(rows)}')
    lines = []
    for r in rows:
        parts = [p.strip() for p in r.split('§')]
        year = parts[0]
        desc = parts[1].replace("'", "\\'")
        status = parts[2] if len(parts) > 2 else 'VENCIDO'
        lines.append(f"  {{ year: '{year}', edital: '{desc}', status: '{status}' }},")
    out = (
        '// Editais do HMDCC — paridade total com o portal original (47 registros).\n\n'
        'export interface Edital {\n'
        '  year: string\n'
        '  edital: string\n'
        '  status: string\n'
        '}\n\n'
        'export const editais: Edital[] = [\n' + '\n'.join(lines) + '\n]\n'
    )
    with open(f'{ROOT}/src/data/editais.ts', 'w') as f:
        f.write(out)
    print('src/data/editais.ts ok')


def build_compras():
    rows = json.loads(open(f'{AUDIT}/original-compras.json').read())
    if isinstance(rows, str):
        rows = json.loads(rows)
    print(f'compras extraídas: {len(rows)}')
    lines = []
    for r in rows:
        c = [p.strip() for p in r.split('§')]
        # colunas: 0 Seleção, 1 Processo, 2 Objeto, 3 Ato Convocatório,
        #          4 Publicação, 5 Abertura, 6 Esclar, 7 Julgamento,
        #          8 Homologação, 9 Situação
        def g(i):
            return c[i] if i < len(c) else ''
        obj = g(2).replace("'", "\\'")
        lines.append(
            f"  {{ code: '{g(0)}', process: '{g(1)}', object: '{obj}', "
            f"publication: '{g(4)}', opening: '{g(5)}', clarif: '{g(6)}', "
            f"judgment: '{g(7)}', homolog: '{g(8)}', status: '{g(9)}' }},"
        )
    out = (
        '// Processos de compra do HMDCC — paridade total com o portal original\n'
        '// (493 registros, CG/CR/CP/PC, 2017→2026). Paginado no cliente.\n\n'
        'export interface Compra {\n'
        '  code: string\n'
        '  process: string\n'
        '  object: string\n'
        '  publication: string\n'
        '  opening: string\n'
        '  clarif: string\n'
        '  judgment: string\n'
        '  homolog: string\n'
        '  status: string\n'
        '}\n\n'
        'export const compras: Compra[] = [\n' + '\n'.join(lines) + '\n]\n'
    )
    with open(f'{ROOT}/src/data/compras.ts', 'w') as f:
        f.write(out)
    print('src/data/compras.ts ok')


if __name__ == '__main__':
    os.makedirs(f'{ROOT}/src/data', exist_ok=True)
    build_editais()
    build_compras()
    build_news()
    print('CONCLUÍDO')
