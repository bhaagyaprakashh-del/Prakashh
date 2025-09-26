<?php
/**
 * Health Check Controller
 */

declare(strict_types=1);

namespace ChitCRM\Controllers;

use ChitCRM\Response;
use ChitCRM\Db;

class HealthController
{
    public function health(): void
    {
        Response::success([
            'status' => 'healthy',
            'service' => 'Chit Funds CRM API',
            'version' => '1.0.0',
            'timestamp' => date('c'),
            'uptime' => $this->getUptime()
        ]);
    }
    
    public function database(): void
    {
        $dbHealth = Db::healthCheck();
        
        if ($dbHealth['status'] === 'connected') {
            Response::success($dbHealth, 'Database connection healthy');
        } else {
            Response::error($dbHealth, 503);
        }
    }
    
    public function full(): void
    {
        $health = [
            'service' => [
                'name' => 'Chit Funds CRM API',
                'version' => '1.0.0',
                'status' => 'healthy'
            ],
            'database' => Db::healthCheck(),
            'system' => [
                'php_version' => PHP_VERSION,
                'memory_usage' => memory_get_usage(true),
                'memory_peak' => memory_get_peak_usage(true),
                'uptime' => $this->getUptime()
            ],
            'environment' => [
                'debug' => $_ENV['API_DEBUG'] === 'true',
                'timezone' => date_default_timezone_get()
            ]
        ];
        
        $overallStatus = $health['database']['status'] === 'connected' ? 'healthy' : 'degraded';
        $statusCode = $overallStatus === 'healthy' ? 200 : 503;
        
        Response::json([
            'status' => $overallStatus,
            'checks' => $health,
            'timestamp' => date('c')
        ], $statusCode);
    }
    
    private function getUptime(): string
    {
        if (function_exists('sys_getloadavg')) {
            $uptime = shell_exec('uptime');
            return trim($uptime) ?: 'unknown';
        }
        return 'unknown';
    }
}