import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create demo users
  const user1 = await prisma.user.upsert({
    where: { email: 'user1@example.com' },
    update: {},
    create: {
      firstName: 'Alice',
      lastName: 'Doe',
      email: 'user1@example.com',
      password: await bcrypt.hash('password1', 10), // Hash the password
      tasks: {
        create: [
          {
            title: 'Complete project',
            description: 'Finish the full-stack to-do app',
            dueDate: new Date('2027-12-31'),
            priority: 'High',
          },
          {
            title: 'Buy groceries',
            description: 'Milk, eggs, bread, and vegetables',
            dueDate: new Date('2024-11-15'),
            priority: 'Medium',
          },
        ],
      },
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'user2@example.com' },
    update: {},
    create: {
      firstName: 'Bob',
      lastName: 'Smith',
      email: 'user2@example.com',
      password: await bcrypt.hash('password2', 10), // Hash the password
      tasks: {
        create: [
          {
            title: 'Schedule meeting',
            description: 'Plan team meeting for next week',
            dueDate: new Date('2023-11-20'),
            priority: 'High',
          },
        ],
      },
    },
  });

  console.log('Seeded users and tasks:', { user1, user2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
