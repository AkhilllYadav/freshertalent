
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminAuth } from '@/components/admin/AdminAuth';

const AdminLogin = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if admin is already logged in
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    if (isLoggedIn) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  return <AdminAuth />;
};

export default AdminLogin;
