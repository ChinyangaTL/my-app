import { useContext } from 'react';

import FacilityAuthContext from './context';

const useFacilityAuth = () => {
  const {
    state: { currentStep, formState, facility },
    actions: { setCurrentStep, setFormState, setFacility },
  } = useContext(FacilityAuthContext);

  return {
    currentStep,
    formState,
    facility,
    setCurrentStep,
    setFormState,
    setFacility,
  };
};

export default useFacilityAuth;
