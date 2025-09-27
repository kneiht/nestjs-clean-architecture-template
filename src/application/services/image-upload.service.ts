export type ImageResponse = {
  url: string;
};

export interface IImageUploadService {
  upload(image: any): Promise<ImageResponse>;
}
