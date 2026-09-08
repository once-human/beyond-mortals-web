import type {
  Product,
  Collection,
  Stockist,
  Citation,
  MarginaliaEntry,
  Order,
  Address,
  SizeChart,
  Size,
} from "../types";

const ALL: Size[] = ["XS", "S", "M", "L", "XL", "XXL"];

const stock = (
  spec: Partial<Record<Size, number | false>> = {},
): Product["variants"] =>
  ALL.map((size) => {
    const v = spec[size];
    if (v === false) return { size, available: false, remaining: null };
    return { size, available: true, remaining: typeof v === "number" ? v : null };
  });

const plate = (code: string, caption: string) => ({ code, caption, src: null });

export const PRODUCTS: Product[] = [
  {
    code: "BM-01-A",
    handle: "plain-relaxed-tee",
    name: "Plain Relaxed Tee",
    tier: "T0",
    technique: "Mark at the nape",
    fit: "Relaxed",
    price: 3650,
    line: null,
    motif: "Plain",
    plates: [
      plate("PLATE 01", "recto · full garment"),
      plate("PLATE 02", "verso · undyed at the seam"),
    ],
    spec: [
      "240 GSM · 100% combed cotton · garment dyed",
      "Wordmark at the nape, 52mm, discharge printed",
      "Relaxed fit, set shoulder, ribbed neck",
      "Run of forty. Not restocked.",
    ],
    variants: stock(),
    annotation: null,
    collection: "drop-01",
    inCirculation: true,
  },
  {
    code: "BM-01-B",
    handle: "unnumbered-boxy-tee",
    name: "Unnumbered Boxy Tee",
    tier: "T1",
    technique: "Screen print",
    fit: "Boxy",
    price: 4450,
    line: "The record is incomplete and says so in its own numbering.",
    motif: "The Unnumbered",
    plates: [
      plate("PLATE 02", "recto · full garment"),
      plate("PLATE 03", "detail · numerals, front"),
      plate("PLATE 05", "verso"),
    ],
    spec: [
      "240 GSM · 100% combed cotton · garment dyed",
      "Screen print, front, three colours",
      "Boxy fit, dropped shoulder, ribbed neck",
      "Run of thirty-five. Not restocked.",
    ],
    variants: stock({ XXL: false }),
    annotation: "the numbering on this one skips 03, 05 and 06. it was not corrected.",
    collection: "drop-01",
    inCirculation: true,
  },
  {
    code: "BM-01-C",
    handle: "same-handwriting-relaxed-tee",
    name: "Same Handwriting Relaxed Tee",
    tier: "T1",
    technique: "Discharge print",
    fit: "Relaxed",
    price: 4850,
    line: "Three registers later, in a different name, in the same handwriting.",
    motif: "The Same Handwriting",
    plates: [
      plate("PLATE 02", "recto · full garment"),
      plate("PLATE 04", "detail · four hands, four centuries"),
      plate("PLATE 06", "verso"),
    ],
    spec: [
      "240 GSM · 100% combed cotton · garment dyed",
      "Discharge print, front and back",
      "Relaxed fit, set shoulder, ribbed neck",
      "Run of thirty. Not restocked.",
    ],
    variants: stock(),
    annotation: null,
    collection: "drop-01",
    inCirculation: true,
  },
  {
    code: "BM-01-D",
    handle: "carrion-embroidered-boxy-tee",
    name: "Carrion Embroidered Boxy Tee",
    tier: "T2",
    technique: "Machine embroidery",
    fit: "Boxy",
    price: 6250,
    line: "The bird that is still there afterwards.",
    motif: "Carrion",
    plates: [
      plate("PLATE 04", "recto · full garment"),
      plate("PLATE 05", "detail · left chest, 4,200 stitches"),
      plate("PLATE 07", "verso · undyed at the seam"),
    ],
    spec: [
      "240 GSM · 100% combed cotton · garment dyed",
      "Machine embroidery, left chest · 4,200 stitches",
      "Boxy fit, dropped shoulder, ribbed neck",
      "Run of thirty. Not restocked.",
    ],
    variants: stock({ XXL: false }),
    annotation:
      "the embroidery on the first eleven of these was set two millimetres low. they were not corrected.",
    collection: "drop-01",
    inCirculation: true,
  },
  {
    code: "BM-01-E",
    handle: "shrine-three-versions-long-sleeve",
    name: "Shrine (Three Versions) Long Sleeve Tee",
    tier: "T2",
    technique: "Appliqué",
    fit: "Long Sleeve",
    price: 6850,
    line: "None of the three agree. All three end the same way.",
    motif: "The Shrine, Three Versions",
    plates: [
      plate("PLATE 05", "recto · full garment"),
      plate("PLATE 08", "detail · three structures, contradicting"),
      plate("PLATE 09", "verso"),
    ],
    spec: [
      "260 GSM · 100% combed cotton · garment dyed",
      "Appliqué, front · three panels, raw edge",
      "Long sleeve, dropped shoulder, ribbed cuff",
      "Run of twenty-four. Not restocked.",
    ],
    variants: stock({ S: 2, M: 1, L: 1, XL: false, XXL: false }),
    annotation: "four remain of the twenty-four. there will not be more.",
    collection: "drop-01",
    inCirculation: true,
  },
  {
    code: "BM-01-F",
    handle: "the-unplaceable-oversized-hoodie",
    name: "The Unplaceable Oversized Hoodie",
    tier: "T2",
    technique: "Acid wash",
    fit: "Oversized",
    price: 9450,
    line: "A figure with no period markers.",
    motif: "The Unplaceable",
    plates: [
      plate("PLATE 09", "recto · full garment"),
      plate("PLATE 10", "detail · wash, shoulder"),
      plate("PLATE 12", "verso"),
    ],
    spec: [
      "400 GSM · 100% cotton loopback · acid washed",
      "Print at the back, discharge · wash varies per piece",
      "Oversized, dropped shoulder, twin-needle hem",
      "Run of twenty. Not restocked.",
    ],
    variants: stock({ XS: false }),
    annotation: "no two of these washed the same. the variation is the point and is not a defect.",
    collection: "drop-01",
    inCirculation: true,
  },
  {
    code: "BM-01-G",
    handle: "struck-ledger-zari-relaxed-tee",
    name: "Struck Ledger Zari Relaxed Tee",
    tier: "T3",
    technique: "Zari hand embroidery",
    fit: "Relaxed",
    price: 10500,
    line: "A debt that outlived the lender, the currency, and the city that minted it.",
    motif: "Struck Ledger",
    plates: [
      plate("PLATE 07", "recto · full garment"),
      plate("PLATE 11", "detail · zari, struck sum"),
      plate("PLATE 13", "verso"),
    ],
    spec: [
      "240 GSM · 100% combed cotton · garment dyed",
      "Zari hand embroidery, front · approx. 40 hours per piece",
      "Relaxed fit, set shoulder, ribbed neck",
      "Run of twelve. Not restocked. Final sale.",
    ],
    variants: stock({ XS: false, S: false, M: false, L: false, XL: false, XXL: false }),
    annotation: "twelve were made. the run is closed and the entry stays in the record.",
    collection: "drop-01",
    inCirculation: false,
  },
  {
    code: "BM-01-J",
    handle: "second-hand-drop-shoulder-tee",
    name: "Second Hand Drop Shoulder Tee",
    tier: "T1",
    technique: "Discharge print",
    fit: "Drop Shoulder",
    price: 4850,
    line: "A later reader correcting the record in the margin, without authority.",
    motif: "Second Hand",
    plates: [
      plate("PLATE 08", "recto · full garment"),
      plate("PLATE 14", "detail · marginalia, sleeve"),
    ],
    spec: [
      "240 GSM · 100% combed cotton · garment dyed",
      "Discharge print, front and left sleeve",
      "Drop shoulder, ribbed neck",
      "Run of thirty. Not restocked.",
    ],
    variants: stock(),
    annotation: null,
    collection: "drop-01",
    inCirculation: true,
  },
  {
    code: "BM-01-H",
    handle: "hewn",
    name: "HEWN",
    tier: "T4",
    technique: "Hand-cut, holed, hand-distressed",
    fit: "Boxy",
    price: 0,
    line: null,
    motif: "HEWN",
    plates: [],
    spec: [],
    variants: [],
    annotation:
      "this plate is kept in the catalogue because the entry exists in the record even though the object does not.",
    collection: "drop-01",
    inCirculation: false,
    unrecorded: true,
  },
];

export const COLLECTIONS: Collection[] = [
  {
    slug: "drop-01",
    code: "COLLECTION 01",
    title: "Entries in circulation",
    opens: "14 October",
    blurb:
      "Eight entries. Seven of them exist. Each carries one motif from the record, cut in a different technique — the technique is what the price is for, and it is visible on the surface of the garment.",
    productCodes: PRODUCTS.map((p) => p.code),
    closed: false,
    entryCount: 8,
  },
];

export const ARCHIVE: Collection[] = [
  {
    slug: "drop-01",
    code: "DROP 01",
    title: "Eight entries. Seven existed.",
    opens: "October 2026",
    blurb: "The first release. Four techniques, one empty plate.",
    productCodes: [],
    closed: true,
    entryCount: 8,
  },
  {
    slug: "drop-02",
    code: "DROP 02",
    title: "Overshirts and the first caps.",
    opens: "February 2027",
    blurb: "The range widens past tees for the first time.",
    productCodes: [],
    closed: true,
    entryCount: 6,
  },
  {
    slug: "drop-04",
    code: "DROP 04",
    title: "The Wall, in jacquard knit.",
    opens: "July 2027",
    blurb: "One motif, carried into knitwear.",
    productCodes: [],
    closed: true,
    entryCount: 5,
  },
  {
    slug: "drop-07",
    code: "DROP 07",
    title: "HEWN, first release. Eleven pieces.",
    opens: "November 2027",
    blurb: "Hand-cut. Eleven. No two the same.",
    productCodes: [],
    closed: true,
    entryCount: 11,
  },
];

export const STOCKISTS: Stockist[] = [
  { city: "NEW DELHI", name: "Capsul", address: "Meherchand Market, Lodhi Colony", note: "Full range" },
  { city: "BOMBAY", name: "Superkicks", address: "Bandra West, Linking Road", note: "Tees and caps only" },
  { city: "BANGALORE", name: "VegNonVeg", address: "Indiranagar, 12th Main", note: "Full range" },
  { city: "LONDON", name: null, address: "Not yet held anywhere", note: "Enquiries open" },
];

export const CITATIONS: Citation[] = [
  {
    publication: "Homegrown",
    title: "On a Pune label building a fashion house out of an invented historical record",
    date: "12 Oct 2026",
  },
  {
    publication: "Elle India",
    title: "The brands rewriting what Indian streetwear is allowed to be about",
    date: "03 Nov 2026",
  },
  {
    publication: "Hypebeast",
    title: "Beyond Mortals opens Drop 01 with seven pieces and one empty plate",
    date: "15 Oct 2026",
  },
  {
    publication: "The Established",
    title: "Why the most interesting thing about this brand is its typography",
    date: "28 Nov 2026",
  },
];

export const MARGINALIA: MarginaliaEntry[] = [
  {
    code: "MARGINALIA 01",
    who: "A ceramicist in Jaipur",
    what: "Eleven vessels, thrown to hold nothing in particular. Sold with the pieces they were photographed beside.",
    when: "March 2027",
    disputed: false,
  },
  {
    code: "MARGINALIA 02",
    who: "A bookbinder, unnamed",
    what: "A blank ledger, quarter-bound, ruled for entries that will not be made.",
    when: "June 2027",
    disputed: false,
  },
  {
    code: "MARGINALIA 04",
    who: "Withheld",
    what: "The account of this one is disputed and both versions are kept.",
    when: "—",
    disputed: true,
  },
];

export const ADDRESSES: Address[] = [
  {
    id: "addr_1",
    label: "DEFAULT",
    name: "Onkar Yaglewad",
    line1: "12 Prabhat Road",
    city: "Pune",
    state: "Maharashtra",
    pin: "411001",
    country: "India",
    phone: "+91 98XXX XXXXX",
    isDefault: true,
  },
  {
    id: "addr_2",
    label: "SECOND",
    name: "Onkar Yaglewad",
    line1: "Flat 402, Sunder Nagar",
    city: "Bengaluru",
    state: "Karnataka",
    pin: "560095",
    country: "India",
    phone: "+91 98XXX XXXXX",
    isDefault: false,
  },
];

export const ORDERS: Order[] = [
  {
    id: "BM-2026-0417",
    placed: "07 Sep 2026",
    status: "Entered",
    method: "Standard · Delhivery",
    expected: "12 – 15 September",
    address: ADDRESSES[0],
    lines: [
      { code: "BM-01-D", name: "Carrion Embroidered Boxy Tee", size: "M", technique: "T2 · WORKED · MACHINE EMBROIDERY", price: 6250, qty: 1 },
      { code: "BM-01-A", name: "Plain Relaxed Tee", size: "L", technique: "T0 · PLAIN · MARK AT NAPE", price: 3650, qty: 1 },
    ],
    total: 9900,
  },
  {
    id: "BM-2026-0361",
    placed: "22 Jul 2026",
    status: "Delivered",
    method: "Standard · Delhivery",
    expected: "delivered 28 July",
    address: ADDRESSES[0],
    lines: [
      { code: "BM-01-C", name: "Same Handwriting Relaxed Tee", size: "M", technique: "T1 · PRINTED · DISCHARGE", price: 4850, qty: 1 },
    ],
    total: 4850,
  },
  {
    id: "BM-2026-0290",
    placed: "14 May 2026",
    status: "Delivered",
    method: "Express · Blue Dart",
    expected: "delivered 17 May",
    address: ADDRESSES[1],
    lines: [
      { code: "BM-01-B", name: "Unnumbered Boxy Tee", size: "L", technique: "T1 · PRINTED · SCREEN", price: 4450, qty: 1 },
      { code: "BM-01-E", name: "Shrine (Three Versions) Long Sleeve Tee", size: "M", technique: "T2 · WORKED · APPLIQUÉ", price: 6850, qty: 1 },
      { code: "BM-01-A", name: "Plain Relaxed Tee", size: "M", technique: "T0 · PLAIN", price: 3650, qty: 1 },
    ],
    total: 16450,
  },
];

export const SIZE_CHARTS: SizeChart[] = [
  {
    fit: "BOXY",
    note: "Wide through the chest, short in the body, dropped shoulder.",
    rows: [
      { size: "XS", chest: 54, length: 68, shoulder: 52, sleeve: 21 },
      { size: "S", chest: 56, length: 70, shoulder: 54, sleeve: 22 },
      { size: "M", chest: 58, length: 72, shoulder: 56, sleeve: 23 },
      { size: "L", chest: 60, length: 74, shoulder: 58, sleeve: 24 },
      { size: "XL", chest: 62, length: 76, shoulder: 60, sleeve: 25 },
      { size: "XXL", chest: 64, length: 78, shoulder: 62, sleeve: 26 },
    ],
  },
  {
    fit: "RELAXED",
    note: "Straighter through the body, set shoulder, longer sleeve.",
    rows: [
      { size: "XS", chest: 52, length: 70, shoulder: 48, sleeve: 22 },
      { size: "S", chest: 54, length: 72, shoulder: 50, sleeve: 23 },
      { size: "M", chest: 56, length: 74, shoulder: 52, sleeve: 24 },
      { size: "L", chest: 58, length: 76, shoulder: 54, sleeve: 25 },
      { size: "XL", chest: 60, length: 78, shoulder: 56, sleeve: 26 },
      { size: "XXL", chest: 62, length: 80, shoulder: 58, sleeve: 27 },
    ],
  },
];
