import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

export default ({ context }) => {
  useEffect(() =>  context.actions.signOut());
  return (
    <Navigate to="/" />
  );
}
