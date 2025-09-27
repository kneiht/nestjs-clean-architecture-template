import { env } from '@/config/environment';

import {
  UserInMemoryRepository,
  PostInMemoryRepository,
  ImageInMemoryRepository,
} from './in-memory';
import {
  UserMongoRepository,
  PostMongoRepository,
  ImageMongoRepository,
} from './mongodb';

const userRepoMap = {
  IN_MEMORY: UserInMemoryRepository,
  MONGODB: UserMongoRepository,
} as const;

const postRepoMap = {
  IN_MEMORY: PostInMemoryRepository,
  MONGODB: PostMongoRepository,
} as const;

const imageRepoMap = {
  IN_MEMORY: ImageInMemoryRepository,
  MONGODB: ImageMongoRepository,
} as const;

// Get the types of the keys the bypass ts errors
type DB_TYPES = keyof typeof userRepoMap;

const DB_SELECT: DB_TYPES = (env.DB_SELECT || 'IN_MEMORY') as DB_TYPES;

export const UserRepository = userRepoMap[DB_SELECT];
export const PostRepository = postRepoMap[DB_SELECT];
export const ImageRepository = imageRepoMap[DB_SELECT];
