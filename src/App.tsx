import { Toaster } from 'react-hot-toast'
import './App.css'
import { AuthProvider } from './contexts/authContext'
import AppRouter from './routes'

function App() {

  return (
    <>
      <AuthProvider>
        <AppRouter />
        <Toaster position='bottom-center' />
      </AuthProvider>
    </>
  )
}

export default App
