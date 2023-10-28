'use client';

import React, { useState } from 'react';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';

const FacilityLocation = () => {
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

            // console.log(place);
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
    </div>
  );
};

export default FacilityLocation;
