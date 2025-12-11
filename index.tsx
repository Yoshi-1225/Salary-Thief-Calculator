import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

if (container) {
  try {
    const root = ReactDOM.createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Critical Error during React Mount:", error);
    // Replace loader with error message if React fails to mount
    container.innerHTML = `
      <div style="height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #ef4444; padding: 20px; text-align: center; font-family: sans-serif;">
        <h1 style="font-size: 24px; margin-bottom: 10px;">應用程式啟動失敗</h1>
        <p>系統偵測到嚴重錯誤，請檢查 Console (F12) 獲取詳細資訊。</p>
        <pre style="background: #eee; padding: 10px; border-radius: 5px; margin-top: 20px; text-align: left; overflow: auto; max-width: 100%;">${error}</pre>
      </div>
    `;
  }
} else {
  console.error("Critical: Failed to find #root element");
}