<h1 style="text-align: center;">ImgCompressor (Under Development)</h1>
<hr>

<div style="display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 30px 0;">
<a href="https://imgcompressor-app.web.app">
<img alt="logo" src="https://imgcompressor-app.web.app/images/logo.svg" width="290px">
</a>
<p style="text-align: center;"><i>
User-friendly app designed to compress images with a single click, making it easier to reduce image file sizes without compromising quality.
</i></p>
<div style="display: flex; align-items: center; gap: 8px;">
<a href="https://imgcompressor-app.web.app">Visit Website</a> | 
<a href="API_DOC.md">API Documentation</a>
</div>
</div>

<hr>

## Features

- **One-Click Compression:** Compress images effortlessly with just a single click.
- **High-Quality Retention:** Reduce the size of your images while preserving their original quality.
- **Batch Processing:** Compress multiple images at once for increased efficiency.

## Stack

- **Frontend:** React (Vite)
- **Backend:** PHP (Custom Compressor API)

## Usage

1. **Upload:** Select the image(s) you want to compress.
2. **Compress:** Click the compress button to reduce the image size.
3. **Download:** Save the compressed image(s) to your device.

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**

```bash
   git clone https://github.com/akshayraj-1/ImageCompressor.git
   cd ImageCompressor
```

2. **Install dependencies**

```bash
   npm install
```

### Run the Development Server

Start the development server:

```bash
   npm run dev
```

This will start the app by default locally at http://localhost:3939.

### Building for Production

To build the project for production, run:

```bash
   npm run build
```

The output will be in the `dist/` directory, ready to be deployed.

## License

This project is licensed under the MIT License. See the full license [here](LICENSE).
