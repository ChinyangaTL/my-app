import { db } from '@/lib/db';
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

  const passwordMatch = await doPasswordsMatch(password, facility.password);

  if (!passwordMatch) {
    return new Response('Password is incorrect', {
      status: 401,
    });
  }

  return new Response(JSON.stringify({ facility }), {
    headers: {
      'content-type': 'application/json',
    },
  });
}
