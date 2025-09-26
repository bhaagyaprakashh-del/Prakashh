<?php
/**
 * Chit Funds CRM - PHP API Entry Point
 * 
 * Simple, fast PHP 8.1+ REST API for chit fund management
 * No framework dependencies - pure PHP with modern features
 */

declare(strict_types=1);

// Error reporting for development
error_reporting(E_ALL);
ini_set('display_errors', '1');

// Set timezone
date_default_timezone_set('Asia/Kolkata');

// CORS headers for frontend integration
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=utf-8');

// Handle preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Autoload classes
require_once __DIR__ . '/../src/bootstrap.php';

use ChitCRM\Router;
use ChitCRM\Response;
use ChitCRM\Middleware;

try {
    // Initialize router
    $router = new Router();
    
    // Apply global middleware
    Middleware::cors();
    Middleware::jsonOnly();
    
    // Health check endpoint
    $router->get('/health', 'HealthController@health');
    $router->get('/health/db', 'HealthController@database');
    $router->get('/health/full', 'HealthController@full');
    
    // Authentication routes
    $router->post('/auth/login', 'AuthController@login');
    $router->post('/auth/logout', 'AuthController@logout');
    $router->get('/auth/me', 'AuthController@me');
    $router->post('/auth/refresh', 'AuthController@refresh');
    
    // User management
    $router->get('/users', 'UsersController@list');
    $router->get('/users/{id}', 'UsersController@get');
    $router->post('/users', 'UsersController@create');
    $router->put('/users/{id}', 'UsersController@update');
    $router->delete('/users/{id}', 'UsersController@delete');
    
    // Roles and permissions
    $router->get('/roles', 'UsersController@roles');
    $router->get('/permissions', 'UsersController@permissions');
    
    // Leads management
    $router->get('/leads', 'LeadsController@list');
    $router->get('/leads/{id}', 'LeadsController@get');
    $router->post('/leads', 'LeadsController@create');
    $router->put('/leads/{id}', 'LeadsController@update');
    $router->delete('/leads/{id}', 'LeadsController@delete');
    $router->get('/leads/pipeline', 'LeadsController@pipeline');
    $router->post('/leads/{id}/convert', 'LeadsController@convert');
    $router->get('/leads/{id}/activities', 'LeadsController@activities');
    $router->post('/leads/{id}/activities', 'LeadsController@addActivity');
    
    // Subscribers management
    $router->get('/subscribers', 'SubscribersController@list');
    $router->get('/subscribers/{id}', 'SubscribersController@get');
    $router->post('/subscribers', 'SubscribersController@create');
    $router->put('/subscribers/{id}', 'SubscribersController@update');
    $router->delete('/subscribers/{id}', 'SubscribersController@delete');
    $router->get('/subscribers/{id}/payments', 'SubscribersController@payments');
    $router->post('/subscribers/{id}/payments', 'SubscribersController@addPayment');
    $router->get('/subscribers/{id}/groups', 'SubscribersController@groups');
    
    // Agents management
    $router->get('/agents', 'AgentsController@list');
    $router->get('/agents/{id}', 'AgentsController@get');
    $router->post('/agents', 'AgentsController@create');
    $router->put('/agents/{id}', 'AgentsController@update');
    $router->delete('/agents/{id}', 'AgentsController@delete');
    $router->get('/agents/{id}/performance', 'AgentsController@performance');
    $router->get('/agents/{id}/targets', 'AgentsController@targets');
    $router->post('/agents/{id}/targets', 'AgentsController@setTarget');
    $router->get('/agents/{id}/diary', 'AgentsController@diary');
    $router->post('/agents/{id}/diary', 'AgentsController@addDiaryEntry');
    
    // Chit Groups management
    $router->get('/chit/groups', 'ChitController@groups');
    $router->get('/chit/groups/{id}', 'ChitController@getGroup');
    $router->post('/chit/groups', 'ChitController@createGroup');
    $router->put('/chit/groups/{id}', 'ChitController@updateGroup');
    $router->delete('/chit/groups/{id}', 'ChitController@deleteGroup');
    $router->get('/chit/auctions', 'ChitController@auctions');
    $router->get('/chit/auctions/{id}', 'ChitController@getAuction');
    $router->post('/chit/auctions', 'ChitController@createAuction');
    $router->put('/chit/auctions/{id}', 'ChitController@updateAuction');
    $router->get('/chit/groups/{id}/subscribers', 'ChitController@groupSubscribers');
    $router->post('/chit/groups/{id}/subscribers', 'ChitController@addSubscriber');
    
    // HRMS endpoints
    $router->get('/hrms/employees', 'HrmsController@employees');
    $router->get('/hrms/employees/{id}', 'HrmsController@getEmployee');
    $router->post('/hrms/employees', 'HrmsController@createEmployee');
    $router->put('/hrms/employees/{id}', 'HrmsController@updateEmployee');
    $router->delete('/hrms/employees/{id}', 'HrmsController@deleteEmployee');
    $router->get('/hrms/attendance', 'HrmsController@attendance');
    $router->post('/hrms/attendance', 'HrmsController@markAttendance');
    $router->get('/hrms/payroll', 'HrmsController@payroll');
    $router->post('/hrms/payroll', 'HrmsController@generatePayroll');
    $router->get('/hrms/leaves', 'HrmsController@leaves');
    $router->post('/hrms/leaves', 'HrmsController@applyLeave');
    
    // Calendar endpoints
    $router->get('/calendar/events', 'CalendarController@events');
    $router->get('/calendar/events/{id}', 'CalendarController@getEvent');
    $router->post('/calendar/events', 'CalendarController@createEvent');
    $router->put('/calendar/events/{id}', 'CalendarController@updateEvent');
    $router->delete('/calendar/events/{id}', 'CalendarController@deleteEvent');
    
    // Tasks and Tickets
    $router->get('/tasks', 'TasksController@list');
    $router->get('/tasks/{id}', 'TasksController@get');
    $router->post('/tasks', 'TasksController@create');
    $router->put('/tasks/{id}', 'TasksController@update');
    $router->delete('/tasks/{id}', 'TasksController@delete');
    
    $router->get('/tickets', 'TicketsController@list');
    $router->get('/tickets/{id}', 'TicketsController@get');
    $router->post('/tickets', 'TicketsController@create');
    $router->put('/tickets/{id}', 'TicketsController@update');
    $router->delete('/tickets/{id}', 'TicketsController@delete');
    
    // Campaigns and Messaging
    $router->get('/campaigns', 'CampaignsController@list');
    $router->get('/campaigns/{id}', 'CampaignsController@get');
    $router->post('/campaigns', 'CampaignsController@create');
    $router->put('/campaigns/{id}', 'CampaignsController@update');
    $router->delete('/campaigns/{id}', 'CampaignsController@delete');
    $router->post('/campaigns/{id}/send', 'CampaignsController@send');
    $router->get('/email-settings', 'CampaignsController@emailSettings');
    $router->put('/email-settings', 'CampaignsController@updateEmailSettings');
    $router->get('/chat-settings', 'CampaignsController@chatSettings');
    $router->put('/chat-settings', 'CampaignsController@updateChatSettings');
    
    // Reports
    $router->get('/reports/jobs', 'ReportsController@jobs');
    $router->post('/reports/jobs', 'ReportsController@createJob');
    $router->get('/reports/jobs/{id}', 'ReportsController@getJob');
    $router->delete('/reports/jobs/{id}', 'ReportsController@deleteJob');
    
    // Settings
    $router->get('/settings/company', 'SettingsController@company');
    $router->put('/settings/company', 'SettingsController@updateCompany');
    $router->get('/settings/branches', 'SettingsController@branches');
    $router->post('/settings/branches', 'SettingsController@createBranch');
    $router->put('/settings/branches/{id}', 'SettingsController@updateBranch');
    $router->delete('/settings/branches/{id}', 'SettingsController@deleteBranch');
    $router->get('/settings/departments', 'SettingsController@departments');
    $router->post('/settings/departments', 'SettingsController@createDepartment');
    $router->get('/settings/products', 'SettingsController@products');
    $router->post('/settings/products', 'SettingsController@createProduct');
    
    // Notifications
    $router->get('/notifications', 'NotificationsController@list');
    $router->put('/notifications/{id}/read', 'NotificationsController@markRead');
    $router->put('/notifications/mark-all-read', 'NotificationsController@markAllRead');
    $router->post('/notifications', 'NotificationsController@create');
    $router->delete('/notifications', 'NotificationsController@clear');
    
    // Handle the request
    $router->dispatch();
    
} catch (Exception $e) {
    // Log error in production
    error_log("API Error: " . $e->getMessage());
    
    // Return error response
    Response::error([
        'error' => 'Internal Server Error',
        'message' => $e->getMessage(),
        'code' => $e->getCode() ?: 500
    ], 500);
}