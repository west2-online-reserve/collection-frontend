# Simple File Management Server

A simple HTTP server built with Koa.js that provides file management capabilities.

## Features

- Upload files to the server
- List all uploaded files
- Delete files from the server
- Download files from the server
- User-friendly web interface

## API Endpoints

- `POST /api/upload` - Upload a file
- `GET /api/files` - Get a list of all files
- `DELETE /api/delete/:filename` - Delete a specific file
- `GET /api/files/:filename` - Download a specific file

## Prerequisites

- Node.js (v12 or higher)
- npm (v6 or higher)

## Installation

1. Clone this repository or download the source code
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

## Running the Server

Start the server with:

```bash
node server.js
```

The server will start on port 3000 by default. You can access the web interface by opening `http://localhost:3000` in your web browser.

## Directory Structure

- `server.js` - Main server file
- `public/` - Static files (HTML, CSS, JavaScript)
- `uploads/` - Directory where uploaded files are stored

## Usage

1. Open the web interface at `http://localhost:3000`
2. Use the "Upload File" section to upload files
3. View the list of uploaded files in the "File List" section
4. Click on a file name to download it
5. Click the "Delete" button to remove a file

## License

MIT 