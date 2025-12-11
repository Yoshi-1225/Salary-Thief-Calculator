import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log("%c Starting Salary Thief Calculator... ", "background: #222; color: #bada55");

const renderApp = () => {
  try {
    const rootElement = document.getElementById('root');
    if (!rootElement) {
      throw new Error("Could not find root element 'root' to mount React application.");
    }

    // Double check if React is actually loaded correctly
    if (!ReactDOM || !ReactDOM.createRoot) {
        throw new Error("ReactDOM is not loaded correctly. Please check dependencies.");
    }

    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("React app mounted successfully.");
  } catch (error) {
    console.error("CRITICAL: Failed to mount React app:", error);
    // Explicitly call the global error handler defined in index.html if it exists
    if (window.onerror) {
        // @ts-ignore
        window.onerror(error.message, "index.tsx", 0, 0, error);
    }
  }
};

renderApp();
