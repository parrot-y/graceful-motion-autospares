#!/usr/bin/env python3
"""
Updates Car Lighting entries in product-data.js.
Rotates the 3 existing lighting images (lighting-1/2/3.webp) across 15 entries.
"""

LT = "assets/images/products/lighting/"

# 15 Car Lighting entries — rotate 3 images
LIGHTING = [
    ("light-bi-led-projector-lens",      [LT+"lighting-1.webp", LT+"lighting-2.webp"]),
    ("light-boot-lights",                [LT+"lighting-2.webp", LT+"lighting-3.webp"]),
    ("light-brake-lights",               [LT+"lighting-3.webp", LT+"lighting-1.webp"]),
    ("light-drls-daytime-running-lights",[LT+"lighting-1.webp", LT+"lighting-2.webp"]),
    ("light-fog-light-covers",           [LT+"lighting-2.webp", LT+"lighting-3.webp"]),
    ("light-fog-lights",                 [LT+"lighting-3.webp", LT+"lighting-1.webp"]),
    ("light-hallogen-bulbs",             [LT+"lighting-1.webp", LT+"lighting-2.webp"]),
    ("light-headlight-lens",             [LT+"lighting-2.webp", LT+"lighting-3.webp"]),
    ("light-headlights",                 [LT+"lighting-3.webp", LT+"lighting-1.webp"]),
    ("light-klax-car-bulbs",             [LT+"lighting-1.webp", LT+"lighting-2.webp"]),
    ("light-led-bulbs",                  [LT+"lighting-2.webp", LT+"lighting-3.webp"]),
    ("light-side-marker-lamps",          [LT+"lighting-3.webp", LT+"lighting-1.webp"]),
    ("light-tail-light-lens",            [LT+"lighting-1.webp", LT+"lighting-2.webp"]),
    ("light-tail-lights",                [LT+"lighting-2.webp", LT+"lighting-3.webp"]),
    ("light-xenon-bulbs",                [LT+"lighting-3.webp", LT+"lighting-1.webp"]),
]

import re

with open("src/scripts/product-data.js", "r") as f:
    content = f.read()

for pid, imgs in LIGHTING:
    main_img = imgs[0]
    pattern = r'(id: "' + re.escape(pid) + r'"[^}]+image: ")[^"]+(")'
    new_content = re.sub(pattern, rf'\g<1>{main_img}\g<2>', content)
    if new_content != content:
        print(f"✅ {pid} → {main_img.split('/')[-1]}")
    else:
        print(f"⚠️  {pid} — no match (check ID)")
    content = new_content

with open("src/scripts/product-data.js", "w") as f:
    f.write(content)

print("\n✅ product-data.js updated for Car Lighting (15 entries)")
