import { Outlet } from 'react-router'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />
      
      {/* Outlet dynamically renders LandingPage, Login, or Dashboard */}
      <main className="flex-grow flex flex-col w-full">
        <Outlet /> 
      </main>
      <Footer />
    </div>
  )
}

export default App