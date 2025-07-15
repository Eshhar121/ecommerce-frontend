import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { appRoutes } from './routes/Routes'
import { AuthProvider } from './context/AuthProvider'
import { ThemeProvider } from './context/ThemeContext'
import { Toaster } from 'react-hot-toast'
import './index.css' // Tailwind base styles

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {appRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </Router>
        <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
      </AuthProvider>
    </ThemeProvider>
  )
}
