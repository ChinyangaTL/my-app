'use client';

import { FacilityAuthProvider } from '@/app/context/AuthContext/context';
import FacilityLogin from '@/components/auth/FacilityLoginFlow/login';
import React from 'react';

const LoginFacility = () => {
  return (
    <FacilityAuthProvider>
      <FacilityLogin />
    </FacilityAuthProvider>
  );
};

export default LoginFacility;
