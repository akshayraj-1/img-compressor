<?php

final class PNGQuant
{

    public function __construct()
    {
    }

    /**
     * Compresses an image using the pngquant cli.
     *
     * @param string $input_path The path to the input image.
     * @param string $output_path The path to the output image.
     * @param int $quality The quality of the output image, 0-100.
     *
     * @return bool Success or not.
     */
    public function compress(string $input_path, string $output_path, int $quality): bool
    {

        $quality = max((int)(($quality + 35) % 65), 35);

        $cmd = sprintf(
            '%s/pngquant --verbose --transbug --iebug --quality=35-%d --force --output=%s %s',
            escapeshellcmd(__DIR__),
            $quality,
            escapeshellarg($output_path),
            escapeshellarg($input_path)
        );


        exec($cmd, $output, $result);
        // result code is zero if all went well
        return !$result;

    }


}
