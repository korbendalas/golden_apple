import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { JWT } from 'next-auth/jwt';

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email as string },
        });
        if (
          user &&
          bcrypt.compareSync(credentials?.password as string, user.password)
        ) {
          return {
            id: String(user.id),
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: any; token: JWT }) {
      session.user.id = token.sub;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
