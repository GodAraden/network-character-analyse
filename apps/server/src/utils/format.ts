import { instanceToPlain } from 'class-transformer';

export interface FormatOptions {
  excludeEmptyString?: boolean;
}

export const format = <T>(
  Cls: new (...args: unknown[]) => T,
  plain: object,
  options: FormatOptions = {},
): T => {
  const { excludeEmptyString = true } = options;

  Object.entries(plain).forEach(([key, value]) => {
    if (excludeEmptyString && value === '') {
      plain[key] = void 0;
    }
  });

  return instanceToPlain(new Cls(plain), {
    exposeDefaultValues: true,
    exposeUnsetFields: false,
    excludePrefixes: ['_'],
  }) as T;
};
