import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/main.css'
import {Draggable} from '@/components/Draggable';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Draggable />
  </React.StrictMode>,
);

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})
