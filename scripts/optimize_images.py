#!/usr/bin/env python3
"""Otimiza as imagens reais do HMDCC para uso no site."""
import os
from PIL import Image

SRC = "/tmp/hmdcc-orig"
DST = "/home/z/my-project/public/images"

os.makedirs(f"{DST}/estrutura", exist_ok=True)
os.makedirs(f"{DST}/noticias", exist_ok=True)

# (arquivo_origem, arquivo_destino, largura_max, qualidade)
jobs = [
    # Fachada → hero (substitui imagem genérica)
    ("fachada.png", "hero-fachada.jpg", 1920, 82),
    # Estrutura (fotos reais das instalações)
    ("pilotis.jpg", "estrutura/pilotis.jpg", 1200, 78),
    ("auditorio.jpg", "estrutura/auditorio.jpg", 1200, 78),
    ("udc.jpg", "estrutura/udc.jpg", 1200, 78),
    ("enfermaria3.jpg", "estrutura/enfermaria.jpg", 1200, 78),
    ("avc.jpg", "estrutura/avc.jpg", 1200, 78),
    ("cc.jpg", "estrutura/centro-cirurgico.jpg", 1200, 78),
    ("cti6.jpg", "estrutura/cti.jpg", 1200, 78),
    ("cdi.jpg", "estrutura/cdi-real.jpg", 1200, 78),
    ("ambulatorio.jpg", "estrutura/ambulatorio.jpg", 1200, 78),
    ("hospital_dia.jpg", "estrutura/hospital-dia.jpg", 1200, 78),
    ("cme.jpg", "estrutura/cme.jpg", 1200, 78),
    ("laboratorio.jpg", "estrutura/laboratorio.jpg", 1200, 78),
    ("transfusional.jpg", "estrutura/transfusional.jpg", 1200, 78),
    ("pneumatico.jpg", "estrutura/pneumatico.jpg", 1200, 78),
    ("dispensario.jpg", "estrutura/dispensario.jpg", 1200, 78),
    ("solario.jpg", "estrutura/solario.jpg", 1200, 78),
    ("sala_familia.jpg", "estrutura/sala-familia.jpg", 1200, 78),
    # Notícias (capas reais)
    ("news-seminario.png", "noticias/seminario-realizado.jpg", 900, 80),
    ("news-premio.png", "noticias/premio-ser-humano.jpg", 900, 80),
    ("news-trombectomia.png", "noticias/trombectomia.jpg", 900, 80),
    ("news-seminario-insc.png", "noticias/seminario-inscricoes.jpg", 900, 80),
    ("news-residencia.png", "noticias/residencia-medica.jpg", 900, 80),
    ("news-video.png", "noticias/video-institucional.jpg", 900, 80),
    ("news-nota100.png", "noticias/nota-100.jpg", 900, 80),
    ("news-mentoria.png", "noticias/mentoria-liderancas.jpg", 900, 80),
    ("news-varizes.png", "noticias/brasil-sem-varizes.jpg", 900, 80),
    ("news-nps.jpg", "noticias/nps-recorde.jpg", 900, 80),
    # Logos e prêmios (mantém PNG com transparência)
    ("logo-branca.png", "logo-hmdcc-branca.png", 400, None),
    ("award-himss.png", "premios/himss.png", 420, None),
    ("award-angels.png", "premios/angels.png", 420, None),
    ("award-pdh.png", "premios/pdh21.png", 460, None),
]

os.makedirs(f"{DST}/premios", exist_ok=True)

for src_name, dst_name, max_w, quality in jobs:
    src = os.path.join(SRC, src_name)
    dst = os.path.join(DST, dst_name)
    if not os.path.exists(src):
        print(f"PULADO (não existe): {src_name}")
        continue

    img = Image.open(src)

    if dst_name.endswith(".jpg"):
        img = img.convert("RGB")
        if img.width > max_w:
            h = int(img.height * max_w / img.width)
            img = img.resize((max_w, h), Image.LANCZOS)
        img.save(dst, "JPEG", quality=quality, optimize=True, progressive=True)
    else:
        # PNG com transparência — redimensiona mantendo alpha
        if img.width > max_w:
            h = int(img.height * max_w / img.width)
            img = img.resize((max_w, h), Image.LANCZOS)
        img.save(dst, "PNG", optimize=True)

    kb = os.path.getsize(dst) // 1024
    print(f"OK {dst_name:38s} {img.size[0]}x{img.size[1]}  {kb} KB")

print("\nConcluído.")
