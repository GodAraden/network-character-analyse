/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client';

interface User {
  nickname: string; // 用户昵称
  gender: 'male' | 'female';
  workTime: '2023' | '2024' | '2025' | '2026' | '2027';
  enterpriseId: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  enterpriseType: 'fieldwork' | 'hired' | 'formal';
  jobId: 1 | 2 | 3 | 4 | 5 | 6;
  schoolId: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
}

// 获取随机昵称
function generateRandomNickname(): string {
  // 假设我们有一个常见的中文昵称词库，这里简化为一些示例
  const nicknameWords = [
    '春招补录王',
    '心态不重要',
    '青提希望被捞',
    '双非无实习非计科前端版本弃子',
    '匿名牛油',
    '自律创造奇迹',
    'kkkk',
    '不早不晚刚刚好',
    '发奋图强备战春招',
    'nciasd',
    'chasu',
    '牛客',
  ];
  // 随机选择一个昵称作为前缀
  const prefix =
    nicknameWords[Math.floor(Math.random() * nicknameWords.length)];
  // 随机添加一个数字后缀以确保昵称不重复
  const suffix = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0'); // 四位数字
  return prefix + suffix;
}

// 生成随机用户
function generateRandomUser(): User {
  // 生成不重复的昵称
  let nickname = generateRandomNickname();
  // 检查昵称是否已存在，如果存在则重新生成
  const users: User[] = []; // 假设这是一个全局的用户列表，用于检查昵称是否重复
  while (users.some((user) => user.nickname === nickname)) {
    nickname = generateRandomNickname();
  }
  // 生成其他随机属性
  const gender = Math.random() < 0.8 ? 'male' : 'female';
  const workTime = ['2023', '2024', '2025', '2026', '2027'][
    Math.floor(Math.random() * 5)
  ];
  const enterpriseId = Math.floor(Math.random() * 8) + 1; // 1-8
  const enterpriseType = ['fieldwork', 'hired', 'formal'][
    Math.floor(Math.random() * 3)
  ];
  const jobId = Math.floor(Math.random() * 6) + 1; // 1-6
  const schoolId = Math.floor(Math.random() * 15) + 1; // 1-15

  const user = {
    nickname,
    gender,
    workTime,
    enterpriseId,
    enterpriseType,
    jobId,
    schoolId,
  } as User;

  // 假设我们将新生成的用户添加到全局列表中
  users.push(user);

  return user;
}

type Post = {
  title: string; // 任意字符串
  content: string; // 任意字符串
  likes?: number; // 0 ~ 1000 之间的整数
  comments?: number; // 0 ~ 1000 之间的整数
  retweets?: number; // 0 ~ 1000 之间的整数
  tags?: string[]; // 元素为字符串的 JSON 数组
  type?: string;
  userId: number; // 使用 id 这个变量
};

// 生成随机文章列表
function generatePosts(length: number, userId: number): Post[] {
  const posts: Post[] = [];

  for (let i = 0; i < length; i++) {
    const title = `Post Title ${i + 1}`;
    const content = `This is the content of the ${i + 1}st post.`;
    const likes = Math.floor(Math.random() * 1001); // 生成0-1000之间的随机整数
    const comments = Math.floor(Math.random() * 1001);
    const retweets = Math.floor(Math.random() * 1001);
    const tags = getRandomSubArrayEfficient(
      [
        '前端开发面经',
        '互联网公司评价',
        '薪资爆料',
        '学习计划',
        '经验分享',
        '许愿',
        '晒offer',
        '22届毕业生现状',
        '闲聊',
        '感想',
        '求职思考',
        '面试',
        '笔试',
        'tencent',
        'alibaba',
        'bytedance',
        '程序员',
        '码农',
        '上岸',
        '2024春招',
        '25届暑期实习',
      ],
      Math.floor(Math.random() * 5) + 1,
    );
    const type = Math.random() > 0.5 ? '面试经验' : '感想动态'; // 随机选择文本或图片类型

    const post: Post = {
      title,
      content,
      likes,
      comments,
      retweets,
      tags,
      type,
      userId,
    };

    posts.push(post);
  }

  return posts;
}

// 洗牌算法
function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// 取数组中 num 个元素
function getRandomSubArrayEfficient<T>(
  arr: T[],
  num: number,
  omit: T[] = [],
): T[] {
  // 过滤掉需要排除的元素
  const filteredArr = arr.filter((item) => !omit.includes(item));

  // 如果过滤后的数组长度小于或等于num，直接返回
  if (filteredArr.length <= num) {
    return filteredArr;
  }

  // 否则，打乱数组并取前num个元素
  return shuffleArray(filteredArr).slice(0, num);
}

const prisma = new PrismaClient();

async function main(options: {
  userCount: number;
  maxPostCount: number;
  maxFollowCount: number;
}) {
  const { userCount, maxPostCount, maxFollowCount } = options;

  try {
    const jobs = await prisma.nJob.createMany({
      data: [
        { jobName: '前端工程师' },
        { jobName: '后端工程师' },
        { jobName: '测试工程师' },
        { jobName: '算法工程师' },
        { jobName: '产品经理' },
        { jobName: '用户运营' },
      ],
    });
    console.log('[Create Jobs]: ', jobs.count);
  } catch (error) {
    // ...
  }

  try {
    const schools = await prisma.nSchool.createMany({
      data: [
        { schoolName: '清华大学' },
        { schoolName: '北京大学' },
        { schoolName: '复旦大学' },
        { schoolName: '上海交通大学' },
        { schoolName: '浙江大学' },
        { schoolName: '中国科学技术大学' },
        { schoolName: '南京大学' },
        { schoolName: '北京航空航天大学' },
        { schoolName: '南开大学' },
        { schoolName: '同济大学' },
        { schoolName: '中国人民大学' },
        { schoolName: '哈尔滨工业大学' },
        { schoolName: '哈尔滨工业大学（威海）' },
        { schoolName: '哈尔滨工业大学（深圳）' },
        { schoolName: '西安交通大学' },
        { schoolName: '门头沟学院' },
      ],
    });

    console.log('[Create School]: ', schools.count);
  } catch (error) {
    // ...
  }

  try {
    const enterprises = await prisma.nEnterprise.createMany({
      data: [
        { enterpriseName: '腾讯' },
        { enterpriseName: '阿里巴巴' },
        { enterpriseName: '字节跳动' },
        { enterpriseName: '百度' },
        { enterpriseName: '美团' },
        { enterpriseName: '快手' },
        { enterpriseName: '滴滴' },
        { enterpriseName: '今日头条' },
      ],
    });

    console.log('[Create Enterprise]: ', enterprises.count);
  } catch (error) {
    // ...
  }

  try {
    const users = await prisma.nUser.createMany({
      data: Array.from({ length: userCount }, () => generateRandomUser()),
    });

    console.log('[Create User]: ', users.count);
  } catch (error) {
    // ...
  }

  try {
    const users = (await prisma.nUser.findMany()).map(({ userId }) => userId);
    let postCount = 0;
    users.forEach(async (id) => {
      const posts = await prisma.nPost.createMany({
        data: generatePosts(Math.floor(Math.random() * (maxPostCount + 1)), id),
      });
      postCount += posts.count;
    });

    console.log('[Create Post]: ', postCount);
  } catch (error) {
    // ...
  }

  try {
    const users = (await prisma.nUser.findMany()).map(({ userId }) => userId);
    let connectionCount = 0;
    users.forEach(async (id) => {
      const user = await prisma.nUser.update({
        where: { userId: id },
        data: {
          followings: {
            connect: getRandomSubArrayEfficient(
              users,
              Math.floor(Math.random() * (maxFollowCount + 1)),
              [id],
            ).map((id) => ({ userId: id })),
          },
        },
        include: {
          followings: true,
        },
      });
      connectionCount += user.followings.length;
    });

    console.log('[Connect User]: ', connectionCount);
  } catch (error) {
    // ...
  }
}

main({
  userCount: 0,
  maxPostCount: 0, // 6
  maxFollowCount: 0, // 15
});
