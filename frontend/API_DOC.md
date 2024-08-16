<h1>Image Compression API Documentation</h1>

<p>This API allows users to upload and compress images with specified quality settings. It supports both single and multiple image uploads and ensures that only accepted file types are processed. The API has restrictions on individual and total file sizes. Below is the detailed documentation of the API endpoints, request parameters, response format, and error handling.</p>

<h3>Base URL</h3>
<p><code>https://api.igyaanstudios.com/</code></p>

<h3>Download Base URL for Compressed Images</h3>
<p><code>https://api.igyaanstudios.com/image-compressor/v1/downloads/</code></p>

<h3>Endpoint</h3>
<p><code>/image-compressor/v1/</code></p>

<h3>Request Headers</h3>
<ul>
    <li><code>Access-Control-Allow-Origin: *</code></li>
    <li><code>Access-Control-Allow-Methods: POST, GET, OPTIONS</code></li>
    <li><code>Access-Control-Allow-Headers: Authorization, Content-Type</code></li>
    <li><code>Content-Type: application/json; charset=utf-8</code></li>
</ul>

<h3>Allowed Methods</h3>
<ul>
    <li><strong>POST</strong>: Upload and compress images.</li>
    <li><strong>OPTIONS</strong>: Pre-flight request for CORS.</li>
</ul>

<h3>Response Codes</h3>
<ul>
    <li><strong>200 OK</strong>: Request was successful.</li>
    <li><strong>400 Bad Request</strong>: Invalid request method or missing parameters.</li>
    <li><strong>401 Unauthorized</strong>: Invalid API key.</li>
    <li><strong>403 Forbidden</strong>: Total file size limit exceeded.</li>
    <li><strong>415 Unsupported Media Type</strong>: Unsupported file type.</li>
    <li><strong>500 Internal Server Error</strong>: Error during file processing.</li>
</ul>

<h3>Request Method</h3>
<p><code>POST</code></p>

<h3>Request Parameters</h3>

<ol>
    <li>
        <strong><code>key</code></strong> (required):
        <ul>
            <li><strong>Type</strong>: <code>String</code></li>
            <li><strong>Description</strong>: The API key required to authenticate the request.</li>
            <li><strong>Example</strong>: <code>"your_api_key"</code></li>
        </ul>
    </li>
    <li>
        <strong><code>files</code></strong> (required):
        <ul>
            <li><strong>Type</strong>: <code>File | File[]</code></li>
            <li><strong>Description</strong>: The images to be uploaded and compressed. This parameter can be a single file or an array of files.</li>
            <li><strong>Example</strong>: Upload one file or multiple files (PNG, JPG, JPEG).</li>
        </ul>
    </li>
    <li>
        <strong><code>quality</code></strong> (optional):
        <ul>
            <li><strong>Type</strong>: <code>Integer | Integer[]</code></li>
            <li><strong>Description</strong>: Compression quality ranging from <code>1</code> (worst) to <code>100</code> (best). If multiple files are uploaded, you can pass an array of quality values corresponding to each image.</li>
            <li><strong>Default</strong>: <code>75</code></li>
            <li><strong>Example</strong>: <code>75</code> or <code>[80, 60, 90]</code></li>
        </ul>
    </li>
</ol>

<h3>File Constraints</h3>

<ol>
    <li>
        <strong><code>MAX_TOTAL_SIZE</code></strong>:
        <ul>
            <li><strong>Value</strong>: <code>50 MB</code></li>
            <li><strong>Description</strong>: The total size of all uploaded files combined should not exceed <code>50 MB</code>.</li>
        </ul>
    </li>
    <li>
        <strong><code>MAX_FILE_SIZE</code></strong>:
        <ul>
            <li><strong>Value</strong>: <code>15 MB</code></li>
            <li><strong>Description</strong>: Individual file size should not exceed <code>15 MB</code>.</li>
        </ul>
    </li>
    <li>
        <strong>Accepted File Types</strong>:
        <ul>
            <li><strong>Types</strong>: <code>PNG, JPG, JPEG</code></li>
            <li><strong>Description</strong>: Only files with the extensions <code>.png</code>, <code>.jpg</code>, or <code>.jpeg</code> are accepted. Unsupported file types will result in an error.</li>
        </ul>
    </li>
</ol>

<h3>Request Examples</h3>

<strong>Test API Key</strong>: 
<code>"mSW0LMB5Pj4pNWWiRGfHL89KYdzrdWNM"</code>

<h3>Single File Upload:</h3>

<p><strong>CURL Example:</strong></p>
<pre><code>curl -X POST https://api.igyaanstudios.com/image-compressor/v1/ \
-F "key=your_api_key" \
-F "files=@image1.jpg" \
-F "quality=80"
</code></pre>

<p><strong>Multipart Form Data Example:</strong></p>
<pre><code>&lt;form action="https://api.igyaanstudios.com/image-compressor/v1/" method="POST" enctype="multipart/form-data"&gt;
    &lt;input type="file" name="files"&gt;
    &lt;input type="text" name="quality" value="80"&gt;
    &lt;input type="hidden" name="key" value="your_api_key"&gt;
    &lt;button type="submit"&gt;Upload & Compress&lt;/button&gt;
&lt;/form&gt;
</code></pre>

<h3>Multiple Files Upload:</h3>

<p><strong>CURL Example:</strong></p>
<pre><code>curl -X POST https://api.igyaanstudios.com/image-compressor/v1/ \
-F "key=your_api_key" \
-F "files[]=@image1.jpg" \
-F "files[]=@image2.png" \
-F "quality[]=80" \
-F "quality[]=60"
</code></pre>

<p><strong>Multipart Form Data Example:</strong></p>
<pre><code>&lt;form action="https://api.igyaanstudios.com/image-compressor/v1/" method="POST" enctype="multipart/form-data"&gt;
    &lt;input type="file" name="files[]" multiple&gt;
    &lt;input type="text" name="quality[]" value="80"&gt;
    &lt;input type="text" name="quality[]" value="60"&gt;
    &lt;input type="hidden" name="key" value="your_api_key"&gt;
    &lt;button type="submit"&gt;Upload & Compress&lt;/button&gt;
&lt;/form&gt;
</code></pre>

<h3>Response Format</h3>

<p>The API returns a JSON response containing the status of the request and the details of the compressed images.</p>

<h3>Success Response</h3>

<p><strong>HTTP Status Code</strong>: <code>200 OK</code></p>
<pre><code>{
  "status": "success",
  "data": {
    "images": [
      {
        "original_name": "image1.jpg",
        "original_size": 2000000,
        "compressed_size": 1500000,
        "compressed_file": "downloads/image1_compressed.jpg",
        "url": "https://api.igyaanstudios.com/image-compressor/v1/downloads/image1_compressed.jpg",
        "image_type": "image/jpg"
      },
      {
        "original_name": "image2.png",
        "original_size": 5000000,
        "compressed_size": 3000000,
        "compressed_file": "downloads/image2_compressed.png",
        "url": "https://api.igyaanstudios.com/image-compressor/v1/downloads/image2_compressed.png",
        "image_type": "image/jpg"
      }
    ],
    "total_count": 2,
    "total_original_size": 7000000,
    "total_compressed_size": 4500000
  }
}
</code></pre>

<h3>Error Responses</h3>

<p><strong>Invalid API Key</strong></p>
<pre><code>{
  "status": "error",
  "message": "Invalid API Key",
  "code": 401
}
</code></pre>

<p><strong>No Image Provided</strong></p>
<pre><code>{
  "status": "error",
  "message": "No image provided",
  "code": 400
}
</code></pre>

<p><strong>Total File Size Exceeded</strong></p>
<pre><code>{
  "status": "error",
  "message": "Total file size limit is exceeded: [size => 52000000, limit => 50000000]",
  "code": 403
}
</code></pre>

<p><strong>File Size Exceeded for a Single File</strong></p>
<pre><code>{
  "status": "error",
  "message": "File size limit exceed: [file => image1.jpg, size => 20000000]",
  "code": 400
}
</code></pre>

<p><strong>Unsupported File Type</strong></p>
<pre><code>{
  "status": "error",
  "message": "Unsupported file type: [file => image1.gif, type => image/gif]",
  "code": 415
}
</code></pre>

<p><strong>Compression Failure</strong></p>
<pre><code>{
  "status": "error",
  "message": "Compression failed for image1.jpg",
  "code": 500
}
</code></pre>

<h3>Error Handling</h3>

<ul>
    <li><strong>API Key Validation</strong>: If the API key is missing or invalid, the response will include a <code>401 Unauthorized</code> status code and an appropriate error message.</li>
    <li><strong>Missing Image Files</strong>: If no image files are provided in the request, a <code>400 Bad Request</code> status code is returned.</li>
    <li><strong>File Size Validation</strong>: The API checks both individual file size and the total size of all files. If any file exceeds <code>15 MB</code>, or if the total size exceeds <code>50 MB</code>, an error response with <code>400 Bad Request</code> or <code>403 Forbidden</code> is sent respectively.</li>
    <li><strong>Unsupported File Type</strong>: If a file with an unsupported extension (not PNG, JPG, or JPEG) is uploaded, the API will return a <code>415 Unsupported Media Type</code> status code with an error message indicating the unsupported file type.</li>
    <li><strong>Compression Errors</strong>: If any errors occur during compression, the API will delete any already uploaded files and return a <code>500 Internal Server Error</code> with a description of the error.</li>
</ul>

<h3>File Deletion Policy</h3>

<p>If an error occurs during file processing, any successfully compressed files are deleted to maintain consistency and avoid unnecessary storage usage.</p>

<h3>Security Considerations</h3>

<ul>
    <li><strong>API Key Authentication</strong>: The API requires a valid API key to process requests. Ensure that the key is kept confidential.</li>
    <li><strong>CORS Policy</strong>: The API allows cross-origin requests (<code>Access-Control-Allow-Origin: *</code>), but this can be restricted as per your security requirements.</li>
</ul>

<h3>Notes</h3>

<ul>
    <li>Ensure that the <code>downloads</code> directory is writable by the server.</li>
    <li>You can adjust the <code>MAX_TOTAL_SIZE</code> and <code>MAX_FILE_SIZE</code> constants as needed.</li>
    <li>The API currently supports image files with extensions <code>.png</code>, <code>.jpg</code>, and <code>.jpeg</code>.</li>
</ul>

<h3>Conclusion</h3>

<p>This API provides efficient image compression with customizable quality settings. It supports both single and multiple image uploads, handles only the accepted file types, and ensures secure and reliable processing with comprehensive error handling.</p>