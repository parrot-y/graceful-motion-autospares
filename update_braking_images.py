#!/usr/bin/env python3
"""
Updates Braking System entries in product-data.js.
Uses 3 existing images (braking-1, -2, -3) spread across entries.
Items needing specific generated images are noted.
"""

BRK = "assets/images/products/braking-system/"

# (id, [img1, img2])  — using the 3 existing webp files rotated across 10 items
BRAKING = [
    ("brake-brake-booster-master-cylinder", [BRK+"braking-3.webp", BRK+"braking-1.webp"]),
    ("brake-brake-disks",                   [BRK+"braking-1.webp", BRK+"braking-2.webp"]),
    ("brake-brake-fluids",                  [BRK+"braking-2.webp", BRK+"braking-3.webp"]),
    ("brake-brake-linings",                 [BRK+"braking-3.webp", BRK+"braking-1.webp"]),
    ("brake-brake-pads",                    [BRK+"braking-1.webp", BRK+"braking-2.webp"]),
    ("brake-brake-pedals",                  [BRK+"braking-2.webp", BRK+"braking-3.webp"]),
    ("brake-brake-shoes",                   [BRK+"braking-3.webp", BRK+"braking-1.webp"]),
    ("brake-brake-wheel-cylinder",          [BRK+"braking-1.webp", BRK+"braking-2.webp"]),
    ("brake-drums",                         [BRK+"braking-2.webp", BRK+"braking-3.webp"]),
    ("brake-wheel-disks",                   [BRK+"braking-3.webp", BRK+"braking-1.webp"]),
]

import re

with open("src/scripts/product-data.js", "r") as f:
    content = f.read()

for pid, imgs in BRAKING:
    main_img = imgs[0]
    pattern = r'(id: "' + re.escape(pid) + r'"[^}]+image: ")[^"]+(")'
    content = re.sub(pattern, rf'\g<1>{main_img}\g<2>', content)
    print(f"✅ {pid} → {main_img.split('/')[-1]}")

with open("src/scripts/product-data.js", "w") as f:
    f.write(content)

print("\n✅ product-data.js updated for Braking System")
print("ℹ️  All 10 items now use rotated existing images (braking-1/2/3.webp)")
print("ℹ️  Specific generated images can be added per item when quota resets")
