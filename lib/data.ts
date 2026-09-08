export interface Product {
  code: string;
  src: string;
  name: string;
  price: string;
  meta: string;
  plate: string;
  sizes: string[];
}

export interface RecordNote {
  ref: string;
  tone?: "neutral" | "marker";
  text: string;
}

// PLACEHOLDER PHOTOGRAPHY ONLY — greyscale stand-ins from picsum.photos so the components can
// be judged. No brand photography was supplied; replace every src before this goes anywhere.
export const campaign = "https://picsum.photos/seed/bm-campaign/2100/900";
export const detail = "https://picsum.photos/seed/bm-detail/900/900";
export const hem = "https://picsum.photos/seed/bm-hem/900/900";
export const notice = "https://picsum.photos/seed/bm-notice/900/1200";

export const products: Product[] = [
  { code: "BM-01-A", src: "https://picsum.photos/seed/bm-a7/900/1200", name: "Repair Tee", price: "₹1,800", meta: "240gsm cotton · printed to order", plate: "PLATE 01", sizes: ["S", "M", "L", "XL"] },
  { code: "BM-01-B", src: "https://picsum.photos/seed/bm-b3/900/1200", name: "Register Longsleeve", price: "₹2,000", meta: "260gsm cotton · printed to order", plate: "PLATE 02", sizes: ["S", "M", "L", "XL"] },
  { code: "BM-01-C", src: "https://picsum.photos/seed/bm-c9/900/1200", name: "Three Versions Tee", price: "₹1,800", meta: "240gsm cotton · printed to order", plate: "PLATE 03", sizes: ["S", "M", "L", "XL"] },
  { code: "BM-01-D", src: "https://picsum.photos/seed/bm-d2/900/1200", name: "Still There Tee", price: "₹1,800", meta: "240gsm cotton · printed to order", plate: "PLATE 04", sizes: ["S", "M", "L", "XL"] },
  { code: "BM-01-E", src: "https://picsum.photos/seed/bm-e5/900/1200", name: "Aftermath Longsleeve", price: "₹2,000", meta: "260gsm cotton · printed to order", plate: "PLATE 05", sizes: ["S", "M", "L", "XL"] },
  { code: "BM-01-F", src: "https://picsum.photos/seed/bm-f8/900/1200", name: "Continuation Tee", price: "₹1,800", meta: "240gsm cotton · printed to order", plate: "PLATE 06", sizes: ["S", "M", "L", "XL"] },
];

export function productSlug(code: string): string {
  return code.toLowerCase();
}

export function productByCode(code: string): Product | undefined {
  return products.find((p) => productSlug(p.code) === code.toLowerCase());
}

export const record: string[][] = [
  ["Every civilisation that kept records long enough ran into the same clerical problem.", "Someone in the town was still there.", "Not important. Not powerful. Just still there — three registers later, in a different name, in the same handwriting, and nobody could account for it."],
  ["The accounts don’t agree on what happened.", "They come from places that never met and centuries that never touched, and they all describe something, and none of them describe the same thing. What they share is only the aftermath. Somewhere in the record there are people the ending stopped coming for.", "Nothing about them was luminous. Whatever happened made them harder to kill and did nothing at all for their character."],
  ["Some places called them divine. Some called them cursed.", "Most just wrote them down the way a scribe writes down a trade or a birthplace — a detail worth recording and not worth explaining.", "Where the worship started, they left. There’s a shrine raised to one of them in a town whose name didn’t survive; the account ends with the shrine standing and the subject gone. A second version says he burned it himself. A third says he came once, stood near the back, and left before the end.", "None of the three agree. All three end the same way."],
  ["Nobody wrote down what it actually does to a person, because nobody thought to ask.", "The first century is survivable. You lose people, and losing people is a thing humans already know how to do, just not that many times in a row.", "Then you get good at things. Very good — the way you only get after the fourth or fifth lifetime of practice, when the difficult part has stopped being difficult and you can see the whole shape of it before you begin.", "And then you find that being very good at something is a smaller feeling than it was advertised to be."],
  ["So they went and found the next thing.", "Not a greater thing. There was no ladder and nothing at the top of it. Just the next one — a trade they’d never need, a language nobody was still speaking, a border crossed for no particular reason, something started with no intention of finishing it.", "The centuries took away almost everything. They did not take that."],
  ["They are not in the record as good people.", "One appears in a dispute over a debt that outlived the lender, the currency, and the city that minted it. One is described leaving a place badly and in a hurry, in words the scribe declined to write down. Several are in the record only because of what they broke on the way out.", "Given enough time, most of them found something they wanted, and very few of them were careful about how they got it."],
  ["And then, three hundred years later, the same name turns up repairing a wall.", "No siege. No enemy. No city left worth defending and nobody in it to defend. Just someone setting the stones back, badly, at his own expense, long after there was anyone alive to notice.", "The record offers no explanation for this.", "It rarely does."],
  ["Kingdoms fell. Languages went quiet. Cities were buried and dug up again as ruins and studied by people with no idea whose they were.", "They remained. Usually somewhere unremarkable. Usually doing whatever they had already been doing.", "They had more time than anyone who ever lived. Somehow, they still wanted more."],
  ["Nobody agrees on how many there are.", "Nobody who would know has said.", "Beyond Mortals is the name the record eventually settled on.", "What follows is what’s left of it."],
];

export const marks = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];

export const notes: Record<number, RecordNote> = {
  2: { ref: "ACCOUNT 2 OF 3 / FRAGMENT, UNDATED", tone: "marker", text: "Three versions of the shrine survive. None of them agree. The contradiction is not resolved here." },
  5: { ref: "LEDGER, CITY UNNAMED", tone: "neutral", text: "The debt outlived the currency it was written in. The claim was still filed." },
  6: { ref: "MASONRY, LATE", tone: "neutral", text: "The wall stands in two accounts and is absent from a third." },
};
