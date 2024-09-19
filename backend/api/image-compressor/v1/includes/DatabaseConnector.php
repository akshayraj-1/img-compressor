<?php

class DatabaseConnector {
    
    private const DB_HOST = "localhost";
    private const DB_NAME = "u753391731_api";
    private const DB_USER = "u753391731_api";
    private const DB_PASS = "Admin@1279835";
    private $conn;

    public function __construct() {
        $this->connect();
    }

    private function connect() {
        try {
            $this->conn = new mysqli(self::DB_HOST, self::DB_USER, self::DB_PASS, self::DB_NAME);
            if ($this->conn->connect_error) {
                throw new Exception("Connection failed: " . $this->conn->connect_error);
            }
        } catch (Exception $e) {
            exit("DatabaseConnector Error: " . $e->getMessage());
        }
    }

    public function getConnection() {
        return $this->conn;
    }

    public function __destruct() {
        if ($this->conn) {
            $this->conn->close();
        }
    }
}
