import {
  buildMessage,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { isValid } from 'cpf';

export function IsCPF(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isCpf',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return typeof value === 'string' && isValid(value);
        },
        defaultMessage: buildMessage(
          (eachPrefix) =>
            `${eachPrefix} $property must be a valid conforming to the specified constraints`,
          validationOptions,
        ),
      },
    });
  };
}
