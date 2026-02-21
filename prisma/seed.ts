import { PrismaClient, Role } from "../generated/prisma/client";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { config } from "../src/config";

const connectionString = config.DATABASE_URL;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminEmail = config.SUPER_ADMIN_EMAIL!;

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(config.SUPER_ADMIN_PASSWORD!, 10);

    await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        role: Role.SUPER_ADMIN,
      },
    });
    console.log("Super Admin created successfully!");
  } else {
    console.log("Super Admin already exists.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
