import React, { useState } from 'react';

import axios from 'axios';
import { Button } from '@/components/ui/button';
import useFacilityAuth from '@/app/context/AuthContext/hook';
import { FacilityFormState } from '@/app/context/AuthContext/types';
import { useRouter } from 'next/navigation';

const FinalFacilityOnboardingStep = () => {
  const { formState } = useFacilityAuth();
  const router = useRouter();

  const registerFacility = async (formState: FacilityFormState) => {
    console.log(formState);
    try {
      await axios.post('/api/register-facility', formState);

      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* congrats youre done
    
    comeback sometime to verify your status before you can start using the app
    */}
      <p>{formState?.name}</p>
      <p>{formState?.address}</p>
      <p>{formState?.district}</p>
      <p>{formState?.phoneNumber}</p>
      <p>{formState?.password}</p>

      <Button onClick={() => registerFacility(formState)}>
        Complete Registration
      </Button>
    </div>
  );
};

export default FinalFacilityOnboardingStep;
