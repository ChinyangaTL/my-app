import { useContext } from 'react';

import FacilityAuthContext from './context';

const useFacilityAuth = () => {
  const {
    state: { currentStep, formState },
    actions: { setCurrentStep, setFormState },
  } = useContext(FacilityAuthContext);

  return {
    currentStep,
    formState,
    setCurrentStep,
    setFormState,
  };
};

export default useFacilityAuth;
