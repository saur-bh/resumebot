import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Upload, 
  Edit3, 
  Save, 
  X, 
  FileText, 
  Linkedin, 
  Github,
  Mail,
  MapPin,
  Calendar
} from 'lucide-react';
import axios from 'axios';

const ProfileSection = ({ profileData, onProfileUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [editData, setEditData] = useState({
    resume: '',
    socialMedia: '',
    additionalInfo: ''
  });
  const fileInputRef = useRef(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/data/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      if (response.data) {
        onProfileUpdate(response.data);
        alert('File uploaded successfully!');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.post('/api/data/personal-info', editData);
      if (response.data) {
        onProfileUpdate(editData);
        setIsEditing(false);
        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save profile. Please try again.');
    }
  };

  const handleEdit = () => {
    setEditData({
      resume: profileData?.resume || '',
      socialMedia: profileData?.socialMedia || '',
      additionalInfo: profileData?.additionalInfo || ''
    });
    setIsEditing(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Profile Card */}
      <div className="glass rounded-2xl p-6 card-hover">
        <div className="text-center">
          {/* Profile Image Placeholder */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative mx-auto mb-4"
          >
            <div className="w-32 h-32 bg-gradient-to-br from-sarya-purple to-sky-blue rounded-full flex items-center justify-center mx-auto profile-image">
              <User className="w-16 h-16 text-white" />
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-2 -right-2 bg-sunshine-yellow text-white p-2 rounded-full shadow-lg hover:bg-yellow-500 transition-colors"
            >
              <Upload className="w-4 h-4" />
            </motion.button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-deep-brown mb-2"
          >
            Saurabh
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-sarya-purple font-medium mb-4"
          >
            QA Engineer & Testing Specialist
          </motion.p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-grass-green">5+</div>
              <div className="text-sm text-deep-brown">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-sky-blue">100+</div>
              <div className="text-sm text-deep-brown">Projects Tested</div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Management Card */}
      <div className="glass rounded-2xl p-6 card-hover">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-deep-brown flex items-center gap-2">
            <FileText className="w-5 h-5 text-sarya-purple" />
            Data Sources
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEdit}
            className="p-2 text-sarya-purple hover:bg-sarya-purple hover:text-white rounded-lg transition-colors"
          >
            <Edit3 className="w-4 h-4" />
          </motion.button>
        </div>

        <AnimatePresence>
          {isEditing ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-deep-brown mb-2">
                  Resume/CV Content
                </label>
                <textarea
                  value={editData.resume}
                  onChange={(e) => setEditData({...editData, resume: e.target.value})}
                  className="w-full p-3 border border-soft-lavender rounded-lg input-focus resize-none"
                  rows="4"
                  placeholder="Paste your resume content here..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-deep-brown mb-2">
                  Social Media & Professional Profiles
                </label>
                <textarea
                  value={editData.socialMedia}
                  onChange={(e) => setEditData({...editData, socialMedia: e.target.value})}
                  className="w-full p-3 border border-soft-lavender rounded-lg input-focus resize-none"
                  rows="3"
                  placeholder="LinkedIn, GitHub, portfolio links, etc..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-deep-brown mb-2">
                  Additional Information
                </label>
                <textarea
                  value={editData.additionalInfo}
                  onChange={(e) => setEditData({...editData, additionalInfo: e.target.value})}
                  className="w-full p-3 border border-soft-lavender rounded-lg input-focus resize-none"
                  rows="3"
                  placeholder="Any other relevant information..."
                />
              </div>

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSave}
                  className="flex-1 btn-primary text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-sarya-purple text-sarya-purple rounded-lg hover:bg-sarya-purple hover:text-white transition-colors flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-3 p-3 bg-cloud-white rounded-lg">
                <FileText className="w-5 h-5 text-grass-green" />
                <div>
                  <div className="font-medium text-deep-brown">Resume Data</div>
                  <div className="text-sm text-gray-600">
                    {profileData?.resume ? 'Available' : 'Not uploaded'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-cloud-white rounded-lg">
                <Linkedin className="w-5 h-5 text-sky-blue" />
                <div>
                  <div className="font-medium text-deep-brown">Social Profiles</div>
                  <div className="text-sm text-gray-600">
                    {profileData?.socialMedia ? 'Available' : 'Not uploaded'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-cloud-white rounded-lg">
                <Github className="w-5 h-5 text-deep-brown" />
                <div>
                  <div className="font-medium text-deep-brown">Additional Info</div>
                  <div className="text-sm text-gray-600">
                    {profileData?.additionalInfo ? 'Available' : 'Not uploaded'}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Upload Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="w-full mt-4 btn-secondary text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isUploading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              Upload Resume/Documents
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProfileSection;
