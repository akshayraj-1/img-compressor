<?php

// For Debugging Purpose Only
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

// Config
ini_set('upload_max_filesize', '100M');
ini_set('post_max_size', '150M');
ini_set('max_execution_time', '300');


header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Authorization, Content-Type');
header('content-type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(400);
    exit();
}

include './includes/ResponseHandler.php';
include './includes/DatabaseConnector.php';
include './includes/ImageCompressor.php';
include './includes/keys.php';

// Constants
const OUTPUT_DIR = 'downloads';
const MAX_FILES_COUNT = 30;
const MAX_TOTAL_SIZE = 250 * 1024 * 1024;
const MAX_FILE_SIZE = 16 * 1024 * 1024;

// Initializations
$db = new DatabaseConnector();
$conn = $db->getConnection();
$compressor = new ImageCompressor(OUTPUT_DIR);

// Input Values
$key = $_POST['key'] ?? null;
$files = $_FILES['files'] ?? null;
$quality = $_POST['quality'] ?? 75;

// Validate API Key
if (empty($key) || !in_array($key, $keys)) {
    ResponseHandler::sendFailure('Invalid API Key', ResponseHandler::UNAUTHORIZED);
}

// Validate Image Files
if (empty($files)) {
    ResponseHandler::sendFailure('No image provided', ResponseHandler::BAD_REQUEST);
}

// Normalize single file to array of files
$files = is_array($files['name']) ? $files : array_map(fn($field) => [$field], $files);

if (is_array($quality) && count($quality) !== count($files['name'])) {
    ResponseHandler::sendFailure('Missing compression quality for some images', ResponseHandler::BAD_REQUEST);
}

if (count($files['name']) > MAX_FILES_COUNT) {
    ResponseHandler::sendFailure('Max files limit exceed: [count => ' . count($files['name']) . ', limit => ' . MAX_FILES_COUNT . ']', ResponseHandler::FORBIDDEN);
}

// Validate Total File Size Limit
$total_file_size = 0;
foreach ($files['size'] as $index => $size) {
    $s = $files['size'][$index];
    if ($s > MAX_FILE_SIZE) {
        ResponseHandler::sendFailure('File size limit exceed: [file => ' . $file['name'][$index] . ', size => ' . $s . ', limit => ' . MAX_FILE_SIZE . ']', ResponseHandler::FORBIDDEN);
    }
    $total_file_size += $s;
}

if ($total_file_size > MAX_TOTAL_SIZE) {
    ResponseHandler::sendFailure('Total file size limit is exceeded: [size => ' . $total_file_size . ', limit => ' . MAX_TOTAL_SIZE . ']', ResponseHandler::FORBIDDEN);
}


$uploadedImages = [];
$compressedSize = 0;

foreach ($files['name'] as $index => $name) {
    try {
        $singleFile = [
            'name' => $files['name'][$index],
            'type' => $files['type'][$index],
            'tmp_name' => $files['tmp_name'][$index],
            'error' => $files['error'][$index],
            'size' => $files['size'][$index]
        ];

        $compressedImage = $compressor->compress($singleFile, is_array($quality) ? $quality[$index] : $quality);
        $uploadedImages[] = $compressedImage;
        $compressedSize += $compressedImage['compressed_size'];

    } catch (Exception $e) {
        foreach ($uploadedImages as $uploaded) {
            if (file_exists($uploaded['compressed_file'])) {
                unlink($uploaded['compressed_file']);
            }
        }
        ResponseHandler::sendFailure($e->getMessage());
    }
}

// Send success response with the list of uploaded images
ResponseHandler::sendSuccess('success', [
    'images' => $uploadedImages,
    'total_count' => count($uploadedImages),
    'total_original_size' => $total_file_size,
    'total_compressed_size' => $compressedSize
]);








