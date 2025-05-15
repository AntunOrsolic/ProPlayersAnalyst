<?php
if (function_exists('apache_get_modules')) {
    $modules = apache_get_modules();
    $mod_rewrite = in_array('mod_rewrite', $modules);
} else {
    $mod_rewrite = getenv('HTTP_MOD_REWRITE')=='On' ? true : false ;
}
echo json_encode([
    'mod_rewrite' => $mod_rewrite ? 'Aktivan' : 'Nije aktivan',
    'server_software' => $_SERVER['SERVER_SOFTWARE']
]);