<?php
if (!defined('ABSPATH')) {
    exit;
}

// Nonce utilities and minimal examples (generic lswp_ prefix).

function lswp_nonce_action($suffix = '') {
    $base = 'single-block-plugin';
    return $suffix ? $base . ':' . $suffix : $base;
}

function lswp_create_nonce($action = null) {
    $action = $action ?: lswp_nonce_action();
    if (function_exists('wp_create_nonce')) {
        return call_user_func('wp_create_nonce', $action);
    }
    return '';
}

function lswp_verify_request_nonce($action = null, $param = '_wpnonce') {
    $action = $action ?: lswp_nonce_action();
    $val = isset($_REQUEST[$param]) ? $_REQUEST[$param] : '';
    if (function_exists('wp_unslash')) {
        $val = call_user_func('wp_unslash', $val);
    }
    if (function_exists('sanitize_text_field')) {
        $val = call_user_func('sanitize_text_field', $val);
    }
    $nonce = $val;
    if (function_exists('wp_verify_nonce')) {
        return $nonce && call_user_func('wp_verify_nonce', $nonce, $action);
    }
    return false;
}

function lswp_verify_rest_nonce($request, $action = null) {
    $action = $action ?: lswp_nonce_action('wp_rest');
    $nonce = method_exists($request, 'get_header') ? $request->get_header('X-WP-Nonce') : '';
    if (function_exists('wp_verify_nonce')) {
        return $nonce && call_user_func('wp_verify_nonce', $nonce, $action);
    }
    return false;
}

if (function_exists('add_action')) {
    call_user_func('add_action', 'wp_enqueue_scripts', function () {
        if (!function_exists('wp_add_inline_script')) {
            return;
        }

        $nonce = lswp_create_nonce(lswp_nonce_action('frontend'));

        $jsonFunc = function_exists('wp_json_encode') ? 'wp_json_encode' : null;
        $jsonNonce = $jsonFunc ? call_user_func($jsonFunc, $nonce) : json_encode($nonce);
        $inline = 'window.LSWP = Object.assign(window.LSWP||{}, { nonce: ' . $jsonNonce . ' });';
        call_user_func('wp_add_inline_script', '{{slug}}-frontend', $inline, 'before');
    });
}

if (function_exists('add_action')) {
    call_user_func('add_action', 'wp_ajax_{{slug}}_example', function () {
        if (!lswp_verify_request_nonce(lswp_nonce_action('frontend'))) {
            if (function_exists('wp_send_json_error')) {
                call_user_func('wp_send_json_error', array('message' => 'Invalid nonce'), 403);
            }
            exit;
        }

        if (function_exists('wp_send_json_success')) {
            call_user_func('wp_send_json_success', array('message' => 'OK'));
        } else {
            echo json_encode(array('message' => 'OK'));
        }
    });
}
