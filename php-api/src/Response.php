<?php
/**
 * HTTP Response Helper for Chit Funds CRM API
 */

declare(strict_types=1);

namespace ChitCRM;

class Response
{
    public static function json(array $data, int $status = 200): void
    {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }
    
    public static function success(array $data = [], string $message = 'Success'): void
    {
        self::json([
            'success' => true,
            'message' => $message,
            'data' => $data,
            'timestamp' => date('c')
        ]);
    }
    
    public static function error(array $error, int $status = 400): void
    {
        self::json([
            'success' => false,
            'error' => $error,
            'timestamp' => date('c')
        ], $status);
    }
    
    public static function paginated(array $items, int $total, int $page = 1, int $limit = 20): void
    {
        $totalPages = ceil($total / $limit);
        
        self::json([
            'success' => true,
            'data' => $items,
            'pagination' => [
                'total' => $total,
                'page' => $page,
                'limit' => $limit,
                'pages' => $totalPages,
                'hasNext' => $page < $totalPages,
                'hasPrev' => $page > 1
            ],
            'timestamp' => date('c')
        ]);
    }
    
    public static function created(array $data, string $message = 'Created successfully'): void
    {
        self::json([
            'success' => true,
            'message' => $message,
            'data' => $data,
            'timestamp' => date('c')
        ], 201);
    }
    
    public static function updated(array $data = [], string $message = 'Updated successfully'): void
    {
        self::json([
            'success' => true,
            'message' => $message,
            'data' => $data,
            'timestamp' => date('c')
        ]);
    }
    
    public static function deleted(string $message = 'Deleted successfully'): void
    {
        self::json([
            'success' => true,
            'message' => $message,
            'timestamp' => date('c')
        ]);
    }
    
    public static function notFound(string $resource = 'Resource'): void
    {
        self::error([
            'error' => 'Not Found',
            'message' => "{$resource} not found"
        ], 404);
    }
    
    public static function unauthorized(string $message = 'Unauthorized'): void
    {
        self::error([
            'error' => 'Unauthorized',
            'message' => $message
        ], 401);
    }
    
    public static function forbidden(string $message = 'Forbidden'): void
    {
        self::error([
            'error' => 'Forbidden',
            'message' => $message
        ], 403);
    }
    
    public static function validationError(array $errors): void
    {
        self::error([
            'error' => 'Validation Error',
            'message' => 'The given data was invalid',
            'errors' => $errors
        ], 422);
    }
}