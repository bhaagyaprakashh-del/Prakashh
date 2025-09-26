<?php
/**
 * Simple PHP Router for Chit Funds CRM API
 */

declare(strict_types=1);

namespace ChitCRM;

class Router
{
    private array $routes = [];
    private string $basePath = '/api';
    
    public function __construct(string $basePath = '/api')
    {
        $this->basePath = rtrim($basePath, '/');
    }
    
    public function get(string $path, string $handler): void
    {
        $this->addRoute('GET', $path, $handler);
    }
    
    public function post(string $path, string $handler): void
    {
        $this->addRoute('POST', $path, $handler);
    }
    
    public function put(string $path, string $handler): void
    {
        $this->addRoute('PUT', $path, $handler);
    }
    
    public function delete(string $path, string $handler): void
    {
        $this->addRoute('DELETE', $path, $handler);
    }
    
    private function addRoute(string $method, string $path, string $handler): void
    {
        $pattern = $this->convertToRegex($path);
        $this->routes[] = [
            'method' => $method,
            'pattern' => $pattern,
            'handler' => $handler,
            'path' => $path
        ];
    }
    
    private function convertToRegex(string $path): string
    {
        // Convert {param} to named capture groups
        $pattern = preg_replace('/\{([^}]+)\}/', '(?P<$1>[^/]+)', $path);
        return '#^' . $this->basePath . $pattern . '$#';
    }
    
    public function dispatch(): void
    {
        $method = $_SERVER['REQUEST_METHOD'];
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        
        foreach ($this->routes as $route) {
            if ($route['method'] === $method && preg_match($route['pattern'], $uri, $matches)) {
                $this->callHandler($route['handler'], $matches);
                return;
            }
        }
        
        // No route found
        Response::error(['error' => 'Not Found', 'path' => $uri], 404);
    }
    
    private function callHandler(string $handler, array $matches): void
    {
        [$controllerName, $method] = explode('@', $handler);
        $controllerClass = "ChitCRM\\Controllers\\{$controllerName}";
        
        if (!class_exists($controllerClass)) {
            Response::error(['error' => 'Controller not found', 'controller' => $controllerName], 500);
            return;
        }
        
        $controller = new $controllerClass();
        
        if (!method_exists($controller, $method)) {
            Response::error(['error' => 'Method not found', 'method' => $method], 500);
            return;
        }
        
        // Extract parameters from URL
        $params = [];
        foreach ($matches as $key => $value) {
            if (!is_numeric($key)) {
                $params[$key] = $value;
            }
        }
        
        // Call the controller method
        $controller->$method($params);
    }
}