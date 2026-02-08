"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const common_1 = require("@nestjs/common");
let UploadService = class UploadService {
    constructor() {
        this.apiKey = process.env.AWS_ACCESS_KEY_ID;
        this.secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
        this.aws_region = process.env.AWS_REGION;
        this.bucket = process.env.AWS_S3_BUCKET;
        this.s3 = new client_s3_1.S3Client({
            region: this.aws_region,
            endpoint: 'http://localhost:4566',
            credentials: {
                accessKeyId: this.apiKey,
                secretAccessKey: this.secretAccessKey
            },
            forcePathStyle: true,
        });
    }
    async uploadFile(file) {
        const command = new client_s3_1.PutObjectCommand({
            Bucket: this.bucket,
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
        });
        await this.s3.send(command);
        return {
            url: `http://localhost:4566/${this.bucket}/${file.originalname}`
        };
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UploadService);
//# sourceMappingURL=upload.service.js.map