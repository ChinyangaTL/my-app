'use client';

import useFacilityAuth from '@/app/context/AuthContext/hook';
import React from 'react';

const User = () => {
  const { currentStep } = useFacilityAuth();

  console.log(currentStep);
  return <div>page</div>;
};

export default User;
