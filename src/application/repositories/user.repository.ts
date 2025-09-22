import { User } from '@/entities';
import { IBaseRepository } from './base.repository';

export interface IUserRepository extends IBaseRepository<User> {
  findByEmail(email: string): Promise<User | null>;
  findByName(name: string): Promise<User[] | null>;
}
