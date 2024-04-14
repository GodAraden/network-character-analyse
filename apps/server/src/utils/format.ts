import { instanceToPlain } from 'class-transformer';

export const format = <T>(
  Cls: new (...args: unknown[]) => T,
  plain: object,
): T => {
  return instanceToPlain(new Cls(plain), {
    exposeDefaultValues: true,
    exposeUnsetFields: false,
    excludePrefixes: ['_'],
  }) as T;
};
