const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs-extra');
const path = require('path');
const { updateDataSource } = require('../services/dataService');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    fs.ensureDirSync(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf|txt|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images, PDFs, and text documents are allowed'));
    }
  }
});

// Upload resume or documents
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const fileName = req.file.originalname;
    const fileType = req.file.mimetype;

    // Process the uploaded file and update data source
    await updateDataSource(filePath, fileName, fileType);

    res.json({
      message: 'File uploaded successfully',
      fileName: fileName,
      fileType: fileType
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      error: 'Failed to upload file',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Upload failed'
    });
  }
});

// Update personal information
router.post('/personal-info', async (req, res) => {
  try {
    const { resume, socialMedia, additionalInfo } = req.body;

    if (!resume && !socialMedia && !additionalInfo) {
      return res.status(400).json({ error: 'At least one field is required' });
    }

    const personalData = {
      resume: resume || '',
      socialMedia: socialMedia || '',
      additionalInfo: additionalInfo || '',
      lastUpdated: new Date().toISOString()
    };

    await updateDataSource(null, null, null, personalData);

    res.json({
      message: 'Personal information updated successfully',
      timestamp: personalData.lastUpdated
    });

  } catch (error) {
    console.error('Personal info update error:', error);
    res.status(500).json({ 
      error: 'Failed to update personal information',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Update failed'
    });
  }
});

// Get current data source info
router.get('/info', async (req, res) => {
  try {
    const dataSource = await getDataSource();
    
    res.json({
      hasData: dataSource.length > 0,
      dataLength: dataSource.length,
      lastUpdated: new Date().toISOString()
    });

  } catch (error) {
    console.error('Data info error:', error);
    res.status(500).json({ error: 'Failed to get data source info' });
  }
});

module.exports = router;
