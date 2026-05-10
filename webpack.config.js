const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

module.exports = {
	...defaultConfig,
	output: {
		...defaultConfig.output,
		clean: {
			keep: /admin\//, // don't touch anything in build/admin/
		},
	},
};
