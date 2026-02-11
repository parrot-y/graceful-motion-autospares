/**
 * Renovyte Product Database
 * Used for dynamic catalog rendering and product detail population.
 */

window.RenovyteProducts = [
    {
        id: "turbo-1",
        name: "Precision Gen2 6266 Ball Bearing Turbo",
        category: "engine",
        subcategory: "Turbochargers",
        price: "KES 145,000",
        oldPrice: "KES 210,000",
        image: "images/products/turbo-1.png",
        description: "The Precision Gen2 6266 CEA® turbocharger is a powerhouse of performance. Renowned for its efficiency and durability, it's the perfect upgrade for high-performance builds demanding maximum airflow and rapid spool.",
        features: [
            "Point-milled Billet CEA® compressor wheel",
            "Dual Ball Bearing center section for rapid spool",
            "Capable of supporting 800+ Horsepower",
            "High-temperature stainless steel turbine housing"
        ],
        specs: {
            "Compressor Inducer": "62.66mm",
            "Bearing Type": "Dual Ceramic Ball Bearing",
            "Housing Option": "T4 Divided 0.84 A/R",
            "Max HP Rating": "800 - 850 HP"
        },
        make: "Universal",
        model: "Universal"
    },
    {
        id: "brake-pads-1",
        name: "Brembo Front Performance Brake Pads",
        category: "braking",
        subcategory: "Brake Pads",
        price: "KES 12,500",
        oldPrice: "KES 14,800",
        image: "images/products/brake-pads.png",
        description: "Brembo ceramic brake pads are engineered for superior stopping power and significantly reduced brake dust. Ideal for both spirited street driving and performance enthusiasts who demand consistency.",
        features: [
            "Low-dust ceramic compound specifically for performance cars",
            "OE-matched chamfers and slots for noise reduction",
            "Premium multi-layer shims for vibration damping",
            "Exceptional thermal stability under high-speed braking"
        ],
        specs: {
            "Material": "High-Performance Ceramic",
            "Placement": "Front Axle",
            "FMSI Number": "D1351",
            "Wear Sensor": "Integrated Acoustic"
        },
        make: "Toyota",
        model: "Camry"
    },
    {
        id: "oil-filter-1",
        name: "Royal Purple Extended Life Oil Filter",
        category: "service",
        subcategory: "Oil Filters",
        price: "KES 2,400",
        oldPrice: "KES 3,200",
        image: "images/products/oil-filter.png",
        description: "Royal Purple oil filters provide superior particle removal and high-flow characteristics for maximum performance and longer engine life.",
        features: [
            "100% synthetic micro-glass media",
            "99% filtration efficiency at 25 microns",
            "Heavy-duty shell for extreme durability",
            "High-performance silicone anti-drainback valve"
        ],
        specs: {
            "Efficiency": "99% @ 25 Microns",
            "Shell Construction": "Thick-wall Steel",
            "Gasket Material": "High-temp Nitrile",
            "Bypass Valve": "Internal 20 PSI"
        },
        make: "Nissan",
        model: "X-Trail"
    }
];
