import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UploadService {
    private s3: S3Client;
    private apiKey: string = process.env.AWS_ACCESS_KEY_ID
    private secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
    private aws_region = process.env.AWS_REGION
    private bucket: string = process.env.AWS_S3_BUCKET
    constructor() {
        this.s3 = new S3Client({
            region: this.aws_region,
            credentials: {
                accessKeyId: this.apiKey,
                secretAccessKey: this.secretAccessKey
            },
            forcePathStyle: true,
        })
    }

    async uploadFile(file: Express.Multer.File) {
        const command = new PutObjectCommand({
            Bucket: this.bucket,
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
        })

        await this.s3.send(command)

        return {
            url: `http://localhost:4566/${this.bucket}/${file.originalname}`
        }
    }
}