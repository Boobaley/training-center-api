import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { ValidationException } from '../exceptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<never> {
  async transform(value: never, metadata: ArgumentMetadata): Promise<never> {
    const obj = plainToInstance(metadata.metatype, value);
    const errors = await validate(obj);

    if (errors.length) {
      const messages: Record<string, string[]> = {};
      errors.forEach(({ property, constraints }) => {
        messages[property] = Object.values(constraints);
      });

      throw new ValidationException(messages);
    }

    return value;
  }
}
