import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './screens/FallBack/ErrorBoundary.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>,
  </BrowserRouter>
)
