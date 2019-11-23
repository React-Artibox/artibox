import { LIST_TYPES } from './list.constants';
import { ListController } from './list.controller';
import { ListHandlers } from './list.handlers';
import { ListRenderer } from './list.renderer';
import { ListSchema } from './list.schema';

export interface ListCreateConfig {
  types?: Partial<LIST_TYPES>;
}

export class List extends ListController {
  static create(config?: ListCreateConfig) {
    const types = { ...LIST_TYPES, ...config?.types };
    return new this(types);
  }

  forPlugin() {
    const { types } = this;
    return {
      ...ListHandlers({ controller: this }),
      ...ListRenderer({ types }),
      schema: ListSchema({ types })
    } as const;
  }
}
