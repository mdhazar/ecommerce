import about1 from "@/assets/about1.png";
import coupleWithScarf from "@/assets/coupleWithScarf.png";
import cover2 from "@/assets/cover2.png";
import roomImage from "@/assets/roomImage.png";
import roomImage1 from "@/assets/roomImage1.png";
import women from "@/assets/women.png";

export interface BlogPost {
	slug: string;
	title: string;
	excerpt: string;
	category: string;
	/** ISO date string, e.g. "2026-05-18". */
	date: string;
	readingTime: string;
	author: string;
	cover: string;
	/** Body paragraphs, rendered as a prose column. */
	body: string[];
}

export const blogPosts: BlogPost[] = [
	{
		slug: "why-we-make-in-small-batches",
		title: "Why we make in small batches",
		excerpt:
			"Slow fashion isn't a marketing line for us — it's the only way we know how to make things we'd want to keep. Here's what a small batch really costs, and why it's worth it.",
		category: "Slow Fashion",
		date: "2026-06-12",
		readingTime: "6 min read",
		author: "Marta Nilsson",
		cover: cover2,
		body: [
			"When we started North & Grove, we made a quiet decision that shaped everything after it: we would never produce more than we could stand behind. No warehouses stacked to the ceiling with unsold stock, no end-of-season landfill runs, no pressure to invent a new trend every eight weeks. Just small, considered runs of pieces we genuinely wanted to live with.",
			"A small batch usually means forty to two hundred units of a single style. It's an awkward number — too many to sew at a kitchen table, too few to interest the enormous factories that quote us prices per ten thousand. So we work with a handful of family-run workshops who still take that kind of order seriously, and who let us stand on the cutting floor and ask questions.",
			"The honest truth is that this costs more. Fabric bought in modest quantities carries a premium. Skilled hands cost what skilled hands should cost. And when a run sells out, it stays sold out until we can responsibly make more. We've made peace with that. A waitlist is a far kinder thing than a markdown bin.",
			"What we get in return is control over the details that never show up in a photograph: the weight of a seam, the drape of a hem after its third wash, the way a collar sits once it has learned the shape of a shoulder. These are the things that decide whether a garment becomes a favourite or a regret.",
			"Buying this way asks a little patience of you too. We think that's a fair trade for a wardrobe that grows slowly, means something, and lasts. Less, but better — it turns out to be a surprisingly generous way to live.",
		],
	},
	{
		slug: "caring-for-natural-fibres",
		title: "Caring for natural fibres",
		excerpt:
			"Linen, wool, and cotton reward a gentler hand. A field guide to washing, drying, and storing the fabrics we love — so they soften with age instead of wearing out.",
		category: "Care Guide",
		date: "2026-05-28",
		readingTime: "7 min read",
		author: "Priya Raman",
		cover: about1,
		body: [
			"Natural fibres are living materials. They breathe, they relax, they hold onto the memory of how you move. Treat them well and they don't just survive the years — they get better, trading their crispness for a lived-in softness that no factory finish can fake.",
			"Start with the wash. Cooler water is almost always kinder: thirty degrees is plenty for everyday wear, and it spares both the fibre and the dye. Turn pieces inside out, use a mild detergent without optical brighteners, and resist the urge to overload the drum. Fabric needs room to move to come out clean.",
			"Linen loves water and forgives almost everything except a hot dryer. Wash it, shake it out, and let it dry on a line or flat. It will crease — that's the point of linen, and part of its quiet charm. If a smoother look suits the day, press it while it's still faintly damp.",
			"Wool asks for a slower ritual. Hand-wash or use a wool cycle, never wring it, and dry it flat away from direct heat so it holds its shape. Between wears, air it out rather than washing it; wool is naturally self-cleaning and rarely needs more than a night by an open window.",
			"Storage is the step most people skip. Fold knits rather than hanging them so they don't stretch at the shoulder, keep everything dry and out of harsh light, and tuck a cedar block nearby to keep moths uninterested. A little attention now is what lets a good piece stay with you for a decade or more.",
		],
	},
	{
		slug: "styling-linen-through-the-seasons",
		title: "Styling linen through the seasons",
		excerpt:
			"Most people file linen under high summer and forget it by September. We think that's a waste of the most versatile fibre in the drawer. How to wear it all year round.",
		category: "Styling",
		date: "2026-05-14",
		readingTime: "5 min read",
		author: "Elise Moreau",
		cover: coupleWithScarf,
		body: [
			"Linen has an image problem. Say the word and most people picture a crumpled shirt on a beach holiday, worn once a year and then abandoned to the back of a shelf. It deserves better. Layered thoughtfully, linen carries beautifully through every season the calendar can offer.",
			"In the warm months it does the obvious thing effortlessly: loose trousers, an open-collar shirt, a dress that moves with the breeze. The trick is fit. Linen looks its best with a little ease, so let it skim rather than cling and roll the sleeves to keep the line relaxed.",
			"Autumn is where linen quietly proves its worth. A linen shirt under a wool overshirt, or a long linen dress over a fine knit, gives you texture and warmth without bulk. The slight roughness of the weave plays wonderfully against smoother fabrics — think of it as the grain in the wood.",
			"Even in the cold, linen earns its place as a base layer. Its hollow fibres trap warmth while still letting skin breathe, which is exactly what you want under heavier tailoring on a grey afternoon. Keep the palette warm and muted and the whole look stays calm.",
			"The through-line across all of it is restraint. Two or three considered layers in tones that sit close together will always read more elegant than a dozen competing pieces. Let the fabric do the talking.",
		],
	},
	{
		slug: "inside-the-north-and-grove-workshop",
		title: "Inside the North & Grove workshop",
		excerpt:
			"A morning with the makers who cut, sew, and finish every piece we sell. On the value of unhurried work, and why we still trust the human hand over the machine.",
		category: "Behind the Scenes",
		date: "2026-04-30",
		readingTime: "8 min read",
		author: "Marta Nilsson",
		cover: roomImage,
		body: [
			"The workshop wakes up slowly. By eight there's coffee on the bench and the low hum of the first machines warming up, and the cutting table is already covered in paper patterns held down with whatever's heavy and to hand. Nothing about the room feels rushed, and that's deliberate.",
			"We share the space with a team of six makers, several of whom have been sewing for longer than the company has existed. They cut, stitch, press, and finish every order by hand, and they'll tell you plainly when a design won't hold up in the wash or when a seam is asking too much of the fabric. That feedback loop is the whole point of staying small.",
			"There's a temptation, once a piece sells well, to send the pattern off to be made somewhere faster and cheaper. We've resisted it. Something is lost when the person cutting the cloth has never met the person who drew the line. Details get flattened. Judgement calls get made by a spreadsheet instead of an eye.",
			"Machines do plenty of the work here — we're not romantics about blistered fingers — but the decisions stay human. When to ease a sleeve, how hard to press a collar, whether a bolt of linen is worth keeping or better set aside: these are calls that only experience can make well, and they're the difference you feel when you finally put the garment on.",
			"By late afternoon the finished pieces hang in a neat row by the window, tagged and ready to be folded into their boxes. Each one has passed through several pairs of hands and been looked over more times than we'd care to count. It's a slow way to make clothes. We wouldn't do it any other way.",
		],
	},
	{
		slug: "a-seasonal-home-edit",
		title: "A seasonal home edit",
		excerpt:
			"Changing the feel of a room needn't mean buying more of everything. A gentle guide to editing, layering, and resetting your space as the light shifts.",
		category: "Home",
		date: "2026-04-16",
		readingTime: "6 min read",
		author: "Elise Moreau",
		cover: roomImage1,
		body: [
			"There's a particular kind of restlessness that arrives with a change of season — the urge to move the furniture, swap the throws, and make the whole room feel new. It's a good instinct, but it rarely needs a shopping trip to satisfy. Most of what a space needs is already in it, waiting to be rearranged.",
			"Begin by taking things away rather than adding them. Clear the surfaces you've stopped noticing, edit the shelf that's quietly become a dumping ground, and let a little emptiness back into the room. Space is a material in its own right, and most homes are short of it.",
			"Then think in layers of texture rather than colour. A linen throw over a wool chair, a stoneware jug beside a paper lampshade — warmth in a room comes from the interplay of surfaces far more than from any single bold object. Keep the palette narrow and let the differences be tactile.",
			"Light does more than anything to signal the season. As the days shorten, trade a single overhead bulb for a couple of low, warm lamps and watch the whole room soften. In brighter months, pull everything back toward the windows and let daylight take over.",
			"Finish with one small living thing — a branch cut from the garden, a bowl of fruit, a single stem in a jar. It's the least permanent element in the room and, more often than not, the one that makes it feel alive.",
		],
	},
	{
		slug: "the-case-for-buying-less",
		title: "The case for buying less",
		excerpt:
			"We sell things for a living, and we'd still rather you bought fewer of them. An honest argument for a smaller, better wardrobe — and how to build one on purpose.",
		category: "Slow Fashion",
		date: "2026-03-29",
		readingTime: "5 min read",
		author: "Priya Raman",
		cover: women,
		body: [
			"It's an odd thing for a shop to say, but here it is: we'd like you to buy less. Not less from us specifically — less in general. A wardrobe crammed with things you reach for twice a year isn't abundance, it's a low hum of guilt hanging in the closet, and no one needs more of that.",
			"The maths of a smaller wardrobe is quietly persuasive. A well-made coat worn two hundred times costs pennies a wear; five cheap ones bought and discarded over the same period cost far more and give far less. Quality isn't the expensive option in the long run — it's usually the frugal one.",
			"Building a considered wardrobe starts with paying attention to what you actually wear. For a month, notice the pieces you return to without thinking. They'll tell you your real palette, your real silhouette, and the small handful of things that genuinely earn their place. Everything else is noise.",
			"From there, buy slowly and buy on purpose. Replace, don't accumulate. When something wears out, look for the best version of it you can justify rather than three passable ones. A gap in the wardrobe is a good problem — it means you have room for the right thing when it appears.",
			"The reward isn't just a tidier closet. It's the small daily ease of getting dressed among things you love, all of which go together, none of which you're keeping out of obligation. That's the whole promise of buying less: not deprivation, but relief.",
		],
	},
];

/** Look up a single article by its slug. */
export function getBlogPost(slug: string): BlogPost | undefined {
	return blogPosts.find((post) => post.slug === slug);
}

/** Two other articles to surface as "keep reading" suggestions. */
export function getRelatedPosts(slug: string, count = 2): BlogPost[] {
	return blogPosts.filter((post) => post.slug !== slug).slice(0, count);
}

/** Format an ISO date into a warm, readable label. */
export function formatBlogDate(iso: string): string {
	return new Date(iso).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}
