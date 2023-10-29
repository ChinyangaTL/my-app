'use client';

import { createContext, useState } from 'react';
import { Context, FacilityFormState } from './types';
import { Facility } from '@prisma/client';

const FacilityAuthContext = createContext({} as Context);

type Props = {
  children: React.ReactNode;
};

const FacilityAuthProvider: React.FC<Props> = ({ children }) => {
  const [formState, setFormState] = useState<FacilityFormState | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [facility, setFacility] = useState<Facility | null>(null);

  const state = {
    formState,
    currentStep,
    facility,
  };

  const actions = {
    setFormState,
    setCurrentStep,
    setFacility,
  };

  return (
    <FacilityAuthContext.Provider value={{ state, actions }}>
      {children}
    </FacilityAuthContext.Provider>
  );
};

export { FacilityAuthProvider, FacilityAuthContext as default };
