import { createJsxSerializeMark, CreateJsxSerializeMarkOptions } from '../../jsx-serializer';

export type CreateJsxSerializeToggleMarkCreatorOptions = CreateJsxSerializeMarkOptions<boolean>;

export type CreateJsxSerializeToggleMarkOptions = Partial<CreateJsxSerializeToggleMarkCreatorOptions>;

export function createJsxSerializeToggleMarkCreator(defaults: CreateJsxSerializeToggleMarkCreatorOptions) {
  return (options?: CreateJsxSerializeToggleMarkOptions) =>
    createJsxSerializeMark<boolean>({ ...defaults, ...options });
}
