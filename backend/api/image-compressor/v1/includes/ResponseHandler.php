<?php

class ResponseHandler {
    const SUCCESS = 200;
    const BAD_REQUEST = 400;
    const UNAUTHORIZED = 401;
    const FORBIDDEN = 403;
    const NOT_FOUND = 404;
    const SERVER_ERROR = 500;

    public static function sendSuccess(string $message, $data = null): void {
        self::sendResponse(self::SUCCESS, $message, $data);
    }

    public static function sendFailure(string $message, int $status_code = self::FORBIDDEN, $data = null): void {
        self::sendResponse($status_code, $message, $data);
    }

    private static function sendResponse(int $status_code, string $message, $data = null): void {
        http_response_code($status_code);
        header("Content-Type: application/json; charset=UTF-8");
        echo json_encode([
            "success" => $status_code < 400,
            "status_code" => $status_code,
            "message" => $message,
            "data" => $data
        ]);
        exit();
    }
}

