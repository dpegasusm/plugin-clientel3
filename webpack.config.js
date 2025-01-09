/**
 * WordPress dependencies
 */
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

/**
 * Gather our blocks.
 */
module.exports = {
	...defaultConfig,
	entry: {
		'profile-block': './src/profile-block/',
	},
};
