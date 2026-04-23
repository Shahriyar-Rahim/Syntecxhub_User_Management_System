import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from './features/auth/authSlice';
import { Outlet } from 'react-router';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    
    // If Redux lost the state but storage has it, re-sync
    if (user && token) {
      dispatch(setCredentials({ data: user, token }));
    }
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />
      <main className="grow flex flex-col w-full">
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
}

export default App;