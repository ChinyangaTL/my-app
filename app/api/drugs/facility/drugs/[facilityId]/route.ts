import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { facilityId: string } }
) {
  // TODO, MIGHT NEED TO CHANGE FACILITY ID TO IDENTIFIER
  const drugs = await db.drugItem.findMany({
    where: {
      facilityId: params.facilityId,
    },
  });

  return NextResponse.json({ drugs });
}
