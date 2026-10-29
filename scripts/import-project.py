#!/usr/bin/env python3
"""Aggiunge (o sostituisce) un progetto nel portfolio partendo da una cartella con page.json e immagini PNG.

Uso:
  python3 scripts/import-project.py <cartella> <slug> <nome> <app|library> <url-repo> [url-sito]

page.json contiene: kind, summary, intro{it,en:[...]}, solves[{problem,answer}], audience, status, lead,
stack, cover{image,alt}, features[{name,tags,text,image,alt}], figures[{value,label}]; i testi sono {it,en}.
Le immagini vengono convertite in public/projects/<slug>/ (WebP pieno + miniatura alta 540 px in thumbs/).
Serve cwebp (brew install webp). Se il progetto esiste già, la sua voce viene sostituita.
"""

import json
import os
import shutil
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROJECTS = os.path.join(ROOT, "src/content/projects.ts")


def q(x):
    return json.dumps(x, ensure_ascii=False)


def loc(o):
    return f"{{ it: {q(o['it'])}, en: {q(o['en'])} }}"


def size(path):
    out = subprocess.run(["sips", "-g", "pixelWidth", "-g", "pixelHeight", path], capture_output=True, text=True).stdout
    return int(out.split("pixelWidth: ")[1].split()[0]), int(out.split("pixelHeight: ")[1].split()[0])


def convert(src_dir, dest, slug, image):
    base = os.path.splitext(image)[0]
    src = os.path.join(src_dir, image)
    subprocess.run(["cwebp", "-quiet", "-q", "88", src, "-o", f"{dest}/{base}.webp"], check=True)
    subprocess.run(["cwebp", "-quiet", "-q", "82", "-resize", "0", "540", src, "-o", f"{dest}/thumbs/{base}.webp"], check=True)
    w, h = size(src)
    portrait = h > w
    ratio = None if portrait or abs(w / h - 16 / 9) < 0.01 else round(w / h, 4)
    return f"/projects/{slug}/{base}.webp", portrait, ratio


def remove(source, slug):
    marker = f'    slug: "{slug}",'
    if marker not in source:
        return source
    i = source.index(marker)
    start = source.rindex("\n  {\n", 0, i) + 1
    end = source.find("\n  {\n    slug:", i)
    end = source.rindex("\n];") if end < 0 else end
    return source[:start] + source[end + 1 :]


def main():
    src_dir, slug, name, category, repo = sys.argv[1:6]
    site = sys.argv[6] if len(sys.argv) > 6 else None
    d = json.load(open(os.path.join(src_dir, "page.json")))

    dest = os.path.join(ROOT, "public/projects", slug)
    shutil.rmtree(dest, ignore_errors=True)
    os.makedirs(os.path.join(dest, "thumbs"))

    cover, _, cover_ratio = convert(src_dir, dest, slug, d["cover"]["image"])
    out = [
        "  {",
        f"    slug: {q(slug)},",
        f"    category: {q(category)},",
        f"    name: {q(name)},",
        f"    kind: {loc(d['kind'])},",
        '    year: "2026",',
        f"    summary: {loc(d['summary'])},",
        "    intro: {",
        "      it: [",
        *[f"        {q(x)}," for x in d["intro"]["it"]],
        "      ],",
        "      en: [",
        *[f"        {q(x)}," for x in d["intro"]["en"]],
        "      ],",
        "    },",
        "    solves: [",
    ]
    for x in d["solves"]:
        out += ["      {", f"        problem: {loc(x['problem'])},", f"        answer: {loc(x['answer'])},", "      },"]
    out += [
        "    ],",
        f"    audience: {loc(d['audience'])},",
        f"    status: {loc(d['status'])},",
        f"    lead: {loc(d['lead'])},",
        f"    stack: {q(d['stack'])},",
        "    cover: {",
        f"      image: {q(cover)},",
        f"      alt: {loc(d['cover']['alt'])},",
        *([f"      ratio: {cover_ratio},"] if cover_ratio else []),
        "    },",
        f"    repo: {q(repo)},",
        *([f"    site: {q(site)},"] if site else []),
        "    features: [",
    ]
    for f in d["features"]:
        img, portrait, ratio = convert(src_dir, dest, slug, f["image"])
        out += [
            "      {",
            f"        name: {loc(f['name'])},",
            f"        tags: {q(f['tags'])},",
            f"        text: {loc(f['text'])},",
            f"        image: {q(img)},",
            f"        alt: {loc(f['alt'])},",
            *(["        portrait: true,"] if portrait else []),
            *([f"        ratio: {ratio},"] if ratio else []),
            "      },",
        ]
    out += ["    ],", "    figures: ["]
    out += [f"      {{ value: {g['value']}, label: {loc(g['label'])} }}," for g in d["figures"]]
    out += ["    ],", "  },", ""]

    source = remove(open(PROJECTS).read(), slug).rstrip()
    assert source.endswith("];")
    open(PROJECTS, "w").write(source[:-2] + "\n".join(out) + "];\n")
    print("importato", slug)


if __name__ == "__main__":
    main()
