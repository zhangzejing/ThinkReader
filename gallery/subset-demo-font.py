"""Keep the App's Latin glyphs and variable weights in the English gallery demos.

Run with fonttools + brotli installed. The desktop's original font is unchanged.
"""
from pathlib import Path
from fontTools import subset
from fontTools.ttLib import TTFont

root = Path(__file__).resolve().parent
font = TTFont(root.parent / 'app/desktop/src/assets/fonts/SourceHanSansCN-VF.ttf.woff2')
options = subset.Options()
options.name_IDs = ['*']
subsetter = subset.Subsetter(options=options)
subsetter.populate(unicodes=[*range(0x250), *range(0x2000, 0x2070)])
subsetter.subset(font)
for record in font['name'].names:
    if record.nameID in {1, 3, 4, 6, 16, 25}:
        value = 'ThinkReaderGallerySans' if record.nameID in {6, 25} else 'ThinkReader Gallery Sans'
        record.string = value.encode(record.getEncoding())
font.flavor = 'woff2'
(root / 'fonts').mkdir(exist_ok=True)
font.save(root / 'fonts/ThinkReaderGallerySans-Latin.woff2')
