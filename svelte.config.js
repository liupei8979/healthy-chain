import adapter from '@sveltejs/adapter-static';
import { dirname } from 'node:path';
import { fileURLToPath } from 'url';
import preprocess from 'svelte-preprocess';

const filePath = dirname(fileURLToPath(import.meta.url));
const sassPath = `${filePath}/src/util/styles/`;

const prepends = [
	'@import "' + sassPath + 'functions.scss";',
	'@import "' + sassPath + 'properties.scss";'
	// '@import "' + sassPath + 'animation.scss";'
].join('\n');

const config = {
	preprocess: preprocess({
		scss: {
			prependData: prepends
		}
	}),

	kit: {
		adapter: adapter({
			fallback: 'index.html',
			trailingSlash: 'always'
		}),
		alias: {
			'@src': 'src',
			'@src/': 'src/'
		}
	},

	onwarn: (warning, handler) => {
		const ignoredWarnings = [
			'a11y-no-onchange',
			'a11y-no-static-element-interactions',
			'a11y-role-has-required-aria-props',
			'vite-plugin-svelte-css-no-scopable-elements',
			'unused-export-let',
			'css-unused-selector',
			'a11y-click-events-have-key-events'
		];

		if (ignoredWarnings.includes(warning.code)) {
			return;
		}

		handler(warning);
	}
};

export default config;
