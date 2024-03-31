import { Pagination } from '../types';

const DefaultPagination = { current: 1, pageSize: 20 };
/** 从参数中提取分页信息，并生成 Prisma 查询中的分页参数对象，同时返回剩余参数对象 */
export const pickPagination = <T extends Pagination>(
  params: T,
  defaultValue: Pagination = DefaultPagination,
) => {
  const {
    current = defaultValue.current,
    pageSize = defaultValue.pageSize,
    ...restParams
  } = params;
  return {
    restParams,
    pagination: {
      skip: (current - 1) * pageSize,
      take: pageSize,
    },
  };
};

type FuzzySearchType = 'contains' | 'startsWith' | 'endsWith';
type FuzzySearchParams<T> = {
  [key in keyof T]: {
    [type in FuzzySearchType]?: T[key];
  };
};
/** 从参数中提取指定的键值对，并生成 Prisma 查询中的模糊查询参数对象 */
export const fuzzySearch = <T, U extends keyof T>(
  params: T,
  fields: U[],
  options?: Partial<Record<U, FuzzySearchType>>,
) => {
  const res: Partial<FuzzySearchParams<Pick<T, U>>> = {};

  fields.forEach((key) => {
    if (params[key]) {
      const type: FuzzySearchType = options?.[key] ?? 'contains';
      res[key] = { [type]: params[key] } as const;
    }
  });

  return res;
};

type ArrayItem<T> = T extends Array<infer Item> ? Item : T;
type RangeSearchType = 'lt' | 'gt' | 'lte' | 'gte';
/** 从参数中提取指定的键值对，替换键名后，生成 Prisma 查询中的范围查询参数对象 */
export const rangeSearch = <T, U extends keyof T, V extends PropertyKey>(
  params: T,
  transformer: [U, V, RangeSearchType[]][],
) => {
  const res: Partial<
    Record<V, { [key in RangeSearchType]?: ArrayItem<T[U]> }>
  > = {};
  transformer.forEach(([source, target, rules]) => {
    if (Array.isArray(params[source])) {
      res[target] = Object.fromEntries(
        rules.map((rule, index) => [rule, params[source][index]]),
      );
    }
  });
  return res;
};

/** 从参数中提取指定的键值对，并生成 Prisma 查询中的精确查询参数对象 */
export const exactSearch = <T, U extends keyof T>(params: T, fields: U[]) => {
  const res = {} as Pick<T, U>;

  fields.forEach((field) => {
    if (params[field]) {
      res[field] = params[field];
    }
  });

  return res;
};
