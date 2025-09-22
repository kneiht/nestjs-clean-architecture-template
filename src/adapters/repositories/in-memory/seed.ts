import { Post, Role, User } from '@/entities';
import bcrypt from 'bcryptjs';

export async function seedPosts(): Promise<Post[]> {
  return Promise.all([
    Post.hydrate({
      id: '01997199-4f31-7718-a766-687e926dd0b6',
      title: 'Post 1',
      content: 'Content of post 1',
      createdAt: new Date('2025-09-17T10:00:00.000Z'),
      updatedAt: new Date('2025-09-17T10:00:00.000Z'),
    }),
    Post.hydrate({
      id: '01997199-4f31-7341-b70f-64e96841cd7b',
      title: 'Post 2',
      content: 'Content of post 2',
      createdAt: new Date('2025-09-17T11:00:00.000Z'),
      updatedAt: new Date('2025-09-17T11:00:00.000Z'),
    }),
    Post.hydrate({
      id: '01997199-4f31-79a9-9464-31f5e79905cf',
      title: 'Post 3',
      content: 'Content of post 3',
      createdAt: new Date('2025-09-17T12:00:00.000Z'),
      updatedAt: new Date('2025-09-17T12:00:00.000Z'),
    }),
  ]);
}

export async function seedUsers(): Promise<User[]> {
  const hashedPassword = await bcrypt.hash('123123', 10);
  return Promise.all([
    User.hydrate({
      id: '01997199-4f31-7718-a766-687e926dd0c7',
      name: 'admin',
      email: 'admin@gmail.com',
      hashedPassword,
      role: Role.ADMIN,
      createdAt: new Date('2025-09-17T10:00:00.000Z'),
      updatedAt: new Date('2025-09-17T10:00:00.000Z'),
    }),
    User.hydrate({
      id: '01997199-4f31-7718-a766-687e926dd0c8',
      name: 'user1',
      email: 'user1@gmail.com',
      hashedPassword,
      role: Role.USER,
      createdAt: new Date('2025-09-17T10:00:00.000Z'),
      updatedAt: new Date('2025-09-17T10:00:00.000Z'),
    }),
    User.hydrate({
      id: '01997199-4f31-7718-a766-687e926dd0c9',
      name: 'user2',
      email: 'user2@gmail.com',
      hashedPassword,
      role: Role.USER,
      createdAt: new Date('2025-09-17T10:00:00.000Z'),
      updatedAt: new Date('2025-09-17T10:00:00.000Z'),
    }),
  ]);
}
