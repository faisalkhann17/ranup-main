"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

// ─────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────

type Product = {
  id: number;
  name: string;
  variety: string;
  shortDesc: string;
  fullDesc: string;
  germination?: string;
  npkRatio?: string;
  season?: string;
  maturity?: string;
  seedRate?: string;
  dosage?: string;
  packagingSizes: string[];
  suitableCrops: string[];
  tags: string[];
  keyBenefits: string[];
  applicationMethod?: string;
  sowingInstructions?: string;
};

type SubCategory = {
  id: string;
  label: string;
  icon: string;
  description: string;
  products: Product[];
};

type Category = {
  id: string;
  label: string;
  tagline: string;
  icon: string;
  accent: string;
  subCategories: SubCategory[];
};

// ─────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────

const DATA: Category[] = [
  // ════════════════════════════════
  // VEGETABLE SEEDS
  // ════════════════════════════════
  {
    id: "vegetable-seeds",
    label: "Vegetable Seeds",
    tagline: "Certified F1 hybrids & open-pollinated varieties",
    icon: "🥦",
    accent: "#4d7d1a",
    subCategories: [
      {
        id: "tomato",
        label: "Tomato",
        icon: "🍅",
        description: "Round, cherry, and roma types for fresh market and processing.",
        products: [
          {
            id: 1,
            name: "F1 Ved1812",
            variety: "Indeterminate · Round",
            shortDesc: "Triple-disease resistant hybrid with 60–80 t/ha potential.",
            fullDesc:
              "Arka Rakshak F1 is India's first triple-disease resistant tomato hybrid, carrying resistance to Tomato Leaf Curl Virus (ToLCV), Tobacco Streak Virus (TSV), and early blight simultaneously. Fruits are round, firm, and deep-red with a thick pericarp (7–8 mm) that ensures a shelf life of 12–14 days at ambient temperature.",
            germination: "94%",
            season: "Year Round",
            maturity: "65–70 days",
            seedRate: "150–200 g/acre",
            packagingSizes: ["10 g", "50 g", "100 g"],
            suitableCrops: ["Open field", "Polyhouse", "Shade net"],
            tags: ["Triple Disease Resistant", "F1 Hybrid", "Long Shelf Life"],
            keyBenefits: [
              "Resistant to ToLCV, TSV, and early blight",
              "Firm fruits — shelf life 12–14 days",
              "Yield potential 60–80 t/ha",
              "Suitable for fresh market and processing",
            ],
            sowingInstructions:
              "Raise in pro-trays with cocopeat. Transplant 25-day seedlings at 60 × 45 cm. Stake at 30 cm height. Use drip irrigation with fertigation schedule.",
          },
          {
            id: 2,
            name: "NS 524",
            variety: "Semi-determinate · Oval",
            shortDesc: "High brix oval tomato preferred by sauce and ketchup processors.",
            fullDesc:
              "NS 524 is a semi-determinate processing tomato with concentrated fruit set ideal for once-over mechanical harvest. Fruits are oval, firm, with a high brix value (5.5–6.0°Bx) making it prized by ketchup and paste manufacturers. Plant has strong disease tolerance to Fusarium crown rot and Verticillium wilt.",
            germination: "93%",
            season: "Rabi · Summer",
            maturity: "70–75 days",
            seedRate: "150 g/acre",
            packagingSizes: ["10 g", "50 g"],
            suitableCrops: ["Open field", "Processing farms"],
            tags: ["Processing Grade", "High Brix", "Wilt Tolerant"],
            keyBenefits: [
              "Brix 5.5–6.0° — premium processing value",
              "Concentrated set — suited for mechanical harvest",
              "Fusarium and Verticillium wilt tolerant",
              "Thick flesh — low water content",
            ],
            sowingInstructions:
              "Transplant 25-day seedlings at 90 × 30 cm for mechanised farming. Apply 120:80:80 kg NPK/ha. Withhold irrigation 7–10 days before harvest for concentrated set.",
          },
          {
            id: 3,
            name: "Sungold Cherry",
            variety: "Indeterminate · Cherry",
            shortDesc: "Golden cherry tomato with exceptional sweetness for premium retail.",
            fullDesc:
              "Sungold Cherry produces clusters of golden-orange cherry tomatoes (12–15 g each) with a brix of 8–10°, delivering an exceptional sweet-tart flavour profile. The indeterminate plant produces continuously over 5–6 months under polyhouse conditions. Highly preferred by modern retail, hotel, and export chains.",
            germination: "92%",
            season: "Year Round (Polyhouse)",
            maturity: "55–60 days",
            seedRate: "80–100 g/acre",
            packagingSizes: ["5 g", "10 g"],
            suitableCrops: ["Polyhouse", "Shade net"],
            tags: ["Cherry Type", "High Brix", "Premium Export"],
            keyBenefits: [
              "Brix 8–10° — exceptional sweetness",
              "Continuous harvest 5–6 months",
              "High-value retail and export segment",
              "Attractive golden-orange colour",
            ],
            sowingInstructions:
              "Grow in polyhouse for best results. Train to single stem with weekly topping. Space at 50 × 40 cm. Use high-K fertigation during fruiting.",
          },
        ],
      },
      {
        id: "brinjal",
        label: "Brinjal",
        icon: "🍆",
        description: "Long, round, and cluster types suited to all Indian markets.",
        products: [
          {
            id: 4,
            name: "Arka Nidhi F1",
            variety: "Long Purple · Hybrid",
            shortDesc: "Vigorous long-purple hybrid with continuous fruit set over 5 months.",
            fullDesc:
              "Arka Nidhi is a prolific long-purple brinjal hybrid from IIHR with fruits measuring 25–30 cm. The glossy, firm fruits are free from bitterness and carry the characteristic purple shine preferred in North Indian wholesale markets. The plant produces continuously for 4–5 months with minimal input.",
            germination: "92%",
            season: "Year Round",
            maturity: "55–60 days",
            seedRate: "100–150 g/acre",
            packagingSizes: ["10 g", "50 g"],
            suitableCrops: ["Open field", "Shade net"],
            tags: ["F1 Hybrid", "Long Purple", "High Yield"],
            keyBenefits: [
              "Continuous harvest for 4–5 months",
              "Glossy finish — premium wholesale appeal",
              "Field tolerance to Phomopsis blight",
              "Good heat tolerance",
            ],
            sowingInstructions:
              "Transplant 30-day seedlings at 60 × 60 cm. Mulching recommended. Apply 150:75:75 kg NPK/ha. Staking required for tall plants.",
          },
          {
            id: 5,
            name: "Pusa Purple Cluster",
            variety: "Cluster · Small Round",
            shortDesc: "High-density cluster brinjal ideal for small-fruit markets.",
            fullDesc:
              "Pusa Purple Cluster produces clusters of 4–6 small round fruits (30–40 g each) per node, giving a dramatically higher fruit count per plant. The variety is particularly popular in markets that prefer small round brinjal for stuffed preparations. It is early bearing and has field tolerance to bacterial wilt.",
            germination: "90%",
            season: "Kharif · Rabi",
            maturity: "50–55 days",
            seedRate: "120 g/acre",
            packagingSizes: ["10 g", "25 g"],
            suitableCrops: ["Open field"],
            tags: ["Cluster Type", "Small Round", "Early Bearing"],
            keyBenefits: [
              "4–6 fruits per node — very high fruit count",
              "Popular for stuffed-brinjal markets",
              "Field tolerance to bacterial wilt",
              "Early bearing — income starts in 50 days",
            ],
            sowingInstructions:
              "Transplant 25–30 day seedlings at 75 × 60 cm. Support stakes needed at 40 cm height. Harvest clusters when fruits reach full size but are still firm.",
          },
        ],
      },
      {
        id: "capsicum",
        label: "Capsicum & Chilli",
        icon: "🫑",
        description: "Block-type capsicum and hot chilli varieties for all segments.",
        products: [
          {
            id: 6,
            name: "Orobelle F1",
            variety: "Block Type · Yellow",
            shortDesc: "Thick-walled yellow capsicum for polyhouse export production.",
            fullDesc:
              "Orobelle is a block-type yellow capsicum with 3–4 lobes, thick flesh (8–9 mm pericarp), and large fruit weight (180–220 g). It transitions from green to vivid yellow at maturity, making it a visual standout in retail. Specifically bred for polyhouse conditions — achieves 25–30 kg/m² under fertigation.",
            germination: "90%",
            season: "Oct–Mar (Plains) · Year Round (Polyhouse)",
            maturity: "70–75 days",
            seedRate: "80–100 g/acre",
            packagingSizes: ["10 g", "25 g"],
            suitableCrops: ["Polyhouse", "Shade net"],
            tags: ["Block Type", "Export Grade", "Polyhouse"],
            keyBenefits: [
              "Fruit weight 180–220 g — export grade",
              "Thick flesh 8–9 mm — long shelf life",
              "Yield 25–30 kg/m² under polyhouse",
              "Attractive yellow colour — retail premium",
            ],
            sowingInstructions:
              "Train to 2-stem system with nylon strings. Transplant 35-day seedlings at 50 × 40 cm. High-K fertigation from week 6. Maintain RH 60–70% in polyhouse.",
          },
          {
            id: 7,
            name: "Jwala Hot Chilli",
            variety: "Open Pollinated · Finger Type",
            shortDesc: "Traditional finger chilli with high pungency and deep red colour.",
            fullDesc:
              "Jwala is Gujarat's most beloved finger chilli, known for extreme pungency (50,000–60,000 SHU) and a thin skin that dries evenly, making it ideal for chilli powder and export. Fruits are 8–10 cm long, slender, and deep red at maturity. The OP variety is affordable and adapts well to rainfed conditions.",
            germination: "89%",
            season: "Kharif",
            maturity: "80–85 days",
            seedRate: "250–300 g/acre",
            packagingSizes: ["50 g", "100 g", "500 g"],
            suitableCrops: ["Open field", "Rainfed"],
            tags: ["High Pungency", "Drying Grade", "OP Variety"],
            keyBenefits: [
              "Pungency 50,000–60,000 SHU",
              "Thin skin — dries uniformly for powder",
              "Tolerant to rainfed conditions",
              "Deep red colour — high market value",
            ],
            sowingInstructions:
              "Direct sow or transplant 30-day seedlings at 45 × 30 cm. Apply 60:40:20 kg NPK/ha. Harvest when 80% fruits turn red for maximum pungency.",
          },
        ],
      },
      {
        id: "cucurbits",
        label: "Cucurbits",
        icon: "🥒",
        description: "Cucumber, bitter gourd, bottle gourd, and pumpkin hybrids.",
        products: [
          {
            id: 8,
            name: "Priya F1 Cucumber",
            variety: "Slicing · Dark Green",
            shortDesc: "Gynoecious hybrid cucumber with early, prolific fruit set.",
            fullDesc:
              "Priya F1 is a gynoecious hybrid (all-female flowering) that sets fruits from the 3rd node, dramatically increasing early yield. Fruits are dark green, straight (18–20 cm), crisp, and have a thin skin preferred by fresh-cut processors. The plant is tolerant to powdery mildew and downy mildew.",
            germination: "93%",
            season: "Year Round",
            maturity: "38–42 days",
            seedRate: "200–250 g/acre",
            packagingSizes: ["10 g", "50 g", "100 g"],
            suitableCrops: ["Open field", "Polyhouse", "Shade net"],
            tags: ["Gynoecious", "Early Harvest", "Mildew Tolerant"],
            keyBenefits: [
              "Fruiting from 3rd node — very early harvest",
              "Dark green uniform fruits 18–20 cm",
              "Tolerant to powdery and downy mildew",
              "High yield 25–30 t/ha",
            ],
            sowingInstructions:
              "Direct sow 2 seeds per pit at 90 × 60 cm. Provide trellis support. Harvest at 38–42 days when fruits are dark green. Do not let fruits over-mature.",
          },
          {
            id: 9,
            name: "MC-84 Bitter Gourd",
            variety: "Hybrid · Medium Long",
            shortDesc: "High-yielding bitter gourd with attractive dark-green warty fruits.",
            fullDesc:
              "MC-84 is an F1 bitter gourd hybrid producing 25–28 cm fruits with prominent warts and a dark green colour that retains post-harvest. The plant is vigorous with a long harvest period (3–4 months). Fruits have a good balance of bitterness — acceptable to retail buyers. Shows tolerance to mosaic virus.",
            germination: "91%",
            season: "Kharif · Summer",
            maturity: "50–55 days",
            seedRate: "400–500 g/acre",
            packagingSizes: ["50 g", "100 g"],
            suitableCrops: ["Open field", "Kitchen garden"],
            tags: ["F1 Hybrid", "Dark Green", "Mosaic Tolerant"],
            keyBenefits: [
              "Long harvest period 3–4 months",
              "Dark green colour retained post-harvest",
              "Prominent warts — market preferred appearance",
              "Tolerance to mosaic virus",
            ],
            sowingInstructions:
              "Soak seeds 12 hours before sowing. Direct sow 1–2 seeds/pit at 1.5 × 1 m. Provide strong trellis or overhead net. Harvest when fruits are firm and light-green.",
          },
        ],
      },
      {
        id: "leafy",
        label: "Leafy Greens",
        icon: "🥬",
        description: "Spinach, fenugreek, coriander, and amaranth varieties.",
        products: [
          {
            id: 10,
            name: "Pusa Harit Spinach",
            variety: "Open Pollinated · Broad Leaf",
            shortDesc: "Broad, dark-green spinach with slow bolting for extended harvest.",
            fullDesc:
              "Pusa Harit is a high-yielding spinach known for its broad, dark-green crinkled leaves. The variety has a slow-bolting character — critical in warmer climates — allowing multiple cuttings over 2–3 months. Leaves are tender, smooth, and have low oxalic acid content preferred by food processors.",
            germination: "88%",
            season: "Oct–Mar",
            maturity: "25–30 days (first cutting)",
            seedRate: "4–5 kg/acre",
            packagingSizes: ["100 g", "500 g", "1 kg"],
            suitableCrops: ["Open field", "Kitchen garden", "Protected cultivation"],
            tags: ["Slow Bolting", "Multiple Cuts", "Low Oxalic Acid"],
            keyBenefits: [
              "2–3 cuttings per crop — high returns",
              "Slow bolting — extended harvest window",
              "Low oxalic acid — preferred by processors",
              "Suitable for baby-leaf segment",
            ],
            sowingInstructions:
              "Broadcast sow and rake in. Keep soil moist for 5–7 days until germination. First cutting at 25–30 days. Apply 20 kg N/ha after each cutting.",
          },
          {
            id: 11,
            name: "CO-1 Coriander",
            variety: "Open Pollinated · Fine Leaf",
            shortDesc: "Dual-use coriander for both green leaf and high oil seed harvest.",
            fullDesc:
              "CO-1 is a dual-purpose coriander variety — harvested at the green leaf stage (25–30 days) or allowed to mature for seed (90–95 days). Seeds have 0.8–1.0% essential oil content, meeting export specifications. The variety is compact, erect, and suitable for mechanised seed harvesting.",
            germination: "85%",
            season: "Oct–Feb",
            maturity: "25–30 days (leaf) · 90–95 days (seed)",
            seedRate: "8–10 kg/acre",
            packagingSizes: ["100 g", "500 g", "1 kg", "5 kg"],
            suitableCrops: ["Open field", "Kitchen garden"],
            tags: ["Dual Purpose", "High Oil Seed", "Export Quality"],
            keyBenefits: [
              "Dual use — leaf and seed from same crop",
              "Seed oil 0.8–1.0% — export grade",
              "Compact plant — suitable for close spacing",
              "Consistent leaf production under cool weather",
            ],
            sowingInstructions:
              "Split seeds gently before sowing. Broadcast at 8–10 kg/acre. For leaf harvest, begin cutting at 25–30 days. For seed, allow to fully mature and thresh when 70% seeds are brown.",
          },
        ],
      },
    ],
  },

  // ════════════════════════════════
  // FERTILIZERS
  // ════════════════════════════════
  {
    id: "fertilizers",
    label: "Fertilizers",
    tagline: "Balanced nutrition solutions for every crop stage",
    icon: "🧪",
    accent: "#a86b28",
    subCategories: [
      {
        id: "npk",
        label: "NPK Fertilizers",
        icon: "⚗️",
        description: "Balanced macronutrient grades for basal and top-dress application.",
        products: [
          {
            id: 101,
            name: "NPK 19:19:19",
            variety: "Fully Water Soluble · Crystalline",
            shortDesc: "Balanced water-soluble NPK ideal for fertigation and foliar application.",
            fullDesc:
              "NPK 19:19:19 is a fully water-soluble, balanced-grade fertiliser with equal proportions of nitrogen, phosphorus, and potassium. It is free from chloride and sodium, making it safe for sensitive crops. Ideal for drip fertigation and foliar spray at vegetative and early flowering stages.",
            npkRatio: "19 : 19 : 19",
            dosage: "3–5 g/litre (foliar) · 2–5 kg/acre/week (drip)",
            packagingSizes: ["1 kg", "5 kg", "25 kg"],
            suitableCrops: ["All vegetables", "Floriculture", "Fruits", "Plantation crops"],
            tags: ["Water Soluble", "Chloride Free", "Fertigation Grade"],
            keyBenefits: [
              "Balanced N:P:K — supports vegetative growth",
              "100% water soluble — no clogging in drip lines",
              "Chloride and sodium free — safe for all crops",
              "Can be tank-mixed with most pesticides",
            ],
            applicationMethod:
              "Dissolve completely in water before applying through drip or sprayer. Best applied during morning hours. Avoid mixing with calcium or magnesium products in concentrated form.",
          },
          {
            id: 102,
            name: "NPK 12:61:00",
            variety: "High Phosphorus Grade",
            shortDesc: "High-phosphorus grade to stimulate root development and flowering.",
            fullDesc:
              "NPK 12:61:00 is a high-phosphorus fertiliser primarily used at transplanting and early growth stages to stimulate strong root development. Its high phosphorus also encourages early flowering and fruit set. Low nitrogen content prevents excessive vegetative growth at reproductive stages.",
            npkRatio: "12 : 61 : 00",
            dosage: "2–3 g/litre (foliar) · 1–2 kg/acre/week (drip)",
            packagingSizes: ["1 kg", "5 kg", "25 kg"],
            suitableCrops: ["Tomato", "Capsicum", "Cucumber", "Pulses", "Cereals"],
            tags: ["High Phosphorus", "Root Development", "Flowering Booster"],
            keyBenefits: [
              "Stimulates root development at transplant",
              "Promotes early and uniform flowering",
              "Low N prevents vegetative excess at flowering",
              "Compatible with most drip systems",
            ],
            applicationMethod:
              "Apply at transplanting and early flowering stage. Use through drip or foliar spray. Do not mix with calcium, magnesium, or sulphate fertilisers in concentrated solutions.",
          },
          {
            id: 103,
            name: "NPK 00:00:50 (SOP)",
            variety: "Sulphate of Potash · High Potassium",
            shortDesc: "Chloride-free high-potassium fertiliser for fruit quality and shelf life.",
            fullDesc:
              "NPK 00:00:50 is Sulphate of Potash (SOP) — a chloride-free high-potassium fertiliser applied at the fruit enlargement and maturity stages. Potassium at this stage is directly responsible for fruit size, brix, colour, firmness, and shelf life. SOP also supplies 18% sulphur, important for flavour development in cucurbits and capsicum.",
            npkRatio: "00 : 00 : 50",
            dosage: "3–5 g/litre (foliar) · 2–4 kg/acre/week (drip)",
            packagingSizes: ["1 kg", "5 kg", "25 kg", "50 kg"],
            suitableCrops: ["Tomato", "Capsicum", "Cucumber", "Mango", "Grapes"],
            tags: ["High Potassium", "Fruit Quality", "Chloride Free", "SOP"],
            keyBenefits: [
              "Improves fruit brix, firmness, and colour",
              "18% sulphur — enhances flavour",
              "Chloride free — safe for sensitive crops",
              "Extends post-harvest shelf life",
            ],
            applicationMethod:
              "Begin at fruit initiation. Apply weekly through drip or fortnightly as foliar. Increase dose during rapid fruit enlargement. Reduce or stop 10 days before harvest.",
          },
        ],
      },
      {
        id: "micronutrients",
        label: "Micronutrients",
        icon: "🔬",
        description: "Chelated zinc, boron, iron, calcium, and magnesium supplements.",
        products: [
          {
            id: 104,
            name: "Chelated Zinc EDTA 12%",
            variety: "Fully Chelated · Water Soluble",
            shortDesc: "Corrects zinc deficiency for improved grain filling and enzyme activity.",
            fullDesc:
              "Chelated Zinc EDTA 12% provides zinc in a fully chelated form that remains stable across a pH range of 4–9, ensuring availability in calcareous (high pH) soils where ionic zinc is rapidly fixed. Zinc deficiency causes khaira disease in paddy, white bud in maize, and little leaf in vegetables. Corrects deficiency within 7–10 days of application.",
            npkRatio: "Zn: 12%",
            dosage: "0.5 g/litre (foliar) · 250–500 g/acre (soil drip)",
            packagingSizes: ["250 g", "500 g", "1 kg", "5 kg"],
            suitableCrops: ["Paddy", "Maize", "All vegetables", "Wheat", "Fruits"],
            tags: ["Chelated", "High pH Stable", "Rapid Correction"],
            keyBenefits: [
              "Stable across pH 4–9 — works in all soil types",
              "Corrects deficiency in 7–10 days",
              "Improves enzyme activity and grain filling",
              "Suitable for foliar, soil, and drip application",
            ],
            applicationMethod:
              "For foliar: dissolve 0.5 g/litre and spray in the morning. For soil: apply through drip or mix with irrigation water. Repeat after 15 days if deficiency persists.",
          },
          {
            id: 105,
            name: "Boron 20% (Solubor)",
            variety: "Solubor · Highly Soluble",
            shortDesc: "High-solubility boron to prevent hollow heart, tip burn, and flower drop.",
            fullDesc:
              "Boron is critical for cell wall integrity, pollen germination, and sugar transport. Deficiency manifests as hollow heart in cauliflower, tip burn in lettuce, blossom drop in tomato, and cracked stem in celery. Solubor 20% is the most soluble boron form available, dissolving rapidly even in cold water.",
            npkRatio: "B: 20%",
            dosage: "1–2 g/litre (foliar) · 500 g–1 kg/acre (drip)",
            packagingSizes: ["250 g", "500 g", "1 kg"],
            suitableCrops: ["Cauliflower", "Tomato", "Sunflower", "Cotton", "Fruits"],
            tags: ["High Solubility", "Prevents Flower Drop", "Cell Integrity"],
            keyBenefits: [
              "Prevents blossom drop and fruit set failure",
              "Corrects hollow heart and cracked stem disorders",
              "Highest solubility — no filter clogging in drip",
              "Improves pollen viability and germination",
            ],
            applicationMethod:
              "Apply at pre-flowering and early fruit stage. Do not exceed recommended dose — boron has a narrow safe range. Do not apply in hot afternoon conditions.",
          },
          {
            id: 106,
            name: "Calcium Nitrate 15.5%",
            variety: "Fully Soluble · Fast Acting",
            shortDesc: "Prevents blossom-end rot in tomato, tip-burn in lettuce.",
            fullDesc:
              "Calcium Nitrate provides 15.5% calcium along with 14.5% nitrate nitrogen. Calcium is immobile in the plant and must be continuously supplied via transpiration stream. Deficiency causes blossom-end rot (BER) in tomato and capsicum, tip burn in leafy vegetables, and bitter pit in apple. Regular drip application is the most effective delivery method.",
            npkRatio: "Ca: 15.5% · N: 14.5%",
            dosage: "3–5 g/litre (foliar) · 2–5 kg/acre/week (drip)",
            packagingSizes: ["1 kg", "5 kg", "25 kg", "50 kg"],
            suitableCrops: ["Tomato", "Capsicum", "Lettuce", "Apple", "Strawberry"],
            tags: ["Prevents BER", "Calcium Supplement", "Nitrate Nitrogen"],
            keyBenefits: [
              "Prevents blossom-end rot in tomato and capsicum",
              "Corrects tip burn in leafy vegetables",
              "Nitrate N is immediately available to roots",
              "Improves fruit firmness and shelf life",
            ],
            applicationMethod:
              "Apply from early fruit development through harvest. For BER prevention, drip application is most effective. Do not mix with phosphate or sulphate fertilisers in concentrated stock solutions.",
          },
        ],
      },
      {
        id: "bio-fertilizers",
        label: "Bio-Fertilizers",
        icon: "🌿",
        description: "Rhizobium, PSB, Azotobacter and mycorrhiza-based organic inputs.",
        products: [
          {
            id: 107,
            name: "Rhizobium Culture",
            variety: "Liquid Formulation · Crop Specific",
            shortDesc: "Nitrogen-fixing bacteria for legume crops — reduces urea requirement by 30–40%.",
            fullDesc:
              "Rhizobium is a genus of nitrogen-fixing bacteria that form root nodules exclusively in leguminous crops (soybean, chickpea, groundnut, moong, lentil). A single hectare can fix 100–200 kg atmospheric nitrogen per season, directly reducing urea input by 30–40%. Our liquid formulation contains 2 × 10⁸ CFU/ml and has a shelf life of 6 months.",
            npkRatio: "N-fixing: up to 200 kg/ha/season",
            dosage: "500 ml/acre (seed treatment or soil drench)",
            packagingSizes: ["250 ml", "500 ml", "1 litre"],
            suitableCrops: ["Soybean", "Chickpea", "Groundnut", "Moong", "Lentil"],
            tags: ["Nitrogen Fixing", "Organic", "Seed Treatment"],
            keyBenefits: [
              "Fixes up to 200 kg N/ha — reduces urea cost",
              "Increases nodulation by 40–60%",
              "Improves root architecture and crop vigour",
              "Compatible with organic farming programs",
            ],
            applicationMethod:
              "Seed treatment: mix 250 ml with 1–2% jaggery solution and coat seeds. Allow to dry in shade for 30 min before sowing. Do not expose to direct sunlight or chemical seed treatments before applying.",
          },
          {
            id: 108,
            name: "PSB Liquid",
            variety: "Bacillus megaterium · Liquid",
            shortDesc: "Solubilises fixed soil phosphorus to improve P uptake by 20–30%.",
            fullDesc:
              "Phosphate Solubilising Bacteria (PSB) contains Bacillus megaterium at 2 × 10⁸ CFU/ml. These bacteria solubilise fixed phosphorus in soil — particularly calcium phosphates in calcareous soils — making it available to plant roots. Studies show 20–30% improvement in P uptake, allowing corresponding reduction in DAP or SSP application.",
            npkRatio: "P solubilisation: 20–30% improvement",
            dosage: "500 ml/acre (seed + soil application)",
            packagingSizes: ["250 ml", "500 ml", "1 litre"],
            suitableCrops: ["All crops", "Especially effective in calcareous soils"],
            tags: ["Phosphorus Solubilising", "Reduces DAP Use", "Soil Health"],
            keyBenefits: [
              "Improves P uptake by 20–30%",
              "Reduces DAP/SSP requirement",
              "Produces growth hormones — improves root mass",
              "Safe for soil microbiome",
            ],
            applicationMethod:
              "Apply as seed treatment (combined with Rhizobium for legumes) and at 15–20 DAS as soil drench. Can be mixed with Azotobacter or Rhizobium. Store below 25°C away from direct sunlight.",
          },
          {
            id: 109,
            name: "Mycorrhiza VAM Granules",
            variety: "Vesicular Arbuscular · Granular",
            shortDesc: "Root colonising fungi that extend the root system for superior nutrient uptake.",
            fullDesc:
              "Mycorrhiza (VAM) granules contain spores of Glomus intraradices at 100 IP/g. These beneficial fungi colonise plant roots within 2–3 weeks and extend a hyphal network into the soil up to 10 times the root volume — dramatically improving water and phosphorus uptake. Most beneficial in phosphorus-deficient or dry soils.",
            npkRatio: "Spore count: 100 IP/g",
            dosage: "2–4 kg/acre (soil or transplant application)",
            packagingSizes: ["500 g", "1 kg", "5 kg"],
            suitableCrops: ["Vegetables", "Fruits", "Floriculture", "Plantation crops"],
            tags: ["Root Colonising", "Phosphorus Uptake", "Drought Tolerance"],
            keyBenefits: [
              "Extends root volume up to 10× via hyphal network",
              "Improves phosphorus and water uptake",
              "Reduces transplant shock significantly",
              "Improves plant tolerance to drought",
            ],
            applicationMethod:
              "Mix granules into the root zone at transplanting or sowing. Place near roots for maximum colonisation. Do not apply with fungicides. Wait 7 days after fungicide application before use.",
          },
        ],
      },
      {
        id: "organic-special",
        label: "Organic & Specialty",
        icon: "🌱",
        description: "Humic acid, seaweed extract, and soil conditioner inputs.",
        products: [
          {
            id: 110,
            name: "Humic Acid 98% Granules",
            variety: "Potassium Humate · Granular",
            shortDesc: "Soil conditioner that improves CEC, water retention, and nutrient availability.",
            fullDesc:
              "Potassium Humate Granules (98% Humic Acid) are derived from leonardite — the most concentrated natural humic acid source. Applied to soil, humic acid improves cation exchange capacity (CEC), chelates micronutrients, stimulates beneficial microbial activity, and improves soil water retention by 20–30%. Particularly effective in sandy and degraded soils.",
            npkRatio: "Humic Acid: 98%",
            dosage: "1–2 kg/acre (soil) · 1–2 g/litre (drip/foliar)",
            packagingSizes: ["500 g", "1 kg", "5 kg", "25 kg"],
            suitableCrops: ["All crops", "Especially sandy and degraded soils"],
            tags: ["Soil Conditioner", "Improves CEC", "Organic"],
            keyBenefits: [
              "Improves soil CEC — better nutrient holding",
              "Chelates micronutrients — increases availability",
              "Improves water retention by 20–30%",
              "Stimulates beneficial soil microorganisms",
            ],
            applicationMethod:
              "Apply to soil before sowing and mix thoroughly. For drip: dissolve in water (soluble grades only). Repeat every 30–45 days for best results.",
          },
          {
            id: 111,
            name: "Seaweed Extract Liquid",
            variety: "Ascophyllum nodosum · Liquid",
            shortDesc: "Natural growth promoter with cytokinins that improve stress tolerance and fruit set.",
            fullDesc:
              "Seaweed Extract from Ascophyllum nodosum contains natural cytokinins, auxins, betaines, mannitol, and alginic acid. These bioactive compounds improve cell division, delay senescence, and critically improve plant tolerance to heat, drought, and salinity stress. Studies show 10–15% yield improvement in stress conditions. Also improves fruit set when applied at flowering.",
            npkRatio: "Cytokinin equivalent: 30 ppm",
            dosage: "2–3 ml/litre (foliar) · 1–2 litre/acre (drip)",
            packagingSizes: ["250 ml", "500 ml", "1 litre", "5 litre"],
            suitableCrops: ["All crops", "Particularly high-value vegetables and fruits"],
            tags: ["Natural Growth Promoter", "Stress Tolerance", "Cytokinin Rich"],
            keyBenefits: [
              "Improves heat, drought, and salinity tolerance",
              "Enhances fruit set at flowering",
              "Delays leaf senescence — extends harvest",
              "10–15% yield improvement under stress",
            ],
            applicationMethod:
              "Apply as foliar spray at vegetative stage, pre-flowering, and fruit initiation. Works best with consistent use (3–4 applications per crop cycle). Can be mixed with most water-soluble fertilisers.",
          },
        ],
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────

export default function ProductsSection() {
  const [activeCatId, setActiveCatId] = useState<string | null>(null);
  const [activeSubId, setActiveSubId] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  const activeCategory = DATA.find((c) => c.id === activeCatId) ?? null;
  const activeSubCategory =
    activeCategory?.subCategories.find((s) => s.id === activeSubId) ?? null;

  const goBack = () => {
    if (activeSubId) setActiveSubId(null);
    else setActiveCatId(null);
  };

  return (
    <>
      <section id="products" className="py-28 px-6 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-leaf-50/40 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-seed-100/20 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative">

          {/* ── Section Header ── */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <div className="divider-leaf mb-6 max-w-xs mx-auto">
              <span className="text-leaf-500 text-xs tracking-widest uppercase font-medium px-4">
                Our Products
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-leaf-900 mb-4">
              What We Offer
            </h2>
            <p className="text-soil-500 text-lg max-w-xl mx-auto leading-relaxed">
              Choose a category to explore our complete range of seeds and fertilizers.
            </p>
          </motion.div>

          {/* ── Breadcrumb ── */}
          <AnimatePresence>
            {activeCatId && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-sm text-soil-400 mb-8 flex-wrap"
              >
                <button
                  onClick={() => { setActiveCatId(null); setActiveSubId(null); }}
                  className="hover:text-leaf-600 transition-colors"
                >
                  Products
                </button>
                <span>/</span>
                <button
                  onClick={() => setActiveSubId(null)}
                  className={`transition-colors ${activeSubId ? "hover:text-leaf-600" : "text-leaf-700 font-medium pointer-events-none"}`}
                >
                  {activeCategory?.label}
                </button>
                {activeSubId && (
                  <>
                    <span>/</span>
                    <span className="text-leaf-700 font-medium">{activeSubCategory?.label}</span>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── LEVEL 1: Category ── */}
          <AnimatePresence mode="wait">
            {!activeCatId && (
              <motion.div
                key="categories"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto"
              >
                {DATA.map((cat, i) => (
                  <CategoryCard
                    key={cat.id}
                    category={cat}
                    index={i}
                    onClick={() => setActiveCatId(cat.id)}
                  />
                ))}
              </motion.div>
            )}

            {/* ── LEVEL 2: Sub-Category ── */}
            {activeCatId && !activeSubId && activeCategory && (
              <motion.div
                key="subcategories"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
              >
                <BackButton onClick={goBack} label="Back to Categories" />

                <div
                  className="inline-flex items-center gap-3 mb-10 px-5 py-3 rounded-2xl"
                  style={{ background: `${activeCategory.accent}12` }}
                >
                  <span className="text-2xl">{activeCategory.icon}</span>
                  <div>
                    <h3 className="font-display text-xl font-bold" style={{ color: activeCategory.accent }}>
                      {activeCategory.label}
                    </h3>
                    <p className="text-xs text-soil-400">{activeCategory.tagline}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {activeCategory.subCategories.map((sub, i) => (
                    <SubCategoryCard
                      key={sub.id}
                      sub={sub}
                      accent={activeCategory.accent}
                      index={i}
                      onClick={() => setActiveSubId(sub.id)}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── LEVEL 3: Products ── */}
            {activeSubId && activeSubCategory && activeCategory && (
              <motion.div
                key="products"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
              >
                <BackButton onClick={goBack} label={`Back to ${activeCategory.label}`} />

                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-3xl">{activeSubCategory.icon}</span>
                    <h3 className="font-display text-2xl font-bold" style={{ color: activeCategory.accent }}>
                      {activeSubCategory.label}
                    </h3>
                  </div>
                  <p className="text-soil-400 text-sm ml-12">{activeSubCategory.description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeSubCategory.products.map((product, i) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      accent={activeCategory.accent}
                      index={i}
                      onClick={() => setSelectedProduct(product)}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── LEVEL 4: Product Detail Modal ── */}
      <AnimatePresence>
        {selectedProduct && activeCategory && (
          <ProductModal
            product={selectedProduct}
            accent={activeCategory.accent}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────
// CATEGORY CARD
// ─────────────────────────────────────────────────────────────────

function CategoryCard({ category, index, onClick }: { category: Category; index: number; onClick: () => void }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const totalProducts = category.subCategories.reduce((acc, s) => acc + s.products.length, 0);

  return (
    <motion.button
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className="group text-left w-full bg-white rounded-3xl border border-leaf-100 hover:border-transparent hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden focus:outline-none focus:ring-2 focus:ring-leaf-300"
    >
      <div className="h-2" style={{ background: `linear-gradient(to right, ${category.accent}50, ${category.accent})` }} />
      <div className="p-8">
        <div className="flex items-start justify-between mb-6">
          <span className="text-5xl">{category.icon}</span>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: `${category.accent}15`, color: category.accent }}>
            {category.subCategories.length} categories
          </span>
        </div>

        <h3 className="font-display text-2xl font-bold mb-2 group-hover:translate-x-1 transition-transform" style={{ color: category.accent }}>
          {category.label}
        </h3>
        <p className="text-soil-400 text-sm leading-relaxed mb-6">{category.tagline}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {category.subCategories.map((s) => (
            <span key={s.id} className="text-xs px-2.5 py-1 rounded-full border font-medium text-soil-500" style={{ borderColor: `${category.accent}30`, background: `${category.accent}08` }}>
              {s.icon} {s.label}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-5 border-t" style={{ borderColor: `${category.accent}20` }}>
          <span className="text-xs text-soil-400">{totalProducts} products</span>
          <span className="text-sm font-semibold flex items-center gap-1.5 group-hover:gap-3 transition-all" style={{ color: category.accent }}>
            Explore
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </motion.button>
  );
}

// ─────────────────────────────────────────────────────────────────
// SUB-CATEGORY CARD
// ─────────────────────────────────────────────────────────────────

function SubCategoryCard({ sub, accent, index, onClick }: { sub: SubCategory; accent: string; index: number; onClick: () => void }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.button
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className="group text-left w-full bg-white rounded-2xl border border-leaf-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-400 overflow-hidden focus:outline-none focus:ring-2 focus:ring-leaf-300"
    >
      <div className="h-1" style={{ background: `linear-gradient(to right, ${accent}40, ${accent})` }} />
      <div className="p-6">
        <span className="text-3xl mb-3 block">{sub.icon}</span>
        <h4 className="font-display text-lg font-bold mb-1.5" style={{ color: accent }}>{sub.label}</h4>
        <p className="text-xs text-soil-400 leading-relaxed mb-5">{sub.description}</p>
        <div className="flex items-center justify-between pt-4 border-t border-leaf-50">
          <span className="text-xs text-soil-400">{sub.products.length} products</span>
          <span className="text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: accent }}>
            View Products
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </motion.button>
  );
}

// ─────────────────────────────────────────────────────────────────
// PRODUCT CARD
// ─────────────────────────────────────────────────────────────────

function ProductCard({ product, accent, index, onClick }: { product: Product; accent: string; index: number; onClick: () => void }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.button
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className="group text-left w-full bg-white rounded-2xl border border-leaf-100 hover:shadow-xl hover:border-transparent hover:-translate-y-1 transition-all duration-400 overflow-hidden focus:outline-none focus:ring-2 focus:ring-leaf-300"
    >
      <div className="h-1" style={{ background: `linear-gradient(to right, ${accent}50, ${accent})` }} />
      <div className="p-6">
        <h4 className="font-display text-lg font-bold mb-0.5" style={{ color: accent }}>{product.name}</h4>
        <p className="text-xs text-soil-400 mb-3">{product.variety}</p>
        <p className="text-sm text-soil-500 leading-relaxed mb-5 line-clamp-2">{product.shortDesc}</p>

        <div className="flex gap-4 mb-5">
          {product.germination && (
            <div>
              <p className="text-sm font-bold" style={{ color: accent }}>{product.germination}</p>
              <p className="text-[10px] text-soil-400">germination</p>
            </div>
          )}
          {product.npkRatio && (
            <div>
              <p className="text-sm font-bold" style={{ color: accent }}>{product.npkRatio}</p>
              <p className="text-[10px] text-soil-400">NPK ratio</p>
            </div>
          )}
          {(product.maturity || product.dosage) && (
            <>
              <div className="w-px bg-leaf-100" />
              <div>
                <p className="text-xs font-semibold text-soil-700">{product.maturity ?? product.dosage}</p>
                <p className="text-[10px] text-soil-400">{product.maturity ? "maturity" : "dosage"}</p>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {product.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full border font-medium" style={{ background: `${accent}10`, color: accent, borderColor: `${accent}30` }}>
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-leaf-50">
          <span className="text-xs text-soil-400">{product.packagingSizes.join(" · ")}</span>
          <span className="text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: accent }}>
            Full Info
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </motion.button>
  );
}

// ─────────────────────────────────────────────────────────────────
// PRODUCT MODAL
// ─────────────────────────────────────────────────────────────────

function ProductModal({ product, accent, onClose }: { product: Product; accent: string; onClose: () => void }) {
  const stats = [
    product.germination && { label: "Germination", value: product.germination },
    product.npkRatio && { label: "NPK / Content", value: product.npkRatio },
    product.season && { label: "Season", value: product.season },
    product.maturity && { label: "Maturity", value: product.maturity },
    product.seedRate && { label: "Seed Rate", value: product.seedRate },
    product.dosage && { label: "Dosage", value: product.dosage },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-leaf-900/40 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white w-full sm:max-w-2xl max-h-[92vh] sm:rounded-3xl rounded-t-3xl overflow-y-auto shadow-2xl"
      >
        <div className="h-2 rounded-t-3xl" style={{ background: `linear-gradient(to right, ${accent}60, ${accent})` }} />

        {/* Header */}
        <div className="px-7 pt-6 pb-5 flex items-start justify-between border-b border-leaf-50">
          <div>
            <h2 className="font-display text-2xl font-bold leading-tight" style={{ color: accent }}>{product.name}</h2>
            <p className="text-sm text-soil-400 mt-0.5">{product.variety}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-leaf-50 text-soil-400 hover:text-soil-700 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-7 py-6 space-y-7">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl p-3.5 text-center" style={{ background: `${accent}10` }}>
                <p className="text-sm font-bold leading-tight" style={{ color: accent }}>{stat.value}</p>
                <p className="text-[11px] text-soil-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div>
            <h4 className="text-xs font-semibold text-soil-400 uppercase tracking-wider mb-2">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span key={tag} className="text-xs px-3 py-1 rounded-full border font-medium" style={{ background: `${accent}10`, color: accent, borderColor: `${accent}30` }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-semibold text-soil-400 uppercase tracking-wider mb-2">About This Product</h4>
            <p className="text-soil-600 text-sm leading-relaxed">{product.fullDesc}</p>
          </div>

          {/* Key Benefits */}
          <div>
            <h4 className="text-xs font-semibold text-soil-400 uppercase tracking-wider mb-3">Key Benefits</h4>
            <ul className="space-y-2">
              {product.keyBenefits.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-soil-600">
                  <span className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-white text-[10px] font-bold" style={{ background: accent }}>✓</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Suitable For + Packaging */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <h4 className="text-xs font-semibold text-soil-400 uppercase tracking-wider mb-2">Suitable For</h4>
              <ul className="space-y-1">
                {product.suitableCrops.map((c) => (
                  <li key={c} className="text-sm text-soil-600 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: accent }} />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-soil-400 uppercase tracking-wider mb-2">Packaging Available</h4>
              <div className="flex flex-wrap gap-2">
                {product.packagingSizes.map((size) => (
                  <span key={size} className="text-xs px-3 py-1.5 rounded-xl border font-medium text-soil-600" style={{ borderColor: `${accent}40`, background: `${accent}08` }}>
                    {size}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sowing / Application Instructions */}
          {(product.sowingInstructions || product.applicationMethod) && (
            <div className="rounded-2xl p-5" style={{ background: `${accent}08` }}>
              <h4 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: accent }}>
                {product.sowingInstructions ? "🌱 Sowing Instructions" : "💧 Application Method"}
              </h4>
              <p className="text-sm text-soil-600 leading-relaxed">
                {product.sowingInstructions ?? product.applicationMethod}
              </p>
            </div>
          )}

          {/* CTA */}
          <a
            href="#contact"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-white font-semibold text-sm transition-all hover:opacity-90 hover:-translate-y-0.5 shadow-lg"
            style={{ background: `linear-gradient(135deg, ${accent}cc, ${accent})` }}
          >
            Enquire About This Product
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────
// BACK BUTTON
// ─────────────────────────────────────────────────────────────────

function BackButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-sm text-soil-500 hover:text-leaf-700 font-medium mb-8 group transition-colors"
    >
      <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      {label}
    </button>
  );
}