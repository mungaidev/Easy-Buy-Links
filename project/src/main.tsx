import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { HelmetProvider } from 'react-helmet-async'; // Import HelmetProvider
import App from './App.tsx';
import './index.css';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCN4qbGIvlYuVIrujHjqNk3jK3kHknu8f0",
  authDomain: "easy-buylinks.firebaseapp.com",
  projectId: "easy-buylinks",
  storageBucket: "easy-buylinks.firebasestorage.app",
  messagingSenderId: "677998052040",
  appId: "1:677998052040:web:c8d616499c15549511dbfd",
  measurementId: "G-7PNVML3Q81"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export Firebase for use in other components
export { db };

// Render the app
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider> {/* Wrap the app with HelmetProvider */}
      <App />
    </HelmetProvider>
  </StrictMode>
);