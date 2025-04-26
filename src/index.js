export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);
		const { CARDS } = env;

		if (request.method === "GET" && url.pathname === "/cards") {
			const list = await CARDS.list();
			const cards = {};
			for (const key of list.keys) {
				const value = await CARDS.get(key.name, { type: "json" });
				cards[key.name] = value;
			}
			return Response.json(cards);
		}

		if (request.method === "POST" && url.pathname === "/card") {
			const data = await request.json();
			if (!data.id) {
				return new Response("Missing card id", { status: 400 });
			}
			await CARDS.put(data.id, JSON.stringify(data));
			return new Response("Card saved", { status: 200 });
		}

		if (request.method === "DELETE" && url.pathname.startsWith("/card/")) {
			const id = url.pathname.split("/card/")[1];
			await CARDS.delete(id);
			return new Response("Card deleted", { status: 200 });
		}

		return new Response("Not Found", { status: 404 });
	},
};
