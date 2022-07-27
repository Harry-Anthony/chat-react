import { Navigate, Outlet  } from 'react-router-dom';


function ProtectedRoute(props: any) {
  let isAuthenticated: any = localStorage.getItem("isAuthenticated");
  const token = localStorage.getItem("token");
  if(!token) {
    isAuthenticated = false;
  }
  return (
    isAuthenticated ? <Outlet /> : <Navigate to="/" />
  );
}

export default ProtectedRoute;