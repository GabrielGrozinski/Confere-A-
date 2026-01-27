import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AllContext } from './context/all-context.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AllContext>
      <App />
    </AllContext>
  </StrictMode>,
)
