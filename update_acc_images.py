#!/usr/bin/env python3
"""
Final update of Car Accessories images in product-data.js.
Incorporates all images generated across multiple sessions.
"""

ACC  = "assets/images/products/accessories/"
EXT  = "assets/images/products/exterior-accessories/"
BODY = "assets/images/products/body-parts/"
PH   = EXT + "acc-1.webp"  # placeholder for items still awaiting 2nd image

ACCESSORIES = [
    ("acc-android-radios",            "Android Radios",             [ACC+"android-radio-1.png",    ACC+"android-radio-2.png"]),
    ("acc-back-rest",                 "Back Rest",                  [ACC+"back-rest-1.png",         ACC+"back-rest-2.png"]),
    ("acc-body-kit",                  "Body Kit",                   [ACC+"body-kit-1.png",          ACC+"body-kit-2.png"]),
    ("acc-bumper-clips",              "Bumper Clips",               [ACC+"bumper-clips-1.png",      ACC+"bumper-clips-2.png"]),
    ("acc-bumper-lips",               "Bumper Lips",                [ACC+"bumper-lips-1.png",       ACC+"bumper-lips-2.png"]),
    ("acc-camera-unit",               "Camera Unit",                [ACC+"camera-unit-1.png",       PH]),
    ("acc-car-alarms",                "Car Alarms",                 [ACC+"car-alarm-1.png",         ACC+"car-alarm-2.png"]),
    ("acc-car-amplifiers",            "Car Amplifiers",             [ACC+"amplifier-1.png",         ACC+"amplifier-2.png"]),
    ("acc-car-covers",                "Car Covers",                 [ACC+"car-cover-1.png",         ACC+"car-cover-2.png"]),
    ("acc-car-gprs-trackers",         "Car GPRS Trackers",          [ACC+"gps-tracker-1.png",       ACC+"gps-tracker-2.png"]),
    ("acc-car-start-jumpers",         "Car Start Jumpers",          [ACC+"jump-starter-1.png",      ACC+"jump-starter-2.png"]),
    ("acc-car-polish-sprays",         "Car Polish & Sprays",        [ACC+"polish-1.png",            ACC+"polish-2.png"]),
    ("acc-car-stereo",                "Car Stereo",                 [ACC+"stereo-1.png",            ACC+"stereo-2.png"]),
    ("acc-console-unit",              "Console Unit",               [ACC+"console-unit-1.png",      PH]),
    ("acc-dashboard-clock",           "Dashboard Clock",            [ACC+"dashboard-clock-1.png",   PH]),
    ("acc-dashboard-covers",          "Dashboard Covers",           [ACC+"dashboard-cover-1.png",   PH]),
    ("acc-dashboard-fans",            "Dashboard Fans",             [ACC+"dashboard-fan-1.png",     PH]),
    ("acc-dashcams",                  "Dashcams",                   [ACC+"dashcam-1.png",           ACC+"dashcam-2.png"]),
    ("acc-diffusers",                 "Diffusers",                  [ACC+"diffuser-1.png",          PH]),
    ("acc-door-edge-protectors",      "Door edge Protectors",       [ACC+"door-edge-protector-1.png", PH]),
    ("acc-driving-camera",            "Driving Camera",             [ACC+"driving-camera-1.png",    PH]),
    ("acc-fenders",                   "Fenders",                    [BODY+"side-panel-1.png",       BODY+"side-panel-2.png"]),
    ("acc-fire-stop",                 "Fire Stop",                  [ACC+"fire-stop-1.png",         PH]),
    ("acc-floor-mats",                "Floor Mats",                 [ACC+"floor-mats-1.png",        ACC+"floor-mats-2.png"]),
    ("acc-head-rest",                 "Head Rest",                  [ACC+"back-rest-1.png",         ACC+"back-rest-2.png"]),
    ("acc-horns",                     "Horns",                      [BODY+"horn-1.png",             BODY+"horn-2.png"]),
    ("acc-keyless-receiver-unit",     "Keyless Receiver Unit",      [ACC+"keyless-receiver-1.png",  PH]),
    ("acc-license-plates",            "License Plates",             [ACC+"license-plate-1.png",     PH]),
    ("acc-life-savers",               "Life Savers",                [ACC+"life-saver-1.png",        PH]),
    ("acc-lock-nuts",                 "Lock Nuts",                  [ACC+"lock-nuts-1.png",         PH]),
    ("acc-pioneer-jbl-door-speakers", "Pioneer/ JBL Door speakers", [ACC+"speakers-1.png",          ACC+"speakers-2.png"]),
    ("acc-roof-handles",              "Roof Handles",               [ACC+"roof-handle-1.png",       PH]),
    ("acc-rooftop-fin-aerial",        "Rooftop Fin Aerial",         [ACC+"shark-fin-1.png",         PH]),
    ("acc-seat-belts",                "Seat Belts",                 [ACC+"seat-belt-1.png",         PH]),
    ("acc-seat-covers",               "Seat Covers",                [ACC+"seat-covers-1.png",       PH]),
    ("acc-shark-fins",                "Shark Fins",                 [ACC+"shark-fin-1.png",         PH]),
    ("acc-spiolers",                  "Spiolers",                   [BODY+"spoiler-1.png",          BODY+"spoiler-2.png"]),
    ("acc-steering-covers",           "Steering Covers",            [EXT+"acc-3.webp",              PH]),
    ("acc-underseat-subwoofers",      "Underseat Subwoofers",       [ACC+"subwoofer-1.png",         ACC+"subwoofer-2.png"]),
    ("acc-wheel-caps",                "Wheel Caps",                 [ACC+"wheel-cap-1.png",         PH]),
    ("acc-wheel-hub-covers",          "Wheel Hub Covers",           [ACC+"wheel-hub-cover-1.png",   PH]),
    ("acc-windscreen-shade",          "Windscreen Shade",           [ACC+"windscreen-shade-1.png",  PH]),
]

import re

with open("src/scripts/product-data.js", "r") as f:
    content = f.read()

for pid, name, imgs in ACCESSORIES:
    main_img = imgs[0]
    old_pattern = r'(id: "' + re.escape(pid) + r'"[^}]+image: ")[^"]+(")'
    content = re.sub(old_pattern, rf'\g<1>{main_img}\g<2>', content)

with open("src/scripts/product-data.js", "w") as f:
    f.write(content)

with_real = sum(1 for _, _, imgs in ACCESSORIES if imgs[1] != EXT + "acc-1.webp")
print(f"✅ product-data.js updated")
print(f"   Items with 2 real images: {with_real}/42")
print(f"   Items with 1 real + placeholder: {42-with_real}/42  (quota resets ~00:09 UTC)")
