<?php
/**
 * Chit Funds CRM - Bootstrap
 * Initialize the application and autoload classes
 */

declare(strict_types=1);

// Define base paths
define('API_ROOT', dirname(__DIR__));
define('SRC_ROOT', API_ROOT . '/src');

// Simple autoloader for our classes
spl_autoload_register(function ($class) {
    // Remove namespace prefix
    $class = str_replace('ChitCRM\\', '', $class);
    
    // Convert to file path
    $file = SRC_ROOT . '/' . str_replace('\\', '/', $class) . '.php';
    
    if (file_exists($file)) {
        require_once $file;
    }
});

// Load environment variables if .env exists
$envFile = API_ROOT . '/.env';
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos($line, '=') !== false && !str_starts_with($line, '#')) {
            [$key, $value] = explode('=', $line, 2);
            $_ENV[trim($key)] = trim($value, '"\'');
        }
    }
}

// Set default environment variables
$defaults = [
    'DB_HOST' => 'localhost',
    'DB_PORT' => '3306',
    'DB_NAME' => 'chitsonline_db',
    'DB_USER' => 'root',
    'DB_PASS' => '',
    'JWT_SECRET' => 'your-secret-key-change-in-production',
    'API_DEBUG' => 'false',
    'CORS_ORIGIN' => '*'
];

foreach ($defaults as $key => $value) {
    if (!isset($_ENV[$key])) {
        $_ENV[$key] = $value;
    }
}

// Set error reporting based on debug mode
if ($_ENV['API_DEBUG'] === 'true') {
    error_reporting(E_ALL);
    ini_set('display_errors', '1');
} else {
    error_reporting(0);
    ini_set('display_errors', '0');
}