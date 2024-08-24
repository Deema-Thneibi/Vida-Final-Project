import React, { useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import Cookie from 'cookie-universal';
import { Bounce, toast } from 'react-toastify';

export default function ProtectedRoutes({ children }) {
  const cookie = Cookie();
  const token = cookie.get('userToken');
  const hasNotifiedRef = useRef(false);

  useEffect(() => {
    if (!token && !hasNotifiedRef.current) {
      toast.info('Please sign in', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      hasNotifiedRef.current = true;
    }
  }, [token]);

  if (!token) {
    return <Navigate to='/signIn' replace />;
  }

  return children;
}
