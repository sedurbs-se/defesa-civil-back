import { Entity } from 'src/core/logic/Entity';

interface ImageProps {
  id?: string;
  url: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Image extends Entity<ImageProps> {
  constructor(props: ImageProps) {
    super(
      {
        ...props,
        createdAt: props.createdAt || new Date(),
        updatedAt: props.updatedAt || new Date(),
      },
      props.id,
    );
  }

  get url() {
    return this.props.url;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}
