import { User } from '@/entities';
import { IUserRepository } from '@/application/repositories';
import { InMemoryRepository } from './base.repository';
import { seedUsers } from './seed';

export class UserInMemoryRepository
  extends InMemoryRepository<User>
  implements IUserRepository
{
  constructor() {
    super();
    void seedUsers().then((users) => {
      this.items = users;
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((user) => user.email === email);
    return Promise.resolve(user || null);
  }

  async findByName(name: string): Promise<User | null> {
    const user = this.items.find((user) => user.name === name);
    return Promise.resolve(user || null);
  }
}
