import './App.css'
import { AuthProvider } from './contexts/authContext'
import AppRouter from './routes'

function App() {

  return (
    <>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </>
  )
}

export default App
