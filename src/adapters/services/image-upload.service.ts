/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { uuidv7 } from 'uuidv7';
import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
import {
  IImageUploadService,
  ImageResponse,
} from '@/application/services/image-upload.service';

@Injectable()
class LocalImageUploadService implements IImageUploadService {
  async upload(file: any): Promise<ImageResponse> {
    // Validate file type
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedMimes.includes(file.mimetype)) {
      throw new Error('Invalid file type. Only image files are allowed.');
    }

    // Validate file size (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new Error('File too large. Maximum size is 5MB.');
    }

    // Use imageId as filename
    const ext = file.originalname.split('.').pop();
    const filename = `${uuidv7()}.${ext}`;
    const filePath = join('uploads', filename);

    // Save file
    await fs.writeFile(filePath, file.buffer);

    // Return URL
    return {
      url: `/uploads/${filename}`,
    };
  }
}

// export
export const ImageUploadService = LocalImageUploadService;
