# Image Compression API

> [!WARNING]
> This API is currently a work in progress project. So be aware that it may change in the future.

Image Compression API built with PHP for compressing multiple images at once.
Supported formats are `PNG, JPG, JPEG, and GIF`. The API is ideal for web applications that requires image uploads and optimizations to improve loading time and reduced bandwidth usage.

<hr>

**Try out the API and see how it works.**

## Base URL

<img src="https://img.shields.io/badge/current%20version-v2-blue.svg?style=flat" alt="Version">

```angular17svg
https://api.akshayraj.io/image-compressor/:version/
```
_Replace the `:version` with the actual version number you are using for e.g. `https://api.akshayraj.io/image-compressor/v2`._

## Allowed Methods

- **POST**: Upload and compress images.
- **OPTIONS**: Pre-flight request for CORS.

## POST Request

### Parameters

| Parameter | Required | Type                   | Description                                                    |
|-----------|----------|------------------------|----------------------------------------------------------------|
| `key`     | Yes      | `String`               | API key used for authentication.                               |
| `files`   | Yes      | `File \| File[]`       | Image(s) to upload and compress. Supports PNG, JPG, JPEG, GIF. | Images to upload and compress. Supports PNG, JPG, JPEG, GIF. |
| `quality` | No       | `Integer \| Integer[]` | Compression quality (range: 1-100). Default value is `75`.     | Compression quality (1-100). Default is `75`. |


### Public API Key
```js
mSW0LMB5Pj4pNWWiRGfHL89KYdzrdWNM
```
_The Public API key is only for `testing purposes`. Please do not use it in production._


### File Constraints

- **Max Total Size**: 250 MB
- **Max File Size**: 16 MB per file
- **Max Files Count**: 30 files

## Request Examples

### Single File Upload:

```html

<form action="https://api.akshayraj.io/image-compressor/:version/" method="POST" enctype="multipart/form-data">
    <input type="file" name="files"/>
    <input type="text" name="quality" value="80"/>
    <input type="hidden" name="key" value="your_api_key"/>
    <button type="submit">Upload & Compress</button>
</form>
```

### Multiple File Upload:

```html

<form action="https://api.akshayraj.io/image-compressor/:version/" method="POST" enctype="multipart/form-data">
    <input type="file" name="files" multiple/>
    <input type="text" name="quality" value="80"/>
    <input type="hidden" name="key" value="your_api_key"/>
    <button type="submit">Upload & Compress</button>
</form>
```
_Alternatively, you can test the API using tools like Postman or cURL._


## Response Codes

| Status Code                  | Description                                 |
|------------------------------|---------------------------------------------|
| 200 OK                     	 | Successful request.                    	    |
| 400 Bad Request            	 | Invalid request or missing parameters. 	    |
| 401 Unauthorized           	 | Invalid API key.                       	    |
| 403 Forbidden              	 | File size limits exceeded.             	    |
| 405 Method Not Allowed       | Invalid request method.                   	 |
| 415 Unsupported Media Type 	 | Unsupported Media Type.                	    |
| 500 Internal Server Error  	 | Processing error.                       	   |


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
    "total_count": 3,
    "total_success": 2,
    "total_original_size": 777687,
    "total_compressed_size": 122120,
    "images": [
      {
        "id": "unique-id",
        "success": true,
        "status_code": 200,
        "message": "Successful",
        "original_name": "image1.jpg",
        "original_size": 123456,
        "compressed_name": "compressed_image1.jpg",
        "compressed_size": 78910,
        "mime_type": "image/jpeg",
        "url": "https://api.akshayraj.io/image-compressor/:version/downloads/?file=compressed_image1.jpg"
      },
      {
        "id": "unique-id",
        "success": true,
        "status_code": 200,
        "message": "Successful",
        "original_name": "image2.png",
        "original_size": 654321,
        "compressed_name": "compressed_image2.png",
        "compressed_size": 43210,
        "mime_type": "image/png",
        "url": "https://api.akshayraj.io/image-compressor/:version/downloads/?file=compressed_image2.png"
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
        "mime_type": "image/x-icon",
        "url": null
      }
    ]
  }
}

```

_Original and compressed sizes are in bytes_

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
  "message": "Total file size limit exceeded: 272154800"
}


```

**File Size Exceeded**:

```json
{
  "success": false,
  "status_code": 403,
  "message": "File too large: image1.jpg"
}

```

## Notes

- Uploaded files are deleted after successful compression.
- Compressed images are automatically deleted after an hour of creation.
- API may change; it's not intended for commercial use.
- Returned compressed sizes in response are represented in bytes.

If you have any questions or feedback, please feel free
to [raise an issue](https://github.com/akshayraj-1/img-compressor/issues)