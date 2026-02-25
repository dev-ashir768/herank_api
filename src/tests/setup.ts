import { prisma } from "../config/db";

afterAll(async () => {
  // Ensure that Prisma connection is closed after all tests run
  // This prevents Jest from hanging indefinitely
  await prisma.$disconnect();
});
