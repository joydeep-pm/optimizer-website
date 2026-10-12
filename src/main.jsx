import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ReactLenis } from 'lenis/react'
import './index.css'

const fontParam = new URLSearchParams(window.location.search).get('font')
if (fontParam) document.documentElement.dataset.font = fontParam

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.5,
        touchMultiplier: 2,
      }}
    >
      <App />
    </ReactLenis>
  </StrictMode>,
)
