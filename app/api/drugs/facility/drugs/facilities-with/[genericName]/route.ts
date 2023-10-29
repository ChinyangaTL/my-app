import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { genericName: string } }
) {
  // TODO: REMOVE PASSWORD FROM SELECTED FIELDS
  const facilities = await db.facility.findMany({
    where: {
      drugItems: {
        some: {
          genericName: {
            equals: params.genericName.toLowerCase(),
          },
        },
      },
    },
  });

  return NextResponse.json({ facilities });
}
