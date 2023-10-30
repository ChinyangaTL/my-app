import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from '@/lib/db';
import { Adapter } from 'next-auth/adapters';
const bcrypt = require('bcrypt');

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  adapter: PrismaAdapter(prisma) as Adapter | undefined,
  pages: {
    signIn: '/',
  },

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        identifier: {},
        phoneNumber: {},
        password: {},
      },
      async authorize(credentials, req) {
        console.log({ credentials });

        // facility route
        if (credentials?.identifier) {
          const facility = await db.facility.findUnique({
            where: { identifier: credentials?.identifier },
          });

          if (!facility) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(
            credentials.password,
            facility.password
          );

          if (passwordMatch) {
            return {
              ...facility,
              identifier: facility.identifier,
              name: facility.name,
              type: facility.type,
              address: facility.address,
              district: facility.district,
              phoneNumber: facility.phoneNumber,
              isVerified: facility.isVerified,
            };
          }
        }

        // user route
        if (credentials?.phoneNumber) {
          const user = await db.user.findFirst({
            where: {
              phoneNumber: credentials.phoneNumber,
            },
          });

          if (!user) return null;

          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user?.password
          );

          if (passwordMatch) {
            return {
              ...user,
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              phoneNumber: user.phoneNumber,
            };
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.user = { ...user };
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

// callbacks: {
//   async jwt({ user , token }) {
//     if (user) {  // Note that this if condition is needed
//       token.user={...user}
//     }
//     return token
//    },
//   async session({ session, token }) {
//     if (token?.user) { // Note that this if condition is needed
//       session.user = token.user;
//     }
//     return session
//   },
// },
