<?php
/*
Plugin Name: The inflatable Penguin Galleria
Plugin URI: http://URI_Of_Page_Describing_Plugin_and_Updates
Description: Simple implementation of io-gallaria.
Version: 0.5.0
Author: Jeppe Fastrup
Author URI: http://theinflatablepenguin.com
License: Properitary
*/
?><?php
  function tip_scripts(){
    wp_deregister_script( 'jquery' );
    wp_register_script( 'jquery', 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js');
    wp_enqueue_script( 'jquery' );
    wp_enqueue_style("tip_galleria_style",WP_PLUGIN_URL . "/tip-galleria/tip.galleria.css");
    wp_enqueue_style("galleria_theme_style",WP_PLUGIN_URL . "/tip-galleria/galleria/themes/classic/galleria.classic.css");
    wp_enqueue_script("galleria_theme_script",WP_PLUGIN_URL . "/tip-galleria/galleria/themes/classic/galleria.classic.min.js");
    wp_enqueue_script("galleria-io",WP_PLUGIN_URL . "/tip-galleria/galleria/galleria-1.2.8.min.js");
    wp_enqueue_script("tip-galleria-wrapper", WP_PLUGIN_URL . "/tip-galleria/tip.galleria.js");
  }
?><?php
  function tip_content($content)
  {
    echo '<!-- DEBUG STAMP tip_content() -->';

    return $content;
  }
?><?php
  function tip_init()
  {
?>
<div id="galleria"></div>
<div id="closeit"><img src="<?php echo (WP_PLUGIN_URL . "/tip-galleria/images/closegal.png"); ?>"/></div>
<?php
        $attachments = get_children( array('post_parent' => get_the_ID(), 'post_type' => 'attachment', 'post_mime_type' =>'image'));
        class ImageInfo{
                  public $image = "";
                  public $thumb  = "";
                }
        $all_images = array();
        foreach ( $attachments as $attachment_id => $attachment ) {
        $json_image = new ImageInfo();
        $image = wp_get_attachment_image($attachment_id, 'medium');
        $dom = simplexml_load_string($image);
        $image_url = $dom->attributes()->src;
        $image_url = str_ireplace("http://grammofik.dk/", '', $image_url);
        //$image_url = htmlspecialchars($image_url);
        //assign thumbnail before regex removes thump suffix
        $json_image->thumb  = $image_url;
        //fjerner thumpnail trailing size this will prob break later!!!
        $image_url = preg_replace("#(^.*)(\W[0-9]+\w[0-9]+)(.*)$#", "$1$3", $image_url);
        echo $image_url;
        echo "<br>";
        //add real path ass img path
        $json_image->image = $image_url;
        // Returns: {"firstname":"foo","lastname":"bar"}
        array_push($all_images, $json_image);
        }
    //debug info
    //print_r($all_images);
//the next script data thing transfers the jason data to javascript
?>
<script>
var data = <?php echo json_encode($all_images);?>;
</script>
<?php
}
?><?php
/*add_filter( 'gallery_style', 'tip_gallery_style', 99 );*/
add_filter('the_content', 'tip_content', 99);
add_action('wp_footer', 'tip_init',99);
add_action('wp_enqueue_scripts', 'tip_scripts',100);
?>