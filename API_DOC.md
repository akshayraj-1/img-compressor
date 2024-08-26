# Image Compression API Documentation

## Base URL

##### `$version = v2`

```angular17svg
https://api.igyaanstudios.com/image-compressor/$version/
```

## Allowed Methods

- **POST**: Upload and compress images.
- **OPTIONS**: Pre-flight request for CORS.

## Response Codes

- **200 OK**: Successful request.
- **400 Bad Request**: Invalid request or missing parameters.
- **401 Unauthorized**: Invalid API key.
- **403 Forbidden**: File size limits exceeded.
- **415 Unsupported Media Type**: Unsupported file type.
- **500 Internal Server Error**: Processing error.

## POST Request

### Parameters

1. **`key`** (required):
    - **Type**: `String`
    - **Description**: API key for authentication.

2. **`files`** (required):
    - **Type**: `File | File[]`
    - **Description**: Images to upload and compress. Supports PNG, JPG, JPEG, GIF.

3. **`quality`** (optional):
    - **Type**: `Integer | Integer[]`
    - **Description**: Compression quality (1-100). Default is `75`.

### File Constraints

- **Max Total Size**: 250 MB
- **Max File Size**: 15 MB per file
- **Max Files Count**: 30 files

## Request Examples

### Single File Upload:

```angular2html

<form action="https://api.igyaanstudios.com/image-compressor/$version/" method="POST" enctype="multipart/form-data">
    <input type="file" name="files">
    <input type="text" name="quality" value="80">
    <input type="hidden" name="key" value="your_api_key">
    <button type="submit">Upload & Compress</button>
</form>
```

### Multiple File Upload:

```angular2html

<form action="https://api.igyaanstudios.com/image-compressor/$version/" method="POST" enctype="multipart/form-data">
    <input type="file" name="files" multiple>
    <input type="text" name="quality" value="80">
    <input type="hidden" name="key" value="your_api_key">
    <button type="submit">Upload & Compress</button>
</form>
```

## Response Examples

The API returns a JSON response containing the status of the request and the details of the compressed images.

### Success Response

**HTTP Status Code: 200 OK**

```json
{
  "success": true,
  "status_code": 200,
  "message": "Success",
  "data": {
    "images": [
      {
        "id": "unique-id",
        "success": true,
        "status_code": 200,
        "message": "Successful",
        "original_name": "image1.jpg",
        "original_size": 123456,
        "compressed_name": "timestamp_randomstring_image1.jpg",
        "compressed_size": 78910,
        "mime_type": "image/jpeg",
        "url": "https://api.igyaanstudios.com/image-compressor/$version/downloads/?file=compressed_image1.jpg"
      },
      {
        "id": "unique-id",
        "success": true,
        "status_code": 200,
        "message": "Successful",
        "original_name": "image2.png",
        "original_size": 654321,
        "compressed_name": "timestamp_randomstring_image2.png",
        "compressed_size": 43210,
        "mime_type": "image/png",
        "url": "https://api.igyaanstudios.com/image-compressor/$version/downloads/?file=compressed_image2.png"
      },
      {
        "id": "unique-id",
        "success": false,
        "status_code": 415,
        "message": "Unsupported file type",
        "original_name": "image3.ico",
        "original_size": 789777,
        "compressed_name": null,
        "compressed_size": null,
        "mime_type": "image/gif",
        "url": null
      }
    ],
    "total_count": 3,
    "total_original_size": 1567554,
    "total_compressed_size": 122120
  }
}

```

## Error Responses

**Invalid API Key**:

```json
{
  "success": false,
  "status_code": 401,
  "message": "Invalid API Key"
}
```

**No Images Found**:

```json
{
  "success": false,
  "status_code": 400,
  "message": "No images provided"
}
```

**Total File Size Exceeded**:

```json
{
  "success": false,
  "status_code": 403,
  "message": "Total file size limit is exceeded: [size => 52000000, limit => 250000000]"
}

```

**File Size Exceeded**:

```json
{
  "success": false,
  "status_code": 400,
  "message": "File size limit exceeded: [file => image1.jpg, size => 20000000, limit => 10000000]"
}
```

## Notes

- Uploaded files are deleted after successful compression.
- API may change; it's not intended for commercial use.
- Returned compressed sizes in response are represented in bytes.

If you have any questions or feedback, please feel free
to [raise an issue](https://github.com/akshayraj-1/ImageCompressor/issues)