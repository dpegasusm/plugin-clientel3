<?php
/**
 * Clientel3 Plugin
 * Registers blocks for the Clientel3 Plugin.
 *
 * @package WordPress
 * @subpackage Clientel3
 * @since 1.0.0
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register Clientel3 blocks.
 */
class Clientel3_Blocks {

	/**
	 * Init callback for register.
	 *
	 * @access public
	 * @return void
	 */
	public function init() {
		// Register the CPT.
		add_action( 'init', array( $this, ' clientel3_blocks_init' ) );

		// Enqueue the block editor to handle these.
		add_action( 'enqueue_block_editor_assets', array( $this, ' clientel3_site_enqueue_block_assets' ) );
		add_action( 'enqueue_block_assets', array( $this, ' clientel3_site_enqueue_block_assets' ) );
	}

	/**
	 * Registers the block using the metadata loaded from the `block.json` file.
	 * Behind the scenes, it registers also all assets so they can be enqueued
	 * through the block editor in the corresponding context.
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 *
	 * @return void
	 */
	public function clientel3_blocks_init() {
		register_block_type( CLIENTEL3_PLUGIN_PATH . '/build/profile-block/block.json' );
	}

	/**
	 * Add the block editor options to this.
	 *
	 * @return void Enqueue the script.
	 */
	public function clientel3_site_enqueue_block_editor_assets() {
		wp_enqueue_script(
			'clientel3-custom-author-profile',
			CLIENTEL3_PLUGIN . 'build/profile-block.js',
			array( 'wp-plugins', 'wp-edit-post', 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-editor' ),
			'2.0',
			false
		);

		wp_enqueue_style(
			'clientel3-custom-author-profile-editor-style',
			CLIENTEL3_PLUGIN . 'src/profile-block/editor.css',
			array(),
			'2.0',
			false
		);

		wp_enqueue_style(
			'clientel3-custom-author-profile-style',
			CLIENTEL3_PLUGIN . 'src/profile-block/style.css',
			array(),
			'2.0',
			false
		);
	}
}
