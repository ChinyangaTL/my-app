import useFacilityAuth from '@/app/context/AuthContext/hook';
import { UploadButton } from '@/app/lib/uploadthing';
import React from 'react';

const UploadFacilityDoc = () => {
  const { setCurrentStep } = useFacilityAuth();
  return (
    <div className='flex min-h-screen flex-col items-center justify-between p-24'>
      <UploadButton
        endpoint='facilityDocument'
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log('Files: ', res);
          alert('Image Uploaded');
          setCurrentStep(4);
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
};

export default UploadFacilityDoc;
