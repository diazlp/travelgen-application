import { PrismaClient } from '@prisma/client';
import { hashPassword } from 'lib/utils/bcrypt';
import {
  usersData,
  profilesData,
  packagesData,
  transactionsData,
} from './data';

const prisma = new PrismaClient();

async function seed() {
  try {
    for (const user of usersData) {
      const hashedPassword = await hashPassword(user.password);

      // Check if the user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      // If user doesn't exist, create it
      if (!existingUser) {
        await prisma.user.create({
          data: {
            ...user,
            password: hashedPassword,
          },
        });
      }

      const userProfileData = profilesData.find(
        (profile) => profile.user_id === user.id,
      );

      if (userProfileData) {
        // Check if the profile already exists
        const existingProfile = await prisma.profile.findUnique({
          where: { user_id: user.id },
        });

        // If profile doesn't exist, create it
        if (!existingProfile) {
          await prisma.profile.create({
            data: {
              ...userProfileData,
            },
          });
        }
      }
    }

    for (const profile of profilesData) {
      // Check if the profile already exists
      const existingProfile = await prisma.profile.findUnique({
        where: { user_id: profile.user_id },
      });

      // If profile doesn't exist, create it
      if (!existingProfile) {
        await prisma.profile.create({
          data: {
            ...profile,
          },
        });
      }
    }

    for (const pkg of packagesData) {
      // Check if the package already exists
      const existingPackage = await prisma.package.findUnique({
        where: { id: pkg.id },
      });

      // If package doesn't exist, create it
      if (!existingPackage) {
        await prisma.package.create({
          data: {
            ...pkg,
          },
        });
      }
    }

    for (const transaction of transactionsData) {
      // Check if the transaction already exists
      const existingTransaction = await prisma.transaction.findUnique({
        where: { id: transaction.id },
      });

      // If transaction doesn't exist, create it
      if (!existingTransaction) {
        await prisma.transaction.create({
          data: {
            ...transaction,
          },
        });
      }
    }

    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
