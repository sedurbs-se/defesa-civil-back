import { User } from "../domain/user/user";

export abstract class IUserRepository {
    abstract getById(id: string): Promise<User>;
    abstract getByCPF(id: string): Promise<User>;
    abstract save(user: User): Promise<void>;
    abstract update(user: User): Promise<void>;
}