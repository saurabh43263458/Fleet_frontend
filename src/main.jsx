import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import UserDataProvider from './ContextApi/userContextapi.jsx'
import CaptainDataProvider from './ContextApi/CaptainContext.jsx'
import SocketProvider from './ContextApi/SocketContext.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CaptainDataProvider>
    <UserDataProvider>
    <SocketProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SocketProvider>
    </UserDataProvider>
    </CaptainDataProvider>
  </StrictMode>,
)
