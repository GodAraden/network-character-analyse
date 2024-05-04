import { PrismaClient, UserStatus } from '@prisma/client';
const prisma = new PrismaClient();

const main = async () => {
  const users = await prisma.user.createMany({
    data: [
      {
        username: 'admin',
        password: '21232f297a57a5a743894a0e4a801fc3',
        nickname: 'GodAraden',
        role: 'admin',
      },
      {
        username: 'gaoyuhang',
        password: '1a24b953ba8e50462b0f9b8a50af0783',
        nickname: 'gaoyuhang',
      },
      {
        username: 'disabled',
        password: '075ae3d2fc31640504f814f60e5ef713',
        nickname: 'disabled',
        status: UserStatus.disable,
      },
    ],
  });

  console.log(users);
};

main();
