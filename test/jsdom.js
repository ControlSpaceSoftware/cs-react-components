import { JSDOM } from 'jsdom'
export default function (markup = `<!DOCTYPE html><body></body>`) {
	if (typeof document === 'undefined') {
		const dom = new JSDOM(markup);
		global.window = dom.window;
		global.document = dom.window.document;
		global.navigator = {
			userAgent: 'node.js'
		};
	}
}
