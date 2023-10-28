import { db } from '@/lib/db';
import { getJwtSecretKey } from '@/lib/facilityAuth';
import { SignJWT } from 'jose';
import { NextResponse } from 'next/server';
const bcrypt = require('bcrypt');

const findFacility = async (username: string) => {
  const facility = await db.facility.findUnique({
    where: {
      identifier: username,
    },
  });

  return facility;
};

const doPasswordsMatch = async (password: string, hashedPassword: string) => {
  console.log(password, hashedPassword);
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
};

export async function POST(request: Request) {
  const { username, password } = await request.json();

  const facility = await findFacility(username);

  if (!facility) {
    return new Response('Cannot find a facility with that username', {
      status: 401,
    });
  }

  const passwordsMatch = await doPasswordsMatch(password, facility.password);

  if (!(username === facility.identifier && passwordsMatch))
    return NextResponse.json({ success: false });

  const token = await new SignJWT({
    username: facility.identifier,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1m')
    .sign(getJwtSecretKey());

  const response = NextResponse.json(
    { success: true },
    { status: 200, headers: { 'content-type': 'application/json' } }
  );
  response.cookies.set({
    name: 'token',
    value: token,
    path: '/',
  });
  return response;
}
