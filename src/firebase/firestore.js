import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc 
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { db, storage, auth } from './config';

// Save profile data
export const saveProfileData = async (profileData) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');
    
    const profileRef = doc(db, 'profiles', user.uid);
    await setDoc(profileRef, {
      ...profileData,
      updatedAt: new Date(),
      userId: user.uid
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error saving profile data:', error);
    throw error;
  }
};

// Get profile data
export const getProfileData = async () => {
  try {
    const user = auth.currentUser;
    if (!user) return null;
    
    const profileRef = doc(db, 'profiles', user.uid);
    const profileSnap = await getDoc(profileRef);
    
    if (profileSnap.exists()) {
      return profileSnap.data();
    }
    return null;
  } catch (error) {
    console.error('Error getting profile data:', error);
    throw error;
  }
};

// Upload file to Firebase Storage
export const uploadFile = async (file, userId) => {
  try {
    const fileRef = ref(storage, `users/${userId}/files/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return {
      success: true,
      url: downloadURL,
      path: snapshot.ref.fullPath,
      name: file.name,
      size: file.size,
      type: file.type
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

// Delete file from Firebase Storage
export const deleteFile = async (filePath) => {
  try {
    const fileRef = ref(storage, filePath);
    await deleteObject(fileRef);
    return { success: true };
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};

// Save chat conversation
export const saveChatMessage = async (message, userId) => {
  try {
    const messagesRef = collection(db, 'users', userId, 'messages');
    await addDoc(messagesRef, {
      ...message,
      timestamp: new Date(),
      userId
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error saving chat message:', error);
    throw error;
  }
};

// Get chat history
export const getChatHistory = async (userId) => {
  try {
    const messagesRef = collection(db, 'users', userId, 'messages');
    const messagesSnap = await getDocs(messagesRef);
    
    const messages = [];
    messagesSnap.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() });
    });
    
    return messages.sort((a, b) => a.timestamp - b.timestamp);
  } catch (error) {
    console.error('Error getting chat history:', error);
    throw error;
  }
};

// Update profile visibility settings
export const updateProfileVisibility = async (isPublic) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');
    
    const profileRef = doc(db, 'profiles', user.uid);
    await updateDoc(profileRef, {
      isPublic,
      updatedAt: new Date()
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error updating profile visibility:', error);
    throw error;
  }
};
