import { useEffect, useState } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Loader from './pages/loader'
import PaymentPage from './pages/form_page';
import { Backdrop, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import OTPPage from './pages/otp_page';
import SuccessPage from './pages/success_page';

function App() {

  const [loading, setLoading] = useState(true);
  const { isLoading } = useSelector((state: RootState) => state.loader);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  }, [])

  if (loading) return <Loader />;

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 5000 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Routes>
        <Route path='/' element={<Navigate to={'/pay'} replace />} />
        <Route path='/pay' element={<Loader />} />
        <Route path='/pay/:id' element={<PaymentPage />} />
        <Route path='/otp/confirm' element={<OTPPage />} />
        <Route path='/pay/success' element={<SuccessPage />} />
      </Routes>
    </div>
  )
}

export default App
