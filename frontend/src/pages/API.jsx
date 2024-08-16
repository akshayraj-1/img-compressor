import {useState} from "react";

function API() {

    const [show] = useState(false);

    return (
        show &&
        <section className="h-auto w-screen px-6 sm:px-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Image Compression API Documentation</h1>
            <p className="mb-4 text-gray-600">This API allows users to upload and compress images with specified quality
                settings. It supports both single and multiple image uploads and ensures that only accepted file types
                are processed. The API has restrictions on individual and total file sizes. Below is the detailed
                documentation of the API endpoints, request parameters, response format, and error handling.</p>

            <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-2">Base URL</h2>
            <p className="mb-4 text-gray-600"><code
                className="bg-gray-100 p-1 rounded">https://api.igyaanstudios.com/</code></p>

            <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-2">Download Base URL for Compressed Images</h2>
            <p className="mb-4 text-gray-600"><code
                className="bg-gray-100 p-1 rounded">https://api.igyaanstudios.com/image-compressor/v1/downloads/</code>
            </p>

            <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-2">Endpoint</h2>
            <p className="mb-4 text-gray-600"><code className="bg-gray-100 p-1 rounded">/image-compressor/v1/</code></p>

            <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-2">Request Headers</h2>
            <ul className="list-disc ml-6 mb-4 text-gray-600">
                <li><code className="bg-gray-100 p-1 rounded">Access-Control-Allow-Origin: *</code></li>
                <li><code className="bg-gray-100 p-1 rounded">Access-Control-Allow-Methods: POST, GET, OPTIONS</code>
                </li>
                <li><code className="bg-gray-100 p-1 rounded">Access-Control-Allow-Headers: Authorization,
                    Content-Type</code></li>
                <li><code className="bg-gray-100 p-1 rounded">Content-Type: application/json; charset=utf-8</code></li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-2">Allowed Methods</h2>
            <ul className="list-disc ml-6 mb-4 text-gray-600">
                <li><strong>POST</strong>: Upload and compress images.</li>
                <li><strong>OPTIONS</strong>: Pre-flight request for CORS.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-2">Response Codes</h2>
            <ul className="list-disc ml-6 mb-4 text-gray-600">
                <li><strong>200 OK</strong>: Request was successful.</li>
                <li><strong>400 Bad Request</strong>: Invalid request method or missing parameters.</li>
                <li><strong>401 Unauthorized</strong>: Invalid API key.</li>
                <li><strong>403 Forbidden</strong>: Total file size limit exceeded.</li>
                <li><strong>415 Unsupported Media Type</strong>: Unsupported file type.</li>
                <li><strong>500 Internal Server Error</strong>: Error during file processing.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-2">Request Method</h2>
            <p className="mb-4 text-gray-600"><code className="bg-gray-100 p-1 rounded">POST</code></p>

            <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-2">Request Parameters</h2>
            <ol className="list-decimal ml-6 mb-4 text-gray-600">
                <li>
                    <strong><code className="bg-gray-100 p-1 rounded">key</code></strong> (required):
                    <ul className="list-disc ml-6">
                        <li><strong>Type</strong>: <code className="bg-gray-100 p-1 rounded">String</code></li>
                        <li><strong>Description</strong>: The API key required to authenticate the request.</li>
                        <li><strong>Example</strong>: <code className="bg-gray-100 p-1 rounded">"your_api_key"</code>
                        </li>
                    </ul>
                </li>
                <li>
                    <strong><code className="bg-gray-100 p-1 rounded">files</code></strong> (required):
                    <ul className="list-disc ml-6">
                        <li><strong>Type</strong>: <code className="bg-gray-100 p-1 rounded">File | File[]</code></li>
                        <li><strong>Description</strong>: The images to be uploaded and compressed. This parameter can
                            be a single file or an array of files.
                        </li>
                        <li><strong>Example</strong>: Upload one file or multiple files (PNG, JPG, JPEG).</li>
                    </ul>
                </li>
                <li>
                    <strong><code className="bg-gray-100 p-1 rounded">quality</code></strong> (optional):
                    <ul className="list-disc ml-6">
                        <li><strong>Type</strong>: <code className="bg-gray-100 p-1 rounded">Integer | Integer[]</code>
                        </li>
                        <li><strong>Description</strong>: Compression quality ranging from <code
                            className="bg-gray-100 p-1 rounded">1</code> (worst) to <code
                            className="bg-gray-100 p-1 rounded">100</code> (best). If multiple files are uploaded, you
                            can pass an array of quality values corresponding to each image.
                        </li>
                        <li><strong>Default</strong>: <code className="bg-gray-100 p-1 rounded">75</code></li>
                        <li><strong>Example</strong>: <code className="bg-gray-100 p-1 rounded">75</code> or <code
                            className="bg-gray-100 p-1 rounded">[80, 60, 90]</code></li>
                    </ul>
                </li>
            </ol>

            <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-2">File Constraints</h2>
            <ol className="list-decimal ml-6 mb-4 text-gray-600">
                <li>
                    <strong><code className="bg-gray-100 p-1 rounded">MAX_TOTAL_SIZE</code></strong>:
                    <ul className="list-disc ml-6">
                        <li><strong>Value</strong>: <code className="bg-gray-100 p-1 rounded">50 MB</code></li>
                        <li><strong>Description</strong>: The total size of all uploaded files combined should not
                            exceed <code className="bg-gray-100 p-1 rounded">50 MB</code>.
                        </li>
                    </ul>
                </li>
                <li>
                    <strong><code className="bg-gray-100 p-1 rounded">MAX_FILE_SIZE</code></strong>:
                    <ul className="list-disc ml-6">
                        <li><strong>Value</strong>: <code className="bg-gray-100 p-1 rounded">15 MB</code></li>
                        <li><strong>Description</strong>: Individual file size should not exceed <code
                            className="bg-gray-100 p-1 rounded">15 MB</code>.
                        </li>
                    </ul>
                </li>
                <li>
                    <strong>Accepted File Types</strong>:
                    <ul className="list-disc ml-6">
                        <li><strong>Types</strong>: <code className="bg-gray-100 p-1 rounded">PNG, JPG, JPEG</code></li>
                        <li><strong>Description</strong>: Only files with the extensions <code
                            className="bg-gray-100 p-1 rounded">.png</code>, <code
                            className="bg-gray-100 p-1 rounded">.jpg</code>, or <code
                            className="bg-gray-100 p-1 rounded">.jpeg</code> are accepted. Unsupported file types will
                            result in an error.
                        </li>
                    </ul>
                </li>
            </ol>

            <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-2">Request Examples</h2>

            <h3 className="text-xl font-semibold text-gray-700 mt-4 mb-2">Single File Upload:</h3>
            <p className="mb-4 text-gray-600"><strong>CURL Example:</strong></p>
            <pre className="bg-gray-100 p-4 rounded mb-4"><code>
                curl -X POST "https://api.igyaanstudios.com/image-compressor/v1/" \\
                -H "Content-Type: multipart/form-data" \\
                -F "key=your_api_key" \\
                -F "files=@path_to_your_file/image1.jpg" \\
                -F "quality=80"
            </code></pre>

            <h3 className="text-xl font-semibold text-gray-700 mt-4 mb-2">Multiple Files Upload:</h3>
            <p className="mb-4 text-gray-600"><strong>CURL Example:</strong></p>
            <pre className="bg-gray-100 p-4 rounded mb-4"><code>
                curl -X POST "https://api.igyaanstudios.com/image-compressor/v1/" \\
                -H "Content-Type: multipart/form-data" \\
                -F "key=your_api_key" \\
                -F "files[]=@path_to_your_file/image1.jpg" \\
                -F "files[]=@path_to_your_file/image2.png" \\
                -F "quality[]=75" \\
                -F "quality[]=85"
            </code></pre>

            <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-2">Success Response</h2>
            <pre className="bg-gray-100 p-4 rounded mb-4"><code>
                {
                    "{\n" +
                    "    \"status\": \"success\",\n" +
                    "    \"message\": \"success\",\n" +
                    "    \"data\": {\n" +
                    "    \"images\": [\n" +
                    "{\n" +
                    "    \"id\": \"temp_1234567890\",\n" +
                    "    \"original_name\": \"image1.jpg\",\n" +
                    "    \"original_size\": 2000000,\n" +
                    "    \"compressed_size\": 1500000,\n" +
                    "    \"compressed_file\": \"https://api.igyaanstudios.com/image-compressor/v1/downloads/image1_compressed.jpg\",\n" +
                    "    \"image_type\": \"image/jpg\"\n" +
                    "},\n" +
                    "{\n" +
                    "    \"id\": \"temp_0987654321\",\n" +
                    "    \"original_name\": \"image2.png\",\n" +
                    "    \"original_size\": 3000000,\n" +
                    "    \"compressed_size\": 2000000,\n" +
                    "    \"compressed_file\": \"https://api.igyaanstudios.com/image-compressor/v1/downloads/image2_compressed.png\",\n" +
                    "    \"image_type\": \"image/jpg\"\n" +
                    "}\n" +
                    "    ],\n" +
                    "    \"total_count\": 2,\n" +
                    "    \"total_original_size\": 7000000,\n" +
                    "    \"total_compressed_size\": 4500000\n" +
                    "}\n" +
                    "}"
                }
            </code></pre>

            <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-2">Error Responses</h2>

            <h3 className="text-xl font-semibold text-gray-700 mt-4 mb-2">Invalid API Key</h3>
            <pre className="bg-gray-100 p-4 rounded mb-4"><code>
                {
                    "{\n" +
                    "    \"status\": \"error\",\n" +
                    "    \"message\": \"Invalid API Key\",\n" +
                    "    \"code\": 401\n" +
                    "}"
                }
            </code></pre>

            <h3 className="text-xl font-semibold text-gray-700 mt-4 mb-2">No Image Provided</h3>
            <pre className="bg-gray-100 p-4 rounded mb-4"><code>
                {
                    "{\n" +
                    "    \"status\": \"error\",\n" +
                    "    \"message\": \"No image provided\",\n" +
                    "    \"code\": 400\n" +
                    "}"
                }
            </code></pre>

            <h3 className="text-xl font-semibold text-gray-700 mt-4 mb-2">Total File Size Exceeded</h3>
            <pre className="bg-gray-100 p-4 rounded mb-4"><code>
                {
                    "{\n" +
                    "    \"status\": \"error\",\n" +
                    "    \"message\": \"Total file size limit is exceeded: [size => 52000000, limit => 50000000]\",\n" +
                    "    \"code\": 403\n" +
                    "}"
                }
            </code></pre>

            <h3 className="text-xl font-semibold text-gray-700 mt-4 mb-2">File Size Exceeded for a Single File</h3>
            <pre className="bg-gray-100 p-4 rounded mb-4"><code>
                {
                    "{\n" +
                    "    \"status\": \"error\",\n" +
                    "    \"message\": \"File size limit exceed: [file => image1.jpg, size => 20000000]\",\n" +
                    "    \"code\": 400\n" +
                    "}"
                }
            </code></pre>

            <h3 className="text-xl font-semibold text-gray-700 mt-4 mb-2">Unsupported File Type</h3>
            <pre className="bg-gray-100 p-4 rounded mb-4"><code>
                {
                    "{\n" +
                    "    \"status\": \"error\",\n" +
                    "    \"message\": \"Unsupported file type: [file => image1.gif, type => image/gif]\",\n" +
                    "    \"code\": 415\n" +
                    "}"
                }
            </code></pre>

            <h3 className="text-xl font-semibold text-gray-700 mt-4 mb-2">Compression Failure</h3>
            <pre className="bg-gray-100 p-4 rounded mb-4"><code>
                {
                    "{\n" +
                    "    \"status\": \"error\",\n" +
                    "    \"message\": \"Compression failed for image1.jpg\",\n" +
                    "    \"code\": 500\n" +
                    "}"
                }
            </code></pre>

            <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-2">Error Handling</h2>
            <ul className="list-disc ml-6 mb-4 text-gray-600">
                <li><strong>API Key Validation</strong>: If the API key is missing or invalid, the response will include
                    a <code className="bg-gray-100 p-1 rounded">401 Unauthorized</code> status code and an appropriate
                    error message.
                </li>
                <li><strong>Missing Image Files</strong>: If no image files are provided in the request, a <code
                    className="bg-gray-100 p-1 rounded">400 Bad Request</code> status code is returned.
                </li>
                <li><strong>File Size Validation</strong>: The API checks both individual file size and the total size
                    of all files. If any file exceeds <code className="bg-gray-100 p-1 rounded">15 MB</code>, or if the
                    total size exceeds <code className="bg-gray-100 p-1 rounded">50 MB</code>, an error response
                    with <code className="bg-gray-100 p-1 rounded">400 Bad Request</code> or <code
                        className="bg-gray-100 p-1 rounded">403 Forbidden</code> is sent respectively.
                </li>
                <li><strong>Unsupported File Type</strong>: If a file with an unsupported extension (not PNG, JPG, or
                    JPEG) is uploaded, the API will return a <code className="bg-gray-100 p-1 rounded">415 Unsupported
                        Media Type</code> status code with an error message indicating the unsupported file type.
                </li>
                <li><strong>Compression Errors</strong>: If any errors occur during compression, the API will delete any
                    already uploaded files and return a <code className="bg-gray-100 p-1 rounded">500 Internal Server
                        Error</code> with a description of the error.
                </li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-2">File Deletion Policy</h2>
            <p className="mb-4 text-gray-600">If an error occurs during file processing, any successfully compressed
                files are deleted to maintain consistency and avoid unnecessary storage usage.</p>

            <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-2">Security Considerations</h2>
            <ul className="list-disc ml-6 mb-4 text-gray-600">
                <li><strong>API Key Authentication</strong>: The API requires a valid API key to process requests.
                    Ensure that the key is kept confidential.
                </li>
                <li><strong>CORS Policy</strong>: The API allows cross-origin requests (<code
                    className="bg-gray-100 p-1 rounded">Access-Control-Allow-Origin: *</code>), but this can be
                    restricted as per your security requirements.
                </li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-2">Notes</h2>
            <ul className="list-disc ml-6 mb-4 text-gray-600">
                <li>Ensure that the <code className="bg-gray-100 p-1 rounded">downloads</code> directory is writable by
                    the server.
                </li>
                <li>You can adjust the <code className="bg-gray-100 p-1 rounded">MAX_TOTAL_SIZE</code> and <code
                    className="bg-gray-100 p-1 rounded">MAX_FILE_SIZE</code> constants as needed.
                </li>
                <li>The API currently supports image files with extensions <code
                    className="bg-gray-100 p-1 rounded">.png</code>, <code
                    className="bg-gray-100 p-1 rounded">.jpg</code>, and <code
                    className="bg-gray-100 p-1 rounded">.jpeg</code>.
                </li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-2">Conclusion</h2>
            <p className="mb-4 text-gray-600">This API provides efficient image compression with customizable quality
                settings. It supports both single and multiple image uploads, handles only the accepted file types, and
                ensures secure and reliable processing with comprehensive error handling.</p>
        </section>
    );
}

export default API;