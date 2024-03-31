# 网络人物关联信息分析系统 - 后端

## 开始使用

- 根目录下新建 `.local.env`
  ```bash
  DATABASE_URL="mysql://root:123456@localhost:3306/network_character_analysis"
  ```
- pnpm i
- pnpm db:migrate
- pnpm dev

## 一些掣肘

单个应用只能对应单个的 prisma client，也就是说采用 nestjs 内置的 workspace，分别为每个子应用划分一个数据库的设想就不成立了。如果想要实现上述设想，应该在包管理维度上做 monorepo，让 prisma client 成为每个子应用的依赖。说白了 nestjs workspace 本身大概就不是为这种情况设计的...
