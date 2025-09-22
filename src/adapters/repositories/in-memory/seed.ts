import { Post } from '@/entities';

export async function seedPosts(): Promise<Post[]> {
  return Promise.all([
    Post.hydrate({
      id: '1',
      title: 'Post 1',
      content: 'Content of post 1',
      createdAt: new Date('2025-09-17T10:00:00.000Z'),
      updatedAt: new Date('2025-09-17T10:00:00.000Z'),
    }),
    Post.hydrate({
      id: '2',
      title: 'Post 2',
      content: 'Content of post 2',
      createdAt: new Date('2025-09-17T11:00:00.000Z'),
      updatedAt: new Date('2025-09-17T11:00:00.000Z'),
    }),
    Post.hydrate({
      id: '3',
      title: 'Post 3',
      content: 'Content of post 3',
      createdAt: new Date('2025-09-17T12:00:00.000Z'),
      updatedAt: new Date('2025-09-17T12:00:00.000Z'),
    }),
  ]);
}
