<?php
/*
Plugin Name: The inflatable Penguin Galleria
Plugin URI: http://URI_Of_Page_Describing_Plugin_and_Updates
Description: Simple implementation of io-gallaria.
Version: 0.7.0
Author: Jeppe Fastrup
Author URI: http://theinflatablepenguin.com
License: Dont care
*/
?><?php
  function tip_scripts(){
    wp_deregister_script( 'jquery' );
    wp_register_script( 'jquery', 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js');
    wp_enqueue_script( 'jquery' );
    wp_enqueue_script("galleria-io",WP_PLUGIN_URL . "/tip-galleria/galleria/galleria-1.2.8.min.js");
    wp_enqueue_style("galleria_theme_style",WP_PLUGIN_URL . "/tip-galleria/galleria/themes/classic/galleria.classic.css");
    wp_enqueue_script("tip-galleria-wrapper", WP_PLUGIN_URL . "/tip-galleria/tip.galleria.js");
    wp_enqueue_style("tip_galleria_style",WP_PLUGIN_URL . "/tip-galleria/tip.galleria.css");
  }
?>
<?php
function tip_init()
{
?>
<div id="galleria"></div>
<div id="closeit"><img id="closeit-img" alt="Exit Gallery Button" src="<?php echo (WP_PLUGIN_URL . "/tip-galleria/images/closegal2.png"); ?>"/></div>
<?php
}
?><?php
add_action('wp_footer', 'tip_init',500);
add_action('wp_enqueue_scripts', 'tip_scripts',100);
?>
