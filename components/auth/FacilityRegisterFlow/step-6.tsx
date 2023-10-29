import useFacilityAuth from '@/app/context/AuthContext/hook';
import React from 'react';

const FinalFacilityOnboardingStep = () => {
  const { facility } = useFacilityAuth();

  return (
    <div>
      <p>Your username is: {facility?.identifier}</p>
      <p>you need this to log in so remember it</p>
      <p>
        You can now log in and start using the app. You will need to verify your
        status before you can start using the app
      </p>
    </div>
  );
};

export default FinalFacilityOnboardingStep;
