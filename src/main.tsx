import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "react-big-calendar/lib/css/react-big-calendar.css";
import '@uppy/core/css/style.min.css';
import '@uppy/dashboard/css/style.min.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
