import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/assets/main.css'
import { Button } from '@/components/ui/button.tsx'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Button>Test</Button>
  </React.StrictMode>,
)

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})
