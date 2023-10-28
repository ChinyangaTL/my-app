'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

import React, { useState } from 'react';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import useFacilityAuth from '@/app/context/AuthContext/hook';
import { set } from 'zod';

const FacilityLocation = () => {
  const { setCurrentStep, setFormState } = useFacilityAuth();

  const [district, setDistrict] = useState('South East');
  const [searchResult, setSearchResult] = useState('Result: none');
  const [facililityLocationInfo, setFacilityLocationInfo] = useState<{
    name: '';
    businessStatus: '';
    formattedAddress: '';
  } | null>(null);

  function onLoad(autocomplete) {
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
          <SelectItem value='CEN'>Central</SelectItem>
          <SelectItem value='CHO'>Chobe</SelectItem>
          <SelectItem value='GHA'>Ghanzi</SelectItem>
          <SelectItem value='KGA'>Kgalagadi</SelectItem>
          <SelectItem value='KGT'>Kgatleng</SelectItem>
          <SelectItem value='KWE'>Kweneng</SelectItem>
          <SelectItem value='NE'>North East</SelectItem>
          <SelectItem value='NW'>North West</SelectItem>
          <SelectItem value='SE'>South East</SelectItem>
          <SelectItem value='SOU'>Southern</SelectItem>
        </SelectContent>
      </Select>
      <Autocomplete
        onLoad={onLoad}
        restrictions={{ country: 'bw' }}
        onPlaceChanged={() => {
          if (searchResult != null) {
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
          setFormState((prev) => ({
            ...prev,
            address: facililityLocationInfo?.formattedAddress,
            district,
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
