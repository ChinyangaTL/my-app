'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

import { useState } from 'react';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import useFacilityAuth from '@/app/context/AuthContext/hook';

const FacilityLocation = () => {
  const { setCurrentStep, setFormState, formState } = useFacilityAuth();

  const [district, setDistrict] = useState('South East');
  const [searchResult, setSearchResult] = useState('Result: none');
  const [facililityLocationInfo, setFacilityLocationInfo] = useState<{
    name: '';
    businessStatus: '';
    formattedAddress: '';
  } | null>(null);

  function onLoad(autocomplete: any) {
    setSearchResult(autocomplete);
  }

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ['places'],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div className='w-100% bg-red-100'>
      <Select onValueChange={(value) => setDistrict(value)}>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='South East' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='Central'>Central</SelectItem>
          <SelectItem value='Chobe'>Chobe</SelectItem>
          <SelectItem value='Ghanzi'>Ghanzi</SelectItem>
          <SelectItem value='Kgalagadi'>Kgalagadi</SelectItem>
          <SelectItem value='Kgatleng'>Kgatleng</SelectItem>
          <SelectItem value='Kweneng'>Kweneng</SelectItem>
          <SelectItem value='North-East'>North East</SelectItem>
          <SelectItem value='North-West'>North West</SelectItem>
          <SelectItem value='South-East'>South East</SelectItem>
          <SelectItem value='SOU'>Southern</SelectItem>
        </SelectContent>
      </Select>
      <Autocomplete
        onLoad={onLoad}
        restrictions={{ country: 'bw' }}
        onPlaceChanged={() => {
          if (searchResult != null) {
            // @ts-ignore
            const place = searchResult.getPlace();
            const name = place.name;
            const status = place.business_status;
            const formattedAddress = place.formatted_address;
            console.log(formattedAddress);

            console.log(place);
            setFacilityLocationInfo({
              name: place.name,
              businessStatus: place.business_status,
              formattedAddress: place.formatted_address,
            });
          } else {
            alert('Please enter text');
          }
        }}
      >
        <input type='text' className='w-full' />
      </Autocomplete>
      {facililityLocationInfo && (
        <div>
          <h2>Selected Place</h2>
          <p>{facililityLocationInfo.name}</p>
          <p>{facililityLocationInfo.businessStatus}</p>
          <p>{facililityLocationInfo.formattedAddress}</p>
        </div>
      )}

      <Button
        onClick={() => {
          console.log(formState);
          setFormState((prev: any) => ({
            ...prev,
            address: facililityLocationInfo?.formattedAddress,
            district: district,
          }));
          setCurrentStep(2);
        }}
      >
        Next
      </Button>
    </div>
  );
};

export default FacilityLocation;
