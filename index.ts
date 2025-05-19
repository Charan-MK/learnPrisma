import { PrismaClient } from "./generated/prisma";
const prisma = new PrismaClient();

async function main() {
    // deletes all the users in the table User
    await prisma.user.deleteMany();

    // created a user with the specified details in data
    const user1 = await prisma.user.create({
        data: {
            name: 'testName',
            age: 35,
            email: 'testName@email.com'
        }
    })
    console.log('user1 created ', user1);
    await prisma.user.deleteMany();

    // since user prefernce is referenced by user, with prisma it is possible to create user prefernces with user model
    const user2 = await prisma.user.create({
        data: {
            name: 'testName2',
            age: 32,
            email: 'testName2@email.com',
            preferences: {
                create: {
                    emailUpdates: true,
                }
            }
        },
        include: {      // will include the preferences created or associated with the user and will be returned
            preferences: true,
        }
    })

    console.log('user2 created: ', user2);
}

main()
    .catch(error => {
        console.log('error in main', error.message)
    })
    .finally(async () => {
        await prisma.$disconnect();
    });