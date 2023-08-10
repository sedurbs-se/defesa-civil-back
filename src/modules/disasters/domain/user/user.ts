import { Entity } from 'src/core/logic/Entity';
import { Agent } from '../agent/agent';

interface UserProps {
  id?: string;
  name: string;
  cpf: string;
  agent?: Agent;
}

export class User extends Entity<UserProps> {
  constructor(props: UserProps) {
    super(props, props.id);
  }

  get name() {
    return this.props.name;
  }

  get cpf() {
    return this.props.cpf;
  }

  get agent() {
    return this.props.agent;
  }

  public static create(props: UserProps): User {
    const user = new User(props);

    return user;
  }
}
