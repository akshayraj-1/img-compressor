<?php

abstract class Assertions {

    public static function assertFileExists($path) {
        if (!file_exists($path)) {
            throw new Exception("File does not exist: $path");
        }
    }

    public static function assertFileNotExists($path) {
        if (file_exists($path)) {
            throw new Exception("File exists: $path");
        }
    }

    public static function assertDirectoryExists($path) {
        if (!is_dir($path)) {
            throw new Exception("Directory does not exist: $path");
        }
    }

    public static function assertDirectoryNotExists($path) {
        if (is_dir($path)) {
            throw new Exception("Directory exists: $path");
        }
    }

    public static function assertFileIsReadable($path) {
        self::assertFileExists($path);
        if (!is_readable($path)) {
            throw new Exception("File is not readable: $path");
        }
    }

    public static function assertFileIsWritable($path) {
        self::assertFileExists($path);
        if (!is_writable($path)) {
            throw new Exception("File is not writable: $path");
        }
    }

    public static function assertFileEquals($path1, $path2) {
        self::assertFileExists($path1);
        self::assertFileExists($path2);
        $contents1 = file_get_contents($path1);
        $contents2 = file_get_contents($path2);
        if ($contents1 != $contents2) {
            throw new Exception("File contents do not match: $path1, $path2");
        }
    }

    public static function assertFileIsImage($file) {
        self::assertFileExists($file['tmp_name']);
        $image = getimagesize($file['tmp_name']);
        if (!$image) {
            throw new Exception("File is not an image: $path");
        }
    }

    public static function assertIsInRange($min, $max, $num) {
        if ($num < $min || $num > $max) {
            throw new Exception("Invalid input range: $num, required between: $min to $max");
        }
    }

    public static function assertIsNotEmpty($input) {
        if (empty($input)) {
            throw new Exception("Input is empty");
        }
    }



}