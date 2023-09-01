import { Entity } from 'src/core/logic/Entity';

interface EventProps {
  id?: string;
  taskId: string;
  description: string;
  eventTypeId: string;
  photo: string;
  quantity?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

class Event extends Entity<EventProps> {
  constructor(props: EventProps) {
    super(props, props.id);
  }

  get taskId() {
    return this.props.taskId;
  }

  get description() {
    return this.props.description;
  }

  get eventTypeId() {
    return this.props.eventTypeId;
  }

  get photo() {
    return this.props.photo;
  }

  get quantity() {
    return this.props.quantity;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get deletedAt() {
    return this.props.deletedAt;
  }
}

export { Event, EventProps };
