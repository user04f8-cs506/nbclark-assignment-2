import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import KMeansApp from './KMeansApp.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <KMeansApp />
  // </StrictMode>,
)
