'use client';

import useFacilityAuth from '@/app/context/AuthContext/hook';

import BasicFacilityInfo from '@/components/auth/FacilityRegisterFlow/step-1';
import FacilityLocation from '@/components/auth/FacilityRegisterFlow/step-2';
import RegisterCard from '@/components/auth/register-card';
import React from 'react';

const RegisterFacilitySignUp = () => {
  const { currentStep } = useFacilityAuth();

  if (currentStep === 0) return <BasicFacilityInfo />;

  if (currentStep === 1) return <FacilityLocation />;

  return (
    <div>
      <RegisterCard />
    </div>
  );
};

export default RegisterFacilitySignUp;
