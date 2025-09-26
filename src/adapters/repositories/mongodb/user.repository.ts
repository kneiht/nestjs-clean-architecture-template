import { User } from '@/entities/user.entity.js';
import { IUserRepository } from '@/application/repositories';
import { UserModel } from './schemas/user.schema.js';
import { MongoRepository } from './base.repository.js';

export class UserMongoRepository
  extends MongoRepository<User>
  implements IUserRepository
{
  constructor() {
    super(UserModel);
  }

  async findByEmail(email: string): Promise<User | null> {
    const doc = await UserModel.findOne({ email: email.toLowerCase() }).exec();
    return doc as User | null;
  }

  async findByName(name: string): Promise<User | null> {
    const doc = await UserModel.findOne({ name }).exec();
    return doc as User | null;
  }

  // Override add and update to handle specific logic like password hashing and email case
  async add(user: User): Promise<User> {
    const userData = {
      _id: user.id,
      name: user.name,
      email: user.email.toLowerCase(),
      hashedPassword: user.getHashedPassword(),
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    await UserModel.create(userData);
    return user;
  }

  async update(user: User): Promise<User> {
    await UserModel.findByIdAndUpdate(user.id, {
      name: user.name,
      email: user.email.toLowerCase(),
      hashedPassword: user.getHashedPassword(),
      role: user.role,
      updatedAt: user.updatedAt,
    }).exec();
    return user;
  }
}
