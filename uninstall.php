<?php
if (!defined('WP_UNINSTALL_PLUGIN')) {
    exit;
}

global $wpdb;

$slug = '{{slug}}';

$wpdb->query(
    $wpdb->prepare(
        "DELETE FROM {$wpdb->options} WHERE option_name LIKE %s",
        $slug . '_%'
    )
);

$wpdb->query(
    $wpdb->prepare(
        "DELETE FROM {$wpdb->options} WHERE option_name LIKE %s OR option_name LIKE %s",
        '_transient_' . $slug . '_%',
        '_site_transient_' . $slug . '_%'
    )
);

$wpdb->query(
    $wpdb->prepare(
        "DELETE FROM {$wpdb->usermeta} WHERE meta_key LIKE %s",
        $slug . '_%'
    )
);

$wpdb->query(
    $wpdb->prepare(
        "DELETE FROM {$wpdb->postmeta} WHERE meta_key LIKE %s",
        $slug . '_%'
    )
);

$hooks = array(
    "{$slug}_cron",
    "{$slug}_daily",
    "{$slug}_hourly",
);

foreach ($hooks as $hook) {
    if (function_exists('wp_next_scheduled') && function_exists('wp_clear_scheduled_hook')) {
        while (call_user_func('wp_next_scheduled', $hook)) {
            call_user_func('wp_clear_scheduled_hook', $hook);
        }
    }
}
