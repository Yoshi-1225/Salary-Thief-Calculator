import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Simple error handling for mounting
try {
  const container = document.getElementById('root');
  
  if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } else {
    console.error("Failed to find root element");
  }
} catch (error) {
  console.error("Application failed to mount:", error);
  document.body.innerHTML = `<div style="padding: 20px; color: red;"><h1>Application Error</h1><pre>${error instanceof Error ? error.message : String(error)}</pre></div>`;
}