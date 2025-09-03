import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Button } from '@arco-design/web-react'
import '@arco-design/web-react/dist/css/arco.css'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Button type="primary">Hello Arco</Button>
  </StrictMode>
)
