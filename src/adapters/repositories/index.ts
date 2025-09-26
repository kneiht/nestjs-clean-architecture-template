import { env } from '@/config/environment';

import { UserInMemoryRepository, PostInMemoryRepository } from './in-memory';
import { UserMongoRepository, PostMongoRepository } from './mongodb';

const userRepoMap = {
  IN_MEMORY: UserInMemoryRepository,
  MONGODB: UserMongoRepository,
} as const;

const postRepoMap = {
  IN_MEMORY: PostInMemoryRepository,
  MONGODB: PostMongoRepository,
} as const;

// Get the types of the keys the bypass ts errors
type DB_TYPES = keyof typeof userRepoMap;

const DB_SELECT: DB_TYPES = (env.DB_SELECT || 'IN_MEMORY') as DB_TYPES;

export const UserRepository = userRepoMap[DB_SELECT];
export const PostRepository = postRepoMap[DB_SELECT];
