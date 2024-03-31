import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { tips } from '../dictionary';

@Injectable()
export class ValidationPipe<T> implements PipeTransform<T> {
  async transform(value: T, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) return value;

    /**
     * plainToInstance 将纯对象转换为指定类型的实例；
     * validate 校验实例中各属性是否与类中对应属性上方装饰器指定的规则相匹配
     *
     * ∵ 想要验证 value 中有没有不符合 metatype 定义的属性
     *
     * ∴ 去找 validate 的 options 参数定义：
     *
     * - whitelist：校验器将会将类中没有任何装饰器的属性从被校验对象中剥离，白名单属性即被装饰的属性
     * - forbidNonWhitelisted：在 value 中含有非白名单属性会报错
     *
     * 另注：forbidUnknownValues 意为表意为禁止未知的值，即不是某个类实例的纯对象
     */
    const errors = await validate(plainToInstance(metatype, value), {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      throw new BadRequestException(
        errors.map((err) => err.toString(false, true, metatype.name, true)),
        tips.httpExeceptions.validation,
      );
    }
    return value;
  }

  private toValidate(metatype: unknown) {
    const types = [String, Boolean, Number, Array, Object];
    return !types.some((type) => type === metatype);
  }
}
