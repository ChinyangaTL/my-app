'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Context, FacilityFormState } from './types';

const FacilityAuthContext = createContext({} as Context);

type Props = {
  children: React.ReactNode;
};

const FacilityAuthProvider: React.FC<Props> = ({ children }) => {
  const [formState, setFormState] = useState<FacilityFormState | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const state = {
    formState,
    currentStep,
  };

  const actions = {
    setFormState,
    setCurrentStep,
  };

  return (
    <FacilityAuthContext.Provider value={{ state, actions }}>
      {children}
    </FacilityAuthContext.Provider>
  );
};

export { FacilityAuthProvider, FacilityAuthContext as default };
