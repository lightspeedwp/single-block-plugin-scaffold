<?php
/**
 * Deprecation Utilities
 *
 * Provides a standardized workflow for deprecating functions, hooks, and features
 * in a way that gives developers clear migration paths and sufficient warning.
 *
 * @package {{namespace}}
 * @since   {{version}}
 */

// Prevent direct access.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Log a deprecation notice.
 *
 * Provides a consistent way to announce deprecated functions, methods,
 * hooks, or features with clear migration instructions.
 *
 * @since {{version}}
 *
 * @param string $function_name The function, method, hook, or feature being deprecated.
 * @param string $version       The version when deprecation was introduced.
 * @param string $replacement   Optional. The replacement function/method/hook to use.
 * @param string $message       Optional. Additional context or migration instructions.
 */
function lswp_deprecated( $function_name, $version, $replacement = '', $message = '' ) {
	// Only show deprecation notices in development environments.
	if ( ! defined( 'WP_DEBUG' ) || ! WP_DEBUG ) {
		return;
	}

	// Build the deprecation message.
	$notice = sprintf(
		/* translators: 1: Deprecated function name, 2: Version number */
		__( '%1$s is deprecated since version %2$s.', '{{textdomain}}' ),
		$function_name,
		$version
	);

	if ( $replacement ) {
		$notice .= ' ' . sprintf(
			/* translators: %s: Replacement function name */
			__( 'Use %s instead.', '{{textdomain}}' ),
			$replacement
		);
	}

	if ( $message ) {
		$notice .= ' ' . $message;
	}

	// Use WordPress deprecated function if available.
	if ( function_exists( '_deprecated_function' ) ) {
		call_user_func( '_deprecated_function', $function_name, $version, $replacement );
	} else {
		// Fallback: trigger error directly.
		// phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_trigger_error
		trigger_error( esc_html( $notice ), E_USER_DEPRECATED );
	}

	// Log to error log for easier debugging.
	if ( defined( 'WP_DEBUG_LOG' ) && WP_DEBUG_LOG ) {
		// phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log
		error_log( '[{{namespace}} Deprecation] ' . $notice );
	}

	/**
	 * Fires when a deprecation notice is triggered.
	 *
	 * Allows plugins/themes to hook into deprecation notices for
	 * monitoring, logging, or alerting purposes.
	 *
	 * @since {{version}}
	 *
	 * @param string $function_name The deprecated function/method/hook name.
	 * @param string $version       The version when deprecation was introduced.
	 * @param string $replacement   The replacement function/method/hook name.
	 * @param string $message       Additional context or instructions.
	 */
	if ( function_exists( 'do_action' ) ) {
		call_user_func( 'do_action', 'lswp_deprecated_notice', $function_name, $version, $replacement, $message );
	}
}

/**
 * Mark a hook as deprecated.
 *
 * Triggers a deprecation notice when a deprecated hook is used
 * and provides migration guidance.
 *
 * @since {{version}}
 *
 * @param string $hook        The deprecated hook name.
 * @param string $version     The version when deprecation was introduced.
 * @param string $replacement Optional. The replacement hook name.
 * @param string $message     Optional. Additional migration instructions.
 */
function lswp_deprecated_hook( $hook, $version, $replacement = '', $message = '' ) {
	// Use WordPress deprecated hook function if available.
	if ( function_exists( '_deprecated_hook' ) ) {
		call_user_func( '_deprecated_hook', $hook, $version, $replacement, $message );
	} else {
		lswp_deprecated( "Hook '{$hook}'", $version, $replacement ? "'{$replacement}'" : '', $message );
	}
}

/**
 * Mark an argument as deprecated.
 *
 * Triggers a deprecation notice when a deprecated argument is used.
 *
 * @since {{version}}
 *
 * @param string $function_name The function that has the deprecated argument.
 * @param string $argument      The deprecated argument name.
 * @param string $version       The version when deprecation was introduced.
 * @param string $message       Optional. Additional migration instructions.
 */
function lswp_deprecated_argument( $function_name, $argument, $version, $message = '' ) {
	// Use WordPress deprecated argument function if available.
	if ( function_exists( '_deprecated_argument' ) ) {
		call_user_func( '_deprecated_argument', $function_name, $version, $message );
	} else {
		$notice = sprintf(
			/* translators: 1: Argument name, 2: Function name, 3: Version */
			__( 'The %1$s argument for %2$s is deprecated since version %3$s.', '{{textdomain}}' ),
			$argument,
			$function_name,
			$version
		);
		if ( $message ) {
			$notice .= ' ' . $message;
		}
		lswp_deprecated( $notice, $version );
	}
}

/**
 * Mark a file as deprecated.
 *
 * Triggers a deprecation notice when a deprecated file is included.
 *
 * @since {{version}}
 *
 * @param string $file        The deprecated file name.
 * @param string $version     The version when deprecation was introduced.
 * @param string $replacement Optional. The replacement file name.
 * @param string $message     Optional. Additional migration instructions.
 */
function lswp_deprecated_file( $file, $version, $replacement = '', $message = '' ) {
	// Use WordPress deprecated file function if available.
	if ( function_exists( '_deprecated_file' ) ) {
		call_user_func( '_deprecated_file', basename( $file ), $version, $replacement, $message );
	} else {
		$notice = sprintf(
			/* translators: 1: File name, 2: Version */
			__( 'File %1$s is deprecated since version %2$s.', '{{textdomain}}' ),
			basename( $file ),
			$version
		);
		if ( $replacement ) {
			$notice .= ' ' . sprintf(
				/* translators: %s: Replacement file name */
				__( 'Use %s instead.', '{{textdomain}}' ),
				$replacement
			);
		}
		if ( $message ) {
			$notice .= ' ' . $message;
		}
		lswp_deprecated( $notice, $version );
	}
}

/**
 * Check if running in a context where deprecation notices should be shown.
 *
 * @since {{version}}
 *
 * @return bool True if deprecation notices should be displayed.
 */
function lswp_should_show_deprecations() {
	// Always show in debug mode.
	if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
		return true;
	}

	// Show in development/staging environments.
	if ( defined( 'WP_ENVIRONMENT_TYPE' ) ) {
		$env_type = call_user_func( 'wp_get_environment_type' );
		if ( in_array( $env_type, array( 'local', 'development', 'staging' ), true ) ) {
			return true;
		}
	}

	return false;
}

/**
 * Get a list of all deprecated functions in this plugin.
 *
 * Useful for generating documentation or migration guides.
 *
 * @since {{version}}
 *
 * @return array Array of deprecated items with details.
 */
function lswp_get_deprecations() {
	/**
	 * Filter the list of deprecated items.
	 *
	 * @since {{version}}
	 *
	 * @param array $deprecations Array of deprecated items.
	 */
	$deprecations = array(
		// Example entry - add your deprecations here.
		/*
		array(
			'type'        => 'function',
			'name'        => 'old_function_name',
			'version'     => '1.5.0',
			'replacement' => 'new_function_name',
			'message'     => 'The function signature has changed.',
			'removed_in'  => '2.0.0', // When it will be removed.
		),
		*/
	);

	if ( function_exists( 'apply_filters' ) ) {
		$deprecations = call_user_func( 'apply_filters', 'lswp_deprecations', $deprecations );
	}

	return $deprecations;
}
