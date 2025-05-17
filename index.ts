import { PrismaClient } from "./generated/prisma";
const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.create({
        data: {
            name: 'testName2',
            email: 'testname2@email.com',
        }
    })

    console.log('user created: ', user);
}

main()
    .catch(error => {
        console.log('error in main', error.message)
    })
    .finally(async () => {
        await prisma.$disconnect();
    });