"""Export source-linked gallery notes without copying whole papers into the site."""
import json
import re
import shutil
import subprocess
from pathlib import Path
from PIL import Image
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / 'gallery/public/documents'
for name, library, paper in [
    ('attention', 'Attention Is All You Need', 'paper-a89f51c3ffa647c7'),
    ('xro', 'Explainable ENSO', 'paper-c28b83a93504457a'),
]:
    base = ROOT / 'library/Release Showcase' / library
    item = json.loads((base / f'.thinkreader/papers/{paper}.json').read_text(encoding='utf-8'))
    pdf = base / 'RAW' / item['source_filename']
    units = json.loads((base / f'workspace/{paper}/intelligence/evidence_index.json').read_text(encoding='utf-8'))['units']
    by_id = {unit['id']: unit for unit in units}
    for command in (['summary', 'report'] if name == 'xro' else ['summary']):
        folder = base / f'output/{command}/{paper}'
        content = (folder / f'{command}.md').read_text(encoding='utf-8')
        content = re.sub(r'^---\r?\n.*?\r?\n---\r?\n', '', content, count=1, flags=re.S)
        for relative in set(re.findall(r'!\[[^\]]*\]\((assets/[^)]+)\)', content)):
            target = PUBLIC / f'{name}-{command}-assets' / (Path(relative).stem + '.webp')
            target.parent.mkdir(parents=True, exist_ok=True)
            with Image.open(folder / relative) as image:
                image.thumbnail((1500, 1500))
                image.save(target, 'WEBP', quality=88)
            content = content.replace(f']({relative})', f']({target.relative_to(PUBLIC).as_posix()})')
        refs = set(re.findall(r'evidence=(ev-[a-z0-9]+)', content))
        assert refs <= by_id.keys(), f'Missing evidence: {refs - by_id.keys()}'
        evidence = {ref: {'page': by_id[ref]['position']['page_index'] + 1,
                          'bbox': by_id[ref]['position']['bbox_norm']} for ref in refs}
        payload = dict(content=content, evidence=evidence, pageCount=len(PdfReader(pdf).pages))
        (PUBLIC / f'{name}-{command}.json').write_text(json.dumps(payload, ensure_ascii=False), encoding='utf-8')
        for page in {value['page'] for value in evidence.values()}:
            target = PUBLIC / name / f'{page}.pdf'
            target.parent.mkdir(parents=True, exist_ok=True)
            if not target.exists():
                subprocess.run([shutil.which('pdftocairo') or 'D:/anaconda3/Library/bin/pdftocairo.exe',
                                '-f', str(page), '-l', str(page), '-pdf', str(pdf), str(target)], check=True)
        print(f'{name}/{command}: {len(evidence)} source links')
    if name == 'attention':
        folder = base / f'output/codebase/{paper}'
        files = {filename: (folder / filename).read_text(encoding='utf-8')
                 for filename in ['README.md', 'SPEC.md', 'TODO.md']}
        (PUBLIC / 'attention-codebase.json').write_text(json.dumps(files, ensure_ascii=False), encoding='utf-8')
