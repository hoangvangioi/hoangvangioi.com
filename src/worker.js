const { Document } = require('flexsearch');

async function createSearchAPI(options) {
	const { indexes } = options;

	const index = new Document({
		cache: 100,
		tokenize: 'forward',
		optimize: true,
		context: {
			depth: 2,
			bidirectional: true,
			resolution: 9,
		},
		document: {
			id: 'id',
			store: ['id', 'url', 'content', 'page_id', 'type'],
			index: ['content'],
		},
	});

	indexes.forEach((page) => {
		const data = page.structuredData;
		let id = 0;

		index.add({
			id: page.id,
			page_id: page.id,
			type: 'page',
			content: page.title,
			url: page.url,
		});

		data.headings.forEach((heading) => {
			index.add({
				id: `${page.id}${id++}`,
				page_id: page.id,
				type: 'heading',
				url: `${page.url}#${heading.id}`,
				content: heading.content,
			});
		});

		data.contents.forEach((content) => {
			index.add({
				id: `${page.id}${id++}`,
				page_id: page.id,
				type: 'text',
				url: content.heading ? `${page.url}#${content.heading}` : page.url,
				content: content.content,
			});
		});
	});

	return {
		get: async function (request) {
			const queryParams = new URL(request.url).searchParams;
			const query = queryParams.get('query');
			const paramTag = queryParams.get('tag');

			if (!query) return new Response(JSON.stringify([]), { status: 200, headers: { 'Content-Type': 'application/json' } });

			const results = index.search(query, 5, {
				enrich: true,
				tag: paramTag || undefined,
				limit: 6,
			});

			const map = new Map();
			const sortedResult = [];

			for (const item of results[0]?.result || []) {
				if (item.doc.type === 'page') {
					if (!map.has(item.doc.page_id)) {
						map.set(item.doc.page_id, []);
					}
					continue;
				}

				const i = {
					id: item.doc.id,
					content: item.doc.content,
					type: item.doc.type,
					url: item.doc.url,
				};

				const pageItems = map.get(item.doc.page_id) || [];
				pageItems.push(i);
				map.set(item.doc.page_id, pageItems);
			}

			for (const [id, items] of map.entries()) {
				const page = index.get(id);
				if (!page) continue;

				sortedResult.push({
					id: page.id,
					content: page.content,
					type: 'page',
					url: page.url,
				});
				sortedResult.push(...items);
			}

			return new Response(JSON.stringify(sortedResult), { status: 200, headers: { 'Content-Type': 'application/json' } });
		},
	};
}

export default {
	async fetch(request, env, ctx) {
		const url = env.API_URL;
		const init = {
			headers: {
				'content-type': 'application/json;charset=UTF-8',
			},
		};

		try {
			const response = await fetch(url, init);
			const indexes = await response.json();
			const searchAPI = await createSearchAPI(indexes);
            const searchResponse = await searchAPI.get(request);

			const res = new Response(searchResponse.body, searchResponse);
            res.headers.append("Referrer-Policy", "strict-origin-when-cross-origin");
            res.headers.append("X-Frame-Options", "DENY");
            res.headers.append("X-Content-Type-Options", "nosniff");
            res.headers.append("X-DNS-Prefetch-Control", "on");
            res.headers.append("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
            res.headers.set("Access-Control-Allow-Methods", "GET");
            res.headers.set("Access-Control-Allow-Origin", env.CROSS_ORIGIN_URL);
            res.headers.set("Vary", "Origin");
            res.headers.set("Access-Control-Max-Age", "86400");
            return res;
		} catch (error) {
			return new Response(JSON.stringify({ error: 'Failed to fetch indexes' }), {
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			});
		}
	},
};
