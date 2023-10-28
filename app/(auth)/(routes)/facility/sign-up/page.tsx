'use client';

import useFacilityAuth from '@/app/context/AuthContext/hook';

import BasicFacilityInfo from '@/components/auth/FacilityRegisterFlow/step-1';
import FacilityLocation from '@/components/auth/FacilityRegisterFlow/step-2';
import CreatePasswordFacility from '@/components/auth/FacilityRegisterFlow/step-3';
import UploadFacilityDoc from '@/components/auth/FacilityRegisterFlow/step-4';
import FinalFacilityOnboardingStep from '@/components/auth/FacilityRegisterFlow/step-5';
import RegisterCard from '@/components/auth/register-card';

const RegisterFacilitySignUp = () => {
  const { currentStep } = useFacilityAuth();

  if (currentStep === 0) return <BasicFacilityInfo />;

  if (currentStep === 1) return <FacilityLocation />;

  if (currentStep === 2) return <CreatePasswordFacility />;

  if (currentStep === 3) return <UploadFacilityDoc />;

  if (currentStep === 4) return <FinalFacilityOnboardingStep />;

  return (
    <div>
      <RegisterCard />
    </div>
  );
};

export default RegisterFacilitySignUp;
