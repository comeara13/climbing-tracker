import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

let rootel = document.getElementById('root')
if (rootel) {
  const root = ReactDOM.createRoot(rootel)
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
