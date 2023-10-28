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
  };
  actions: {
    setFormState: (formState: any) => void;
    setCurrentStep: (currentStep: number) => void;
  };
}
