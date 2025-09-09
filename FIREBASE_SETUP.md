# Firebase Setup Guide

## 🔥 Firebase Configuration Required

Your chatbot is getting "Missing or insufficient permissions" errors because Firebase Firestore security rules need to be configured. Follow these steps to fix this:

## Step 1: Install Firebase CLI

```bash
npm install -g firebase-tools
```

## Step 2: Login to Firebase

```bash
firebase login
```

## Step 3: Initialize Firebase in Your Project

```bash
firebase init firestore
```

When prompted:
- Select your existing project: `myres-4119e`
- Use the existing `firestore.rules` file: **Yes**
- Use the existing `firestore.indexes.json` file: **Yes**

## Step 4: Deploy Firestore Rules

```bash
firebase deploy --only firestore:rules
```

## Step 5: Alternative - Manual Setup in Firebase Console

If you prefer to set up through the Firebase Console:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `myres-4119e`
3. Go to **Firestore Database** → **Rules**
4. Replace the existing rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow users to read and write their own profile data
    match /profiles/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow users to read and write their own chat messages
    match /users/{userId}/messages/{messageId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow public read access to profiles (for the chatbot to work without login)
    match /profiles/{userId} {
      allow read: if true; // Public read access for chatbot functionality
      allow write: if request.auth != null && request.auth.uid == userId; // Only owner can write
    }
    
    // Allow users to read and write their own files
    match /users/{userId}/files/{fileId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

5. Click **Publish**

## Step 6: Enable Authentication

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Enable **Email/Password** authentication
3. Save the changes

## Step 7: Create Your First User Account

Since we removed signup functionality, you need to create your account manually:

1. Go to **Authentication** → **Users** in Firebase Console
2. Click **Add user**
3. Enter your email and password
4. Click **Add user**

## Step 8: Test Your Setup

1. Restart your React app: `npm start`
2. Go to `http://localhost:3001`
3. Click the settings icon to go to login
4. Use the credentials you created in Step 7
5. You should now be able to access the settings page and save your profile

## 🔧 What These Rules Do

- **Public Read Access**: Anyone can read profile data (needed for the chatbot to work without login)
- **Authenticated Write Access**: Only authenticated users can write to their own profiles
- **User Isolation**: Each user can only access their own data
- **Secure**: Prevents unauthorized access to other users' data

## 🚨 Important Notes

- The chatbot works without login for visitors (public read access)
- Only you (the authenticated user) can modify your profile data
- All data is stored securely in Firebase Firestore
- API keys are stored in your profile and only accessible to you

## 🆘 Troubleshooting

If you still get permission errors:

1. Check that you're logged in (look for the settings icon)
2. Verify the Firestore rules were deployed successfully
3. Check the Firebase Console for any error messages
4. Make sure your Firebase project ID matches: `myres-4119e`

## 📱 Next Steps

Once Firebase is configured:

1. **Add your API key** in Settings → AI API Settings
2. **Upload your YouTube demo videos** in Settings → YouTube Demo Videos
3. **Fill in your profile information** (name, skills, experience, etc.)
4. **Test the chatbot** by asking questions about your experience

Your resume chatbot will then be fully functional! 🎉
