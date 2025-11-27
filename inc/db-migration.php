<?php
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Database migration utilities for {{slug}}
 *
 * Handles plugin database schema versioning and migrations.
 */

class LSWP_DB_Migration {

    const DB_VERSION_OPTION = '{{slug}}_db_version';
    const CURRENT_DB_VERSION = '1.0.0';

    public static function init() {
        add_action('plugins_loaded', array(__CLASS__, 'check_and_migrate'));
    }

    public static function check_and_migrate() {
        $installed_version = get_option(self::DB_VERSION_OPTION, '0.0.0');

        if (version_compare($installed_version, self::CURRENT_DB_VERSION, '<')) {
            self::run_migrations($installed_version);
        }
    }

    private static function run_migrations($from_version) {
        error_log(sprintf(
            'Running {{slug}} database migrations from %s to %s',
            $from_version,
            self::CURRENT_DB_VERSION
        ));

        $migrations = self::get_migrations();

        foreach ($migrations as $version => $callback) {
            if (version_compare($from_version, $version, '<')) {
                if (is_callable($callback)) {
                    try {
                        call_user_func($callback);
                        error_log("{{slug}} migration to $version completed");
                    } catch (Exception $e) {
                        error_log("{{slug}} migration to $version failed: " . $e->getMessage());
                        return false;
                    }
                }
            }
        }

        update_option(self::DB_VERSION_OPTION, self::CURRENT_DB_VERSION);
        return true;
    }

    private static function get_migrations() {
        return array(
            '1.0.0' => array(__CLASS__, 'migrate_to_1_0_0'),
        );
    }

    public static function migrate_to_1_0_0() {
        global $wpdb;

        $table_name = $wpdb->prefix . '{{slug}}_data';
        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE IF NOT EXISTS $table_name (
            id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
            user_id bigint(20) UNSIGNED NOT NULL,
            data_key varchar(255) NOT NULL,
            data_value longtext,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY user_id (user_id),
            KEY data_key (data_key)
        ) $charset_collate;";

        require_once ABSPATH . 'wp-admin/includes/upgrade.php';

        $result = dbDelta($sql);

        if (empty($result)) {
            throw new Exception("Failed to create table $table_name");
        }

        return true;
    }

    public static function get_db_version() {
        return get_option(self::DB_VERSION_OPTION, '0.0.0');
    }

    public static function rollback($to_version = '0.0.0') {
        if (!current_user_can('manage_options')) {
            return false;
        }

        update_option(self::DB_VERSION_OPTION, $to_version);
        error_log("{{slug}} database rolled back to $to_version");
        return true;
    }
}

// Initialize on load if WordPress functions are available
if (function_exists('add_action')) {
    LSWP_DB_Migration::init();
}
