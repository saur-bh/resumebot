const fs = require('fs-extra');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/personalData.json');
const UPLOADS_DIR = path.join(__dirname, '../uploads');

// Ensure data directory exists
fs.ensureDirSync(path.dirname(DATA_FILE));
fs.ensureDirSync(UPLOADS_DIR);

class DataService {
  constructor() {
    this.dataSource = '';
    this.loadDataSource();
  }

  async loadDataSource() {
    try {
      if (await fs.pathExists(DATA_FILE)) {
        const data = await fs.readJson(DATA_FILE);
        this.dataSource = this.formatDataSource(data);
      } else {
        // Initialize with default data
        const defaultData = {
          resume: '',
          socialMedia: '',
          additionalInfo: '',
          lastUpdated: new Date().toISOString()
        };
        await fs.writeJson(DATA_FILE, defaultData, { spaces: 2 });
        this.dataSource = '';
      }
    } catch (error) {
      console.error('Error loading data source:', error);
      this.dataSource = '';
    }
  }

  formatDataSource(data) {
    let formattedData = '';
    
    if (data.resume) {
      formattedData += `RESUME/CV:\n${data.resume}\n\n`;
    }
    
    if (data.socialMedia) {
      formattedData += `SOCIAL MEDIA & PROFESSIONAL PROFILES:\n${data.socialMedia}\n\n`;
    }
    
    if (data.additionalInfo) {
      formattedData += `ADDITIONAL INFORMATION:\n${data.additionalInfo}\n\n`;
    }

    return formattedData.trim();
  }

  async updateDataSource(filePath = null, fileName = null, fileType = null, personalData = null) {
    try {
      let data = {};
      
      // Load existing data
      if (await fs.pathExists(DATA_FILE)) {
        data = await fs.readJson(DATA_FILE);
      }

      // Update with new personal data
      if (personalData) {
        data = { ...data, ...personalData };
      }

      // Process uploaded file
      if (filePath && fileName && fileType) {
        const fileContent = await this.extractFileContent(filePath, fileType);
        
        if (fileType.startsWith('image/')) {
          // Store image path for frontend display
          data.profileImage = filePath;
        } else {
          // Extract text content from documents
          if (fileName.toLowerCase().includes('resume') || fileName.toLowerCase().includes('cv')) {
            data.resume = fileContent;
          } else {
            data.additionalInfo = (data.additionalInfo || '') + '\n\n' + fileContent;
          }
        }
      }

      data.lastUpdated = new Date().toISOString();
      
      // Save updated data
      await fs.writeJson(DATA_FILE, data, { spaces: 2 });
      
      // Reload data source
      await this.loadDataSource();
      
      return data;
    } catch (error) {
      console.error('Error updating data source:', error);
      throw error;
    }
  }

  async extractFileContent(filePath, fileType) {
    try {
      if (fileType.startsWith('text/') || fileType === 'application/json') {
        return await fs.readFile(filePath, 'utf8');
      } else if (fileType === 'application/pdf') {
        // For PDF files, you might want to use a PDF parsing library
        // For now, return a placeholder
        return `[PDF Document: ${path.basename(filePath)} - Content extraction not implemented yet]`;
      } else if (fileType.includes('document') || fileType.includes('word')) {
        // For Word documents, you might want to use a docx parsing library
        return `[Document: ${path.basename(filePath)} - Content extraction not implemented yet]`;
      } else {
        return `[File: ${path.basename(filePath)} - Binary file, content not extractable]`;
      }
    } catch (error) {
      console.error('Error extracting file content:', error);
      return `[Error reading file: ${path.basename(filePath)}]`;
    }
  }

  getDataSource() {
    return this.dataSource;
  }

  async getPersonalData() {
    try {
      if (await fs.pathExists(DATA_FILE)) {
        return await fs.readJson(DATA_FILE);
      }
      return null;
    } catch (error) {
      console.error('Error getting personal data:', error);
      return null;
    }
  }
}

const dataService = new DataService();

module.exports = {
  getDataSource: () => dataService.getDataSource(),
  updateDataSource: (filePath, fileName, fileType, personalData) => 
    dataService.updateDataSource(filePath, fileName, fileType, personalData),
  getPersonalData: () => dataService.getPersonalData()
};
