import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, FileText, Video, Image } from 'lucide-react';

const FileUpload = ({ onFileUpload }) => {
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const fileType = getFileType(file);
      onFileUpload(file, fileType);
    });
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
      'video/*': ['.mp4', '.webm', '.mov', '.avi'],
      'application/pdf': ['.pdf'],
      'text/*': ['.txt', '.md'],
    },
    maxSize: 50 * 1024 * 1024, // 50MB
  });

  const getFileType = (file) => {
    if (file.type.startsWith('video/')) return 'video';
    if (file.type.startsWith('image/')) return 'image';
    return 'document';
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200
          ${isDragActive || dragActive
            ? 'border-sarya-purple bg-soft-lavender bg-opacity-50'
            : 'border-gray-300 hover:border-sarya-purple hover:bg-soft-lavender hover:bg-opacity-20'
          }
        `}
        onDragEnter={() => setDragActive(true)}
        onDragLeave={() => setDragActive(false)}
      >
        <input {...getInputProps()} />
        
        <motion.div
          animate={{ 
            scale: isDragActive ? 1.1 : 1,
            rotate: isDragActive ? 5 : 0 
          }}
          transition={{ duration: 0.2 }}
          className="flex flex-col items-center space-y-4"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-sarya-purple to-sky-blue rounded-full flex items-center justify-center">
            <Upload className="w-8 h-8 text-white" />
          </div>
          
          <div>
            <p className="text-lg font-medium text-deep-brown">
              {isDragActive ? 'Drop files here' : 'Upload your files'}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Drag & drop files here, or click to select
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Supports: Images, Videos, PDFs, Documents (Max 50MB)
            </p>
          </div>
        </motion.div>
      </div>

      {/* File Type Examples */}
      <div className="grid grid-cols-3 gap-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-cloud-white rounded-lg p-4 text-center border border-gray-200"
        >
          <Image className="w-6 h-6 text-grass-green mx-auto mb-2" />
          <p className="text-sm font-medium text-deep-brown">Images</p>
          <p className="text-xs text-gray-600">PNG, JPG, GIF</p>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-cloud-white rounded-lg p-4 text-center border border-gray-200"
        >
          <Video className="w-6 h-6 text-sky-blue mx-auto mb-2" />
          <p className="text-sm font-medium text-deep-brown">Videos</p>
          <p className="text-xs text-gray-600">MP4, WebM, MOV</p>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-cloud-white rounded-lg p-4 text-center border border-gray-200"
        >
          <FileText className="w-6 h-6 text-sarya-purple mx-auto mb-2" />
          <p className="text-sm font-medium text-deep-brown">Documents</p>
          <p className="text-xs text-gray-600">PDF, TXT, MD</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FileUpload;
