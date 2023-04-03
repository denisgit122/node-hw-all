import { extname } from "node:path";

import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { UploadedFile } from "express-fileupload";
import { v4 } from "uuid";

import { confi } from "../configs";

class S3Service {
  // конструктор містить конект
  // npm install @aws-sdk/client-s3
  constructor(
    private client = new S3Client({
      region: confi.AWS_S3_REGION,
      credentials: {
        accessKeyId: confi.AWS_ACCESS_KEY,
        secretAccessKey: confi.AWS_SECRET_KEY,
      },
    })
  ) {}
  public async uploadPhoto(
    file: UploadedFile,
    itemType: string,
    itemId: string
  ): Promise<string> {
    const filePath = this.buildPath(file.name, itemType, itemId);
    await this.client.send(
      new PutObjectCommand({
        Bucket: confi.AWS_S3_NAME,
        Key: filePath,
        ContentType: file.mimetype, //tod o
        Body: file.data,
        ACL: confi.AWS_S3_ACL,
      })
    );
    return filePath;
  }
  private buildPath(
    fileName: string,
    itemType: string,
    itemId: string
  ): string {
    return `${itemType}/${itemId}/${v4()}${extname(fileName)}`;
  }

  public async deletePhoto(filePath: string): Promise<void> {
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: confi.AWS_S3_NAME,
        Key: filePath,
      })
    );
  }
}
export const s3Service = new S3Service();
