const esbuild = require('esbuild');
const { sassPlugin } = require('esbuild-sass-plugin');

const config = {
	entryPoints: ['src/admin/admin.js'],

	bundle: true,
	minify: false,
	sourcemap: true,

	outdir: 'build',

	entryNames: 'admin/[name]',
	assetNames: 'admin/[name]',

	plugins: [
		sassPlugin({ type: 'css' }),
	],
};

(async () => {
	const ctx = await esbuild.context(config);

	// CRITICAL: force initial full build
	await ctx.rebuild();

	// then start watch
	await ctx.watch();

	console.log('Watching admin build...');
})();