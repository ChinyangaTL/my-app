// 'use client';

import useFacilityAuth from '@/app/context/AuthContext/hook';
import { useAuth } from '@/app/hooks/useFacilityAuth';
import { db } from '@/lib/db';
import React from 'react';
import { DataTable } from './data-table';
import { Payment, columns } from './columns';
import { useQuery } from '@tanstack/react-query';
import { signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const data = [
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '728ed52g',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '728ed52h',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
];

const Dashboard = async () => {
  // const drugs = await db.
  // const { facility, currentStep } = useFacilityAuth();
  // const { data: facilitySession } = useSession();
  const session = await getServerSession(authOptions);
  // const router = useRouter();

  // console.log(facilitySession);
  const facilityDrugs = await db.drugItem.findMany({
    where: {
      facilityId: session?.user?.id,
    },
  });

  console.log(facilityDrugs);

  // const getFavoriteScripts = async () => {
  //   const drugs = await db.drugItem.findMany({
  //     where: {
  //       facility: {
  //         identifier: facility?.identifier,
  //       },
  //     },
  //   });

  //   return drugs;
  // };

  // const { data } = useQuery({
  //   queryKey: ['drugs'],
  //   queryFn: () => getFavoriteScripts(),
  // });

  const logout = async () => {
    signOut({
      redirect: false,
    });
    // router.push('/');
  };

  // console.log(currentStep);
  return (
    <>
      <p>you are logged in as {session?.user.id}</p>
      <DataTable columns={columns} data={facilityDrugs} />
      {/* <Button onClick={logout}>sign out</Button> */}
    </>
  );
};

export default Dashboard;
