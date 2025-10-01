import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/auth";

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {

  const { user } = useAuth();
  const loc = useLocation();
  if (!user)
    return <Navigate to="/login" state={{ redirect: loc.pathname }} replace />;
  
  return <>{children}</>;
}
