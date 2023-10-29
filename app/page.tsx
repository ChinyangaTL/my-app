'use client';

import Link from 'next/link';
import { useAuth } from './hooks/useFacilityAuth';

export default function Home() {
  const auth = useAuth();

  console.log(auth);
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      {auth ? <p>logged in</p> : <Link href='/facility/sign-in'>Login</Link>}
    </main>
  );
}
