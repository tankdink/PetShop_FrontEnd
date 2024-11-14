import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthorzProvider } from './components/contexts/AuthorzContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthorzProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthorzProvider>
  </React.StrictMode>
)
