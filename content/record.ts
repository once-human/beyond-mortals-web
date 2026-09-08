/**
 * Doc 2 — The Record. Approved copy, used verbatim.
 *
 * Rules that govern this text (from the brand doc):
 *  · the hook is a clerical problem, not a myth
 *  · the load-bearing line is "being very good at something is a smaller
 *    feeling than it was advertised to be" — do not dilute it
 *  · the bad-behaviour passage and the wall repair sit back to back with
 *    no transition and no moral
 *  · the shrine story stays unresolved across three versions
 *  · no CTA anywhere; the page ends and the collection begins
 */

export type Block =
  | { kind: "lead"; text: string }
  | { kind: "body"; text: string }
  | { kind: "break" }
  | { kind: "plate"; code: string; caption: string };

export const RECORD: Block[] = [
  { kind: "lead", text: "Every civilisation that kept records long enough ran into the same clerical problem." },
  { kind: "body", text: "Someone in the town was still there." },
  { kind: "body", text: "Not important. Not powerful. Just still there — three registers later, in a different name, in the same handwriting, and nobody could account for it." },
  { kind: "break" },
  { kind: "body", text: "The accounts don’t agree on what happened." },
  { kind: "body", text: "They come from places that never met and centuries that never touched, and they all describe something, and none of them describe the same thing. What they share is only the aftermath. Somewhere in the record there are people the ending stopped coming for." },
  { kind: "body", text: "Nothing about them was luminous. Whatever happened made them harder to kill and did nothing at all for their character." },
  { kind: "break" },
  { kind: "body", text: "Some places called them divine. Some called them cursed." },
  { kind: "body", text: "Most just wrote them down the way a scribe writes down a trade or a birthplace — a detail worth recording and not worth explaining." },
  { kind: "body", text: "Where the worship started, they left. There’s a shrine raised to one of them in a town whose name didn’t survive; the account ends with the shrine standing and the subject gone. A second version says he burned it himself. A third says he came once, stood near the back, and left before the end." },
  { kind: "body", text: "None of the three agree. All three end the same way." },
  { kind: "plate", code: "PLATE 04", caption: "The shrine at a town whose name did not survive · provenance disputed" },
  { kind: "body", text: "Nobody wrote down what it actually does to a person, because nobody thought to ask." },
  { kind: "body", text: "The first century is survivable. You lose people, and losing people is a thing humans already know how to do, just not that many times in a row." },
  { kind: "body", text: "Then you get good at things. Very good — the way you only get after the fourth or fifth lifetime of practice, when the difficult part has stopped being difficult and you can see the whole shape of it before you begin." },
  { kind: "lead", text: "And then you find that being very good at something is a smaller feeling than it was advertised to be." },
  { kind: "break" },
  { kind: "body", text: "So they went and found the next thing." },
  { kind: "body", text: "Not a greater thing. There was no ladder and nothing at the top of it. Just the next one — a trade they’d never need, a language nobody was still speaking, a border crossed for no particular reason, something started with no intention of finishing it." },
  { kind: "body", text: "The centuries took away almost everything. They did not take that." },
  { kind: "break" },
  { kind: "body", text: "They are not in the record as good people." },
  { kind: "body", text: "One appears in a dispute over a debt that outlived the lender, the currency, and the city that minted it. One is described leaving a place badly and in a hurry, in words the scribe declined to write down. Several are in the record only because of what they broke on the way out." },
  { kind: "body", text: "Given enough time, most of them found something they wanted, and very few of them were careful about how they got it." },
  { kind: "break" },
  { kind: "body", text: "And then, three hundred years later, the same name turns up repairing a wall." },
  { kind: "body", text: "No siege. No enemy. No city left worth defending and nobody in it to defend. Just someone setting the stones back, badly, at his own expense, long after there was anyone alive to notice." },
  { kind: "body", text: "The record offers no explanation for this." },
  { kind: "body", text: "It rarely does." },
  { kind: "break" },
  { kind: "body", text: "Kingdoms fell. Languages went quiet. Cities were buried and dug up again as ruins and studied by people with no idea whose they were." },
  { kind: "body", text: "They remained. Usually somewhere unremarkable. Usually doing whatever they had already been doing." },
  { kind: "body", text: "They had more time than anyone who ever lived. Somehow, they still wanted more." },
  { kind: "break" },
  { kind: "body", text: "Nobody agrees on how many there are." },
  { kind: "body", text: "Nobody who would know has said." },
  { kind: "body", text: "Beyond Mortals is the name the record eventually settled on." },
  { kind: "body", text: "What follows is what’s left of it." },
];
