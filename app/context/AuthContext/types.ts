import { Facility } from '@prisma/client';

export interface FacilityFormState {
  name: string;
  address: string;
  phoneNumber: string;
  district: string;
  password: string;
  isVerified: boolean;
}

export interface Context {
  state: {
    formState: FacilityFormState | null;
    currentStep: number;
    facility: Facility | null;
  };
  actions: {
    setFormState: (formState: any) => void;
    setCurrentStep: (currentStep: number) => void;
    setFacility: (facility: Facility) => void;
  };
}
