const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const { koaBody } = require('koa-body');
const fs = require('fs-extra');
const path = require('path');

// Initialize Koa app and router
const app = new Koa();
const router = new Router();

// Ensure uploads directory exists
fs.ensureDirSync(path.join(__dirname, 'uploads'));

// Middleware for parsing request body and handling file uploads
app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, 'uploads'),
    keepExtensions: true,
    maxFieldsSize: 10 * 1024 * 1024, // 10MB limit
  }
}));

// Serve static files from the public directory
app.use(serve(path.join(__dirname, 'public')));

// API endpoint for file upload
router.post('/api/upload', async (ctx) => {
  try {
    const file = ctx.request.files.file;
    if (!file) {
      ctx.status = 400;
      ctx.body = { success: false, message: 'No file uploaded' };
      return;
    }

    // Get the original filename
    const originalFilename = file.originalFilename;
    
    // Create the new path with the original filename
    const newPath = path.join(__dirname, 'uploads', originalFilename);
    
    // If a file with the same name exists, remove it
    if (await fs.exists(newPath)) {
      await fs.remove(newPath);
    }
    
    // Rename the uploaded file to use the original filename
    await fs.rename(file.filepath, newPath);
    
    // Generate URL for the uploaded file
    const fileUrl = `/api/files/${originalFilename}`;
    
    ctx.body = {
      success: true,
      filename: originalFilename,
      url: fileUrl
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { success: false, message: error.message };
  }
});

// API endpoint for listing files
router.get('/api/files', async (ctx) => {
  try {
    const files = await fs.readdir(path.join(__dirname, 'uploads'));
    const fileList = files.map(file => ({
      name: file,
      url: `/api/files/${file}`
    }));
    
    ctx.body = {
      success: true,
      files: fileList
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { success: false, message: error.message };
  }
});

// API endpoint for deleting files
router.delete('/api/delete/:filename', async (ctx) => {
  try {
    const filename = ctx.params.filename;
    const filePath = path.join(__dirname, 'uploads', filename);
    
    if (await fs.exists(filePath)) {
      await fs.remove(filePath);
      ctx.body = {
        success: true,
        message: `File ${filename} deleted successfully`
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        success: false,
        message: `File ${filename} not found`
      };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { success: false, message: error.message };
  }
});

// API endpoint to serve files directly
router.get('/api/files/:filename', async (ctx) => {
  try {
    const filename = ctx.params.filename;
    const filePath = path.join(__dirname, 'uploads', filename);
    
    if (await fs.exists(filePath)) {
      ctx.attachment(filename);
      ctx.type = path.extname(filename);
      ctx.body = fs.createReadStream(filePath);
    } else {
      ctx.status = 404;
      ctx.body = { success: false, message: 'File not found' };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { success: false, message: error.message };
  }
});

// Apply routes
app.use(router.routes()).use(router.allowedMethods());

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 