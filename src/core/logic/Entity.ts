import { randomUUID } from 'crypto';

export abstract class Entity<T> {
  public readonly props: T;
  readonly id: string;

  constructor(props: T, id?: string) {
    this.props = props;
    this.id = id ? id : randomUUID();
  }

  public equals(object?: Entity<T>): boolean {
    if (object === null || object === undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!(object instanceof Entity)) {
      return false;
    }

    return this.id === object.id;
  }
}
