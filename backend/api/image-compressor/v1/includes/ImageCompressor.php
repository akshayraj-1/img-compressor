<?php

require_once(__DIR__ . '/Assertions.php');

class ImageCompressor {

    private const __BASE_URL__ = 'https://igyaanstudios.com/api/image-compressor/v1/';
    private const MIN_QUALITY = 0;
    private const MAX_QUALITY = 100;
    private const MIME_PNG = 'image/png';
    private const MIME_JPG = 'image/jpg';
    private const MIME_JPEG = 'image/jpeg';
    private const MIME_GIF = 'image/gif';
    
    private string $destination;

    public function __construct(string $destination) {
        Assertions::assertDirectoryExists($destination);
        $this->destination = $destination;
    }

    private function getOutputFilePath(string $filename): string {
        return $this->destination . '/' . time() . '_' . bin2hex(random_bytes(5)) . '_' . basename($filename);
    }


    public static function getCompressedImageInfo($original_file, string $compressed_file_path): array {
        return [
            'id' => bin2hex(random_bytes(5)),
            'success' => file_exists($compressed_file_path),
            'original_name' => $original_file['name'],
            'original_size' => $original_file['size'],
            'compressed_name' => file_exists($compressed_file_path) ? basename($compressed_file_path) : null,
            'compressed_size' => file_exists($compressed_file_path) ? round(filesize($compressed_file_path) / 1024) : null,
            'mime_type' => mime_content_type($original_file['tmp_name']),
            'url' => file_exists($compressed_file_path) ? self::__BASE_URL__ . 'downloads/?file=' . urlencode(basename($compressed_file_path)) : null
        ];
    }

    public function compress($file, $quality = 65): array {

        $original_memory_limit = ini_get('memory_limit');
        ini_set('memory_limit', '256M');

        Assertions::assertFileIsImage($file);
        Assertions::assertIsInRange(self::MIN_QUALITY, self::MAX_QUALITY, $quality);
        
        $original_file_path = $file['tmp_name'];

        $mime = getimagesize($original_file_path)['mime'];

        $img = null;
        $out_file_path = $this->getOutputFilePath($file['name']);

        switch ($mime) {
            case self::MIME_JPG:
            case self::MIME_JPEG:
                $img = imagecreatefromjpeg($original_file_path);
                imagejpeg($img, $out_file_path, $quality);
                break;
            case self::MIME_PNG:
                $img = imagecreatefrompng($original_file_path);
                $compression_level = 9;
                imagepng($img, $out_file_path, $compression_level);
                break;
            case self::MIME_GIF:
                $img = imagecreatefromstring(file_get_contents($original_file_path));
                imagetruecolortopalette($img, false, 255 - $quality);
                imagegif($img, $out_file_path);
                break;
        }

        if (isset($img)) imagedestroy($img);
        ini_set('memory_limit', $original_memory_limit);


        return self::getCompressedImageInfo($file, $out_file_path);

    }

}