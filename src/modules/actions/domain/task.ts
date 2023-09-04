import { Entity } from 'src/core/logic/Entity';

interface TaskProps {
  id?: string;
  actionId: string;
  name: string;
  status: string;
  quantificable: boolean;
  basicItemId: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

class Task extends Entity<TaskProps> {
  constructor(props: TaskProps) {
    super(props, props.id);
  }

  get actionId() {
    return this.props.actionId;
  }

  get name() {
    return this.props.name;
  }

  get status() {
    return this.props.status;
  }

  get quantificable() {
    return this.props.quantificable;
  }

  get basicItemId() {
    return this.props.basicItemId;
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

export { Task, TaskProps };
