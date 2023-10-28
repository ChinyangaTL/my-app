import axios from 'axios';
import { Button } from '@/components/ui/button';
import useFacilityAuth from '@/app/context/AuthContext/hook';
import { FacilityFormState } from '@/app/context/AuthContext/types';
import { useRouter } from 'next/navigation';

const RegisterFacilityOnboardingStep = () => {
  const { formState, setFacility, setCurrentStep } = useFacilityAuth();
  const router = useRouter();

  const registerFacility = async (formState: FacilityFormState) => {
    console.log(formState);
    try {
      const response = await axios.post('/api/register-facility', formState);
      const { facility } = response.data;

      // const { facility } = response.data.facility;
      console.log(facility);
      setFacility(facility);
      setCurrentStep(5);
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

      <Button onClick={() => formState && registerFacility(formState)}>
        Complete Registration
      </Button>
    </div>
  );
};

export default RegisterFacilityOnboardingStep;
