/** 从实体类中**选取**某些属性，并生成 Prisma 查询中的 select 选项 */
export const pickResult = <
  T extends new () => object,
  U extends keyof InstanceType<T>,
>(
  Cls: T,
  fields: U[],
) => {
  const res = {} as Record<U, true>;
  const instance = new Cls();

  fields.forEach((field) => {
    if (field in instance) {
      res[field] = true;
    }
  });

  return res;
};

/** 从实体类中**排除**某些属性，并生成 Prisma 查询中的 select 选项 */
export const omitResult = <
  T extends new () => object,
  U extends keyof InstanceType<T>,
>(
  Cls: T,
  fields: U[],
) => {
  const res = {} as Record<Exclude<keyof InstanceType<T>, U>, true>;
  const fieldSet = new Set(fields) as Set<string>;
  const instance = new Cls();

  Object.keys(instance).forEach((key) => {
    if (!fieldSet.has(key)) {
      res[key] = true;
    }
  });

  return res;
};
