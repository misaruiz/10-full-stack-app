import React, { useContext } from 'react';
import { Navigate } from "react-router-dom";
import { Context } from '../Context';

function PrivateRoute({ children, redirectTo }) {
  const { authenticatedUser } = useContext(Context);
  return authenticatedUser ? children : <Navigate to={redirectTo} />;
}

export default PrivateRoute;