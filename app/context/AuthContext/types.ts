export interface Context {
  state: {
    formState: any;
    currentStep: number;
  };
  actions: {
    setFormState: (formState: any) => void;
    setCurrentStep: (currentStep: number) => void;
  };
}
