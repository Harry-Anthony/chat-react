import { Navigate, Outlet  } from 'react-router-dom';

function ProtectedRoute(props: any) {
  let isAuthenticated: any = true;
  const user = localStorage.getItem("user");
  if(!user) {
    isAuthenticated = false;
  }
  if(props.isHome) {
    return (
      isAuthenticated ? <Outlet /> : <Navigate to={props.goal} />
    );
  }
  return (
    isAuthenticated ? <Navigate to={props.goal} /> : <Outlet /> 
  );
}

export default ProtectedRoute;