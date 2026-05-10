const esbuild = require( 'esbuild' );
const { sassPlugin } = require( 'esbuild-sass-plugin' );

const isWatch = process.argv.includes( '--watch' );

const config = {
	entryPoints: [ 'src/admin/admin.js' ],
	bundle: true,
	minify: ! isWatch,
	sourcemap: isWatch,
	outdir: 'build',
	entryNames: 'admin/[name]',
	assetNames: 'admin/[name]',
	plugins: [ sassPlugin( { type: 'css' } ) ],
};

( async () => {
	if ( isWatch ) {
		const ctx = await esbuild.context( config );
		await ctx.rebuild();
		await ctx.watch();
		console.log( 'Watching admin build...' );
	} else {
		await esbuild.build( config );
		console.log( 'Admin build complete.' );
		process.exit( 0 ); // explicit exit so CI doesn't hang
	}
} )();
