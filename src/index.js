import { createRoot } from 'react-dom/client'
import App from './App'
import { StrictMode } from 'react'
document.body.innerHTML = '<div id ="app"></div>'
import "./styles.css";

const root = createRoot(document.getElementById('app'))
root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
