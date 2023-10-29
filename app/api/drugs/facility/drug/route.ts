import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const {
    facilityId,
    drugName,
    genericDrugName,
    price,
    expiryDate,
    strengthsAvailable,
    isControlledSubstance,
    quantity,
  } = await request.json();

  const facility = await db.facility.findUnique({
    where: {
      id: facilityId,
    },
  });

  if (!facility) {
    return new Response('Cannot find a facility with that id', {
      status: 404,
    });
  }

  const drugInformation = await db.drugItem.create({
    data: {
      brandName: drugName,
      genericName: genericDrugName && genericDrugName,
      price,
      expiryDate: new Date(expiryDate),
      strengthsAvailable,
      isControlledSubstance,
      quantity,
      facilityId,
    },
  });

  return NextResponse.json({ drugInformation });
}
