import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { FacilityType } from '@prisma/client';

const districtMap = {
  Central: 'CEN',
  Chobe: 'CHO',
  Ghanzi: 'GHA',
  Kgalagadi: 'KGA',
  Kgatleng: 'KGT',
  Kweneng: 'KWE',
  'North-East': 'NE',
  'North-West': 'NW',
  'South-East': 'SE',
  Southern: 'SOU',
};

const facilityTypeMap = {
  PHARMARCY: 'PHA',
  CLINIC: 'CLI',
  HOSPITAL: 'HOS',
};

const createFacilityIdentifier = (district: string, type: string) => {
  // @ts-ignore
  const districtCode = districtMap[district];
  // @ts-ignore
  const typeCode = facilityTypeMap[type];
  const randomNumber = Math.floor(Math.random() * 100000)
    .toString()
    .padStart(5, '0');
  return `${districtCode}-${typeCode}-${randomNumber}`;
};

const mapFacilityType = (type: string) => {
  if (type === 'CLINIC') {
    return FacilityType.CLINIC;
  }
  if (type === 'HOSPITAL') {
    return FacilityType.HOSPITAL;
  }
  if (type === 'PHARMARCY') {
    return FacilityType.PHARMARCY;
  }

  return FacilityType.PHARMARCY;
};

export async function POST(request: Request) {
  const { name, address, phoneNumber, district, type, password } =
    await request.json();

  const facilityIdentifier = createFacilityIdentifier(district, type);
  const facilityType = mapFacilityType(type);

  const facility = await db.facility.create({
    data: {
      name,
      address,
      phoneNumber,
      district,
      type: facilityType,
      identifier: facilityIdentifier,
      password,
    },
  });

  return NextResponse.json({ facility });
}
