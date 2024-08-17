# Image Compression API

This API allows users to upload and compress images with specified quality settings. It supports both single and multiple image uploads and ensures that only accepted file types are processed. The API has restrictions on individual and total file sizes. Below is the detailed documentation of the API endpoints, request parameters, response format, and error handling.

## Base URL
https://api.igyaanstudios.com/

## Public API Key
`mSW0LMB5Pj4pNWWiRGfHL89KYdzrdWNM`

## Endpoints

| Endpoint | Method | Parameters | Description |
| -------- | ------ | ---------- | ----------- |
| /image-compressor/v1/ | POST | - | Upload and compress images with specified quality settings. |


## Request Headers

- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: POST, GET, OPTIONS`
- `Access-Control-Allow-Headers: Authorization, Content-Type`
- `Content-Type: application/json; charset=utf-8`

## Allowed Methods

- **POST**: Upload and compress images.
- **OPTIONS**: Pre-flight request for CORS.

## Response Codes

- **200 OK**: Request was successful.
- **400 Bad Request**: Invalid request method or missing parameters.
- **401 Unauthorized**: Invalid API key.
- **403 Forbidden**: Total file size limit exceeded or other forbidden errors.
- **415 Unsupported Media Type**: Unsupported file type.
- **500 Internal Server Error**: Error during file processing.

## Request Method

- **POST**

## Request Parameters

1. **`key`** (required):
    - **Type**: `String`
    - **Description**: The API key required to authenticate the request.
    - **Example**: `"your_api_key"`

2. **`files`** (required):
    - **Type**: `File | File[]`
    - **Description**: The images to be uploaded and compressed. This parameter can be a single file or an array of files.
    - **Example**: Upload one file or multiple files (PNG, JPG, JPEG, GIF).

3. **`quality`** (optional):
    - **Type**: `Integer | Integer[]`
    - **Description**: Compression quality ranging from `1` (worst) to `100` (best). If multiple files are uploaded, you can pass an array of quality values corresponding to each image.
    - **Default**: `75`
    - **Example**: `75` or `[80, 60, 90]`

## File Constraints

1. **`MAX_TOTAL_SIZE`**:
    - **Value**: `250 MB`
    - **Description**: The total size of all uploaded files combined should not exceed `250 MB`.

2. **`MAX_FILE_SIZE`**:
    - **Value**: `10 MB`
    - **Description**: Individual file size should not exceed `10 MB`.

3. **Accepted File Types**:
    - **Types**: `PNG, JPG, JPEG, GIF`
    - **Description**: Only files with the extensions `.png`, `.jpg`, `.jpeg`, or `.gif` are accepted. Unsupported file types will result in an error.

4. **MAX_FILES_COUNT**:
    - **Value**: `30`
    - **Description**: The maximum number of files that can be uploaded in a single request is `30`.

## Request Examples

### Single File Upload:

**CURL Example:**

```sh
curl -X POST https://api.igyaanstudios.com/image-compressor/v1/ \
-F "key=your_api_key" \
-F "files=@image1.jpg" \
-F "quality=80"
```

**Multipart Form Data Example:**
```
<form action="https://api.igyaanstudios.com/image-compressor/v1/" method="POST" enctype="multipart/form-data">
    <input type="file" name="files">
    <input type="text" name="quality" value="80">
    <input type="hidden" name="key" value="your_api_key">
    <button type="submit">Upload & Compress</button>
</form>
```


### Multiple File Upload:

**CURL Example:**

```sh
curl -X POST https://api.igyaanstudios.com/image-compressor/v1/ \
-F "key=your_api_key" \
-F "files=@image1.jpg" \
-F "files=@image2.jpg" \
-F "quality=80"
```

**Multipart Form Data Example:**
```angular2html
<form action="https://api.igyaanstudios.com/image-compressor/v1/" method="POST" enctype="multipart/form-data">
    <input type="file" name="files">
    <input type="file" name="files">
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
        "original_name": "image1.jpg",
        "original_size": 123456,
        "compressed_name": "timestamp_randomstring_image1.jpg",
        "compressed_size": 78910,
        "mime_type": "image/jpeg",
        "url": "https://api.igyaanstudios.com/image-compressor/v1/downloads/?file=timestamp_randomstring_image1.jpg"
      },
      {
        "id": "unique-id",
        "original_name": "image2.png",
        "original_size": 654321,
        "compressed_name": "timestamp_randomstring_image2.png",
        "compressed_size": 43210,
        "mime_type": "image/png",
        "url": "https://api.igyaanstudios.com/image-compressor/v1/downloads/?file=timestamp_randomstring_image2.png"
      }
    ],
    "total_count": 2,
    "total_original_size": 789777,
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


**Unsupported File Type**:
```json
{
  "success": false,
  "status_code": 415,
  "message": "Unsupported file type: [file => image1.gif, type => image/gif]"
}

```

## Error Handling

- **No API Key** - If no API key is provided, the API will return an error.
- **Invalid API Key** - If the provided API key is invalid, the API will return an error.
- **No Images Found** - If no images are provided, the API will return an error.
- **Total File Size Exceeded** - If the total file size exceeds the limit, the API will return an error.
- **File Size Exceeded** - If the individual file size exceeds the limit, the API will return an error.
- **Unsupported File Type** - If the file type is not supported, the API will return an error.
- **Internal Server Error** - If an internal server error occurs, the API will return an error.


## File Deletion Policy

The API will delete the uploaded files after successful compression. However, if an error occurs during the compression process, the API will not delete the uploaded files.


## Security Considerations

- **API Key Required** - An API key is required to authenticate the request.
- **HTTPS** - HTTPS is required for the API to be secured.
- **CORS** - Cross-Origin Resource Sharing (CORS) is required for the API to be secured.

## Notes

- **The API is under development and may change in the future.**
- **The API is not intended for commercial use.**
- **The API is provided as-is.**
- **The API is provided without warranty of any kind.**

## Conclusion

Thank you for using the imgCompressor API. If you have any questions or feedback, please feel free to [contact us](https://github.com/akshayraj-1/ImageCompressor/issues)