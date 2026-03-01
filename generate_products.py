#!/usr/bin/env python3
"""
Generates product-data.js from the canonical subcategory list
provided in 'CAR DETAILS FINAL 1.docx'.
Each subcategory = one product card. Images are placeholders.
"""

import re

# ── Placeholder images per category (existing files) ──────────────────────────
IMAGES = {
    "Body Parts":           "assets/images/products/body-parts/body-1.webp",
    "Car Accessories":      "assets/images/products/exterior-accessories/acc-1.webp",
    "Braking System":       "assets/images/products/braking-system/braking-1.webp",
    "Car Lighting":         "assets/images/products/lighting/lighting-1.webp",
    "Tire and Wheels":      "assets/images/products/tyres-wheels/tyres-1.webp",
    "Suspension & Bearings": "assets/images/products/suspension-steering/suspension-1.webp",
    "Engine & Components":  "assets/images/products/engine-components/engine-1.webp",
    "Service & Maintenance": "assets/images/products/service-parts/service-1.webp",
}

# ── Full subcategory list (exact Word-doc text) ────────────────────────────────
DATA = [
    # 1. Body Parts
    ("Body Parts", [
        "Bonnets", "Boot/ Tail Gates", "Bumpers", "Bumper side skirting",
        "Bumper slides", "Car Horns", "Door Motors", "Door Sensor Unit",
        "Drive shafts", "Front Wings", "Grilles", "Hoods",
        "Ignition Switches", "Radiators", "Rear Cuts", "Rear Wings",
        "Roof Racks", "Roof Strips", "Side Mirrors", "Side Panels",
        "Spoilers", "Steering racks", "Steering Wheels", "Stone Guards",
    ]),

    # 2. Car Accessories
    ("Car Accessories", [
        "Android Radios", "Back Rest", "Body Kit", "Bumper Clips",
        "Bumper Lips", "Camera Unit", "Car Alarms", "Car Amplifiers",
        "Car Covers", "Car GPRS Trackers", "Car Start Jumpers",
        "Car Polish & Sprays", "Car Stereo", "Console Unit",
        "Dashboard Clock", "Dashboard Covers", "Dashboard Fans",
        "Dashcams", "Diffusers", "Door edge Protectors",
        "Driving Camera", "Fenders", "Fire Stop", "Floor Mats",
        "Head Rest", "Horns", "Keyless Receiver Unit", "License Plates",
        "Life Savers", "Lock Nuts", "Pioneer/ JBL Door speakers",
        "Roof Handles", "Rooftop Fin Aerial", "Seat Belts",
        "Seat Covers", "Shark Fins", "Spiolers",
        "Steering Covers", "Underseat Subwoofers", "Wheel Caps",
        "Wheel Hub Covers", "Windscreen Shade",
    ]),

    # 3. Braking System
    ("Braking System", [
        "Brake Booster/ Master Cylinder", "Brake Disks", "Brake Fluids",
        "Brake Linings", "Brake Pads", "Brake Pedals", "Brake Shoes",
        "Brake Wheel Cylinder", "Drums", "Wheel Disks",
    ]),

    # 4. Car Lighting
    ("Car Lighting", [
        "Bi - LED Projector Lens", "Boot Lights", "Brake Lights",
        "DRLs (Daytime Running lights)", "Fog light Covers", "Fog lights",
        "Hallogen Bulbs", "Headlight Lens", "Headlights", "Klax Car Bulbs",
        "LED Bulbs", "Side Marker Lamps", "Tail light Lens",
        "Tail lights", "Xenon Bulbs",
    ]),

    # 5. Tire and Wheels
    ("Tire and Wheels", [
        "Lock Nuts", "Rims", "Tire and Wheels",
    ]),

    # 6. Suspension & Bearings
    ("Suspension & Bearings", [
        "Arm Bushes", "Ball Joints", "Bearings", "Clutches",
        "Coil Springs", "Control Arms", "CV Joints", "Drive Shaft Boots",
        "Engine Mountings", "Exhaust Bushes", "Gear box Mountings",
        "Idler Arms", "Rack ends", "Seals", "Shock Absorber Mountings",
        "Shock Absorbers", "Stabilizer Bushes", "Stabilizer Links",
        "Steering Boots", "Steering Knuckles", "Steering shaft Bushes",
        "Suspension Bushes", "Tie rod ends", "Wheel Hubs",
    ]),

    # 7. Engine & Components
    ("Engine & Components", [
        "ABS Pumps", "ABS Sensors", "AC Pump Belts",
        "Acceleration Sensors", "Air Flow Sensors", "Alternators",
        "Camshaft Sensors", "Chain Belts", "Crank shafts",
        "Cylinder Heads", "ECU computers", "Engine Coolants",
        "Engine Mountings", "Engine Oils", "Engine Seals",
        "Engine Sump Guards", "Fan Belts", "Fuel Pumps",
        "Fuel Pump Control Computers", "Fuel Pump Sieves",
        "Gearbox Mountings", "Ignition Coils", "Oxygen Sensors",
        "Power Management Control Modules", "Power Steering pumps",
        "Power Steering Reservoirs", "Pressure sensors", "Radiators",
        "Radiator Caps", "Shaft seals", "Solenoid Valves",
        "Spark plugs", "Steering Columns", "Temperature Controls",
        "Thermostats", "Throttle Body", "Timing Belts",
        "Transmission Computers", "Transmission oils", "Valve Body",
    ]),

    # 8. Service & Maintenance
    ("Service & Maintenance", [
        "Air Filters", "ATF Filters", "Brake Fluids", "Cabin Filters",
        "Coolants", "Engine Oils", "Fuel Filters", "Gear Oils",
        "Oil Filters",
    ]),
]

# ── ID slug helper ─────────────────────────────────────────────────────────────
_CAT_PREFIX = {
    "Body Parts": "body",
    "Car Accessories": "acc",
    "Braking System": "brake",
    "Car Lighting": "light",
    "Tire and Wheels": "tyre",
    "Suspension & Bearings": "susp",
    "Engine & Components": "eng",
    "Service & Maintenance": "svc",
}

def slug(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

# ── Generate JS ────────────────────────────────────────────────────────────────
lines = [
    "/**",
    " * Graceful Motion Autospares — Product Database",
    " * Generated from CAR DETAILS FINAL 1.docx",
    " * Each entry = one product card. Add images per product when ready.",
    " */",
    "",
    "window.RenovyteProducts = [",
]

total = 0
for cat, items in DATA:
    prefix = _CAT_PREFIX[cat]
    img = IMAGES[cat]
    lines.append(f"    // --- {cat.upper()} ---")
    for i, name in enumerate(items, 1):
        pid = f"{prefix}-{slug(name)}"
        # escape single quotes in name
        name_js = name.replace("'", "\\'")
        entry = (
            f"    {{"
            f' id: "{pid}",'
            f' name: "{name_js}",'
            f' category: "{cat}",'
            f' subcategory: "{name_js}",'
            f' price: "Contact for Price",'
            f' image: "{img}",'
            f' description: "Quality {name_js.lower()} for all vehicle makes and models. Contact us for availability.",'
            f' make: "UNIVERSAL", model: "Universal", rating: 4.5 }}{"," if True else ""}'
        )
        lines.append(entry)
        total += 1
    lines.append("")

lines.append("];")
lines.append(f"// Total products: {total}")

output = "\n".join(lines)

with open("src/scripts/product-data.js", "w") as f:
    f.write(output)

print(f"✅ Written {total} products to src/scripts/product-data.js")
for cat, items in DATA:
    print(f"   {cat}: {len(items)} entries")
