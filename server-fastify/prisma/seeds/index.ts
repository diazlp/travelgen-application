import { PrismaClient } from '@prisma/client';
import { hashPassword } from 'lib/utils/bcrypt';
import { usersData, profilesData } from './data';

const prisma = new PrismaClient();

async function seed() {
  try {
    for (const userData of usersData) {
      const hashedPassword = await hashPassword(userData.password);

      // Check if the user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: userData.email },
      });

      // If user doesn't exist, create it
      if (!existingUser) {
        await prisma.user.create({
          data: {
            ...userData,
            password: hashedPassword,
          },
        });
      }

      const userProfileData = profilesData.find(
        (profile) => profile.user_id === userData.id,
      );

      if (userProfileData) {
        // Check if the profile already exists
        const existingProfile = await prisma.profile.findUnique({
          where: { user_id: userData.id },
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

    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
