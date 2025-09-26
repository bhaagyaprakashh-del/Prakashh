<?php
/**
 * Database Connection and Query Helper
 */

declare(strict_types=1);

namespace ChitCRM;

use PDO;
use PDOException;

class Db
{
    private static ?PDO $connection = null;
    
    public static function connect(): PDO
    {
        if (self::$connection === null) {
            try {
                $dsn = sprintf(
                    'mysql:host=%s;port=%s;dbname=%s;charset=utf8mb4',
                    $_ENV['DB_HOST'],
                    $_ENV['DB_PORT'],
                    $_ENV['DB_NAME']
                );
                
                self::$connection = new PDO($dsn, $_ENV['DB_USER'], $_ENV['DB_PASS'], [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false,
                    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_0900_ai_ci"
                ]);
                
            } catch (PDOException $e) {
                throw new \Exception("Database connection failed: " . $e->getMessage());
            }
        }
        
        return self::$connection;
    }
    
    public static function query(string $sql, array $params = []): array
    {
        try {
            $pdo = self::connect();
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            throw new \Exception("Query failed: " . $e->getMessage());
        }
    }
    
    public static function queryOne(string $sql, array $params = []): ?array
    {
        $results = self::query($sql, $params);
        return $results[0] ?? null;
    }
    
    public static function insert(string $table, array $data): int
    {
        $columns = array_keys($data);
        $placeholders = array_map(fn($col) => ":$col", $columns);
        
        $sql = sprintf(
            "INSERT INTO %s (%s) VALUES (%s)",
            $table,
            implode(', ', $columns),
            implode(', ', $placeholders)
        );
        
        try {
            $pdo = self::connect();
            $stmt = $pdo->prepare($sql);
            $stmt->execute($data);
            return (int) $pdo->lastInsertId();
        } catch (PDOException $e) {
            throw new \Exception("Insert failed: " . $e->getMessage());
        }
    }
    
    public static function update(string $table, array $data, array $where): int
    {
        $setParts = array_map(fn($col) => "$col = :$col", array_keys($data));
        $whereParts = array_map(fn($col) => "$col = :where_$col", array_keys($where));
        
        $sql = sprintf(
            "UPDATE %s SET %s WHERE %s",
            $table,
            implode(', ', $setParts),
            implode(' AND ', $whereParts)
        );
        
        // Prefix where parameters to avoid conflicts
        $whereParams = [];
        foreach ($where as $key => $value) {
            $whereParams["where_$key"] = $value;
        }
        
        $params = array_merge($data, $whereParams);
        
        try {
            $pdo = self::connect();
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            return $stmt->rowCount();
        } catch (PDOException $e) {
            throw new \Exception("Update failed: " . $e->getMessage());
        }
    }
    
    public static function delete(string $table, array $where): int
    {
        $whereParts = array_map(fn($col) => "$col = :$col", array_keys($where));
        
        $sql = sprintf(
            "DELETE FROM %s WHERE %s",
            $table,
            implode(' AND ', $whereParts)
        );
        
        try {
            $pdo = self::connect();
            $stmt = $pdo->prepare($sql);
            $stmt->execute($where);
            return $stmt->rowCount();
        } catch (PDOException $e) {
            throw new \Exception("Delete failed: " . $e->getMessage());
        }
    }
    
    public static function exists(string $table, array $where): bool
    {
        $whereParts = array_map(fn($col) => "$col = :$col", array_keys($where));
        
        $sql = sprintf(
            "SELECT 1 FROM %s WHERE %s LIMIT 1",
            $table,
            implode(' AND ', $whereParts)
        );
        
        $result = self::queryOne($sql, $where);
        return $result !== null;
    }
    
    public static function tableExists(string $table): bool
    {
        $sql = "SELECT 1 FROM information_schema.tables WHERE table_schema = :db AND table_name = :table";
        $result = self::queryOne($sql, ['db' => $_ENV['DB_NAME'], 'table' => $table]);
        return $result !== null;
    }
    
    public static function healthCheck(): array
    {
        try {
            $pdo = self::connect();
            $version = $pdo->query("SELECT VERSION() as version")->fetch()['version'];
            
            // Check key tables
            $tables = ['users', 'leads', 'subscribers', 'agents', 'chit_groups'];
            $tableStatus = [];
            
            foreach ($tables as $table) {
                $tableStatus[$table] = self::tableExists($table);
            }
            
            return [
                'status' => 'connected',
                'version' => $version,
                'database' => $_ENV['DB_NAME'],
                'tables' => $tableStatus
            ];
            
        } catch (\Exception $e) {
            return [
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        }
    }
}