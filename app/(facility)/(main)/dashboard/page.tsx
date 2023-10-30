// 'use client';

import { db } from '@/lib/db';
import { DataTable } from './data-table';
import { columns } from './columns';
import { signOut } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

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
