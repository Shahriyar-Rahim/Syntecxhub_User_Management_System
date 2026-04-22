import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import { store } from './app/store'
import './index.css'

// Import Components
import App from './App'
import LandingPage from './features/landing/LandingPage'
import Login from './features/auth/Login'
import Register from './features/auth/Register'

// Placeholder for protected route
import UserDashboard from "./components/UserDashboard";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Main App Shell (Contains NavBar) */}
          <Route path="/" element={<App />}>
            
            {/* The index route shows ONLY when path is exactly "/" */}
            <Route index element={<LandingPage />} />
            
            {/* Auth Routes */}
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            {/* Protected App Route */}
            <Route path="dashboard" element={<UserDashboard />} />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
)