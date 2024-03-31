import { Pagination } from '../types';

const DefaultPagination = { current: 1, pageSize: 20 };
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

export const exactSearch = <T, U extends keyof T>(params: T, fields: U[]) => {
  const res = {} as Pick<T, U>;

  fields.forEach((field) => {
    if (params[field]) {
      res[field] = params[field];
    }
  });

  return res;
};
