<?php
// Uključi WordPress
require_once('wp-load.php');

// Uključi error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Postavi header
header('Content-Type: application/json');

try {
    // Provjeri osnovne WordPress funkcije
    $rest_url = rest_url();
    $site_url = get_site_url();
    
    echo json_encode([
        'status' => 'OK',
        'rest_url' => $rest_url,
        'site_url' => $site_url,
        'wp_version' => get_bloginfo('version'),
        'is_rest_available' => function_exists('rest_url'),
        'current_path' => __FILE__,
        'wp_load_path' => ABSPATH . 'wp-load.php'
    ]);
    
} catch (Exception $e) {
    echo json_encode([
        'status' => 'ERROR',
        'message' => $e->getMessage(),
        'file' => $e->getFile(),
        'line' => $e->getLine()
    ]);
}