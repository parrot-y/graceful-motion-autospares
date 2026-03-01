#!/usr/bin/env python3
"""
Updates Body Parts entries in product-data.js with correct image mappings.
Only modifies Body Parts section. All other categories unchanged.
Image base path: assets/images/products/body-parts/
"""

IMG = "assets/images/products/body-parts/"

BODY_PARTS = [
    ("body-bonnets",            "Bonnets",                ["bonnet-1.png","bonnet-2.png"]),
    ("body-boot-tail-gates",    "Boot/ Tail Gates",       ["boot-1.png","boot-2.png"]),
    ("body-bumpers",            "Bumpers",                ["body-1.webp","bumper-2.png","bumper-3.png"]),
    ("body-bumper-side-skirting","Bumper side skirting",  ["skirt-1.png","skirt-2.png"]),
    ("body-bumper-slides",      "Bumper slides",          ["slides-1.png","slides-2.png"]),
    ("body-car-horns",          "Car Horns",              ["horn-1.png","horn-2.png"]),
    ("body-door-motors",        "Door Motors",            ["door-motor-1.png","door-motor-2.png"]),
    ("body-door-sensor-unit",   "Door Sensor Unit",       ["door-sensor-1.png","door-sensor-2.png"]),
    ("body-drive-shafts",       "Drive shafts",           ["drive-shaft-1.png","drive-shaft-2.png"]),
    ("body-front-wings",        "Front Wings",            ["wing-1.png","wing-2.png"]),
    ("body-grilles",            "Grilles",                ["grille-1.png","grille-2.png"]),
    ("body-hoods",              "Hoods",                  ["hood-1.png","hood-2.png"]),
    ("body-ignition-switches",  "Ignition Switches",      ["ignition-1.png","ignition-2.png"]),
    ("body-radiators",          "Radiators",              ["radiator-1.png","radiator-2.png"]),
    ("body-rear-cuts",          "Rear Cuts",              ["rear-cut-1.png","rear-cut-2.png"]),
    ("body-rear-wings",         "Rear Wings",             ["rear-wing-1.png","rear-wing-2.png"]),
    ("body-roof-racks",         "Roof Racks",             ["roof-rack-1.png","roof-rack-2.png"]),
    ("body-roof-strips",        "Roof Strips",            ["roof-strip-1.png","roof-strip-2.png"]),
    ("body-side-mirrors",       "Side Mirrors",           ["body-2.webp","side-mirror-1.png"]),
    ("body-side-panels",        "Side Panels",            ["side-panel-1.png","side-panel-2.png"]),
    ("body-spoilers",           "Spoilers",               ["spoiler-1.png","spoiler-2.png"]),
    ("body-steering-racks",     "Steering racks",         ["steering-rack-1.png","steering-rack-2.png"]),
    ("body-steering-wheels",    "Steering Wheels",        ["steering-wheel-1.png","steering-wheel-2.png"]),
    ("body-stone-guards",       "Stone Guards",           ["stone-guard-1.png","stone-guard-2.png"]),
]

import re

with open("src/scripts/product-data.js", "r") as f:
    content = f.read()

for pid, name, imgs in BODY_PARTS:
    main_img = IMG + imgs[0]
    images_arr = ", ".join(f'"{IMG}{i}"' for i in imgs)
    # Build replacement pattern for this entry
    pattern = (
        r'(\{ id: "' + re.escape(pid) + r'", name: "[^"]*", category: "Body Parts", '
        r'subcategory: "[^"]*", price: "[^"]*", image: ")[^"]*(".*?\},)'
    )
    # Build new entry with images array
    def make_replacement(m, main_img=main_img, images_arr=images_arr, name=name):
        old = m.group(0)
        # Replace image field
        replaced = re.sub(r'(image: ")[^"]+(")', rf'\g<1>{main_img}\g<2>', old)
        # Add images array after image field if not already present
        if '"images":' not in replaced and "images: [" not in replaced:
            replaced = replaced.replace(
                f'image: "{main_img}"',
                f'image: "{main_img}", images: [{images_arr}]'
            )
        return replaced

    content, n = re.subn(pattern, make_replacement, content)
    if n == 0:
        # Simpler replacement: just update the image field
        old_pattern = r'(id: "' + re.escape(pid) + r'"[^}]+image: ")[^"]+(")'
        content = re.sub(old_pattern, rf'\g<1>{main_img}\g<2>', content)
        print(f"  Updated image only for {pid}")
    else:
        print(f"✅ {pid}: images → {imgs}")

with open("src/scripts/product-data.js", "w") as f:
    f.write(content)

print("\n✅ product-data.js updated with Body Parts images")
