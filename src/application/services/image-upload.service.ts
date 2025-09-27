export type ImageResponse = {
  url: string;
};

export interface IImageUploadService {
  upload(image: unknown): Promise<ImageResponse>;
}
