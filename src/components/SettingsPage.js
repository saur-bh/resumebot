import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Upload, 
  FileText, 
  Video, 
  Image, 
  Save, 
  LogOut, 
  Trash2,
  Plus,
  Eye,
  EyeOff,
  Settings
} from 'lucide-react';
import { logout } from '../firebase/auth';
import { useNavigate } from 'react-router-dom';
import { 
  saveProfileData, 
  getProfileData
} from '../firebase/firestore';
import FileUpload from './FileUpload';

// Helper function to extract YouTube video ID
const extractYouTubeId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const SettingsPage = ({ user }) => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    name: '',
    title: '',
    bio: '',
    skills: [],
    experience: '',
    projects: '',
    contact: {
      email: '',
      linkedin: '',
      github: '',
      portfolio: ''
    },
    apiSettings: {
      provider: 'openai', // openai, gemini, deepseek
      apiKey: '',
      model: 'gpt-3.5-turbo'
    },
    youtubeVideos: [],
    profilePhoto: '',
    resumeContent: '',
    commonQuestions: []
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    setLoading(true);
    try {
      const data = await getProfileData();
      if (data) {
        setProfileData(data);
        setUploadedFiles(data.files || []);
      }
    } catch (error) {
      console.error('Error loading profile data:', error);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveProfileData({
        ...profileData,
        files: uploadedFiles
      });
      alert('Profile saved successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Error saving profile. Please try again.');
    }
    setSaving(false);
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Resume.pdf';
    link.download = 'Saurabh_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const addSkill = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleFileUpload = (file, type) => {
    const newFile = {
      id: Date.now(),
      name: file.name,
      type: type,
      url: URL.createObjectURL(file),
      size: file.size,
      uploadDate: new Date()
    };
    setUploadedFiles(prev => [...prev, newFile]);
  };

  const handleFileDelete = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-muted-beige flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-soft-lavender border-t-sarya-purple rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-deep-brown">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted-beige">
      {/* Header */}
      <header className="bg-cloud-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-deep-brown">Profile Settings</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center space-x-2 px-4 py-2 text-sarya-purple hover:bg-soft-lavender rounded-lg transition-colors"
              >
                {showPreview ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                <span>{showPreview ? 'Hide Preview' : 'Show Preview'}</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-friendly-red hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Settings Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
            >
              <h2 className="text-xl font-semibold text-deep-brown mb-6 flex items-center">
                <User className="w-6 h-6 mr-2 text-sarya-purple" />
                Basic Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-deep-brown mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                    className="input-field"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-deep-brown mb-2">
                    Professional Title
                  </label>
                  <input
                    type="text"
                    value={profileData.title}
                    onChange={(e) => setProfileData(prev => ({ ...prev, title: e.target.value }))}
                    className="input-field"
                    placeholder="e.g., Senior QA Engineer"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-deep-brown mb-2">
                  Bio
                </label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                  className="input-field h-24 resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-deep-brown mb-2">
                  Profile Photo URL
                </label>
                <input
                  type="url"
                  value={profileData.profilePhoto}
                  onChange={(e) => setProfileData(prev => ({ ...prev, profilePhoto: e.target.value }))}
                  className="input-field"
                  placeholder="https://example.com/your-photo.jpg"
                />
                {profileData.profilePhoto && (
                  <div className="mt-2">
                    <img
                      src={profileData.profilePhoto}
                      alt="Profile preview"
                      className="w-16 h-16 rounded-full object-cover border-2 border-sarya-purple"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card"
            >
              <h2 className="text-xl font-semibold text-deep-brown mb-6 flex items-center">
                <FileText className="w-6 h-6 mr-2 text-grass-green" />
                Skills
              </h2>
              
              <div className="flex space-x-2 mb-4">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  className="input-field flex-1"
                  placeholder="Add a skill"
                />
                <button
                  onClick={addSkill}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {profileData.skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-soft-lavender text-deep-brown px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                  >
                    <span>{skill}</span>
                    <button
                      onClick={() => removeSkill(skill)}
                      className="text-sarya-purple hover:text-friendly-red"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Experience & Projects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card"
            >
              <h2 className="text-xl font-semibold text-deep-brown mb-6 flex items-center">
                <FileText className="w-6 h-6 mr-2 text-sky-blue" />
                Experience & Projects
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-deep-brown mb-2">
                    Work Experience
                  </label>
                  <textarea
                    value={profileData.experience}
                    onChange={(e) => setProfileData(prev => ({ ...prev, experience: e.target.value }))}
                    className="input-field h-32 resize-none"
                    placeholder="Describe your work experience..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-deep-brown mb-2">
                    Projects
                  </label>
                  <textarea
                    value={profileData.projects}
                    onChange={(e) => setProfileData(prev => ({ ...prev, projects: e.target.value }))}
                    className="input-field h-32 resize-none"
                    placeholder="Describe your projects..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-deep-brown mb-2">
                    Resume Content (for AI processing)
                  </label>
                  <textarea
                    value={profileData.resumeContent}
                    onChange={(e) => setProfileData(prev => ({ ...prev, resumeContent: e.target.value }))}
                    className="input-field h-40 resize-none"
                    placeholder="Paste your resume content here for AI to process and answer questions about it..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This content will be sent to the AI model to help answer questions about your resume
                  </p>
                </div>
                
                <div className="mt-4">
                  <button
                    onClick={handleDownloadResume}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Download Resume</span>
                  </button>
                  <p className="text-xs text-gray-500 mt-1">
                    Download Saurabh's resume as a PDF file
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card"
            >
              <h2 className="text-xl font-semibold text-deep-brown mb-6 flex items-center">
                <User className="w-6 h-6 mr-2 text-sunshine-yellow" />
                Contact Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-deep-brown mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={profileData.contact.email}
                    onChange={(e) => setProfileData(prev => ({ 
                      ...prev, 
                      contact: { ...prev.contact, email: e.target.value }
                    }))}
                    className="input-field"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-deep-brown mb-2">
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    value={profileData.contact.linkedin}
                    onChange={(e) => setProfileData(prev => ({ 
                      ...prev, 
                      contact: { ...prev.contact, linkedin: e.target.value }
                    }))}
                    className="input-field"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-deep-brown mb-2">
                    GitHub
                  </label>
                  <input
                    type="url"
                    value={profileData.contact.github}
                    onChange={(e) => setProfileData(prev => ({ 
                      ...prev, 
                      contact: { ...prev.contact, github: e.target.value }
                    }))}
                    className="input-field"
                    placeholder="https://github.com/yourusername"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-deep-brown mb-2">
                    Portfolio
                  </label>
                  <input
                    type="url"
                    value={profileData.contact.portfolio}
                    onChange={(e) => setProfileData(prev => ({ 
                      ...prev, 
                      contact: { ...prev.contact, portfolio: e.target.value }
                    }))}
                    className="input-field"
                    placeholder="https://yourportfolio.com"
                  />
                </div>
              </div>
            </motion.div>

            {/* API Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="card"
            >
              <h2 className="text-xl font-semibold text-deep-brown mb-6 flex items-center">
                <Settings className="w-6 h-6 mr-2 text-sky-blue" />
                AI API Settings
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-deep-brown mb-2">
                    AI Provider
                  </label>
                  <select
                    value={profileData.apiSettings.provider}
                    onChange={(e) => setProfileData(prev => ({ 
                      ...prev, 
                      apiSettings: { ...prev.apiSettings, provider: e.target.value }
                    }))}
                    className="input-field"
                  >
                    <option value="openai">OpenAI (GPT)</option>
                    <option value="gemini">Google Gemini</option>
                    <option value="deepseek">DeepSeek</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-deep-brown mb-2">
                    API Key
                  </label>
                  <input
                    type="password"
                    value={profileData.apiSettings.apiKey}
                    onChange={(e) => setProfileData(prev => ({ 
                      ...prev, 
                      apiSettings: { ...prev.apiSettings, apiKey: e.target.value }
                    }))}
                    className="input-field"
                    placeholder="Enter your API key"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Your API key is stored securely and only used for AI responses
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-deep-brown mb-2">
                    Model
                  </label>
                  <select
                    value={profileData.apiSettings.model}
                    onChange={(e) => setProfileData(prev => ({ 
                      ...prev, 
                      apiSettings: { ...prev.apiSettings, model: e.target.value }
                    }))}
                    className="input-field"
                  >
                    {profileData.apiSettings.provider === 'openai' && (
                      <>
                        <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                        <option value="gpt-4">GPT-4</option>
                        <option value="gpt-4-turbo">GPT-4 Turbo</option>
                      </>
                    )}
                    {profileData.apiSettings.provider === 'gemini' && (
                      <>
                        <option value="gemini-pro">Gemini Pro</option>
                        <option value="gemini-pro-vision">Gemini Pro Vision</option>
                      </>
                    )}
                    {profileData.apiSettings.provider === 'deepseek' && (
                      <>
                        <option value="deepseek-chat">DeepSeek Chat</option>
                        <option value="deepseek-coder">DeepSeek Coder</option>
                      </>
                    )}
                  </select>
                </div>
              </div>
            </motion.div>

            {/* YouTube Videos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="card"
            >
              <h2 className="text-xl font-semibold text-deep-brown mb-6 flex items-center">
                <Video className="w-6 h-6 mr-2 text-friendly-red" />
                YouTube Demo Videos
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-deep-brown mb-2">
                    Add YouTube Video
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="url"
                      placeholder="https://youtube.com/watch?v=..."
                      className="input-field flex-1"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          const url = e.target.value;
                          if (url.includes('youtube.com') || url.includes('youtu.be')) {
                            const videoId = extractYouTubeId(url);
                            if (videoId) {
                              setProfileData(prev => ({
                                ...prev,
                                youtubeVideos: [...prev.youtubeVideos, {
                                  id: Date.now(),
                                  videoId,
                                  url,
                                  title: 'Demo Video'
                                }]
                              }));
                              e.target.value = '';
                            }
                          }
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="btn-primary"
                      onClick={() => {
                        const input = document.querySelector('input[placeholder*="youtube"]');
                        const url = input.value;
                        if (url.includes('youtube.com') || url.includes('youtu.be')) {
                          const videoId = extractYouTubeId(url);
                          if (videoId) {
                            setProfileData(prev => ({
                              ...prev,
                              youtubeVideos: [...prev.youtubeVideos, {
                                id: Date.now(),
                                videoId,
                                url,
                                title: 'Demo Video'
                              }]
                            }));
                            input.value = '';
                          }
                        }
                      }}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {profileData.youtubeVideos.length > 0 && (
                  <div className="space-y-2">
                    {profileData.youtubeVideos.map((video) => (
                      <div key={video.id} className="flex items-center justify-between p-3 bg-soft-lavender rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Video className="w-5 h-5 text-friendly-red" />
                          <div>
                            <p className="font-medium text-deep-brown">{video.title}</p>
                            <p className="text-sm text-gray-600">{video.url}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setProfileData(prev => ({
                            ...prev,
                            youtubeVideos: prev.youtubeVideos.filter(v => v.id !== video.id)
                          }))}
                          className="text-friendly-red hover:bg-red-50 p-2 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* File Upload */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="card"
            >
              <h2 className="text-xl font-semibold text-deep-brown mb-6 flex items-center">
                <Upload className="w-6 h-6 mr-2 text-sarya-purple" />
                Upload Files
              </h2>
              
              <FileUpload onFileUpload={handleFileUpload} />
              
              {/* Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-deep-brown mb-4">Uploaded Files</h3>
                  <div className="space-y-3">
                    {uploadedFiles.map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-3 bg-soft-lavender rounded-lg">
                        <div className="flex items-center space-x-3">
                          {file.type === 'video' && <Video className="w-5 h-5 text-sky-blue" />}
                          {file.type === 'image' && <Image className="w-5 h-5 text-grass-green" />}
                          {file.type === 'document' && <FileText className="w-5 h-5 text-sarya-purple" />}
                          <div>
                            <p className="font-medium text-deep-brown">{file.name}</p>
                            <p className="text-sm text-gray-600">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleFileDelete(file.id)}
                          className="text-friendly-red hover:bg-red-50 p-2 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Save Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex justify-end"
            >
              <button
                onClick={handleSave}
                disabled={saving}
                className="btn-primary flex items-center space-x-2 disabled:opacity-50"
              >
                {saving ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                <span>{saving ? 'Saving...' : 'Save Profile'}</span>
              </button>
            </motion.div>
          </div>

          {/* Preview Panel */}
          {showPreview && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="card sticky top-8">
                <h3 className="text-lg font-semibold text-deep-brown mb-4">Preview</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-deep-brown">{profileData.name || 'Your Name'}</h4>
                    <p className="text-sm text-gray-600">{profileData.title || 'Your Title'}</p>
                  </div>
                  
                  {profileData.bio && (
                    <p className="text-sm text-gray-700">{profileData.bio}</p>
                  )}
                  
                  {profileData.skills.length > 0 && (
                    <div>
                      <h5 className="font-medium text-deep-brown mb-2">Skills</h5>
                      <div className="flex flex-wrap gap-1">
                        {profileData.skills.map((skill, index) => (
                          <span key={index} className="bg-soft-lavender text-deep-brown px-2 py-1 rounded text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
