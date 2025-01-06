<?php
/**
 * Clientel3 Plugin
 *
 * @package WordPress
 * @subpackage Clientel3
 * @since 1.0.0
 */

/**
 * Plugin Name: Clientel3 Site Extensions
 * Plugin URI: http://www.clubsitesolutions.com/
 * Description: Contains shortcodes, custom post types and other plugin territory features for the Clientel3 Site.
 * Version: 0.0.5
 * Author: David Marshall
 * Author URI: http://www.clubsitesolutions.com/
 * License: Copyright
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// register ativation and deactivation hooks.
register_activation_hook( __FILE__, ' clientel3_site_plugin_activate' );
register_deactivation_hook( __FILE__, ' clientel3_site_plugin_deactivate' );

// Set us a definittion so that we can load pdp from anywherer.
define( 'CLIENTEL3_PLUGIN', plugin_dir_url( __FILE__ ) );
define( 'CLIENTEL3_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );

/*
 * Load the generator
 *
 * @since Clientel3 1.0
 **/
require_once plugin_dir_path( __FILE__ ) . 'classes/class-clientel3.php';
$class_clientel3 = new Clientel3();
$class_clientel3->init();

/*
 * Load the parts we need from their files.
 *
 * @since Clientel3 1.0
 **/
// include the blocks for the block editor.
require_once plugin_dir_path( __FILE__ ) . 'classes/class-clientel3-blocks.php';
$class_clientel3_blocks = new Clientel3_Blocks();
$class_clientel3_blocks->init();

/**
 * Run on activate to setup the plugin
 *
 * @since Clientel3 1.0
 */
function clientel3_site_plugin_activate() {
	// flush the rewrite rules in the plugin so that our old rules are removed.
	flush_rewrite_rules();
}

/**
 * Run on activate to setup the plugin
 *
 * @since Clientel3 1.0
 */
function clientel3_site_plugin_deactivate() {
	// flush the rewrite rules in the plugin so that our old rules are removed.
	flush_rewrite_rules();
}
