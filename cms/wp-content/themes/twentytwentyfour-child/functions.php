<?php
// Učitavanje stilova parent teme
function twentytwentyfour_child_enqueue_styles() {
    wp_enqueue_style('twentytwentyfour-style', get_template_directory_uri() . '/style.css');
    wp_enqueue_style('twentytwentyfour-child-style', get_stylesheet_directory_uri() . '/style.css', array('twentytwentyfour-style'));
}
add_action('wp_enqueue_scripts', 'twentytwentyfour_child_enqueue_styles');

// Uklanjanje admin trake na frontendu
add_action('after_setup_theme', 'remove_admin_bar');
function remove_admin_bar() {
    if (!is_admin()) {
        show_admin_bar(false);
    }
} 