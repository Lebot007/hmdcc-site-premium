#!/usr/bin/env python3
"""Regenera src/data/compras.ts a partir do scrape do portal original.

- 495 registros (inclui as linhas duplicadas do sistema original)
- Campo novo `convoc` com o link do Ato Convocatório (licitacoes-e.com.br),
  exibido na coluna "Ato Convocatório" — paridade total com o original.
"""
import json
import re

RAW = '/home/z/my-project/scripts/compras-raw.txt'
OUT = '/home/z/my-project/src/data/compras.ts'

rows = []
with open(RAW, encoding='utf-8') as f:
    for line in f:
        line = line.strip()
        if line.startswith('{') and line.endswith('}'):
            try:
                d = json.loads(line)
            except Exception:
                continue
            c = d.get('c') or []
            if len(c) >= 10:
                rows.append({
                    'code': c[0].strip(),
                    'process': c[1].strip(),
                    'object': c[2].strip(),
                    'convoc': (d.get('l') or '').strip(),
                    'publication': c[4].strip(),
                    'opening': c[5].strip(),
                    'clarif': c[6].strip(),
                    'judgment': c[7].strip(),
                    'homolog': c[8].strip(),
                    'status': c[9].strip(),
                })
print('linhas do original:', len(rows))


def esc(s: str) -> str:
    return s.replace('\\', '\\\\').replace("'", "\\'")


out = [
    '// Processos de compra do HMDCC — paridade total com o portal original',
    '// (495 registros, modalidades CG/CR/CP/PC). Coluna "Ato Convocatório" com os',
    '// links oficiais de licitacoes-e.com.br, como no portal. Paginado no cliente.',
    '',
    'export interface Compra {',
    '  code: string',
    '  process: string',
    '  object: string',
    '  /** Link do Ato Convocatório (licitacoes-e.com.br) */',
    '  convoc: string',
    '  publication: string',
    '  opening: string',
    '  clarif: string',
    '  judgment: string',
    '  homolog: string',
    '  status: string',
    '}',
    '',
    'export const compras: Compra[] = [',
]
for r in rows:
    out.append(
        "  { code: '%s', process: '%s', object: '%s', convoc: '%s', publication: '%s', opening: '%s', clarif: '%s', judgment: '%s', homolog: '%s', status: '%s' },"
        % (esc(r['code']), esc(r['process']), esc(r['object']), esc(r['convoc']),
           esc(r['publication']), esc(r['opening']), esc(r['clarif']),
           esc(r['judgment']), esc(r['homolog']), esc(r['status']))
    )
out.append(']')
out.append('')

with open(OUT, 'w', encoding='utf-8') as f:
    f.write('\n'.join(out))
print('compras.ts regenerado com', len(rows), 'registros')
