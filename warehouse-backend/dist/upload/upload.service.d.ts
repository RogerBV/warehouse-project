export declare class UploadService {
    private s3;
    private apiKey;
    private secretAccessKey;
    private aws_region;
    private bucket;
    constructor();
    uploadFile(file: Express.Multer.File): Promise<{
        url: string;
    }>;
}
