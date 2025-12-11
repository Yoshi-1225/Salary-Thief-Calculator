import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log('Index.tsx loaded, attempting to mount React app...');

try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error("Could not find root element to mount to");
  }

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('React app mounted successfully.');
} catch (error) {
  console.error('Failed to mount React app:', error);
  // Re-throw to trigger global error handler in index.html
  throw error;
}