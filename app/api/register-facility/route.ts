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
  const districtCode = districtMap[district];
  const typeCode = facilityTypeMap[type];
  const randomNumber = Math.floor(Math.random() * 100000)
    .toString()
    .padStart(5, '0');
  return `${districtCode}-${typeCode}-${randomNumber}`;
};

const mapFacilityType = (type: string) => {
  if (type === 'Clinic') {
    return FacilityType.CLINIC;
  }
  if (type === 'Hospital') {
    return FacilityType.HOSPITAL;
  }
  if (type === 'Pharmacy') {
    return FacilityType.PHARMARCY;
  }

  return FacilityType.PHARMARCY;
};

export async function POST(request: Request) {
  const { name, address, phoneNumber, district, type, city, password } =
    await request.json();

  const facilityIdentifier = createFacilityIdentifier(district, type);
  const facilityType = mapFacilityType(type);

  const server = await db.facility.create({
    data: {
      name,
      address,
      phoneNumber,
      district,
      type: facilityType,
      identifier: facilityIdentifier,
      city,
      password,
    },
  });

  return NextResponse.json({ server });
}
